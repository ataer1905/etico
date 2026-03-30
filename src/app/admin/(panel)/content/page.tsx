"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader, PanelCard } from "@/components/admin/admin-ui";
import { useAdminContext } from "@/components/admin/admin-context";
import {
  defaultHomepageContent,
  resetHomepageContent,
  saveHomepageContent,
  useHomepageContent,
  type HomepageContent,
} from "@/lib/site-content";

export default function ContentPage() {
  const { pushToast } = useAdminContext();
  const homepageContent = useHomepageContent();
  const [draft, setDraft] = useState<HomepageContent>(homepageContent);

  useEffect(() => {
    setDraft(homepageContent);
  }, [homepageContent]);

  const heroBannerEntries = useMemo(
    () => [0, 1].map((index) => draft.heroBanners[index] ?? ""),
    [draft.heroBanners],
  );

  const updateDraft = (updater: (current: HomepageContent) => HomepageContent) => {
    setDraft((current) => updater(current));
  };

  const saveSection = (title: string, message: string) => {
    saveHomepageContent(draft);
    pushToast(title, message, "success");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Anasayfa Icerik Yonetimi"
        description="Header linkleri, kategori menusu, hero banner, blog, marka alani ve footer dahil anasayfanin tum sabit bloklarini buradan yonetin."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <PanelCard title="Header ve Ust Linkler" eyebrow="Navigation">
          <div className="space-y-4">
            <TextAreaField
              label="Ust Utility Linkleri"
              value={draft.utilityLinks.join("\n")}
              hint="Her satira bir link etiketi girin."
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  utilityLinks: listFromText(value),
                }))
              }
            />
            <TextAreaField
              label="Kategori Menusu"
              value={draft.categories.join("\n")}
              hint="Anasayfa kategori satirini bu liste belirler."
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  categories: listFromText(value),
                }))
              }
            />
          </div>
          <ActionRow
            onReset={() => {
              setDraft(homepageContent);
              pushToast("Taslak sifirlandi", "Header alani son kayitli haline geri alindi.", "info");
            }}
            onSave={() =>
              saveSection("Header kaydedildi", "Ust linkler ve kategori navigasyonu guncellendi.")
            }
          />
        </PanelCard>

        <PanelCard title="Hero Banner Alani" eyebrow="Top Fold">
          <div className="space-y-4">
            {heroBannerEntries.map((banner, index) => (
              <TextField
                key={index}
                label={`Banner ${index + 1}`}
                value={banner}
                onChange={(value) =>
                  updateDraft((current) => {
                    const next = [...current.heroBanners];
                    next[index] = value;
                    return { ...current, heroBanners: next.filter(Boolean) };
                  })
                }
              />
            ))}
          </div>
          <ActionRow
            onReset={() => {
              setDraft(homepageContent);
              pushToast("Hero geri alindi", "Banner URL'leri son kayitli haline getirildi.", "info");
            }}
            onSave={() =>
              saveSection("Hero kaydedildi", "Anasayfa banner alanlari yayina alindi.")
            }
          />
        </PanelCard>

        <PanelCard title="Markalar Alani" eyebrow="Dealer Section">
          <div className="space-y-4">
            <TextField
              label="Kucuk Baslik"
              value={draft.dealerSection.eyebrow}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  dealerSection: { ...current.dealerSection, eyebrow: value },
                }))
              }
            />
            <TextField
              label="Ana Baslik"
              value={draft.dealerSection.title}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  dealerSection: { ...current.dealerSection, title: value },
                }))
              }
            />
            <TextAreaField
              label="Aciklama"
              value={draft.dealerSection.description}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  dealerSection: { ...current.dealerSection, description: value },
                }))
              }
            />
          </div>
          <ActionRow
            onReset={() => {
              setDraft(homepageContent);
              pushToast("Marka alani geri alindi", "Markalar blogu son kayitli haline getirildi.", "info");
            }}
            onSave={() =>
              saveSection("Markalar kaydedildi", "Markalar alani vitrinde guncellendi.")
            }
          />
        </PanelCard>

        <PanelCard title="Blog Alani" eyebrow="Homepage Posts">
          <div className="space-y-5">
            {draft.blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="rounded-[20px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4"
              >
                <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                  Kart {index + 1}
                </p>
                <div className="grid gap-4">
                  <TextField
                    label="Gorsel URL"
                    value={post.imageSrc}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        blogPosts: current.blogPosts.map((item) =>
                          item.id === post.id ? { ...item, imageSrc: value } : item,
                        ),
                      }))
                    }
                  />
                  <TextField
                    label="Baslik"
                    value={post.title}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        blogPosts: current.blogPosts.map((item) =>
                          item.id === post.id ? { ...item, title: value } : item,
                        ),
                      }))
                    }
                  />
                  <TextAreaField
                    label="Ozet"
                    value={post.excerpt}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        blogPosts: current.blogPosts.map((item) =>
                          item.id === post.id ? { ...item, excerpt: value } : item,
                        ),
                      }))
                    }
                  />
                  <TextField
                    label="Tarih"
                    value={post.date}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        blogPosts: current.blogPosts.map((item) =>
                          item.id === post.id ? { ...item, date: value } : item,
                        ),
                      }))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <ActionRow
            onReset={() => {
              setDraft(homepageContent);
              pushToast("Blog alani geri alindi", "Blog kartlari son kayitli haline getirildi.", "info");
            }}
            onSave={() =>
              saveSection("Blog kaydedildi", "Anasayfadaki blog kartlari guncellendi.")
            }
          />
        </PanelCard>

        <PanelCard title="Footer Kurumsal Alanlari" eyebrow="Footer">
          <div className="space-y-4">
            <TextField
              label="Destek Basligi"
              value={draft.footer.supportTitle}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, supportTitle: value },
                }))
              }
            />
            <TextField
              label="Telefon"
              value={draft.footer.phone}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, phone: value },
                }))
              }
            />
            <TextField
              label="Sirket Kolon Basligi"
              value={draft.footer.companyTitle}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, companyTitle: value },
                }))
              }
            />
            <TextAreaField
              label="Sirket Linkleri"
              value={draft.footer.companyLinks.join("\n")}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, companyLinks: listFromText(value) },
                }))
              }
            />
            <TextField
              label="Guvenlik Kolon Basligi"
              value={draft.footer.securityTitle}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, securityTitle: value },
                }))
              }
            />
            <TextAreaField
              label="Guvenlik Linkleri"
              value={draft.footer.securityLinks.join("\n")}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, securityLinks: listFromText(value) },
                }))
              }
            />
          </div>
          <ActionRow
            onReset={() => {
              setDraft(homepageContent);
              pushToast("Footer geri alindi", "Footer link bloklari geri yuklendi.", "info");
            }}
            onSave={() =>
              saveSection("Footer kaydedildi", "Footer kurumsal kolonlari guncellendi.")
            }
          />
        </PanelCard>

        <PanelCard title="Footer Abonelik ve Alt Bant" eyebrow="Footer CTA">
          <div className="space-y-4">
            <TextField
              label="Sosyal Baslik"
              value={draft.footer.socialTitle}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, socialTitle: value },
                }))
              }
            />
            <TextField
              label="Abonelik Placeholder"
              value={draft.footer.newsletterPlaceholder}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, newsletterPlaceholder: value },
                }))
              }
            />
            <TextAreaField
              label="Abonelik Aciklamasi"
              value={draft.footer.newsletterText}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, newsletterText: value },
                }))
              }
            />
            <TextField
              label="Copyright"
              value={draft.footer.copyright}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, copyright: value },
                }))
              }
            />
            <TextAreaField
              label="Alt Bant Metni"
              value={draft.footer.bottomBandText}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  footer: { ...current.footer, bottomBandText: value },
                }))
              }
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                resetHomepageContent();
                setDraft(defaultHomepageContent);
                pushToast("Anasayfa sifirlandi", "Tum anasayfa alanlari varsayilan duzene geri alindi.", "success");
              }}
              className="rounded-2xl border border-[var(--admin-line)] px-4 py-2.5 text-[14px] font-semibold text-[var(--admin-muted)]"
            >
              Varsayilana Don
            </button>
            <button
              type="button"
              onClick={() =>
                saveSection("Alt bant kaydedildi", "Footer CTA ve alt bant metinleri yayina alindi.")
              }
              className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
            >
              Degisiklikleri Kaydet
            </button>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

function TextField({
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

function TextAreaField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[13px] font-semibold text-[var(--admin-ink)]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[14px] outline-none"
      />
      {hint ? <span className="text-[12px] text-[var(--admin-muted)]">{hint}</span> : null}
    </label>
  );
}

function ActionRow({
  onReset,
  onSave,
}: {
  onReset: () => void;
  onSave: () => void;
}) {
  return (
    <div className="mt-5 flex justify-end gap-3">
      <button
        type="button"
        onClick={onReset}
        className="rounded-2xl border border-[var(--admin-line)] px-4 py-2.5 text-[14px] font-semibold text-[var(--admin-muted)]"
      >
        Geri Al
      </button>
      <button
        type="button"
        onClick={onSave}
        className="rounded-2xl bg-[var(--admin-accent)] px-4 py-2.5 text-[14px] font-semibold text-white"
      >
        Kaydet
      </button>
    </div>
  );
}

function listFromText(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
