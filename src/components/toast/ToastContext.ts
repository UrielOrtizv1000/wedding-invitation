import { createContext } from "react";
import type { ToastType } from "./types";

export interface ToastContextValue {
  showToast: (type: ToastType, message: string, durationMs?: number) => string;
  dismissToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
