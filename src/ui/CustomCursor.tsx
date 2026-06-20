import { useEffect } from 'react';
import { Platform } from 'react-native';

/**
 * Animated custom cursor for the website:
 *   • a small solid green dot that tracks the pointer 1:1
 *   • a golden ring that trails with easing and grows over clickable elements
 *
 * Web-only and mouse-only: renders nothing (and touches no DOM) on native or on
 * touch devices, and bows out gracefully if the browser prefers reduced motion.
 */
export function CustomCursor() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    const fine = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;
    if (!fine) return; // touch / no mouse → keep the system cursor

    const reduce =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const style = document.createElement('style');
    style.textContent = `
      * { cursor: none !important; }
      .mg-cur { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 2147483647;
        border-radius: 9999px; transform: translate(-50%, -50%); will-change: transform; }
      .mg-cur-dot { width: 8px; height: 8px; background: #1E7A3D; }
      .mg-cur-ring { width: 34px; height: 34px; border: 2px solid #F5B301;
        transition: width .18s ease, height .18s ease, background-color .18s ease, border-color .18s ease, opacity .25s ease; }
      .mg-cur-ring.is-hover { width: 54px; height: 54px; background: rgba(245,179,1,0.16); border-color: #1E7A3D; }
      .mg-cur-ring.is-down { width: 26px; height: 26px; background: rgba(30,122,61,0.18); }
    `;
    document.head.appendChild(style);

    const dot = document.createElement('div');
    dot.className = 'mg-cur mg-cur-dot';
    const ring = document.createElement('div');
    ring.className = 'mg-cur mg-cur-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      const el = e.target as HTMLElement | null;
      const interactive = !!(el && el.closest('a, button, [role="button"], input, textarea, select, label'));
      ring.classList.toggle('is-hover', interactive);
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');
    const hide = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const show = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // The ring eases toward the pointer for a smooth trailing feel.
    const tick = () => {
      const ease = reduce ? 1 : 0.2;
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      style.remove();
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
