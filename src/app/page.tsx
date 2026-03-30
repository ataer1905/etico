"use client";

import { BrandLogo } from "@/components/brand-logo";
import { DealerShowcase } from "@/components/dealer-showcase";
import { HeroBanner } from "@/components/hero-banner";
import { ProductCard, type ProductCardProps } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { useCatalogStore } from "@/lib/catalog-store";
import { useHomepageContent } from "@/lib/site-content";

type CatalogProduct = ProductCardProps & { id: number };

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
  const homepageContent = useHomepageContent();
  const { categories: adminCategories, products: adminProducts } = useCatalogStore();

  const utilityLinks = homepageContent.utilityLinks;
  const heroBanners = homepageContent.heroBanners;
  const blogPosts = homepageContent.blogPosts;
  const categories = adminCategories
    .filter((category) => category.status === "active" && !category.parent)
    .sort((a, b) => a.order - b.order)
    .map((category) => category.name);

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <header className="border-b border-[var(--color-line)] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-end px-5 py-2.5 text-[12px] text-[var(--color-muted)] sm:px-8 lg:px-10">
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
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-4 py-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-5 lg:px-8">
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:gap-3">
              <a
                href="#"
                className="flex shrink-0 items-center"
                aria-label="Cagdas Isi ana sayfa"
              >
                <BrandLogo alt="Cagdas Isi" src="/branding/cagdas-isi-logo.png" />
              </a>

              <label className="group relative min-w-0 w-full lg:max-w-[700px] lg:flex-1">
                <span className="sr-only">Arama</span>
                <input
                  type="search"
                  name="query"
                  placeholder="Arama"
                  className="h-11 w-full rounded-none border border-[var(--color-line)] bg-[var(--color-search)] px-5 pr-14 text-[18px] tracking-[-0.03em] text-[var(--color-ink)] outline-none transition-colors duration-200 placeholder:text-[var(--color-ink)]/95 focus:border-[var(--color-accent)] sm:h-[52px] sm:text-[21px]"
                />
                <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[var(--color-ink)] transition-colors duration-200 group-focus-within:text-[var(--color-accent)]">
                  <SearchIcon />
                </span>
              </label>
            </div>

            <nav aria-label="Hesap islemleri" className="shrink-0 lg:pl-3">
              <ul className="flex items-start justify-between gap-5 sm:gap-7">
                <li>
                  <a
                    href="#"
                    className="flex min-w-16 flex-col items-center gap-1.5 text-center text-[13px] leading-tight tracking-[-0.03em] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    <HeartIcon />
                    <span>Favorilerim</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex min-w-16 flex-col items-center gap-1.5 text-center text-[13px] leading-tight tracking-[-0.03em] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    <BagIcon />
                    <span>Sepetim</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex min-w-16 flex-col items-center gap-1.5 text-center text-[13px] leading-tight tracking-[-0.03em] transition-colors duration-200 hover:text-[var(--color-accent)]"
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
          <ul className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-3 text-[12px] font-medium tracking-[-0.01em] sm:gap-x-7 sm:px-6 sm:text-[13px] lg:gap-x-9 lg:px-8 lg:text-[14px]">
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

      <section className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
        <HeroBanner banners={heroBanners} />
      </section>

      <DealerShowcase />

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {categories.map((category, categoryIndex) => {
            const categoryProducts = adminProducts
              .filter(
                (product) =>
                  product.status === "active" && product.category === category,
              )
              .slice(0, 5)
              .map(
                (product): CatalogProduct => ({
                  id: Number(product.id.replace(/\D/g, "")) || categoryIndex + 1,
                  title: product.name,
                  imageSrc: product.image,
                  imageAlt: product.name,
                  badge: product.featured ? "Avantajli" : undefined,
                  rating: "4,8",
                  reviewCount: product.stock * 3 + 24,
                  oldPrice: product.salePrice
                    ? `${product.price.toLocaleString("tr-TR")} TL`
                    : undefined,
                  price: `${
                    (product.salePrice ?? product.price).toLocaleString("tr-TR")
                  } TL`,
                }),
              );

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="text-[20px] font-bold tracking-[-0.01em] text-[#1a1a1a] sm:text-[24px]">
                    {category}
                  </h2>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-[#3a3a3a] via-[#3a3a3a]/50 to-transparent" />
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 rounded-full bg-[#3a3a3a] px-3.5 py-2 text-[11px] font-bold !text-white transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-lg hover:!text-white sm:text-[12px]"
                  >
                    Tumunu Gor
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 stroke-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={`${category}-${product.id}`}
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

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex h-full flex-col">
              <a href="#" className="group block overflow-hidden rounded-[8px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  className="h-[210px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>
              <div className="pt-4">
                <h3 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#3f3f3f] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.42] text-[#606060] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                  {post.excerpt}
                </p>
                <div
                  className="mt-2 flex items-center justify-between text-[22px] text-transparent"
                  aria-hidden="true"
                >
                  <span>.</span>
                  <span>.</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[13px]">
                  <a
                    href="#"
                    className="font-medium text-[#3e5c76] underline underline-offset-2 transition-colors duration-200 hover:text-[#2f4a61]"
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
