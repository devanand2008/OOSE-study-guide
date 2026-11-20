// Manual 16kHz PCM encoding and 24kHz PCM gapless playback utilities for Gemini Live API

export function float32ToPcm16Base64(float32: Float32Array): string {
  const pcm16 = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const clamped = Math.max(-1, Math.min(1, float32[i]));
    pcm16[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
  }
  const bytes = new Uint8Array(pcm16.buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export function pcm24Base64ToFloat32(base64: string): Float32Array {
  const binary = atob(base64);
  const byteLength = binary.length;
  const bytes = new Uint8Array(byteLength);
  for (let i = 0; i < byteLength; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const view = new DataView(bytes.buffer);
  const sampleCount = Math.floor(byteLength / 2);
  const floats = new Float32Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    floats[i] = view.getInt16(i * 2, true) / 32768;
  }
  return floats;
}

export class GaplessPcmPlayer {
  private ctx: AudioContext | null = null;
  private nextStartTime = 0;
  private activeSources: Set<AudioBufferSourceNode> = new Set();

  public ensureContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContext({ sampleRate: 24000 });
      this.nextStartTime = this.ctx.currentTime;
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public enqueueBase64Pcm(base64Pcm: string): void {
    const ctx = this.ensureContext();
    const samples = pcm24Base64ToFloat32(base64Pcm);
    if (samples.length === 0) return;

    const buffer = ctx.createBuffer(1, samples.length, 24000);
    buffer.getChannelData(0).set(samples);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    const startTime = Math.max(ctx.currentTime + 0.01, this.nextStartTime);
    source.start(startTime);
    this.nextStartTime = startTime + buffer.duration;

    this.activeSources.add(source);
    source.onended = () => {
      this.activeSources.delete(source);
    };
  }

  public interrupt(): void {
    for (const src of this.activeSources) {
      try {
        src.stop();
      } catch {
        // Already stopped
      }
    }
    this.activeSources.clear();
    if (this.ctx) {
      this.nextStartTime = this.ctx.currentTime;
    }
  }

  public dispose(): void {
    this.interrupt();
    if (this.ctx && this.ctx.state !== 'closed') {
      void this.ctx.close();
    }
    this.ctx = null;
  }
}
