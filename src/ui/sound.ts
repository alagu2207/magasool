import { Platform } from 'react-native';

/**
 * Tiny Web Audio sound engine — synthesises crisp UI sounds on the fly, so there
 * are no audio asset files to bundle. Web-only: every export is a safe no-op on
 * native (and when the browser blocks audio), so callers never need a guard.
 */

// Loosely typed so this file compiles regardless of the DOM lib config and never
// pulls Web Audio types into the native build.
let ctx: any = null;
let muted = false;

function getCtx(): any {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    // Browsers start the context suspended until a user gesture; clicks resume it.
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  } catch {
    return null;
  }
}

type ToneOpts = {
  freq: number;
  duration: number;
  type?: string;
  gain?: number;
  delay?: number;
  slideTo?: number;
};

function tone({ freq, duration, type = 'sine', gain = 0.06, delay = 0, slideTo }: ToneOpts) {
  const ac = getCtx();
  if (!ac) return;
  try {
    const t0 = ac.currentTime + delay;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
    // Quick attack, smooth exponential decay so nothing clicks/pops.
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  } catch {
    /* ignore — audio is a non-critical enhancement */
  }
}

export const sound = {
  setMuted(v: boolean) {
    muted = v;
  },
  isMuted() {
    return muted;
  },

  /** Soft, short click for taps / buttons. */
  click() {
    if (muted) return;
    tone({ freq: 430, slideTo: 300, duration: 0.07, type: 'triangle', gain: 0.05 });
  },

  /** Airy upward "whoosh" when a form / next step opens. */
  open() {
    if (muted) return;
    tone({ freq: 280, slideTo: 640, duration: 0.2, type: 'sine', gain: 0.045 });
  },

  /** Bright rising arpeggio (C–E–G–C) on a successful submit. */
  success() {
    if (muted) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone({ freq: f, duration: 0.2, type: 'triangle', gain: 0.05, delay: i * 0.09 }),
    );
  },
};
