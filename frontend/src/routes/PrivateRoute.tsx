import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { ReactNode } from "react";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = Cookies.get("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
