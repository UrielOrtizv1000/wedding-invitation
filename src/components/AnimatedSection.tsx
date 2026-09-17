import { motion, type Variants } from "framer-motion";
import { useMemo, type ElementType, type ReactNode } from "react";
import { useMotionSafe } from "../hooks/useMotionSafe";

type RevealKind = "rise" | "fade" | "scale";

interface AnimatedSectionProps {
  children: ReactNode;
  as?: ElementType;
  kind?: RevealKind;
  delay?: number;
  className?: string;
  id?: string;
  amount?: number;
}

const KIND_VARIANTS: Record<RevealKind, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

const KIND_DURATION: Record<RevealKind, number> = {
  rise: 0.7,
  fade: 0.6,
  scale: 0.7,
};

/** Envoltorio de reveal por scroll, con variedad de movimiento según `kind`. */
export function AnimatedSection({
  children,
  as = "div",
  kind = "rise",
  delay = 0,
  className,
  id,
  amount = 0.25,
}: AnimatedSectionProps) {
  const reduced = useMotionSafe();
  // motion.create() must stay stable across renders of this instance — a fresh
  // component type on every render would make React unmount/remount the whole
  // subtree (losing focus, resetting internal state) on any parent re-render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount }}
      variants={KIND_VARIANTS[kind]}
      transition={{ duration: KIND_DURATION[kind], ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
