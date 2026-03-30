"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoSession, type AdminRole, type AdminSession } from "@/lib/admin-data";

type ToastTone = "success" | "error" | "info";

type ToastItem = {
  id: number;
  title: string;
  message: string;
  tone: ToastTone;
};

type AdminContextValue = {
  session: AdminSession | null;
  initialized: boolean;
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
  toasts: ToastItem[];
  login: (role?: AdminRole) => void;
  logout: () => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  pushToast: (title: string, message: string, tone?: ToastTone) => void;
  removeToast: (id: number) => void;
};

const STORAGE_KEY = "etico_admin_session";
const THEME_KEY = "etico_admin_theme";

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => {
    if (typeof window === "undefined") return null;
    const savedSession = window.localStorage.getItem(STORAGE_KEY);
    return savedSession ? (JSON.parse(savedSession) as AdminSession) : null;
  });
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    return savedTheme ?? "light";
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const initialized = typeof window !== "undefined";

  useEffect(() => {
    document.documentElement.dataset.adminTheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const pushToast = (title: string, message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.floor(Math.random() * 999);
    setToasts((prev) => [...prev, { id, title, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3600);
  };

  const value = useMemo<AdminContextValue>(
    () => ({
      session,
      initialized,
      theme,
      sidebarCollapsed,
      toasts,
      login: (role) => {
        const nextSession: AdminSession = {
          ...demoSession,
          role: role ?? demoSession.role,
        };
        setSession(nextSession);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
        pushToast("Oturum acildi", "Admin paneline hos geldiniz.", "success");
      },
      logout: () => {
        setSession(null);
        window.localStorage.removeItem(STORAGE_KEY);
      },
      setTheme: (nextTheme) => setThemeState(nextTheme),
      toggleTheme: () => setThemeState((prev) => (prev === "light" ? "dark" : "light")),
      toggleSidebar: () => setSidebarCollapsed((prev) => !prev),
      pushToast,
      removeToast: (id) => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
    }),
    [initialized, session, sidebarCollapsed, theme, toasts],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within AdminProvider");
  }
  return context;
}
