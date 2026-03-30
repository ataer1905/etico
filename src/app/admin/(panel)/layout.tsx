"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { SkeletonPanel } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, initialized } = useAdminContext();

  useEffect(() => {
    if (initialized && !session) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [initialized, pathname, router, session]);

  if (!initialized) {
    return (
      <div className="admin-theme min-h-screen bg-[var(--admin-bg)] p-8" data-theme="light">
        <SkeletonPanel />
      </div>
    );
  }

  if (!session) return null;

  return <AdminShell>{children}</AdminShell>;
}

