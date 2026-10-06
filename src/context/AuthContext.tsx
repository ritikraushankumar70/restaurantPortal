"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface User {
  username: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (loginId: string, password?: string) => void;
  register: (phone: string, email: string, password?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      // No persistence as requested: User logs out on refresh
      setIsLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          username: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
          email: session.user.email || ""
        });
      } else {
        // Automatically reset user if no session
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Don't apply customer auth logic to admin routes and advanced feature routes
      const adminRoutes = ["/admin", "/api/admin", "/menu", "/tables", "/offers", "/reviews", "/settings", "/orders", "/payouts"];
      if (adminRoutes.some(route => pathname.startsWith(route))) {
        return;
      }
      
      if (!user && pathname !== "/auth") {
        router.push("/auth");
      } else if (user && pathname === "/auth") {
        router.push("/home");
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = (loginId: string, password?: string) => {
    const registeredUsers = JSON.parse(localStorage.getItem("mock_users") || "[]");
    
    const normalizedLoginId = loginId.trim();
    const numericPhone = normalizedLoginId.replace(/\D/g, '');
    
    let existingUser = registeredUsers.find((u: any) => 
      u.phone === normalizedLoginId || 
      (numericPhone && u.phone === numericPhone) ||
      (u.email && u.email.toLowerCase() === normalizedLoginId.toLowerCase())
    );
    
    if (!existingUser) {
      const oldRegisteredEmails = JSON.parse(localStorage.getItem("mock_registered_users") || "[]");
      if (oldRegisteredEmails.includes(normalizedLoginId)) {
        existingUser = { email: normalizedLoginId, phone: "" };
      } else {
        throw new Error("Account not found. Please sign up first.");
      }
    }
    
    if (password && existingUser.password && existingUser.password !== password) {
      throw new Error("Invalid password.");
    }
    
    const newUser = { 
      username: existingUser.email ? existingUser.email.split("@")[0] : "User", 
      email: existingUser.email || "",
      phone: existingUser.phone || ""
    };
    setUser(newUser);
    // User persistence removed to force logout on refresh
    
    const isAdmin = newUser.email === "admin@restaurant.com" || newUser.email.toLowerCase().includes("admin");
    router.push(isAdmin ? "/" : "/home");
  };

  const register = (phone: string, email: string, password?: string) => {
    const registeredUsers = JSON.parse(localStorage.getItem("mock_users") || "[]");
    
    const oldRegisteredEmails = JSON.parse(localStorage.getItem("mock_registered_users") || "[]");
    
    if (phone && registeredUsers.some((u: any) => u.phone === phone)) {
      throw new Error("This Mobile Number is already registered. Please log in.");
    }
    if (email && (registeredUsers.some((u: any) => u.email === email) || oldRegisteredEmails.includes(email))) {
      throw new Error("This Email ID is already registered. Please log in.");
    }
    
    const newUserRecord = { phone, email, password };
    registeredUsers.push(newUserRecord);
    localStorage.setItem("mock_users", JSON.stringify(registeredUsers));
    
    const sessionUser = { 
      username: email ? email.split("@")[0] : "User", 
      email, 
      phone 
    };
    setUser(sessionUser);
    // User persistence removed to force logout on refresh
    
    const isAdmin = sessionUser.email === "admin@restaurant.com" || sessionUser.email.toLowerCase().includes("admin");
    router.push(isAdmin ? "/" : "/home");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
