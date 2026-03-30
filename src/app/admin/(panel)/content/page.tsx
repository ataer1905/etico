"use client";

import { contentBlocks } from "@/lib/admin-data";
import { PageHeader, PanelCard } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

export default function ContentPage() {
  const { pushToast } = useAdminContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Icerik Yonetimi"
        description="Anasayfa banner, kampanya alanlari, hakkimizda, iletisim, footer, SSS ve blog akisini icerik bazli yonetin."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <EditableCard
          title="Anasayfa Banner Alanlari"
          fields={[
            { label: "Baslik", value: contentBlocks.homepageBanner.title },
            { label: "Aciklama", value: contentBlocks.homepageBanner.description },
            { label: "CTA", value: contentBlocks.homepageBanner.cta },
          ]}
          onSave={() => pushToast("Banner kaydedildi", "Anasayfa hero alani guncellendi.", "success")}
        />
        <EditableCard
          title="Hakkimizda"
          fields={[
            { label: "Baslik", value: contentBlocks.about.title },
            { label: "Metin", value: contentBlocks.about.body, area: true },
          ]}
          onSave={() => pushToast("Hakkimizda kaydedildi", "Kurumsal metin yayina hazir.", "success")}
        />
        <EditableCard
          title="Iletisim Bilgileri"
          fields={[
            { label: "Telefon", value: contentBlocks.contact.phone },
            { label: "E-posta", value: contentBlocks.contact.email },
            { label: "Adres", value: contentBlocks.contact.address },
          ]}
          onSave={() => pushToast("Iletisim kaydedildi", "Iletisim alanlari guncellendi.", "success")}
        />
        <EditableCard
          title="Footer ve SSS"
          fields={[
            { label: "Destek Basligi", value: contentBlocks.footer.supportTitle },
            { label: "Destek Metni", value: contentBlocks.footer.supportText, area: true },
          ]}
          onSave={() => pushToast("Footer kaydedildi", "Footer alanlari yayina alindi.", "success")}
        />
      </div>
    </div>
  );
}

function EditableCard({
  title,
  fields,
  onSave,
}: {
  title: string;
  fields: { label: string; value: string; area?: boolean }[];
  onSave: () => void;
}) {
  return (
    <PanelCard title={title}>
      <div className="space-y-4">
        {fields.map((field) =>
          field.area ? (
            <label key={field.label} className="grid gap-2">
              <span className="text-[13px] font-semibold text-[var(--admin-ink)]">{field.label}</span>
              <textarea
                defaultValue={field.value}
                className="min-h-28 rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]"
              />
            </label>
          ) : (
            <label key={field.label} className="grid gap-2">
              <span className="text-[13px] font-semibold text-[var(--admin-ink)]">{field.label}</span>
              <input
                defaultValue={field.value}
                className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]"
              />
            </label>
          ),
        )}
      </div>
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onSave} className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white">
          Degisiklikleri Kaydet
        </button>
      </div>
    </PanelCard>
  );
}

