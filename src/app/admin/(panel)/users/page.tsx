"use client";

import { adminUsers, roleLabels } from "@/lib/admin-data";
import { PageHeader, PanelCard, StatusBadge } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

export default function UsersPage() {
  const { pushToast } = useAdminContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kullanicilar ve Yetki"
        description="Admin rollerini, son gorulme bilgisini ve menu bazli erisim kurgusunu bu ekran uzerinden yonetin."
      />

      <PanelCard title="Admin Kullanici Listesi" eyebrow={`${adminUsers.length} yonetici hesabi`}>
        <div className="space-y-3">
          {adminUsers.map((user) => (
            <div key={user.id} className="flex flex-col gap-4 rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--admin-accent)] text-sm font-bold text-white">
                  {user.name
                    .split(" ")
                    .map((item) => item[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[var(--admin-ink)]">{user.name}</p>
                  <p className="mt-1 text-[13px] text-[var(--admin-muted)]">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge label={roleLabels[user.role]} />
                <StatusBadge label={user.status === "active" ? "Aktif" : user.status === "invited" ? "Davetli" : "Pasif"} tone={user.status === "active" ? "positive" : user.status === "invited" ? "warning" : "danger"} />
                <span className="text-[13px] text-[var(--admin-muted)]">{user.lastSeen}</span>
                <button
                  type="button"
                  onClick={() => pushToast("Yetki guncellendi", `${user.name} icin rol matrisi acildi.`, "info")}
                  className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-ink)]"
                >
                  Yetki Duzenle
                </button>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

