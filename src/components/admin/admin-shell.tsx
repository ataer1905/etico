"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { roleLabels, roleMenuAccess } from "@/lib/admin-data";
import { useAdminContext } from "@/components/admin/admin-context";

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/admin", icon: <GridIcon /> },
  { key: "products", label: "Urunler", href: "/admin/products", icon: <CubeIcon /> },
  { key: "categories", label: "Kategoriler", href: "/admin/categories", icon: <FolderIcon /> },
  { key: "orders", label: "Siparisler", href: "/admin/orders", icon: <CartIcon /> },
  { key: "users", label: "Kullanicilar", href: "/admin/users", icon: <UsersIcon /> },
  { key: "content", label: "Icerikler", href: "/admin/content", icon: <SparklesIcon /> },
  { key: "media", label: "Medya", href: "/admin/media", icon: <ImageIcon /> },
  { key: "settings", label: "Site Ayarlari", href: "/admin/settings", icon: <SettingsIcon /> },
  { key: "reports", label: "Raporlama", href: "/admin/reports", icon: <ChartIcon /> },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    session,
    theme,
    toggleTheme,
    sidebarCollapsed,
    toggleSidebar,
    logout,
    toasts,
    removeToast,
  } = useAdminContext();

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .slice(1)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));

  const allowedMenus = roleMenuAccess[session?.role ?? "order_manager"];

  return (
    <div className="admin-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-ink)]" data-theme={theme}>
      <div className="flex min-h-screen">
        <aside
          className={`sticky top-0 hidden h-screen shrink-0 border-r border-[var(--admin-line)] bg-[var(--admin-sidebar)] px-4 py-5 lg:flex lg:flex-col ${
            sidebarCollapsed ? "w-[96px]" : "w-[288px]"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link href="/admin" className={`overflow-hidden transition-all ${sidebarCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--admin-muted)]">Cagdas Isi</p>
                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[var(--admin-ink)]">Admin Studio</h2>
              </div>
            </Link>
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel)] p-2 text-[var(--admin-muted)]"
            >
              <MenuFoldIcon />
            </button>
          </div>

          <div className="rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel)] p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--admin-accent)] text-sm font-bold text-white">
                {session?.name
                  .split(" ")
                  .map((item) => item[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              {!sidebarCollapsed ? (
                <div>
                  <p className="text-[15px] font-semibold text-[var(--admin-ink)]">{session?.name}</p>
                  <p className="mt-1 text-[13px] text-[var(--admin-muted)]">{roleLabels[session?.role ?? "super_admin"]}</p>
                </div>
              ) : null}
            </div>
          </div>

          <nav className="mt-6 flex-1 space-y-1.5">
            {navItems
              .filter((item) => allowedMenus.includes(item.key))
              .map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-[18px] px-3 py-3 text-[14px] font-medium transition ${
                      active
                        ? "bg-[var(--admin-accent)] text-white shadow-[0_16px_34px_rgba(62,92,118,0.18)]"
                        : "text-[var(--admin-muted)] hover:bg-[var(--admin-panel)] hover:text-[var(--admin-ink)]"
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {!sidebarCollapsed ? <span>{item.label}</span> : null}
                  </Link>
                );
              })}
          </nav>

          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="rounded-[18px] border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-3 text-left text-[14px] font-semibold text-[var(--admin-ink)]"
          >
            {sidebarCollapsed ? "Cik" : "Guvenli Cikis"}
          </button>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[var(--admin-line)] bg-[color:var(--admin-topbar)]/90 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--admin-muted)]">Yonetim Paneli</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px] text-[var(--admin-muted)]">
                  <Link href="/admin" className="hover:text-[var(--admin-ink)]">
                    Dashboard
                  </Link>
                  {crumbs.map((crumb) => (
                    <span key={crumb} className="flex items-center gap-2">
                      <span>/</span>
                      <span className="text-[var(--admin-ink)]">{crumb}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-2.5 text-[14px] font-semibold text-[var(--admin-ink)]"
                >
                  {theme === "light" ? "Koyu Tema" : "Acik Tema"}
                </button>
                <div className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-2.5 text-[14px] font-medium text-[var(--admin-muted)]">
                  {session?.email}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navItems
                .filter((item) => allowedMenus.includes(item.key))
                .map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-[13px] font-semibold transition ${
                        active
                          ? "bg-[var(--admin-accent)] text-white"
                          : "border border-[var(--admin-line)] bg-[var(--admin-panel)] text-[var(--admin-muted)]"
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>

      <div className="pointer-events-none fixed right-5 top-5 z-50 flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-[20px] border bg-[var(--admin-panel)] p-4 shadow-[0_16px_40px_rgba(15,23,42,0.14)] ${
              toast.tone === "success"
                ? "border-emerald-100"
                : toast.tone === "error"
                  ? "border-rose-100"
                  : "border-[var(--admin-line)]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-[var(--admin-ink)]">{toast.title}</p>
                <p className="mt-1 text-[13px] leading-6 text-[var(--admin-muted)]">{toast.message}</p>
              </div>
              <button type="button" onClick={() => removeToast(toast.id)} className="text-[var(--admin-muted)]">
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function baseIcon(path: React.ReactNode) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  );
}

function GridIcon() {
  return baseIcon(
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.4" />
      <rect x="14" y="3" width="7" height="7" rx="1.4" />
      <rect x="3" y="14" width="7" height="7" rx="1.4" />
      <rect x="14" y="14" width="7" height="7" rx="1.4" />
    </>,
  );
}

function CubeIcon() {
  return baseIcon(
    <>
      <path d="m12 3 8 4.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="m12 12 8-4.5" />
      <path d="m12 12-8-4.5" />
      <path d="M12 12v9" />
    </>,
  );
}

function FolderIcon() {
  return baseIcon(
    <>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-10Z" />
    </>,
  );
}

function CartIcon() {
  return baseIcon(
    <>
      <path d="M3 5h2l1.4 8.1a2 2 0 0 0 2 1.67h7.9a2 2 0 0 0 2-1.55L20 7H7" />
      <circle cx="10" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>,
  );
}

function UsersIcon() {
  return baseIcon(
    <>
      <path d="M16 21v-1.2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V21" />
      <circle cx="10" cy="8" r="3" />
      <path d="M22 21v-1.2a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a3 3 0 0 1 0 5.74" />
    </>,
  );
}

function SparklesIcon() {
  return baseIcon(
    <>
      <path d="M12 3 13.8 8.2 19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 3 .8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8L19 3Z" />
    </>,
  );
}

function ImageIcon() {
  return baseIcon(
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.4" />
      <path d="m21 15-4.5-4.5L7 20" />
    </>,
  );
}

function SettingsIcon() {
  return baseIcon(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.5 1.5 0 0 0 .3 1.65l.05.05a1.8 1.8 0 0 1 0 2.54 1.8 1.8 0 0 1-2.54 0l-.05-.05a1.5 1.5 0 0 0-1.65-.3 1.5 1.5 0 0 0-.9 1.38V21a1.8 1.8 0 0 1-3.6 0v-.07a1.5 1.5 0 0 0-.98-1.4 1.5 1.5 0 0 0-1.64.32l-.05.05a1.8 1.8 0 0 1-2.54 0 1.8 1.8 0 0 1 0-2.54l.05-.05a1.5 1.5 0 0 0 .3-1.65 1.5 1.5 0 0 0-1.38-.9H3a1.8 1.8 0 0 1 0-3.6h.07a1.5 1.5 0 0 0 1.4-.98 1.5 1.5 0 0 0-.32-1.64l-.05-.05a1.8 1.8 0 0 1 0-2.54 1.8 1.8 0 0 1 2.54 0l.05.05a1.5 1.5 0 0 0 1.65.3H8.4a1.5 1.5 0 0 0 .9-1.38V3a1.8 1.8 0 0 1 3.6 0v.07a1.5 1.5 0 0 0 .98 1.4 1.5 1.5 0 0 0 1.64-.32l.05-.05a1.8 1.8 0 0 1 2.54 0 1.8 1.8 0 0 1 0 2.54l-.05.05a1.5 1.5 0 0 0-.3 1.65v.06a1.5 1.5 0 0 0 1.38.9H21a1.8 1.8 0 0 1 0 3.6h-.07a1.5 1.5 0 0 0-1.4.98L19.4 15Z" />
    </>,
  );
}

function ChartIcon() {
  return baseIcon(
    <>
      <path d="M4 19h16" />
      <path d="M7 16V9" />
      <path d="M12 16V5" />
      <path d="M17 16v-6" />
    </>,
  );
}

function MenuFoldIcon() {
  return baseIcon(
    <>
      <path d="M4 7h12" />
      <path d="M4 12h12" />
      <path d="M4 17h12" />
      <path d="m20 8-3 4 3 4" />
    </>,
  );
}
