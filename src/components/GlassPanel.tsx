import type { HTMLAttributes, ReactNode } from "react";
import styles from "./GlassPanel.module.css";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: "light" | "dark";
}

export function GlassPanel({ children, tone = "light", className, ...rest }: GlassPanelProps) {
  const classes = [styles.panel, tone === "dark" ? styles.dark : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
