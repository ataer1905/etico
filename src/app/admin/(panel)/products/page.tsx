"use client";

import { useMemo, useState } from "react";
import type { AdminProduct } from "@/lib/admin-data";
import { useCatalogStore, saveCatalogProducts } from "@/lib/catalog-store";
import {
  EmptyState,
  Modal,
  PageHeader,
  PanelCard,
  SegmentedControl,
  StatusBadge,
} from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

type ViewMode = "table" | "cards";
type ProductStatus = "all" | "active" | "draft" | "passive";

const emptyProduct: AdminProduct = {
  id: "",
  name: "",
  brand: "",
  category: "",
  sku: "",
  price: 0,
  salePrice: undefined,
  stock: 0,
  status: "draft",
  featured: false,
  image: "",
  variants: [],
  updatedAt: "",
};

export default function ProductsPage() {
  const { pushToast } = useAdminContext();
  const { products, categories } = useCatalogStore();
  const [view, setView] = useState<ViewMode>("table");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus>("all");
  const [sort, setSort] = useState<"updated" | "price" | "stock">("updated");
  const [selected, setSelected] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct>(emptyProduct);

  const filteredProducts = useMemo(() => {
    const next = products
      .filter((product) =>
        [product.name, product.brand, product.category, product.sku]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .filter((product) => (statusFilter === "all" ? true : product.status === statusFilter));

    return next.sort((a, b) => {
      if (sort === "price") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      if (sort === "stock") return a.stock - b.stock;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [products, query, sort, statusFilter]);

  const allSelected =
    filteredProducts.length > 0 && filteredProducts.every((product) => selected.includes(product.id));

  const openCreateModal = () => {
    setEditingProduct({
      ...emptyProduct,
      id: `prd_${Date.now()}`,
      updatedAt: new Date().toLocaleDateString("tr-TR"),
      category: categories[0]?.name ?? "",
    });
    setModalOpen(true);
  };

  const openEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const saveProduct = () => {
    const normalized: AdminProduct = {
      ...editingProduct,
      updatedAt: new Date().toLocaleDateString("tr-TR"),
      variants: editingProduct.variants.filter(Boolean),
    };

    const exists = products.some((product) => product.id === normalized.id);
    const nextProducts = exists
      ? products.map((product) => (product.id === normalized.id ? normalized : product))
      : [normalized, ...products];

    saveCatalogProducts(nextProducts);
    setModalOpen(false);
    pushToast(
      exists ? "Urun guncellendi" : "Urun olusturuldu",
      `${normalized.name} katalog ve anasayfa akisina baglandi.`,
      "success",
    );
  };

  const togglePassive = (product: AdminProduct) => {
    saveCatalogProducts(
      products.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: item.status === "passive" ? "active" : "passive",
              updatedAt: new Date().toLocaleDateString("tr-TR"),
            }
          : item,
      ),
    );
    pushToast(
      "Urun durumu guncellendi",
      `${product.name} durumu degistirildi.`,
      "info",
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Urun Yonetimi"
        description="Bu ekrandaki urunler dogrudan anasayfa kategori bloklarini besler. Aktif urunler vitrinde kendi kategorisinde listelenir."
        action={
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Urun Ekle
          </button>
        }
      />

      <PanelCard title="Filtreler" className="overflow-visible">
        <div className="grid gap-4 xl:grid-cols-[1.6fr_repeat(3,minmax(0,0.7fr))]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Urun, marka, SKU veya kategori ara"
            className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as ProductStatus)}
            className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
          >
            <option value="all">Tum durumlar</option>
            <option value="active">Aktif</option>
            <option value="draft">Taslak</option>
            <option value="passive">Pasif</option>
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
            className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
          >
            <option value="updated">Guncelleme tarihi</option>
            <option value="price">Fiyata gore</option>
            <option value="stock">Stoga gore</option>
          </select>
          <SegmentedControl
            value={view}
            onChange={setView}
            items={[
              { value: "table", label: "Tablo" },
              { value: "cards", label: "Kart" },
            ]}
          />
        </div>
      </PanelCard>

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="Henuz urun yok"
          description="Olusturulan veya aktiflestirilen urunler anasayfadaki kategori bloklarinda gorunur."
        />
      ) : view === "table" ? (
        <PanelCard title="Urun Listesi" eyebrow={`${filteredProducts.length} kayit`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-3 text-[13px] text-[var(--admin-muted)]">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() =>
                  setSelected(allSelected ? [] : filteredProducts.map((product) => product.id))
                }
              />
              Tumunu sec
            </label>
            {selected.length > 0 ? (
              <button
                type="button"
                onClick={() => pushToast("Toplu islem", `${selected.length} urun secildi.`, "success")}
                className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-2.5 text-[13px] font-semibold text-[var(--admin-ink)]"
              >
                Toplu islem
              </button>
            ) : null}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-[var(--admin-line)] text-[12px] uppercase tracking-[0.18em] text-[var(--admin-muted)]">
                  <th className="pb-4 pr-4">Sec</th>
                  <th className="pb-4 pr-4">Urun</th>
                  <th className="pb-4 pr-4">Kategori</th>
                  <th className="pb-4 pr-4">SKU</th>
                  <th className="pb-4 pr-4">Fiyat</th>
                  <th className="pb-4 pr-4">Stok</th>
                  <th className="pb-4 pr-4">Durum</th>
                  <th className="pb-4">Aksiyon</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[var(--admin-line)] align-top">
                    <td className="py-4 pr-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(product.id)}
                        onChange={() =>
                          setSelected((prev) =>
                            prev.includes(product.id)
                              ? prev.filter((item) => item !== product.id)
                              : [...prev, product.id],
                          )
                        }
                      />
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex min-w-[280px] items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] object-cover"
                        />
                        <div>
                          <p className="text-[14px] font-semibold text-[var(--admin-ink)]">
                            {product.name}
                          </p>
                          <p className="mt-1 text-[12px] text-[var(--admin-muted)]">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-[14px] text-[var(--admin-muted)]">
                      {product.category}
                    </td>
                    <td className="py-4 pr-4 text-[14px] text-[var(--admin-muted)]">
                      {product.sku}
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-[14px] font-semibold text-[var(--admin-ink)]">
                        {(product.salePrice ?? product.price).toLocaleString("tr-TR")} TL
                      </p>
                      {product.salePrice ? (
                        <p className="mt-1 text-[12px] text-[var(--admin-muted)] line-through">
                          {product.price.toLocaleString("tr-TR")} TL
                        </p>
                      ) : null}
                    </td>
                    <td className="py-4 pr-4">
                      <p
                        className={`text-[14px] font-semibold ${
                          product.stock < 10 ? "text-amber-600" : "text-[var(--admin-ink)]"
                        }`}
                      >
                        {product.stock}
                      </p>
                    </td>
                    <td className="py-4 pr-4">
                      <StatusBadge
                        label={
                          product.status === "active"
                            ? "Aktif"
                            : product.status === "draft"
                              ? "Taslak"
                              : "Pasif"
                        }
                        tone={
                          product.status === "active"
                            ? "positive"
                            : product.status === "draft"
                              ? "warning"
                              : "danger"
                        }
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(product)}
                          className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-ink)]"
                        >
                          Duzenle
                        </button>
                        <button
                          type="button"
                          onClick={() => togglePassive(product)}
                          className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-muted)]"
                        >
                          {product.status === "passive" ? "Aktif Yap" : "Pasif Yap"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <PanelCard key={product.id} className="overflow-hidden !p-0">
              <div className="flex h-full flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full border-b border-[var(--admin-line)] bg-[var(--admin-panel-strong)] object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                        {product.brand}
                      </p>
                      <h3 className="mt-2 text-[18px] font-semibold text-[var(--admin-ink)]">
                        {product.name}
                      </h3>
                    </div>
                    <StatusBadge
                      label={
                        product.status === "active"
                          ? "Aktif"
                          : product.status === "draft"
                            ? "Taslak"
                            : "Pasif"
                      }
                      tone={
                        product.status === "active"
                          ? "positive"
                          : product.status === "draft"
                            ? "warning"
                            : "danger"
                      }
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-[13px] text-[var(--admin-muted)]">
                    <div className="rounded-2xl bg-[var(--admin-panel-strong)] p-3">
                      SKU: {product.sku}
                    </div>
                    <div className="rounded-2xl bg-[var(--admin-panel-strong)] p-3">
                      Stok: {product.stock}
                    </div>
                    <div className="rounded-2xl bg-[var(--admin-panel-strong)] p-3">
                      Kategori: {product.category}
                    </div>
                    <div className="rounded-2xl bg-[var(--admin-panel-strong)] p-3">
                      Varyant: {product.variants.length}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-[25px] font-semibold tracking-[-0.03em] text-[var(--admin-ink)]">
                        {(product.salePrice ?? product.price).toLocaleString("tr-TR")} TL
                      </p>
                      {product.salePrice ? (
                        <p className="mt-1 text-[12px] text-[var(--admin-muted)] line-through">
                          {product.price.toLocaleString("tr-TR")} TL
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => openEditModal(product)}
                      className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[13px] font-semibold text-white"
                    >
                      Hizli Duzenle
                    </button>
                  </div>
                </div>
              </div>
            </PanelCard>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={products.some((product) => product.id === editingProduct.id) ? "Urun duzenle" : "Yeni urun olustur"}
        description="Kaydedilen urunler anasayfada ilgili kategori bloguna otomatik yansir."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Urun adi" value={editingProduct.name} onChange={(value) => setEditingProduct((current) => ({ ...current, name: value }))} />
          <Field label="Marka" value={editingProduct.brand} onChange={(value) => setEditingProduct((current) => ({ ...current, brand: value }))} />
          <Field label="SKU" value={editingProduct.sku} onChange={(value) => setEditingProduct((current) => ({ ...current, sku: value }))} />
          <label className="grid gap-2">
            <span className="text-[13px] font-semibold text-[var(--admin-ink)]">Kategori</span>
            <select
              value={editingProduct.category}
              onChange={(event) => setEditingProduct((current) => ({ ...current, category: event.target.value }))}
              className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
            >
              {categories
                .filter((category) => category.status === "active")
                .map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
          <Field
            label="Liste fiyati"
            value={String(editingProduct.price || "")}
            onChange={(value) =>
              setEditingProduct((current) => ({
                ...current,
                price: Number(value.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0,
              }))
            }
          />
          <Field
            label="Indirimli fiyat"
            value={String(editingProduct.salePrice ?? "")}
            onChange={(value) =>
              setEditingProduct((current) => ({
                ...current,
                salePrice: value
                  ? Number(value.replace(/[^\d,.-]/g, "").replace(",", ".")) || undefined
                  : undefined,
              }))
            }
          />
          <Field
            label="Stok"
            value={String(editingProduct.stock)}
            onChange={(value) =>
              setEditingProduct((current) => ({
                ...current,
                stock: Number(value.replace(/[^\d-]/g, "")) || 0,
              }))
            }
          />
          <Field
            label="Gorsel yolu"
            value={editingProduct.image}
            onChange={(value) => setEditingProduct((current) => ({ ...current, image: value }))}
          />
          <label className="grid gap-2">
            <span className="text-[13px] font-semibold text-[var(--admin-ink)]">Durum</span>
            <select
              value={editingProduct.status}
              onChange={(event) =>
                setEditingProduct((current) => ({
                  ...current,
                  status: event.target.value as AdminProduct["status"],
                }))
              }
              className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
            >
              <option value="active">Aktif</option>
              <option value="draft">Taslak</option>
              <option value="passive">Pasif</option>
            </select>
          </label>
        </div>
        <label className="mt-4 grid gap-2">
          <span className="text-[13px] font-semibold text-[var(--admin-ink)]">
            Varyantlar
          </span>
          <input
            value={editingProduct.variants.join(", ")}
            onChange={(event) =>
              setEditingProduct((current) => ({
                ...current,
                variants: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder='Ornek: DN50, DN80'
            className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
          />
        </label>
        <label className="mt-4 flex items-center gap-3 text-[14px] text-[var(--admin-ink)]">
          <input
            type="checkbox"
            checked={editingProduct.featured}
            onChange={(event) =>
              setEditingProduct((current) => ({
                ...current,
                featured: event.target.checked,
              }))
            }
          />
          One cikan urun olarak isaretle
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
            onClick={saveProduct}
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
