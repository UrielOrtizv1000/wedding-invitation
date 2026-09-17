import { useRef, type TouchEvent } from "react";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeBindings {
  onTouchStart: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}

const SWIPE_THRESHOLD = 45;

/** Bindings mínimos de swipe horizontal para carrusel/lightbox en móvil. */
export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers): SwipeBindings {
  const startX = useRef(0);

  return {
    onTouchStart: (event) => {
      startX.current = event.touches[0]?.clientX ?? 0;
    },
    onTouchEnd: (event) => {
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const delta = endX - startX.current;
      if (delta <= -SWIPE_THRESHOLD) onSwipeLeft?.();
      else if (delta >= SWIPE_THRESHOLD) onSwipeRight?.();
    },
  };
}
