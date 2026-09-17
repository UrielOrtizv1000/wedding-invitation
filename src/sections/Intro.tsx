import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monogram } from "../components/Monogram";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { wedding } from "../data/wedding";
import styles from "./Intro.module.css";

function formatShortDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} · ${month} · ${year}`;
}

interface IntroProps {
  onDone: () => void;
}

export function Intro({ onDone }: IntroProps) {
  const [visible, setVisible] = useState(true);
  const reduced = useMotionSafe();

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      onDone();
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 1600);
    return () => window.clearTimeout(timer);
  }, [reduced, onDone]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className={styles.intro}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Monogram size={72} framed />
          </motion.div>
          <motion.span
            className={styles.date}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            {formatShortDate(wedding.weddingDate)}
          </motion.span>
          <button className={styles.skip} onClick={() => setVisible(false)}>
            Saltar introducción
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
