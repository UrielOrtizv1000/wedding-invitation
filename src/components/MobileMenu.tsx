import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { wedding } from "../data/wedding";
import { NAV_ITEMS } from "../data/navigation";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { Monogram } from "./Monogram";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string;
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useMotionSafe();

  useFocusTrap(open, panelRef, { onEscape: onClose });
  useLockBodyScroll(open);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className={styles.panel}
            initial={reduced ? { opacity: 0 } : { x: "100%" }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.header}>
              <Monogram size={30} framed />
              <button className={styles.close} onClick={onClose} aria-label="Cerrar menú">
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            <motion.ul
              className={styles.list}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              variants={reduced ? undefined : listVariants}
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.id}
                  className={[styles.item, activeId === item.id ? styles.itemActive : ""].join(" ")}
                  variants={reduced ? undefined : itemVariants}
                >
                  <a href={`#${item.id}`} onClick={onClose} aria-current={activeId === item.id ? "true" : undefined}>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <p className={styles.footer}>
              {wedding.brideName} &amp; {wedding.groomName}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
