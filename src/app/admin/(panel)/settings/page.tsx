"use client";

import { siteSettings } from "@/lib/admin-data";
import { PageHeader, PanelCard, SegmentedControl } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";

export default function SettingsPage() {
  const { pushToast } = useAdminContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Ayarlari"
        description="Marka kimligi, iletisim, sosyal medya, SEO varsayimlari ve tema altyapisini tek merkezden yonetin."
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <PanelCard title="Genel Ayarlar">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Site adi" value={siteSettings.siteName} />
            <Input label="Domain" value={siteSettings.domain} />
            <Input label="Iletisim e-postasi" value={siteSettings.email} />
            <Input label="Telefon" value={siteSettings.phone} />
            <Input label="Instagram" value={siteSettings.instagram} />
            <Input label="LinkedIn" value={siteSettings.linkedin} />
          </div>
          <div className="mt-4 grid gap-4">
            <Input label="Varsayilan SEO basligi" value={siteSettings.defaultSeoTitle} />
            <label className="grid gap-2">
              <span className="text-[13px] font-semibold text-[var(--admin-ink)]">Varsayilan SEO aciklamasi</span>
              <textarea defaultValue={siteSettings.defaultSeoDescription} className="min-h-28 rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]" />
            </label>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => pushToast("Ayarlar kaydedildi", "Site bilgileri ve SEO varsayimlari guncellendi.", "success")}
              className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
            >
              Ayarlari Kaydet
            </button>
          </div>
        </PanelCard>

        <PanelCard title="Tema ve Marka">
          <div className="space-y-4">
            <div className="rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
              <p className="text-[13px] font-semibold text-[var(--admin-ink)]">Tema tercihi</p>
              <div className="mt-4">
                <SegmentedControl
                  value="light"
                  onChange={() => undefined}
                  items={[
                    { value: "light", label: "Acik" },
                    { value: "dark", label: "Koyu" },
                  ]}
                />
              </div>
            </div>
            <div className="rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
              <p className="text-[13px] font-semibold text-[var(--admin-ink)]">Aksan rengi</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl border border-[var(--admin-line)]" style={{ backgroundColor: siteSettings.accent }} />
                <span className="text-[14px] text-[var(--admin-muted)]">{siteSettings.accent}</span>
              </div>
            </div>
            <div className="rounded-[22px] border border-dashed border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-5 py-8 text-center text-[14px] text-[var(--admin-muted)]">
              Logo, favicon ve renk seciciler icin upload / picker bilesenleri bu alana baglanacak.
            </div>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

function Input({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-[13px] font-semibold text-[var(--admin-ink)]">{label}</span>
      <input defaultValue={value} className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px]" />
    </label>
  );
}

