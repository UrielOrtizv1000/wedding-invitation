import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionSafe } from "../hooks/useMotionSafe";
import type { WeddingImage } from "../data/images";
import { ImageWithLoader } from "./ImageWithLoader";
import styles from "./ParallaxImage.module.css";

interface ParallaxImageProps {
  image: WeddingImage;
  strength?: number;
  eager?: boolean;
  reveal?: boolean;
  curtainColor?: string;
}

/**
 * Imagen con parallax vertical continuo ligado al scroll (no solo animación
 * de entrada) y, opcionalmente, una cortina que se retira al entrar en
 * viewport (`reveal`). Se espera un padre con aspect-ratio/overflow ya
 * definidos (imageBox de cada sección).
 */
export function ParallaxImage({
  image,
  strength = 10,
  eager = false,
  reveal = true,
  curtainColor,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={styles.frame}>
      <motion.div className={styles.layer} style={{ y }}>
        <ImageWithLoader src={image.src} alt={image.alt} objectPosition={image.objectPosition} eager={eager} />
      </motion.div>
      {reveal && !reduced && (
        <motion.div
          className={styles.curtain}
          style={curtainColor ? { background: curtainColor } : undefined}
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
