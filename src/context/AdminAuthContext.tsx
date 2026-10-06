"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  // We use purely in-memory state for admin auth.
  // This ensures that on any full page refresh or browser switch, 
  // the state is lost and the user is forced to log in again.
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const adminProtectedRoutes = [
        "/admin/dashboard", 
        "/menu", 
        "/tables", 
        "/offers", 
        "/reviews", 
        "/settings", 
        "/orders", 
        "/payouts"
      ];
      
      const isProtectedRoute = adminProtectedRoutes.some(route => 
        pathname === route || pathname.startsWith(route + "/")
      );
      
      if ((isProtectedRoute || pathname === "/admin") && !isAdminAuthenticated) {
        router.push("/admin/login");
      }
    }
  }, [isAdminAuthenticated, isLoading, pathname, router]);

  const loginAdmin = () => {
    setIsAdminAuthenticated(true);
    router.push("/admin/dashboard");
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    router.push("/admin/login");
  };

  useEffect(() => {
    // Log out user when they switch tabs or minimize/unfocus the browser window
    const handleVisibilityChange = () => {
      if (document.hidden && isAdminAuthenticated) {
        setIsAdminAuthenticated(false);
        router.push("/admin/login");
      }
    };

    const handleWindowBlur = () => {
      if (isAdminAuthenticated) {
        setIsAdminAuthenticated(false);
        router.push("/admin/login");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isAdminAuthenticated, router]);

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, loginAdmin, logoutAdmin, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
