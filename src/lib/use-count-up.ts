import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 800;

// IntersectionObserver-triggered count-up (800ms cubic ease-out).
// Starts at 0 during SSR to avoid hydration mismatch and falls back to the
// final target when IntersectionObserver is unavailable.
export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(() =>
    typeof window !== 'undefined' && !('IntersectionObserver' in window) ? target : 0
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            io.disconnect();
            const startTime = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / DURATION_MS, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(element);
    return () => io.disconnect();
  }, [target]);

  return { ref, value };
}
