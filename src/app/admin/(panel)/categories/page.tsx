"use client";

import { useMemo, useState } from "react";
import type { AdminCategory } from "@/lib/admin-data";
import { useCatalogStore, saveCatalogCategories } from "@/lib/catalog-store";
import { Modal, PageHeader, PanelCard, StatusBadge } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

const emptyCategory: AdminCategory = {
  id: "",
  name: "",
  slug: "",
  parent: undefined,
  image: "",
  order: 1,
  status: "active",
  seoTitle: "",
  seoDescription: "",
};

export default function CategoriesPage() {
  const { pushToast } = useAdminContext();
  const { categories } = useCatalogStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory>(emptyCategory);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories],
  );

  const openCreateModal = () => {
    setEditingCategory({
      ...emptyCategory,
      id: `cat_${Date.now()}`,
      order: categories.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (category: AdminCategory) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const saveCategory = () => {
    const normalized: AdminCategory = {
      ...editingCategory,
      slug:
        editingCategory.slug ||
        editingCategory.name
          .toLowerCase()
          .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s-]/gi, "")
          .trim()
          .replace(/\s+/g, "-"),
      seoTitle: editingCategory.seoTitle || `${editingCategory.name} | Etico`,
    };

    const exists = categories.some((category) => category.id === normalized.id);
    const nextCategories = exists
      ? categories.map((category) =>
          category.id === normalized.id ? normalized : category,
        )
      : [...categories, normalized];

    saveCatalogCategories(nextCategories);
    setModalOpen(false);
    pushToast(
      exists ? "Kategori guncellendi" : "Kategori olusturuldu",
      `${normalized.name} anasayfa kategori akisina baglandi.`,
      "success",
    );
  };

  const toggleStatus = (category: AdminCategory) => {
    saveCatalogCategories(
      categories.map((item) =>
        item.id === category.id
          ? {
              ...item,
              status: item.status === "active" ? "passive" : "active",
            }
          : item,
      ),
    );
    pushToast("Kategori durumu guncellendi", `${category.name} durumu degistirildi.`, "info");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kategori Yonetimi"
        description="Bu ekrandaki aktif ana kategoriler anasayfa kategori satiri ve urun bloklarini dogrudan besler."
        action={
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Yeni Kategori
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
        <PanelCard title="Kategori Agaci" eyebrow={`${sortedCategories.length} kategori`}>
          <div className="space-y-3">
            {sortedCategories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-4 rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-16 w-16 rounded-2xl border border-[var(--admin-line)] object-cover"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[16px] font-semibold text-[var(--admin-ink)]">
                        {category.name}
                      </p>
                      {category.parent ? <StatusBadge label={`Alt: ${category.parent}`} /> : null}
                    </div>
                    <p className="mt-1 text-[13px] text-[var(--admin-muted)]">
                      /{category.slug}
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">
                      {category.seoDescription}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge
                    label={category.status === "active" ? "Aktif" : "Pasif"}
                    tone={category.status === "active" ? "positive" : "danger"}
                  />
                  <button
                    type="button"
                    onClick={() => openEditModal(category)}
                    className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-ink)]"
                  >
                    Duzenle
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleStatus(category)}
                    className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-muted)]"
                  >
                    {category.status === "active" ? "Pasif Yap" : "Aktif Yap"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="Anasayfa ve SEO Ozetleri" eyebrow="Kategori Detayi">
          <div className="space-y-4">
            {sortedCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-[20px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                  {category.name}
                </p>
                <p className="mt-3 text-[15px] font-semibold text-[var(--admin-ink)]">
                  {category.seoTitle}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">
                  Slug: /{category.slug}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">
                  Sira No: {category.order}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">
                  Anasayfa: {category.status === "active" && !category.parent ? "Gorunur" : "Gizli"}
                </p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={categories.some((category) => category.id === editingCategory.id) ? "Kategori duzenle" : "Yeni kategori olustur"}
        description="Kaydedilen aktif ana kategoriler anasayfada menu ve urun blogu olarak gorunur."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Kategori adi"
            value={editingCategory.name}
            onChange={(value) =>
              setEditingCategory((current) => ({ ...current, name: value }))
            }
          />
          <Field
            label="Slug"
            value={editingCategory.slug}
            onChange={(value) =>
              setEditingCategory((current) => ({ ...current, slug: value }))
            }
          />
          <label className="grid gap-2">
            <span className="text-[13px] font-semibold text-[var(--admin-ink)]">
              Ust kategori
            </span>
            <select
              value={editingCategory.parent ?? ""}
              onChange={(event) =>
                setEditingCategory((current) => ({
                  ...current,
                  parent: event.target.value || undefined,
                }))
              }
              className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
            >
              <option value="">Ana kategori</option>
              {categories
                .filter((category) => !category.parent && category.id !== editingCategory.id)
                .map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
          <Field
            label="Sira numarasi"
            value={String(editingCategory.order)}
            onChange={(value) =>
              setEditingCategory((current) => ({
                ...current,
                order: Number(value.replace(/[^\d-]/g, "")) || 1,
              }))
            }
          />
          <Field
            label="Gorsel yolu"
            value={editingCategory.image}
            onChange={(value) =>
              setEditingCategory((current) => ({ ...current, image: value }))
            }
          />
          <label className="grid gap-2">
            <span className="text-[13px] font-semibold text-[var(--admin-ink)]">Durum</span>
            <select
              value={editingCategory.status}
              onChange={(event) =>
                setEditingCategory((current) => ({
                  ...current,
                  status: event.target.value as AdminCategory["status"],
                }))
              }
              className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
            >
              <option value="active">Aktif</option>
              <option value="passive">Pasif</option>
            </select>
          </label>
        </div>
        <label className="mt-4 grid gap-2">
          <span className="text-[13px] font-semibold text-[var(--admin-ink)]">SEO Basligi</span>
          <input
            value={editingCategory.seoTitle}
            onChange={(event) =>
              setEditingCategory((current) => ({ ...current, seoTitle: event.target.value }))
            }
            className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
          />
        </label>
        <label className="mt-4 grid gap-2">
          <span className="text-[13px] font-semibold text-[var(--admin-ink)]">SEO Aciklamasi</span>
          <textarea
            value={editingCategory.seoDescription}
            onChange={(event) =>
              setEditingCategory((current) => ({
                ...current,
                seoDescription: event.target.value,
              }))
            }
            className="min-h-28 rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
          />
        </label>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="rounded-2xl border border-[var(--admin-line)] px-4 py-2.5 text-[14px] font-semibold text-[var(--admin-muted)]"
          >
            Vazgec
          </button>
          <button
            type="button"
            onClick={saveCategory}
            className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Kaydet
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[13px] font-semibold text-[var(--admin-ink)]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
      />
    </label>
  );
}
