import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = Cookies.get("token");
  if (token) return <Navigate to="/chat" replace />;
  return children;
};
