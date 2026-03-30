"use client";

import { adminMedia } from "@/lib/admin-data";
import { EmptyState, PageHeader, PanelCard } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

export default function MediaPage() {
  const { pushToast } = useAdminContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Medya Kutuphanesi"
        description="Gorsel listeleme, yeniden adlandirma, kullanim onizlemesi ve yukleme deneyimi icin merkezi medya yonetimi."
      />

      <PanelCard
        title="Gorsel Arsivi"
        action={
          <button
            type="button"
            onClick={() => pushToast("Gorsel yukleme", "Yeni dosyalar medya kutuphanesine yuklendi.", "success")}
            className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Gorsel Yukle
          </button>
        }
      >
        {adminMedia.length === 0 ? (
          <EmptyState title="Medya bos" description="Yuklenen tum dosyalar burada listelenir." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {adminMedia.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.name} className="h-44 w-full border-b border-[var(--admin-line)] object-cover" />
                <div className="p-4">
                  <p className="text-[15px] font-semibold text-[var(--admin-ink)]">{item.name}</p>
                  <p className="mt-2 text-[13px] text-[var(--admin-muted)]">Kullanim: {item.usedIn}</p>
                  <p className="mt-1 text-[13px] text-[var(--admin-muted)]">{item.size} • {item.date}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => pushToast("Yeniden adlandirildi", `${item.name} icin ad duzenleme acildi.`, "info")}
                      className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-ink)]"
                    >
                      Yeniden Adlandir
                    </button>
                    <button
                      type="button"
                      onClick={() => pushToast("Dosya silindi", `${item.name} arsivden kaldirildi.`, "error")}
                      className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-muted)]"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  );
}

