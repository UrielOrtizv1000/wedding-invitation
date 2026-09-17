import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, Loader2, X } from "lucide-react";
import type { ToastItem } from "./types";
import styles from "./Toast.module.css";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  loading: Loader2,
};

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = ICONS[toast.type];

  return (
    <motion.div
      layout
      role="status"
      aria-live="polite"
      className={[styles.toast, styles[toast.type]].join(" ")}
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon size={18} className={toast.type === "loading" ? undefined : undefined} strokeWidth={2.2} />
      </span>
      <span className={styles.message}>{toast.message}</span>
      {toast.type !== "loading" && (
        <button className={styles.close} onClick={() => onDismiss(toast.id)} aria-label="Cerrar notificación">
          <X size={14} strokeWidth={2.2} />
        </button>
      )}
    </motion.div>
  );
}
