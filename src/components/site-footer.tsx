const tonsepetiLinks = [
  "Hakkimizda",
  "Sik Sorulan Sorular",
  "Odeme ve Teslimat",
  "Havale/EFT Bilgileri",
  "Iletisim",
];

const guvenlikLinks = [
  "Cerez (Cookie) Politikasi",
  "Uyelik Iptal Talebi",
  "Mesafeli Satis Sozlesmesi",
  "Uyelik Sozlesmesi",
  "Garanti Iade ve Iptal",
  "KVK Politikasi",
  "KVKK Kapsaminda Aydinlatma Metni",
  "On Bilgilendirme Formu",
  "Gizlilik ve Guvenlik Politikasi",
];

function SocialBox({ label }: { label: string }) {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-white text-[23px] font-semibold text-[#12206f]">
      {label}
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-14">
      <div className="bg-[linear-gradient(180deg,#2f3764_0%,#262d4f_55%,#171b2f_100%)] text-white">
        <div className="mx-auto w-full max-w-[1760px] px-4 pt-9 sm:px-6 lg:px-8">
          <div className="grid gap-x-12 gap-y-8 pb-8 lg:grid-cols-[280px_300px_1fr_360px]">
            <section>
              <h3 className="text-[17px] font-bold leading-[1.2] text-[#ff9aa5]">Musteri Hizmetleri</h3>
              <p className="mt-2 text-[15px] font-semibold leading-none">☎ 0322 334 19 66</p>

              <div className="mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/branding/cagdas-isi-logo.png"
                  alt="Cagdasisi"
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-h-[72px] w-auto bg-transparent object-contain"
                />
              </div>
            </section>

            <section>
              <h3 className="border-b border-white/10 pb-3 text-[19px] font-bold leading-none">Cagdasisi.com</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] leading-[1.22]">
                {tonsepetiLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-opacity duration-200 hover:opacity-85">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="border-b border-white/10 pb-3 text-[19px] font-bold leading-none">Guvenlik</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] leading-[1.22]">
                {guvenlikLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-opacity duration-200 hover:opacity-85">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-[19px] font-bold leading-none">Takip Edin</h3>

              <div className="mt-8 flex items-center gap-3">
                <SocialBox label="f" />
                <SocialBox label="◎" />
                <SocialBox label="x" />
                <SocialBox label="in" />
              </div>

              <form className="mt-5 flex h-[44px] w-full overflow-hidden">
                <label htmlFor="subscribe-mail" className="sr-only">
                  E-Mail Adresiniz
                </label>
                <input
                  id="subscribe-mail"
                  type="email"
                  placeholder="E-Mail Adresiniz"
                  className="h-full flex-1 bg-[#f5f1ea] px-4 text-[15px] text-[#6e7892] outline-none placeholder:text-[#7b8396]"
                />
                <button
                  type="button"
                  className="grid h-full w-[56px] place-items-center bg-[#ff9aa5] text-[21px] font-bold text-white"
                >
                  ➤
                </button>
              </form>

              <p className="mt-3 text-[14px] leading-[1.25]">
                Kampanyalari ve indirimlerinizi sizinle paylasalim mi?
              </p>
            </section>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[15px] leading-none">Copyright (c) cagdasisi.com</p>

            <div className="rounded-[10px] bg-white px-4 py-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon/footerbanka.png"
                alt="Odeme yontemleri"
                loading="lazy"
                decoding="async"
                className="h-[30px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(180deg,#666ea4_0%,#5a6296_100%)] py-4 text-center text-[15px] text-white">
        Bu yapi, <span className="font-semibold text-[#7ee5ff]">Cagdasisi Dijital Ticaret Altyapisi</span>{" "}
        ile guvenli ve hizli satin alma deneyimi sunmak icin hazirlanmistir.
      </div>
    </footer>
  );
}
