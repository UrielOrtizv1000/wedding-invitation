import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
  count: number;
  autoplayMs?: number;
  reducedMotion?: boolean;
}

export interface CarouselControls {
  index: number;
  direction: 1 | -1;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  isPlaying: boolean;
  togglePlaying: () => void;
}

/** Estado de carrusel con autoplay pausable y dirección para la transición. */
export function useCarousel({ count, autoplayMs = 5000, reducedMotion = false }: UseCarouselOptions): CarouselControls {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(!reducedMotion);
  const timerRef = useRef<number | undefined>(undefined);

  const goTo = useCallback(
    (target: number) => {
      setDirection(target > index || (index === count - 1 && target === 0) ? 1 : -1);
      setIndex(((target % count) + count) % count);
    },
    [count, index]
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((current) => (current + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((current) => (current - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    timerRef.current = window.setInterval(next, autoplayMs);
    return () => window.clearInterval(timerRef.current);
  }, [isPlaying, reducedMotion, autoplayMs, next]);

  const togglePlaying = useCallback(() => setIsPlaying((p) => !p), []);

  return { index, direction, goTo, next, prev, isPlaying, togglePlaying };
}
