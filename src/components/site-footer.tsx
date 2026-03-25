const footerColumns = [
  {
    title: "Kurumsal",
    links: ["Hakkimizda", "Insan Kaynaklari", "Surdurulebilirlik", "Iletisim"],
  },
  {
    title: "Musteri Hizmetleri",
    links: ["Siparis Takibi", "Iade ve Degisim", "Sikca Sorulan Sorular", "Bize Ulasin"],
  },
  {
    title: "Kategoriler",
    links: ["Vanalar", "Teknik Tesisat", "Yangin Malzemeleri", "Armaturlar"],
  },
  {
    title: "Hesabim",
    links: ["Uye Girisi", "Sepetim", "Favorilerim", "Kampanyalar"],
  },
];

const legalLinks = [
  "KVKK",
  "Mesafeli Satis Sozlesmesi",
  "On Bilgilendirme Formu",
  "Cerez Politikasi",
];

const paymentMethods = ["Visa", "Mastercard", "Troy", "BKM", "Havale/EFT"];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#e0e0e0] bg-gradient-to-b from-[#fafaf8] via-[#f5f2f0] to-[#efefed] text-[#1f1f1f]">
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <section className="border-b border-[#e0e0e0] py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-2">
              <p className="text-[24px] font-bold tracking-[-0.01em] text-[#1a1a1a]">
                Özel Tekliflerden Haberdar Olun
              </p>
              <p className="max-w-[480px] text-[14px] leading-6 text-[#6b6b6b]">
                Yeni ürünler, stok fırsatları ve özel fiyatlarına ilk erişim için bültene katılın. Kampanya kodlarını özel olarak alacaksınız.
              </p>
            </div>

            <form className="flex h-13 w-full overflow-hidden rounded-[10px] border border-[#e0e0e0] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-[#d0d0d0] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              <label htmlFor="footer-mail" className="sr-only">
                E-posta adresi
              </label>
              <input
                id="footer-mail"
                type="email"
                placeholder="E-posta adresiniz"
                className="h-full flex-1 bg-transparent px-5 text-[14px] text-[#1f1f1f] outline-none placeholder:text-[#a8a8a8]"
              />
              <button
                type="button"
                className="h-full shrink-0 bg-gradient-to-r from-[#3a3a3a] to-[#2a2a2a] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:from-[#2a2a2a] hover:to-[#1f1f1f] active:scale-95"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </section>

        {/* Main Content */}
        <section className="grid gap-12 py-14 lg:grid-cols-[1.2fr_1.8fr]">
          {/* Brand Info */}
          <div className="space-y-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/branding/cagdas-isi-logo.png"
              alt="Cagdas Isi"
              loading="lazy"
              decoding="async"
              className="h-auto max-h-14 w-auto object-contain"
            />
            <p className="max-w-[520px] text-[13px] leading-7 text-[#646464]">
              Çağdaş İsı, profesyonel tesisat ve teknik tedarik alanında güvenilir ürün, rekabetçi fiyat ve hızlı lojistik hizmeti sunar. Proje bazlı satın almalarda uzman destekle sürecin her adımında yanınızdayız.
            </p>
            {/* Contact Info */}
            <div className="space-y-3 rounded-[10px] bg-white/40 p-4">
              <div className="space-y-1">
                <p className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#3a3a3a]">
                  Müşteri Danışma Hattı
                </p>
                <p className="text-[15px] font-bold text-[#1a1a1a]">0850 000 00 00</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-[#757575]">Hafta içi 09:00 - 18:00</p>
                <p className="text-[12px] text-[#4b7be5] hover:underline cursor-pointer">
                  destek@cagdasisi.com
                </p>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-4">
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.5px] text-[#1a1a1a]">
                    {column.title}
                  </h3>
                  <div className="mt-3 h-0.5 w-6 rounded-full bg-gradient-to-r from-[#3a3a3a] to-[#3a3a3a]/40" />
                </div>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[12px] text-[#6b6b6b] transition-all duration-200 hover:translate-x-1 hover:text-[#3a3a3a]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Bottom */}
        <section className="space-y-5 border-t border-[#e0e0e0] py-8">
          {/* Legal Links & Payment Methods */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {legalLinks.map((link, idx) => (
                <div key={link} className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-[11px] font-medium text-[#6b6b6b] transition-colors duration-200 hover:text-[#3a3a3a]"
                  >
                    {link}
                  </a>
                  {idx < legalLinks.length - 1 && (
                    <span className="h-3 w-px bg-[#d8d8d8]" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium text-[#757575]">Ödeme yöntemleri:</span>
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center rounded-full border border-[#d0d0d0] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#5d5d5d] transition-all duration-200 hover:border-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col gap-2 border-t border-[#e8e8e8] pt-6 text-[11px] text-[#7a7a7a] md:flex-row md:items-center md:justify-between">
            <p className="text-[#6b6b6b]">✓ Bu sitede alışveriş güvenli ödeme altyapısı ile korunmaktadır.</p>
            <p className="font-medium text-[#5a5a5a]">© 2026 Çağdaş İsı. Tüm hakları saklıdır.</p>
          </div>
        </section>
      </div>
    </footer>
  );
}
