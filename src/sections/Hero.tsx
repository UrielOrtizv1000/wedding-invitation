import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { heroImage } from "../data/images";
import { wedding } from "../data/wedding";
import styles from "./Hero.module.css";

function formatHeroDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("es-MX", { month: "short" }).replace(".", "").toUpperCase();
  const year = date.getFullYear();
  return `${day} · ${month} · ${year}`;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionSafe();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "14%"]);

  return (
    <section id="inicio" ref={ref} className={styles.hero} aria-label="Portada de la invitación">
      <motion.div className={styles.imageLayer} style={{ y }}>
        <ImageWithLoader src={heroImage.src} alt={heroImage.alt} objectPosition={heroImage.objectPosition} eager />
      </motion.div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          Nos casamos
        </motion.span>
        <motion.h1
          className={styles.names}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        >
          {wedding.brideName} &amp; {wedding.groomName}
        </motion.h1>
        <motion.div
          className={styles.meta}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
        >
          <span>{formatHeroDate(wedding.weddingDate)}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>{wedding.city}</span>
        </motion.div>
      </div>

      <a href="#historia" className={styles.scrollCue} aria-label="Deslizar hacia la siguiente sección">
        <span className={styles.scrollLabel}>Desliza para continuar</span>
        <ChevronDown className={styles.scrollIcon} size={18} strokeWidth={1.75} />
      </a>
    </section>
  );
}
