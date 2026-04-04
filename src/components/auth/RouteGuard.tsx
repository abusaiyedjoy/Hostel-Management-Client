// src/components/auth/RouteGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { Role } from "@/redux";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  /** Where to redirect if not authenticated. Defaults to /login */
  redirectTo?: string;
}

export function RouteGuard({
  children,
  allowedRoles,
  redirectTo = "/login",
}: RouteGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, role, getDashboardPath } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }

    if (allowedRoles && role && !allowedRoles.includes(role)) {
      // Wrong role → send to their own dashboard
      router.replace(getDashboardPath());
    }
  }, [
    isAuthenticated,
    isLoading,
    role,
    allowedRoles,
    router,
    redirectTo,
    getDashboardPath,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (allowedRoles && role && !allowedRoles.includes(role)) return null;

  return <>{children}</>;
}
