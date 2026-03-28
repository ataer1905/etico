import { BrandLogo } from "@/components/brand-logo";
import { DealerShowcase } from "@/components/dealer-showcase";
import { HeroBanner } from "@/components/hero-banner";
import { ProductCard, type ProductCardProps } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";

const utilityLinks = [
  "Siparis Takibi",
  "Kampanyalar",
  "Markalar",
  "Magaza Sanal Tur",
];

const categories = [
  "VANALAR",
  "BORU EKLEME VE ASKILAMA",
  "YANGIN MALZEMELERI",
  "KOMPANSATORLER",
  "TANK ve POMPALAR",
  "PVC",
  "KAMPANYALAR",
];

const heroBanners = ["/banners/trakya-dokum-banner.jpg", "/banners/duyarbanner.jpg"];

const blogPosts = [
  {
    id: 1,
    imageSrc: "/products/blog/blog-1.jpg",
    imageAlt: "Blog gorseli 1",
    title: "Hobi Urunleri Rehberi: Ahsap Isciliginden Kamp Malzemelerine, Iskarpeladan Rendeye Her Sey",
    excerpt:
      "Hobi urunleri, ahsap isciliginden kamp malzemelerine kadar uzanan genis bir alani kapsar. Bu rehberde urun secimi ve kullanim detaylarini bulabilirsiniz.",
    date: "11.03.2026",
  },
  {
    id: 2,
    imageSrc: "/products/blog/blog-2.webp",
    imageAlt: "Blog gorseli 2",
    title: "Dekorasyon Rehberi: Dolap Ici Aksesuardan LED Aydinlatmaya, Hijyen Sistemlerinden Mutfaga",
    excerpt:
      "Dekorasyon urunleri bir evin hem islevselligini hem de yasam kalitesini belirleyen detaylardir. Rehberde dogru urun secimine odaklandik.",
    date: "11.03.2026",
  },
  {
    id: 3,
    imageSrc: "/products/blog/blog-3.png",
    imageAlt: "Blog gorseli 3",
    title: "Hirdavat Malzemeleri Rehberi: Vidadan Silikona, Dubelden Sprey Boyaya Her Sey",
    excerpt:
      "Hirdavat malzemeleri proje kalitesini ve uygulama hizini dogrudan etkiler. Bu rehberde en kritik urun gruplarini ozetledik.",
    date: "11.03.2026",
  },
] as const;

type CatalogProduct = ProductCardProps & { id: number };

const products: CatalogProduct[] = [
  {
    id: 1,
    title: "BATU KURESEL FLANSLI PIK VANA PN10-16",
    imageSrc: "/products/vanalar/vana-1.jpg",
    imageAlt: "Kulce altin urunu",
    badge: "Avantajli",
    rating: "4,8",
    reviewCount: 1983,
    oldPrice: "7.727,51 TL",
    price: "7.572,96 TL",
  },
  {
    id: 2,
    title: "EVS KOSVA VANA",
    imageSrc: "/products/vanalar/vana-2.jpg",
    imageAlt: "Cam silme robotu",
    badge: "9 Taksit",
    rating: "4,8",
    reviewCount: 35,
    promoLabel: "Pesin fiyatina 9 x",
    promoAmount: "3.333 TL",
    price: "29.999 TL",
  },
  {
    id: 3,
    title: "KURESEL VANA PN 25",
    imageSrc: "/products/vanalar/vana-3.jpg",
    imageAlt: "Akilli telefon",
    badge: "Avantajli",
    rating: "4,8",
    reviewCount: 1510,
    price: "75.299 TL",
  },
  {
    id: 4,
    title: "KLEPSAN TERMOKUPLU KURESEL VANA",
    imageSrc: "/products/vanalar/vana-4.jpg",
    imageAlt: "Elektrikli supurge",
    badge: "9 Taksit",
    rating: "4,6",
    reviewCount: 2302,
    promoLabel: "Pesin fiyatina 9 x",
    promoAmount: "1.351 TL",
    price: "12.160 TL",
  },
  {
    id: 5,
    title: "DUYAR SURGULU VANA ELASTOMERLI F4 PN16",
    imageSrc: "/products/vanalar/vana-5.jpg",
    imageAlt: "Apple iPhone 15",
    badge: "5G",
    rating: "4,8",
    reviewCount: 11775,
    promoLabel: "Kartsiz 3 x",
    promoAmount: "18.313 TL",
    oldPrice: "47.357,26 TL",
    price: "47.339 TL",
  },
  {
    id: 6,
    title: "TRAKYA DOKUM SIYAH NIPEL",
    imageSrc: "/products/baglanti/bag1.jpg",
    imageAlt: "Dikey supurge",
    badge: "5G",
    rating: "4,8",
    reviewCount: 605,
    promoLabel: "Pesin fiyatina 6 x",
    promoAmount: "3.083 TL",
    price: "18.499 TL",
  },
  {
    id: 7,
    title: "TRAKYA DOKUM SIYAH INEGAL TE",
    imageSrc: "/products/baglanti/bag2.jpg",
    imageAlt: "Inverter klima",
    badge: "Avantajli",
    rating: "4,6",
    reviewCount: 678,
    oldPrice: "33.100 TL",
    price: "31.250 TL",
  },
  {
    id: 8,
    title: "TRAKYA DOKUM SIYAH KONIK RAKOR",
    imageSrc: "/products/baglanti/bag3.jpg",
    imageAlt: "Samsung Galaxy telefon",
    badge: "9 Taksit",
    rating: "4,7",
    reviewCount: 751,
    promoLabel: "Pesin fiyatina 9 x",
    promoAmount: "7.111 TL",
    price: "63.999 TL",
  },
  {
    id: 9,
    title: "PATENT DIRSEK 90° SCH 40 DIKISSIZ",
    imageSrc: "/products/baglanti/bag4.jpeg",
    imageAlt: "Dyson supurge",
    badge: "5G",
    rating: "4,8",
    reviewCount: 824,
    oldPrice: "29.999 TL",
    price: "27.890 TL",
  },
  {
    id: 10,
    title: "TRAKYA DOKUM SIYAH MANSON REDUKSIYON",
    imageSrc: "/products/baglanti/bag5.jpg",
    imageAlt: "Xiaomi robot supurge",
    badge: "Avantajli",
    rating: "4,6",
    reviewCount: 897,
    promoLabel: "Kartsiz 3 x",
    promoAmount: "4.766 TL",
    price: "14.299 TL",
  },
  {
    id: 11,
    title: "Beko 9 Kg Kurutma Makinesi",
    imageSrc: "https://picsum.photos/seed/dryer-beko/600/600",
    imageAlt: "Kurutma makinesi",
    badge: "9 Taksit",
    rating: "4,7",
    reviewCount: 442,
    price: "23.700 TL",
  },
  {
    id: 12,
    title: "Siemens IQ700 Bulasik Makinesi",
    imageSrc: "https://picsum.photos/seed/dishwasher/600/600",
    imageAlt: "Bulasik makinesi",
    badge: "Avantajli",
    rating: "4,8",
    reviewCount: 511,
    promoLabel: "Pesin fiyatina 6 x",
    promoAmount: "5.816 TL",
    price: "34.900 TL",
  },
  {
    id: 13,
    title: "LG 55 in 4K QNED TV",
    imageSrc: "https://picsum.photos/seed/lg-qned/600/600",
    imageAlt: "LG televizyon",
    badge: "5G",
    rating: "4,7",
    reviewCount: 936,
    oldPrice: "44.250 TL",
    price: "39.999 TL",
  },
  {
    id: 14,
    title: "JBL Tune 770NC Bluetooth Kulaklik",
    imageSrc: "https://picsum.photos/seed/jbl-headphone/600/600",
    imageAlt: "Bluetooth kulaklik",
    badge: "Avantajli",
    rating: "4,8",
    reviewCount: 1291,
    price: "4.299 TL",
  },
  {
    id: 15,
    title: "Tefal Ingenio 12 Parca Tencere Seti",
    imageSrc: "https://picsum.photos/seed/pot-set/600/600",
    imageAlt: "Tencere seti",
    badge: "9 Taksit",
    rating: "4,9",
    reviewCount: 615,
    price: "8.750 TL",
  },
  {
    id: 16,
    title: "Fakir Steel N More Multi Blender",
    imageSrc: "https://picsum.photos/seed/blender-fakir/600/600",
    imageAlt: "Multi blender",
    badge: "5G",
    rating: "4,6",
    reviewCount: 433,
    price: "3.499 TL",
  },
  {
    id: 17,
    title: "Miele Complete C3 Torbali Supurge",
    imageSrc: "https://picsum.photos/seed/miele-c3/600/600",
    imageAlt: "Miele supurge",
    badge: "Avantajli",
    rating: "4,8",
    reviewCount: 501,
    price: "22.450 TL",
  },
  {
    id: 18,
    title: "Apple Watch Series 11 GPS",
    imageSrc: "https://picsum.photos/seed/apple-watch/600/600",
    imageAlt: "Apple Watch",
    badge: "9 Taksit",
    rating: "4,7",
    reviewCount: 773,
    promoLabel: "Pesin fiyatina 3 x",
    promoAmount: "6.666 TL",
    price: "19.999 TL",
  },
  {
    id: 19,
    title: "Roborock Q Revo Pro",
    imageSrc: "https://picsum.photos/seed/roborock/600/600",
    imageAlt: "Roborock robot supurge",
    badge: "5G",
    rating: "4,8",
    reviewCount: 399,
    promoLabel: "Pesin fiyatina 9 x",
    promoAmount: "3.988 TL",
    price: "35.890 TL",
  },
  {
    id: 20,
    title: "Nespresso Vertuo Pop Kahve Makinesi",
    imageSrc: "https://picsum.photos/seed/nespresso/600/600",
    imageAlt: "Kahve makinesi",
    badge: "Avantajli",
    rating: "4,7",
    reviewCount: 290,
    price: "8.999 TL",
  },
  {
    id: 21,
    title: "Karaca Hatir Plus Mod 5in1",
    imageSrc: "https://picsum.photos/seed/karaca-coffee/600/600",
    imageAlt: "Turk kahve makinesi",
    badge: "9 Taksit",
    rating: "4,6",
    reviewCount: 321,
    price: "5.250 TL",
  },
  {
    id: 22,
    title: "Delonghi Magnifica S ECAM22.110",
    imageSrc: "https://picsum.photos/seed/delonghi/600/600",
    imageAlt: "Espresso makinesi",
    badge: "5G",
    rating: "4,7",
    reviewCount: 282,
    price: "16.990 TL",
  },
  {
    id: 23,
    title: "Asus Vivobook 15 i7 16GB 512GB",
    imageSrc: "https://picsum.photos/seed/asus-vivobook/600/600",
    imageAlt: "Asus dizustu bilgisayar",
    badge: "Avantajli",
    rating: "4,8",
    reviewCount: 415,
    oldPrice: "36.999 TL",
    price: "33.799 TL",
  },
  {
    id: 24,
    title: "Lenovo Tab P12 256 GB",
    imageSrc: "https://picsum.photos/seed/lenovo-tablet/600/600",
    imageAlt: "Lenovo tablet",
    badge: "9 Taksit",
    rating: "4,6",
    reviewCount: 511,
    price: "12.490 TL",
  },
  {
    id: 25,
    title: "Anker Soundcore Motion X600",
    imageSrc: "https://picsum.photos/seed/anker-speaker/600/600",
    imageAlt: "Bluetooth hoparlor",
    badge: "5G",
    rating: "4,8",
    reviewCount: 629,
    price: "6.890 TL",
  },
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.35-7-10.04A4.18 4.18 0 0 1 9.2 5.7c1.17 0 2.3.48 3.1 1.34.8-.86 1.93-1.34 3.1-1.34A4.18 4.18 0 0 1 19.6 9.96C19.6 15.65 12 20 12 20Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 9h10l-1 10H8L7 9Z" />
      <path d="M9 9a3 3 0 0 1 6 0" />
      <circle cx="18.5" cy="8.5" r="3.25" />
      <path d="M18.5 7v3" />
      <path d="M17 8.5h3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.63-3.1 4.05-4.65 7-4.65 2.95 0 5.37 1.55 7 4.65" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <header className="border-b border-[var(--color-line)] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-end px-5 py-3 text-[13px] text-[var(--color-muted)] sm:px-8 lg:px-12">
          <nav aria-label="Ust baglantilar">
            <ul className="hidden items-center gap-8 md:flex">
              {utilityLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-colors duration-200 hover:text-[var(--color-ink)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-y border-[var(--color-line)]">
          <div className="flex w-full flex-col gap-2 px-4 py-1.5 sm:px-6 sm:py-2 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8 lg:py-2">
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:gap-2">
              <a
                href="#"
                className="flex shrink-0 items-center"
                aria-label="Cagdas Isi ana sayfa"
              >
                <BrandLogo
                  alt="Cagdas Isi"
                  src="/branding/cagdas-isi-logo.png"
                />
              </a>

              <label className="group relative min-w-0 w-full lg:ml-2 lg:max-w-[760px] lg:flex-1">
                <span className="sr-only">Arama</span>
                <input
                  type="search"
                  name="query"
                  placeholder="Arama"
                  className="h-12 w-full rounded-none border border-[var(--color-line)] bg-[var(--color-search)] px-6 pr-16 text-[20px] tracking-[-0.03em] text-[var(--color-ink)] outline-none transition-colors duration-200 placeholder:text-[var(--color-ink)]/95 focus:border-[var(--color-accent)] sm:h-[56px] sm:text-[24px]"
                />
                <span className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-[var(--color-ink)] transition-colors duration-200 group-focus-within:text-[var(--color-accent)]">
                  <SearchIcon />
                </span>
              </label>
            </div>

            <nav aria-label="Hesap islemleri" className="shrink-0 lg:pl-3">
              <ul className="flex items-start justify-between gap-5 sm:gap-8">
                <li>
                  <a
                    href="#"
                    className="flex min-w-20 flex-col items-center gap-2 text-center text-[15px] leading-tight tracking-[-0.03em] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    <HeartIcon />
                    <span>Favorilerim</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex min-w-20 flex-col items-center gap-2 text-center text-[15px] leading-tight tracking-[-0.03em] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    <BagIcon />
                    <span>Sepetim</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex min-w-20 flex-col items-center gap-2 text-center text-[15px] leading-tight tracking-[-0.03em] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    <UserIcon />
                    <span>Uye Girisi</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <nav aria-label="Kategoriler">
          <ul className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3.5 text-[13px] font-medium tracking-[-0.01em] sm:gap-x-8 sm:px-6 sm:text-[14px] lg:gap-x-10 lg:px-8 lg:text-[15px]">
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  className="relative transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-[1760px] px-4 py-5 sm:px-6 lg:px-8">
        <HeroBanner banners={heroBanners} />
      </section>

      <DealerShowcase />

      <section className="mx-auto w-full max-w-[1760px] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const startIdx = categoryIndex * 5;
            const endIdx = startIdx + 5;
            const categoryProducts = products.slice(startIdx, endIdx);

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="text-[24px] font-bold tracking-[-0.01em] text-[#1a1a1a] sm:text-[28px]">
                    {category}
                  </h2>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-[#3a3a3a] via-[#3a3a3a]/50 to-transparent" />
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 rounded-full bg-[#3a3a3a] px-4 py-2 text-[12px] font-bold !text-white transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-lg hover:!text-white sm:text-[13px]"
                  >
                    Tümünü Gör
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 stroke-white transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      title={product.title}
                      imageSrc={product.imageSrc}
                      imageAlt={product.imageAlt}
                      badge={product.badge}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      promoLabel={product.promoLabel}
                      promoAmount={product.promoAmount}
                      oldPrice={product.oldPrice}
                      price={product.price}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1760px] px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex h-full flex-col">
              <a href="#" className="group block overflow-hidden rounded-[8px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  className="h-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>
              <div className="pt-4">
                <h3 className="text-[21px] font-semibold leading-[1.18] tracking-[-0.01em] text-[#3f3f3f] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                  {post.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.45] text-[#606060] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-[30px] text-transparent" aria-hidden="true">
                  <span>.</span>
                  <span>.</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-[14px]">
                  <a
                    href="#"
                    className="font-medium text-[#ef7d22] underline underline-offset-2 transition-colors duration-200 hover:text-[#d46811]"
                  >
                    Devamini Oku
                  </a>
                  <span className="text-[#595959]">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
