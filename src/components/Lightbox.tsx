import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { useSwipe } from "../hooks/useSwipe";
import type { WeddingImage } from "../data/images";
import { ImageWithLoader } from "./ImageWithLoader";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  images: WeddingImage[];
  index: number;
  onNavigate: (index: number) => void;
}

export function Lightbox({ open, onClose, images, index, onNavigate }: LightboxProps) {
  const reduced = useMotionSafe();
  const stageRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  const next = () => onNavigate((index + 1) % count);
  const prev = () => onNavigate((index - 1 + count) % count);
  const swipe = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  useFocusTrap(open, stageRef, { onEscape: onClose });
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const preload = (i: number) => {
      const img = new Image();
      img.src = images[(i + count) % count].src;
    };
    preload(index + 1);
    preload(index - 1);
  }, [open, index, images, count]);

  const current = images[index];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div
            ref={stageRef}
            className={styles.stage}
            role="dialog"
            aria-modal="true"
            aria-label="Visor de fotografías"
            tabIndex={-1}
            onTouchStart={swipe.onTouchStart}
            onTouchEnd={swipe.onTouchEnd}
          >
            <button className={styles.close} onClick={onClose} aria-label="Cerrar visor">
              <X size={22} strokeWidth={1.75} />
            </button>
            <span className={styles.counter}>
              {index + 1} / {count}
            </span>

            <div className={styles.imageWrap}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <ImageWithLoader src={current.src} alt={current.alt} objectPosition="center" eager />
                </motion.div>
              </AnimatePresence>
            </div>

            <button className={[styles.navButton, styles.prev].join(" ")} onClick={prev} aria-label="Fotografía anterior">
              <ChevronLeft size={22} strokeWidth={1.75} />
            </button>
            <button className={[styles.navButton, styles.next].join(" ")} onClick={next} aria-label="Fotografía siguiente">
              <ChevronRight size={22} strokeWidth={1.75} />
            </button>

            <p className={styles.caption}>{current.alt}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
