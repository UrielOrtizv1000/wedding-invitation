import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2, Check } from "lucide-react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  loading?: boolean;
  success?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, loading = false, success = false, className, children, disabled, ...rest },
  ref
) {
  const classes = [
    styles.button,
    styles[variant],
    size === "sm" ? styles.sm : "",
    loading ? styles.loading : "",
    success ? styles.success : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} className={classes} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {children}
      {icon && !loading && !success && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {success && (
        <span className={styles.icon} aria-hidden="true">
          <Check size={16} strokeWidth={2.5} />
        </span>
      )}
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <Loader2 className={styles.spinnerIcon} size={18} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
});
