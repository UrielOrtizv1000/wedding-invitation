import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { Lightbox } from "../components/Lightbox";
import { SectionHeading } from "../components/SectionHeading";
import { useCarousel } from "../hooks/useCarousel";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { useSwipe } from "../hooks/useSwipe";
import { galleryImages } from "../data/images";
import styles from "./Gallery.module.css";

export function Gallery() {
  const reduced = useMotionSafe();
  const { index, direction, goTo, next, prev, isPlaying, togglePlaying } = useCarousel({
    count: galleryImages.length,
    autoplayMs: 5500,
    reducedMotion: reduced,
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const swipe = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [0.96, 1, 0.96]);

  useEffect(() => {
    const preload = (i: number) => {
      const img = new Image();
      img.src = galleryImages[(i + galleryImages.length) % galleryImages.length].src;
    };
    preload(index + 1);
    preload(index - 1);
  }, [index]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  };

  const current = galleryImages[index];

  return (
    <section id="galeria" className={[styles.section, "section-pad"].join(" ")} aria-labelledby="gallery-heading">
      <div className="container">
        <SectionHeading id="gallery-heading" title="Galería" subtitle="Una probadita de lo que este día promete ser." align="center" />

        <motion.div
          ref={stageRef}
          className={styles.stage}
          style={{ scale: stageScale }}
          tabIndex={0}
          role="group"
          aria-roledescription="carrusel"
          aria-label={`Galería de fotografías, imagen ${index + 1} de ${galleryImages.length}`}
          onKeyDown={handleKeyDown}
          onTouchStart={swipe.onTouchStart}
          onTouchEnd={swipe.onTouchEnd}
        >
          <div className={styles.slideTrack}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 46 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -46 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <button className={styles.slideButton} onClick={() => setLightboxOpen(true)} aria-label="Abrir fotografía en pantalla completa">
                  <ImageWithLoader src={current.src} alt={current.alt} objectPosition={current.objectPosition} eager />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <span className={styles.counter}>
            {index + 1} / {galleryImages.length}
          </span>

          <div className={styles.controls}>
            <button className={styles.navButton} onClick={prev} aria-label="Fotografía anterior">
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button className={styles.navButton} onClick={next} aria-label="Fotografía siguiente">
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </div>

          <button className={styles.playToggle} onClick={togglePlaying} aria-pressed={isPlaying}>
            {isPlaying ? <Pause size={13} strokeWidth={2.5} /> : <Play size={13} strokeWidth={2.5} />}
            {isPlaying ? "Pausar" : "Reproducir"}
          </button>
        </motion.div>

        <div className={styles.dots} role="tablist" aria-label="Seleccionar fotografía">
          {galleryImages.map((image, i) => (
            <button
              key={image.src}
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir a la fotografía ${i + 1}`}
              className={[styles.dot, i === index ? styles.dotActive : ""].join(" ")}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className={styles.thumbs}>
          {galleryImages.map((image, i) => (
            <button
              key={image.src}
              className={[styles.thumb, i === index ? styles.thumbActive : ""].join(" ")}
              onClick={() => goTo(i)}
              aria-label={`Ver fotografía ${i + 1}: ${image.alt}`}
              aria-current={i === index ? "true" : undefined}
            >
              <ImageWithLoader src={image.src} alt="" objectPosition={image.objectPosition} />
            </button>
          ))}
        </div>
      </div>

      <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} images={galleryImages} index={index} onNavigate={goTo} />
    </section>
  );
}
