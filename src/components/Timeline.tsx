import { motion } from "framer-motion";
import { useRef } from "react";
import type { TimelineStoryEvent } from "../data/types";
import { useMotionSafe } from "../hooks/useMotionSafe";
import styles from "./Timeline.module.css";

interface TimelineProps {
  events: TimelineStoryEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.timeline} ref={ref}>
      <div className={styles.line}>
        <motion.div
          className={styles.lineFill}
          initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {events.map((event, index) => (
        <motion.div
          key={event.year}
          className={styles.event}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
        >
          <span className={styles.dot} aria-hidden="true" />
          <p className={styles.year}>{event.year}</p>
          <p className={styles.title}>{event.title}</p>
          <p className={styles.description}>{event.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
