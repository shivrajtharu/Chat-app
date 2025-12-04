import { createContext, useContext } from "react";

// Types for toast
export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastContextType {
  notify: (msg: string, type?: ToastType) => void;
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastContext;
