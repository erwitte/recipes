import { Navigate } from 'react-router-dom';
import type { AuthUser } from 'aws-amplify/auth';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  user: AuthUser | null;
  children: ReactNode;
}

export function ProtectedRoute({
  user,
  children,
}: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
