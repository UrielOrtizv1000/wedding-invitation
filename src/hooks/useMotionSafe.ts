import { useReducedMotion } from "framer-motion";

/** true cuando el usuario pidió prefers-reduced-motion: reduce. */
export function useMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
