import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { Monogram } from "../components/Monogram";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { footerImage } from "../data/images";
import { wedding } from "../data/wedding";
import styles from "./Footer.module.css";

function formatFooterDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} · ${month} · ${year}`;
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "0%"]);

  return (
    <footer ref={ref} className={styles.footer}>
      <motion.div className={styles.imageLayer} style={{ y }}>
        <ImageWithLoader src={footerImage.src} alt={footerImage.alt} objectPosition={footerImage.objectPosition} />
      </motion.div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <Monogram size={40} tone="light" framed />
        <p className={styles.names}>
          {wedding.brideName} &amp; {wedding.groomName}
        </p>
        <p className={styles.date}>{formatFooterDate(wedding.weddingDate)}</p>
        <p className={styles.closing}>Nos vemos en el gran día.</p>

        {wedding.socialLinks.length > 0 && (
          <nav className={styles.social} aria-label="Redes sociales">
            {wedding.socialLinks.map((link) => (
              <a key={link.id} href={link.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
