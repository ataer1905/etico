"use client";

import { useState } from "react";
import { adminCategories } from "@/lib/admin-data";
import { Modal, PageHeader, PanelCard, StatusBadge } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

export default function CategoriesPage() {
  const { pushToast } = useAdminContext();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kategori Yonetimi"
        description="Ana kategori ve alt kategori yapisini, siralama, aktiflik ve SEO alanlariyla birlikte yonetin."
        action={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Yeni Kategori
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
        <PanelCard title="Kategori Agaci" eyebrow={`${adminCategories.length} kategori`}>
          <div className="space-y-3">
            {adminCategories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-4 rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={category.image} alt={category.name} className="h-16 w-16 rounded-2xl border border-[var(--admin-line)] object-cover" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[16px] font-semibold text-[var(--admin-ink)]">{category.name}</p>
                      {category.parent ? <StatusBadge label={`Alt: ${category.parent}`} /> : null}
                    </div>
                    <p className="mt-1 text-[13px] text-[var(--admin-muted)]">/{category.slug}</p>
                    <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">{category.seoDescription}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge label={category.status === "active" ? "Aktif" : "Pasif"} tone={category.status === "active" ? "positive" : "danger"} />
                  <button
                    type="button"
                    onClick={() => pushToast("Kategori duzenlendi", `${category.name} icin sira ve SEO alani guncellendi.`, "success")}
                    className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-ink)]"
                  >
                    Duzenle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="SEO ve Slug Ozetleri" eyebrow="Kategori Detayi">
          <div className="space-y-4">
            {adminCategories.map((category) => (
              <div key={category.id} className="rounded-[20px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">{category.name}</p>
                <p className="mt-3 text-[15px] font-semibold text-[var(--admin-ink)]">{category.seoTitle}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">Slug: /{category.slug}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">Sira No: {category.order}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Yeni kategori olustur"
        description="Slug, aktiflik, ust kategori ve SEO alanlari ile yeni kategori tanimlayin."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]" placeholder="Kategori adi" />
          <input className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]" placeholder="Slug" />
          <input className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]" placeholder="Ust kategori" />
          <input className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]" placeholder="Sira numarasi" />
        </div>
        <textarea className="mt-4 min-h-28 w-full rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]" placeholder="SEO aciklamasi" />
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={() => setModalOpen(false)} className="rounded-2xl border border-[var(--admin-line)] px-4 py-2.5 text-[14px] font-semibold text-[var(--admin-muted)]">
            Vazgec
          </button>
          <button
            type="button"
            onClick={() => {
              pushToast("Kategori olusturuldu", "Yeni kategori demo kategori agacina eklendi.", "success");
              setModalOpen(false);
            }}
            className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Kaydet
          </button>
        </div>
      </Modal>
    </div>
  );
}

