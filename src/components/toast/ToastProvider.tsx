import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ToastContext } from "./ToastContext";
import { Toast } from "./Toast";
import type { ToastItem, ToastType } from "./types";
import styles from "./Toast.module.css";

const DEFAULT_DURATION: Record<ToastType, number> = {
  success: 3000,
  error: 3600,
  info: 2600,
  loading: 0,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, number>());

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, durationMs?: number) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((current) => [...current, { id, type, message }]);

      const duration = durationMs ?? DEFAULT_DURATION[type];
      if (duration > 0) {
        const timer = window.setTimeout(() => dismissToast(id), duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className={styles.viewport}>
          <AnimatePresence initial={false}>
            {toasts.map((toast) => (
              <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
