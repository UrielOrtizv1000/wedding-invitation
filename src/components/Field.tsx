import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useId, type ReactNode } from "react";
import styles from "./Field.module.css";

interface FieldProps {
  label: string;
  error?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {children({ id, describedBy: error ? errorId : undefined, invalid: Boolean(error) })}
      {error && (
        <motion.span
          id={errorId}
          role="alert"
          className={styles.error}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <AlertCircle size={13} strokeWidth={2.2} />
          {error}
        </motion.span>
      )}
    </div>
  );
}
