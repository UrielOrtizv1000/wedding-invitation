import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionSafe } from "../hooks/useMotionSafe";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
}

export function SectionHeading({ title, subtitle, align = "left", id }: SectionHeadingProps) {
  const reduced = useMotionSafe();

  return (
    <div className={[styles.wrap, align === "center" ? styles.center : ""].join(" ")}>
      <motion.h2
        id={id}
        className={styles.title}
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={styles.subtitle}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
