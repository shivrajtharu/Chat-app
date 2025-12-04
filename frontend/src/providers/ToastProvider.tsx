import React, { type ReactNode } from "react";
import toast from "react-hot-toast";
import ToastContext, { type ToastType, type ToastContextType } from "../context/ToastContext";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const notify: ToastContextType["notify"] = (msg, type = "default") => {
    const map: Record<ToastType, () => void> = {
      success: () => toast.success(msg),
      error: () => toast.error(msg),
      warning: () => toast(msg, { icon: "⚠️" }),
      info: () => toast(msg, { icon: "ℹ️" }),
      default: () => toast(msg),
    };

    (map[type] || map.default)();
  };

  return (
    <ToastContext.Provider value={{ notify }}>{children}</ToastContext.Provider>
  );
};
