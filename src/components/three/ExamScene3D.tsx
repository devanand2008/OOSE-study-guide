import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { buildUnit3DScene, UNIT_3D_SPECS, type BuiltUnitScene } from './sceneBuilders';
import type { ThemeMode } from '../../utils/theme';

interface ExamScene3DProps {
  activeUnitIndex: number;
  onSelectUnitIndex: (index: number) => void;
  theme?: ThemeMode;
}

type CameraPreset = 'isometric' | 'top' | 'front';

const CAMERA_PRESETS: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
  isometric: { pos: [6.8, 5.2, 7.2], target: [0, 1.0, 0] },
  top: { pos: [0.1, 10.6, 2.4], target: [0, 0.5, 0] },
  front: { pos: [0.2, 2.8, 9.2], target: [0, 1.15, 0] },
};

const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

function detectSoftwareGl(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function ExamScene3D({ activeUnitIndex, onSelectUnitIndex, theme = 'light' }: ExamScene3DProps) {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [explodeAmount, setExplodeAmount] = useState(0);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [webglError, setWebglError] = useState<string | null>(null);

  const stateRef = useRef({
    unitIndex: activeUnitIndex,
    theme,
    targetExplode: 0,
    currentExplode: 0,
    transitionActive: false,
    desiredPos: new THREE.Vector3(...CAMERA_PRESETS.isometric.pos),
    desiredTarget: new THREE.Vector3(...CAMERA_PRESETS.isometric.target),
  });

  const apiRef = useRef<{
    loadUnit: (index: number) => void;
    applyTheme: (mode: ThemeMode) => void;
    requestRender: () => void;
  } | null>(null);

  useEffect(() => {
    stateRef.current.unitIndex = activeUnitIndex;
    apiRef.current?.loadUnit(activeUnitIndex);
  }, [activeUnitIndex]);

  useEffect(() => {
    stateRef.current.theme = theme;
    apiRef.current?.applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    stateRef.current.targetExplode = explodeAmount;
    apiRef.current?.requestRender();
  }, [explodeAmount]);

  const applyCameraPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    const cfg = CAMERA_PRESETS[preset];
    stateRef.current.desiredPos.set(...cfg.pos);
    stateRef.current.desiredTarget.set(...cfg.target);
    stateRef.current.transitionActive = true;
    apiRef.current?.requestRender();
  };

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError('WebGL is unavailable in this browser context.');
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const initialBg = stateRef.current.theme === 'dark' ? 0x0f172a : 0xf1f5f9;
    scene.background = new THREE.Color(initialBg);
    scene.fog = new THREE.Fog(initialBg, 14, 34);

    // Mandatory studio environment map on every device
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 620;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(...CAMERA_PRESETS.isometric.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.isometric.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;
    controls.minDistance = 4.2;
    controls.maxDistance = 17;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.update();

    // Warm/cool studio lighting contrast (1 shadow-casting key light + Hemisphere fill + rim)
    const hemi = new THREE.HemisphereLight(0xdbeafe, 0x94a3b8, 0.85);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.75);
    keyLight.position.set(7, 11, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 28;
    const d = 7;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xbfdbfe, 0.7);
    rimLight.position.set(-7, 5, -6);
    scene.add(rimLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    let currentBuilt: BuiltUnitScene | null = null;
    let loadedUnitIndex = -1;
    let disposed = false;
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();

    function disposeBuilt(built: BuiltUnitScene | null) {
      if (!built) return;
      scene.remove(built.group);
      built.disposables.geometries.forEach((g) => g.dispose());
      built.disposables.materials.forEach((m) => m.dispose());
      built.disposables.textures.forEach((t) => t.dispose());
    }

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        const st = stateRef.current;
        let stillAnimating = false;

        // Smooth exponential damping for exploded-view separation
        if (Math.abs(st.currentExplode - st.targetExplode) > 0.002) {
          st.currentExplode = isSoftwareGl
            ? st.targetExplode
            : THREE.MathUtils.damp(st.currentExplode, st.targetExplode, 9, dt);
          if (Math.abs(st.currentExplode - st.targetExplode) <= 0.002) {
            st.currentExplode = st.targetExplode;
          } else {
            stillAnimating = true;
          }
          if (currentBuilt) {
            for (const entry of currentBuilt.explodeEntries) {
              entry.object.position.y = entry.baseY + entry.offsetY * st.currentExplode;
            }
          }
        }

        // Smooth exponential damping for camera preset transitions
        if (st.transitionActive) {
          if (isSoftwareGl) {
            camera.position.copy(st.desiredPos);
            controls.target.copy(st.desiredTarget);
            st.transitionActive = false;
          } else {
            const alpha = 1 - Math.exp(-7 * dt);
            _targetPos.copy(st.desiredPos);
            _targetLook.copy(st.desiredTarget);
            camera.position.lerp(_targetPos, alpha);
            controls.target.lerp(_targetLook, alpha);
            if (
              camera.position.distanceTo(_targetPos) < 0.02 &&
              controls.target.distanceTo(_targetLook) < 0.02
            ) {
              camera.position.copy(_targetPos);
              controls.target.copy(_targetLook);
              st.transitionActive = false;
            } else {
              stillAnimating = true;
            }
          }
        }

        controls.update();
        renderer.render(scene, camera);
        if (container) {
          container.dataset.renderedUnit = String(loadedUnitIndex);
          container.dataset.renderedExplode = String(Math.round(st.currentExplode * 100));
        }

        const done = () => {
          renderBusy = false;
          if (renderDirty || stillAnimating) requestRender();
        };

        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    function loadUnit(index: number) {
      disposeBuilt(currentBuilt);
      currentBuilt = buildUnit3DScene(index, maxAniso, isSoftwareGl);
      loadedUnitIndex = index;
      if (isSoftwareGl) {
        stateRef.current.currentExplode = stateRef.current.targetExplode;
      }
      for (const entry of currentBuilt.explodeEntries) {
        entry.object.position.y = entry.baseY + entry.offsetY * stateRef.current.currentExplode;
      }
      scene.add(currentBuilt.group);
      if (!isSoftwareGl) {
        renderer.compile(scene, camera);
      }
      requestRender();
    }

    function applyTheme(mode: ThemeMode) {
      const bgHex = mode === 'dark' ? 0x0f172a : 0xf1f5f9;
      scene.background = new THREE.Color(bgHex);
      scene.fog = new THREE.Fog(bgHex, 14, 34);
      requestRender();
    }

    apiRef.current = { loadUnit, applyTheme, requestRender };

    const handleControlStart = () => {
      stateRef.current.transitionActive = false;
    };
    const handleControlChange = () => {
      requestRender();
    };
    controls.addEventListener('start', handleControlStart);
    controls.addEventListener('change', handleControlChange);

    const handleResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || 1000;
      const h = container.clientHeight || 620;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      requestRender();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError('WebGL context was lost. Click Reset View to reload.');
    };
    const handleContextRestored = () => {
      setWebglError(null);
      requestRender();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    loadUnit(stateRef.current.unitIndex);

    return () => {
      disposed = true;
      apiRef.current = null;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', handleControlStart);
      controls.removeEventListener('change', handleControlChange);
      controls.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      disposeBuilt(currentBuilt);
      envRT.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const spec = UNIT_3D_SPECS[activeUnitIndex] ?? UNIT_3D_SPECS[0];

  return (
    <section
      className="relative w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] min-h-[560px] bg-slate-100 dark:bg-slate-900 overflow-hidden"
      data-testid="three-lab-viewport"
      data-unit-index={activeUnitIndex}
    >
      {/* Dedicated isolated WebGL canvas mount */}
      <div ref={canvasMountRef} data-testid="three-canvas-mount" className="w-full h-full" />

      {/* Top-Left Minimal Model Info */}
      <div className="absolute top-5 left-5 z-10 max-w-md bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-sm pointer-events-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-blue-700 dark:text-sky-400">{spec.unitLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Interactive 3D Spatial Model</span>
        </div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-0.5">{spec.title}</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{spec.subtitle}</p>
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-x-4 gap-y-1">
          {spec.legend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-200">
              <span
                className="w-2.5 h-2.5 rounded-xs shrink-0"
                style={{ backgroundColor: item.swatch }}
                aria-hidden="true"
              />
              <span className="font-medium">{item.label}:</span>
              <span className="text-slate-500 dark:text-slate-400">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {webglError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-100/95 dark:bg-slate-950/95 p-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 max-w-md text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{webglError}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
              All 20 interactive 2D SVG exam diagrams remain fully available in the Study Guide and Diagrams tabs.
            </p>
          </div>
        </div>
      )}

      {/* Collapsible Unified Bottom Control Dock (solid rgba, zero backdrop-filter over WebGL) */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[min(920px,94vw)] flex flex-col items-center pointer-events-none"
      >
        <button
          type="button"
          onClick={() => setDockCollapsed((c) => !c)}
          aria-expanded={!dockCollapsed}
          className="pointer-events-auto mb-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-t-lg text-xs font-medium text-slate-100 bg-[rgba(15,23,42,0.92)] border border-slate-700 hover:bg-slate-800 transition-colors whitespace-nowrap"
        >
          {dockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {dockCollapsed ? 'Show Controls' : 'Hide Controls'}
        </button>

        {!dockCollapsed && (
          <div className="pointer-events-auto w-full rounded-xl bg-[rgba(15,23,42,0.94)] text-slate-100 border border-slate-700/80 px-4 py-3 shadow-lg flex flex-wrap items-center justify-between gap-4">
            {/* Unit Selector */}
            <div className="flex items-center gap-1 flex-wrap" role="group" aria-label="Select 3D Unit Model">
              {UNIT_3D_SPECS.map((u) => (
                <button
                  key={u.unitLabel}
                  type="button"
                  onClick={() => onSelectUnitIndex(u.unitIndex)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeUnitIndex === u.unitIndex
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {u.unitLabel}
                </button>
              ))}
            </div>

            {/* Exploded View Slider */}
            <div className="flex items-center gap-2.5">
              <label htmlFor="explode-slider" className="text-xs font-medium text-slate-300 whitespace-nowrap">
                Exploded View: <span className="font-mono tabular-nums text-white">{Math.round(explodeAmount * 100)}%</span>
              </label>
              <input
                id="explode-slider"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={explodeAmount}
                onChange={(e) => setExplodeAmount(Number(e.target.value))}
                className="w-28 accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Camera Presets */}
            <div className="flex items-center gap-1.5">
              {(['isometric', 'top', 'front'] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => applyCameraPreset(preset)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap ${
                    cameraPreset === preset
                      ? 'bg-slate-200 text-slate-900'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setExplodeAmount(0);
                  applyCameraPreset('isometric');
                }}
                aria-label="Reset 3D camera and exploded view"
                className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
