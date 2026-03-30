"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
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
const ADMIN_STORAGE_EVENT = "etico-admin-storage";

const AdminContext = createContext<AdminContextValue | null>(null);
let cachedSessionRaw: string | null = null;
let cachedSessionSnapshot: AdminSession | null = null;

function subscribeToAdminStore(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(ADMIN_STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(ADMIN_STORAGE_EVENT, handleChange);
  };
}

function getSessionSnapshot(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const savedSession = window.localStorage.getItem(STORAGE_KEY);

  if (savedSession === cachedSessionRaw) {
    return cachedSessionSnapshot;
  }

  cachedSessionRaw = savedSession;
  cachedSessionSnapshot = savedSession
    ? (JSON.parse(savedSession) as AdminSession)
    : null;

  return cachedSessionSnapshot;
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const savedTheme = window.localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
  return savedTheme ?? "light";
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useSyncExternalStore(
    subscribeToAdminStore,
    () => true,
    () => false,
  );
  const session: AdminSession | null = useSyncExternalStore(
    subscribeToAdminStore,
    getSessionSnapshot,
    () => null,
  );
  const theme: "light" | "dark" = useSyncExternalStore(
    subscribeToAdminStore,
    getThemeSnapshot,
    () => "light",
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    document.documentElement.dataset.adminTheme = theme;
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
      initialized: hydrated,
      theme,
      sidebarCollapsed,
      toasts,
      login: (role) => {
        const nextSession: AdminSession = {
          ...demoSession,
          role: role ?? demoSession.role,
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
        window.dispatchEvent(new Event(ADMIN_STORAGE_EVENT));
        pushToast("Oturum acildi", "Admin paneline hos geldiniz.", "success");
      },
      logout: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event(ADMIN_STORAGE_EVENT));
      },
      setTheme: (nextTheme) => {
        window.localStorage.setItem(THEME_KEY, nextTheme);
        window.dispatchEvent(new Event(ADMIN_STORAGE_EVENT));
      },
      toggleTheme: () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        window.localStorage.setItem(THEME_KEY, nextTheme);
        window.dispatchEvent(new Event(ADMIN_STORAGE_EVENT));
      },
      toggleSidebar: () => setSidebarCollapsed((prev) => !prev),
      pushToast,
      removeToast: (id) => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
    }),
    [hydrated, session, sidebarCollapsed, theme, toasts],
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
