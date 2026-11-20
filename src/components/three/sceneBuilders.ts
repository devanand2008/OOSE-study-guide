import * as THREE from 'three';

export interface ExplodeEntry {
  object: THREE.Object3D;
  baseY: number;
  offsetY: number;
}

export interface BuiltUnitScene {
  group: THREE.Group;
  explodeEntries: ExplodeEntry[];
  disposables: {
    geometries: THREE.BufferGeometry[];
    materials: THREE.Material[];
    textures: THREE.Texture[];
  };
}

export interface UnitModelSpec {
  unitIndex: number;
  unitLabel: string;
  title: string;
  subtitle: string;
  legend: { label: string; detail: string; swatch: string }[];
}

export const UNIT_3D_SPECS: UnitModelSpec[] = [
  {
    unitIndex: 0,
    unitLabel: 'Unit 1',
    title: 'SDLC Waterfall & Spiral Tower',
    subtitle: 'Six sequential waterfall steps encircled by a 4-quadrant risk-driven spiral rail.',
    legend: [
      { label: 'Cobalt Steps', detail: 'Waterfall phases (Req → Maint)', swatch: '#1D4ED8' },
      { label: 'Amber Spiral Rail', detail: 'Boehm 4-quadrant risk loop', swatch: '#D97706' },
      { label: 'Emerald Crown', detail: 'Verified release increment', swatch: '#059669' },
    ],
  },
  {
    unitIndex: 1,
    unitLabel: 'Unit 2',
    title: 'DFD Process & Petri Net Hub',
    subtitle: 'Central beveled process core linked by data conduits to twin persistent database drums.',
    legend: [
      { label: 'Central Octagon', detail: 'Process 3.0 Order Engine', swatch: '#1D4ED8' },
      { label: 'Twin Steel Drums', detail: 'D1 User & D3 Order Data Stores', swatch: '#475569' },
      { label: 'Amber Tokens', detail: 'Active Petri Net / Data flows', swatch: '#D97706' },
    ],
  },
  {
    unitIndex: 2,
    unitLabel: 'Unit 3',
    title: 'Low Coupling & High Cohesion Cluster',
    subtitle: 'Three self-contained cohesive hexagonal modules bridged strictly via clean parameter conduits.',
    legend: [
      { label: 'Hex Modules', detail: 'Functional cohesion interiors', swatch: '#059669' },
      { label: 'Brushed Bridges', detail: 'Minimal Data-Coupling interfaces', swatch: '#1D4ED8' },
      { label: 'Base Ring', detail: 'Shared architectural boundary', swatch: '#334155' },
    ],
  },
  {
    unitIndex: 3,
    unitLabel: 'Unit 4',
    title: 'Layered & MVC Architecture Stack',
    subtitle: 'Four architectural tiers encircled by MVC request-response conduits — drag Exploded View to inspect layers.',
    legend: [
      { label: 'Top Deck', detail: 'Presentation / View Tier', swatch: '#38BDF8' },
      { label: 'Mid Core', detail: 'Business Logic & Controller', swatch: '#1D4ED8' },
      { label: 'Base Vault', detail: 'Data Access & Model Database', swatch: '#D97706' },
    ],
  },
  {
    unitIndex: 4,
    unitLabel: 'Unit 5',
    title: 'Software Testing Pyramid Rig',
    subtitle: 'Unit foundation, Integration mid-tier, System crown, and an outer Regression verification ring.',
    legend: [
      { label: 'Blue Foundation', detail: 'High-volume Unit Test layer', swatch: '#1D4ED8' },
      { label: 'Amber Mid-Tier', detail: 'Module Integration checks', swatch: '#D97706' },
      { label: 'Emerald Orbit', detail: 'Automated Regression loop', swatch: '#059669' },
    ],
  },
  {
    unitIndex: 5,
    unitLabel: 'Unit 6',
    title: 'CPM Critical Path Network (13 Days)',
    subtitle: 'Exact Unit 6 network: Crimson Critical Path A → C → D → E (13d, zero slack) vs Slate path A → B → D (12d).',
    legend: [
      { label: 'Crimson Conduits', detail: 'Critical Path A → C → D → E (13d)', swatch: '#DC2626' },
      { label: 'Slate Detour', detail: 'Non-Critical Node B (1d slack)', swatch: '#64748B' },
      { label: 'Amber Caps', detail: 'Milestone completion beacons', swatch: '#D97706' },
    ],
  },
];

function createBlueprintFloorTexture(maxAniso: number): {
  albedo: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
} {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(0, 0, size, size);

  // Subtle architectural grid
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.22)';
  ctx.lineWidth = 1;
  const step = 32;
  for (let i = 0; i <= size; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(30, 64, 175, 0.22)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= size; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.repeat.set(4, 4);
  albedo.anisotropy = maxAniso;

  // Procedural micro-bump texture
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 256;
  bumpCanvas.height = 256;
  const bCtx = bumpCanvas.getContext('2d')!;
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 2) {
    const shade = 120 + ((y * 17) % 18);
    bCtx.fillStyle = `rgb(${shade},${shade},${shade})`;
    bCtx.fillRect(0, y, 256, 1);
  }
  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(3, 3);
  bump.anisotropy = maxAniso;

  return { albedo, bump };
}

function createContactShadowDisc(radius: number): {
  mesh: THREE.Mesh;
  geo: THREE.BufferGeometry;
  mat: THREE.Material;
  tex: THREE.CanvasTexture;
} {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.44)');
  grad.addColorStop(0.55, 'rgba(15, 23, 42, 0.16)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const tex = new THREE.CanvasTexture(canvas);
  const geo = new THREE.CircleGeometry(radius, 32);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = 0.015;
  return { mesh, geo, mat, tex };
}

function createBeveledPolygonGeometry(sides: number, radius: number, depth: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / sides;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 2,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function createRoundedPlateGeometry(w: number, d: number, thickness: number, r = 0.22): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hd = d / 2;
  shape.moveTo(-hw + r, -hd);
  shape.lineTo(hw - r, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + r);
  shape.lineTo(hw, hd - r);
  shape.quadraticCurveTo(hw, hd, hw - r, hd);
  shape.lineTo(-hw + r, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - r);
  shape.lineTo(-hw, -hd + r);
  shape.quadraticCurveTo(-hw, -hd, -hw + r, -hd);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 2,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

export function buildUnit3DScene(unitIndex: number, maxAniso: number, isSoftwareGl: boolean): BuiltUnitScene {
  const group = new THREE.Group();
  const explodeEntries: ExplodeEntry[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  const { albedo: floorAlbedo, bump: brushedBump } = createBlueprintFloorTexture(maxAniso);
  textures.push(floorAlbedo, brushedBump);

  // Shared calibrated PBR materials (varied roughness >= 0.25 & metalness across adjacent parts)
  const plinthMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: floorAlbedo,
      roughness: 0.78,
      metalness: 0.08,
    }),
  );
  const darkSteelMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.32,
      metalness: 0.82,
      bumpMap: brushedBump,
      bumpScale: 0.015,
    }),
  );
  const brushedAlumMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.24,
      metalness: 0.88,
      bumpMap: brushedBump,
      bumpScale: 0.012,
    }),
  );
  const cobaltMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.38,
      metalness: 0.28,
    }),
  );
  const emeraldMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.36,
      metalness: 0.25,
    }),
  );
  const amberMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.28,
      metalness: 0.55,
    }),
  );
  const crimsonMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.3,
      metalness: 0.35,
    }),
  );
  const glassMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xbae6fd,
      roughness: 0.12,
      metalness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.72,
      transparent: true,
      opacity: isSoftwareGl ? 0.52 : 0.88,
      ior: 1.48,
      thickness: 0.4,
      clearcoat: 1.0,
    }),
  );

  // Ground architectural plinth + soft contact shadow
  const plinthGeo = trackGeo(new THREE.CylinderGeometry(4.4, 4.65, 0.28, 48));
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.position.y = -0.14;
  plinthMesh.receiveShadow = true;
  group.add(plinthMesh);

  const rimGeo = trackGeo(new THREE.TorusGeometry(4.48, 0.05, 12, 64));
  rimGeo.rotateX(Math.PI / 2);
  const rimMesh = new THREE.Mesh(rimGeo, brushedAlumMat);
  rimMesh.position.y = 0.0;
  group.add(rimMesh);

  const contact = createContactShadowDisc(3.85);
  geometries.push(contact.geo);
  materials.push(contact.mat);
  textures.push(contact.tex);
  group.add(contact.mesh);

  const registerExplode = (object: THREE.Object3D, offsetY: number) => {
    explodeEntries.push({ object, baseY: object.position.y, offsetY });
  };

  if (unitIndex === 0) {
    // UNIT 1: SDLC Waterfall Cascade + 4-Quadrant Spiral Tower
    const stepGeo = trackGeo(createRoundedPlateGeometry(1.5, 0.85, 0.22, 0.1));
    const trimGeo = trackGeo(new THREE.BoxGeometry(1.56, 0.05, 0.08));
    const beaconGeo = trackGeo(new THREE.CylinderGeometry(0.11, 0.14, 0.28, 16));

    for (let i = 0; i < 6; i++) {
      const stepGroup = new THREE.Group();
      const mat = i === 5 ? emeraldMat : i === 3 ? amberMat : cobaltMat;
      const slab = new THREE.Mesh(stepGeo, mat);
      slab.castShadow = !isSoftwareGl;
      slab.receiveShadow = true;
      stepGroup.add(slab);

      const frontTrim = new THREE.Mesh(trimGeo, brushedAlumMat);
      frontTrim.position.set(0, 0.12, 0.43);
      stepGroup.add(frontTrim);

      const beacon = new THREE.Mesh(beaconGeo, amberMat);
      beacon.position.set(0.56, 0.34, 0);
      stepGroup.add(beacon);

      const t = i / 5;
      stepGroup.position.set(-1.9 + t * 3.8, 0.04 + (5 - i) * 0.42, -0.75 + t * 1.5);
      group.add(stepGroup);
      registerExplode(stepGroup, (5 - i) * 0.22);
    }

    // Expanding Boehm Spiral rail (TubeGeometry)
    const spiralPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 72; i++) {
      const u = i / 72;
      const angle = u * Math.PI * 4.5;
      const r = 0.7 + u * 2.55;
      const y = 0.28 + u * 2.45;
      spiralPts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
    }
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPts);
    const spiralGeo = trackGeo(new THREE.TubeGeometry(spiralCurve, 96, 0.075, 10, false));
    const spiralMesh = new THREE.Mesh(spiralGeo, amberMat);
    spiralMesh.castShadow = !isSoftwareGl;
    group.add(spiralMesh);
    registerExplode(spiralMesh, 0.85);
  } else if (unitIndex === 1) {
    // UNIT 2: DFD Process Core + Twin Database Drums + Petri Net Conduits
    const coreGroup = new THREE.Group();
    const octGeo = trackGeo(createBeveledPolygonGeometry(8, 1.15, 0.72));
    const coreMesh = new THREE.Mesh(octGeo, cobaltMat);
    coreMesh.castShadow = !isSoftwareGl;
    coreGroup.add(coreMesh);

    const collarGeo = trackGeo(new THREE.TorusGeometry(1.22, 0.06, 12, 32));
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, brushedAlumMat);
    collar.position.y = 0.4;
    coreGroup.add(collar);

    const capGeo = trackGeo(createBeveledPolygonGeometry(8, 0.78, 0.22));
    const cap = new THREE.Mesh(capGeo, glassMat);
    cap.position.y = 0.84;
    coreGroup.add(cap);

    coreGroup.position.set(0, 0.06, 0);
    group.add(coreGroup);
    registerExplode(coreGroup, 0.65);

    // LatheGeometry Database Drums (left & right)
    const lathePts = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.76, 0.0),
      new THREE.Vector2(0.82, 0.14),
      new THREE.Vector2(0.82, 1.32),
      new THREE.Vector2(0.74, 1.46),
      new THREE.Vector2(0.0, 1.46),
    ];
    const drumGeo = trackGeo(new THREE.LatheGeometry(lathePts, 28));
    const ringGeo = trackGeo(new THREE.TorusGeometry(0.84, 0.04, 10, 28));
    ringGeo.rotateX(Math.PI / 2);

    [-2.55, 2.55].forEach((xPos, idx) => {
      const drumGroup = new THREE.Group();
      const drum = new THREE.Mesh(drumGeo, darkSteelMat);
      drum.castShadow = !isSoftwareGl;
      drumGroup.add(drum);
      [0.35, 0.78, 1.2].forEach((ry) => {
        const ring = new THREE.Mesh(ringGeo, idx === 0 ? emeraldMat : brushedAlumMat);
        ring.position.y = ry;
        drumGroup.add(ring);
      });
      drumGroup.position.set(xPos, 0.02, -0.4);
      group.add(drumGroup);
      registerExplode(drumGroup, 0.45);

      // Sweeping TubeGeometry data flow conduit
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xPos * 0.7, 0.95, -0.25),
        new THREE.Vector3(xPos * 0.4, 1.85, 0.35),
        new THREE.Vector3(xPos > 0 ? 0.9 : -0.9, 0.85, 0.15),
      ]);
      const tubeGeo = trackGeo(new THREE.TubeGeometry(curve, 32, 0.065, 10, false));
      const tubeMesh = new THREE.Mesh(tubeGeo, amberMat);
      group.add(tubeMesh);
      registerExplode(tubeMesh, 1.05);

      // Token spheres along conduits
      const tokenGeo = trackGeo(new THREE.SphereGeometry(0.16, 18, 14));
      const token = new THREE.Mesh(tokenGeo, emeraldMat);
      token.position.copy(curve.getPoint(0.5));
      group.add(token);
      registerExplode(token, 1.25);
    });
  } else if (unitIndex === 2) {
    // UNIT 3: Low Coupling & High Cohesion 3-Module Hex Cluster
    const hexBaseGeo = trackGeo(createBeveledPolygonGeometry(6, 1.02, 0.36));
    const innerCellGeo = trackGeo(createBeveledPolygonGeometry(6, 0.34, 0.56));
    const capRingGeo = trackGeo(new THREE.TorusGeometry(0.95, 0.045, 10, 6));
    capRingGeo.rotateX(Math.PI / 2);

    const centers = [
      new THREE.Vector3(-1.75, 0.06, 0.95),
      new THREE.Vector3(1.75, 0.06, 0.95),
      new THREE.Vector3(0, 0.06, -1.65),
    ];

    centers.forEach((pos, idx) => {
      const modGroup = new THREE.Group();
      const base = new THREE.Mesh(hexBaseGeo, darkSteelMat);
      base.castShadow = !isSoftwareGl;
      modGroup.add(base);

      // 3 cohesive inner functional cells tightly grouped inside each module
      for (let c = 0; c < 3; c++) {
        const ang = (c / 3) * Math.PI * 2;
        const cell = new THREE.Mesh(innerCellGeo, idx === 2 ? cobaltMat : emeraldMat);
        cell.position.set(Math.cos(ang) * 0.42, 0.34, Math.sin(ang) * 0.42);
        cell.castShadow = !isSoftwareGl;
        modGroup.add(cell);
      }

      const ring = new THREE.Mesh(capRingGeo, brushedAlumMat);
      ring.position.y = 0.96;
      modGroup.add(ring);

      modGroup.position.copy(pos);
      group.add(modGroup);
      registerExplode(modGroup, 0.35 + idx * 0.25);
    });

    // Clean single Data-Coupling bridges between modules
    const pairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 0],
    ];
    pairs.forEach(([a, b]) => {
      const p1 = centers[a].clone().setY(0.55);
      const p2 = centers[b].clone().setY(0.55);
      const mid = p1.clone().add(p2).multiplyScalar(0.5).setY(1.25);
      const bridgeCurve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const bridgeGeo = trackGeo(new THREE.TubeGeometry(bridgeCurve, 28, 0.06, 10, false));
      const bridgeMesh = new THREE.Mesh(bridgeGeo, cobaltMat);
      group.add(bridgeMesh);
      registerExplode(bridgeMesh, 1.0);
    });
  } else if (unitIndex === 3) {
    // UNIT 4: 4-Layer Architecture & MVC Orbital Stack
    const layerConfigs = [
      { y: 0.08, w: 3.6, d: 2.6, mat: darkSteelMat, explode: 0.05 }, // Database Layer
      { y: 0.72, w: 3.3, d: 2.35, mat: amberMat, explode: 0.55 }, // Data Access
      { y: 1.36, w: 3.0, d: 2.1, mat: cobaltMat, explode: 1.15 }, // Business Logic / Controller
      { y: 2.0, w: 2.75, d: 1.88, mat: glassMat, explode: 1.75 }, // Presentation / View
    ];

    const pillarGeo = trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 14));

    layerConfigs.forEach((cfg, idx) => {
      const layerGroup = new THREE.Group();
      const plateGeo = trackGeo(createRoundedPlateGeometry(cfg.w, cfg.d, 0.22, 0.22));
      const plate = new THREE.Mesh(plateGeo, cfg.mat);
      plate.castShadow = !isSoftwareGl;
      plate.receiveShadow = true;
      layerGroup.add(plate);

      // Corner structural standoffs
      const sx = cfg.w / 2 - 0.3;
      const sz = cfg.d / 2 - 0.3;
      [
        [-sx, -sz],
        [sx, -sz],
        [-sx, sz],
        [sx, sz],
      ].forEach(([px, pz]) => {
        const p = new THREE.Mesh(pillarGeo, brushedAlumMat);
        p.position.set(px, 0.26, pz);
        layerGroup.add(p);
      });

      // Accent top trim strip
      const trimGeo = trackGeo(new THREE.BoxGeometry(cfg.w * 0.65, 0.06, 0.14));
      const trim = new THREE.Mesh(trimGeo, idx === 3 ? emeraldMat : brushedAlumMat);
      trim.position.set(0, 0.27, cfg.d / 2 - 0.18);
      layerGroup.add(trim);

      layerGroup.position.y = cfg.y;
      group.add(layerGroup);
      registerExplode(layerGroup, cfg.explode);
    });

    // Orbital MVC request/response arches
    for (let i = 0; i < 3; i++) {
      const side = i === 0 ? -1 : i === 1 ? 1 : 0;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 2.1, 0.3, i === 2 ? -1.5 : 0),
        new THREE.Vector3(side * 2.55, 1.35, i === 2 ? -1.95 : 0.45),
        new THREE.Vector3(side * 1.65, 2.25, i === 2 ? -1.2 : 0),
      ]);
      const archGeo = trackGeo(new THREE.TubeGeometry(curve, 32, 0.06, 10, false));
      const arch = new THREE.Mesh(archGeo, i === 1 ? emeraldMat : amberMat);
      group.add(arch);
      registerExplode(arch, 1.3);
    }
  } else if (unitIndex === 4) {
    // UNIT 5: Testing Pyramid & Automated Regression Verification Rig
    const tiers = [
      { y: 0.06, size: 3.4, h: 0.48, mat: cobaltMat, explode: 0.05 }, // Unit
      { y: 0.62, size: 2.5, h: 0.48, mat: amberMat, explode: 0.55 }, // Integration
      { y: 1.18, size: 1.65, h: 0.48, mat: emeraldMat, explode: 1.1 }, // System
      { y: 1.74, size: 0.88, h: 0.44, mat: glassMat, explode: 1.65 }, // Acceptance
    ];

    tiers.forEach((t) => {
      const tierGroup = new THREE.Group();
      const plateGeo = trackGeo(createRoundedPlateGeometry(t.size, t.size, t.h, 0.16));
      const mesh = new THREE.Mesh(plateGeo, t.mat);
      mesh.castShadow = !isSoftwareGl;
      mesh.receiveShadow = true;
      tierGroup.add(mesh);

      const frameGeo = trackGeo(new THREE.BoxGeometry(t.size + 0.1, 0.06, t.size + 0.1));
      const frame = new THREE.Mesh(frameGeo, brushedAlumMat);
      frame.position.y = t.h + 0.05;
      tierGroup.add(frame);

      tierGroup.position.y = t.y;
      group.add(tierGroup);
      registerExplode(tierGroup, t.explode);
    });

    // Regression automated verification orbital ring
    const regGroup = new THREE.Group();
    const orbitGeo = trackGeo(new THREE.TorusGeometry(2.65, 0.075, 14, 64));
    orbitGeo.rotateX(Math.PI / 2);
    const orbitMesh = new THREE.Mesh(orbitGeo, emeraldMat);
    regGroup.add(orbitMesh);

    const nodeGeo = trackGeo(new THREE.SphereGeometry(0.18, 16, 14));
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2;
      const n = new THREE.Mesh(nodeGeo, brushedAlumMat);
      n.position.set(Math.cos(ang) * 2.65, 0, Math.sin(ang) * 2.65);
      regGroup.add(n);
    }
    regGroup.position.y = 1.2;
    group.add(regGroup);
    registerExplode(regGroup, 1.3);
  } else {
    // UNIT 6: CPM Critical Path Network (Exact A -> B/C -> D -> E exam graph)
    const nodes = [
      { id: 'A', pos: new THREE.Vector3(-2.7, 0.06, 0), crit: true, h: 0.75 },
      { id: 'B', pos: new THREE.Vector3(-0.75, 0.06, -1.65), crit: false, h: 0.95 },
      { id: 'C', pos: new THREE.Vector3(-0.75, 0.06, 1.65), crit: true, h: 1.25 },
      { id: 'D', pos: new THREE.Vector3(1.15, 0.06, 0), crit: true, h: 1.5 },
      { id: 'E', pos: new THREE.Vector3(2.85, 0.06, 0), crit: true, h: 0.85 },
    ];

    const pedGeo = trackGeo(createBeveledPolygonGeometry(6, 0.56, 0.16));
    const capGeo = trackGeo(new THREE.SphereGeometry(0.24, 18, 14));

    nodes.forEach((n, idx) => {
      const nGroup = new THREE.Group();
      const ped = new THREE.Mesh(pedGeo, darkSteelMat);
      nGroup.add(ped);

      const colGeo = trackGeo(new THREE.CylinderGeometry(0.28, 0.34, n.h, 20));
      const col = new THREE.Mesh(colGeo, n.crit ? crimsonMat : brushedAlumMat);
      col.position.y = 0.22 + n.h / 2;
      col.castShadow = !isSoftwareGl;
      nGroup.add(col);

      const collarGeo = trackGeo(new THREE.TorusGeometry(0.32, 0.045, 10, 24));
      collarGeo.rotateX(Math.PI / 2);
      const collar = new THREE.Mesh(collarGeo, brushedAlumMat);
      collar.position.y = 0.22 + n.h;
      nGroup.add(collar);

      const cap = new THREE.Mesh(capGeo, n.crit ? amberMat : darkSteelMat);
      cap.position.y = 0.44 + n.h;
      nGroup.add(cap);

      nGroup.position.copy(n.pos);
      group.add(nGroup);
      registerExplode(nGroup, n.crit ? 0.65 + idx * 0.12 : 0.1);
    });

    // Connect edges (Critical A->C->D->E in crimson; Non-critical A->B->D in slate)
    const edges: [number, number, boolean][] = [
      [0, 1, false],
      [1, 3, false],
      [0, 2, true],
      [2, 3, true],
      [3, 4, true],
    ];

    edges.forEach(([fromIdx, toIdx, crit]) => {
      const p1 = nodes[fromIdx].pos.clone().setY(0.32 + nodes[fromIdx].h * 0.7);
      const p2 = nodes[toIdx].pos.clone().setY(0.32 + nodes[toIdx].h * 0.7);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.y += crit ? 0.55 : 0.32;
      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const tubeGeo = trackGeo(new THREE.TubeGeometry(curve, 28, crit ? 0.085 : 0.055, 10, false));
      const tube = new THREE.Mesh(tubeGeo, crit ? crimsonMat : darkSteelMat);
      group.add(tube);
      registerExplode(tube, crit ? 1.15 : 0.2);
    });
  }

  return {
    group,
    explodeEntries,
    disposables: { geometries, materials, textures },
  };
}
