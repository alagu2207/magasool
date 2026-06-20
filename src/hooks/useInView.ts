import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Reports when an element scrolls into the viewport.
 * On web it uses IntersectionObserver; on native (no scroll-position API here)
 * it simply reports `true` after mount so content is never left hidden.
 *
 * Attach the returned `ref` to a host component (View / Text / Animated.View).
 */
export function useInView(threshold = 0.15) {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(Platform.OS !== 'web');

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const node = ref.current;
    // react-native-web resolves host refs to DOM nodes; bail safely otherwise.
    if (!node || node.nodeType !== 1) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
