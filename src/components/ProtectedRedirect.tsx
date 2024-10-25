import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  auth,
  children,
  redirectTo = "/",
}: {
  auth: boolean;
  children: ReactNode;
  redirectTo?: string;
}) => {
  if (!auth) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};
