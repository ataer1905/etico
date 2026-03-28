"use client";

export type ProductBadge = "Avantajli" | "5G" | "9 Taksit";

export type ProductCardProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  badge?: ProductBadge;
  rating: string;
  reviewCount: number;
  promoLabel?: string;
  promoAmount?: string;
  oldPrice?: string;
  price: string;
};

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function splitBrandAndName(title: string): { brand: string; productName: string } {
  const normalized = toTitleCase(title).replace(/\s+/g, " ").trim();
  const words = normalized.split(" ");
  return {
    brand: words[0] ?? normalized,
    productName: words.slice(1).join(" ").trim() || normalized,
  };
}

function calcDiscount(oldStr: string, newStr: string): number | null {
  const parse = (s: string) =>
    parseFloat(s.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, ""));
  const oldValue = parse(oldStr);
  const newValue = parse(newStr);
  if (!oldValue || !newValue || oldValue <= newValue) return null;
  return Math.round(((oldValue - newValue) / oldValue) * 100);
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5h2l1.4 8.1a2 2 0 0 0 2 1.67h7.9a2 2 0 0 0 2-1.55L20 7H7" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export function ProductCard({ title, imageSrc, imageAlt, oldPrice, price }: ProductCardProps) {
  const { brand, productName } = splitBrandAndName(title);
  const discount = oldPrice ? calcDiscount(oldPrice, price) : null;
  const isDiscounted = Boolean(oldPrice);

  return (
    <article className="flex h-full min-h-[470px] flex-col overflow-hidden rounded-[6px] border border-[#e4e4e4] bg-[#fcfcfc] transition-colors duration-200 hover:border-[#f28a1d]">
      <div className="relative flex h-[250px] items-center justify-center bg-[#f7f7f7] px-4 py-4">
        {discount && (
          <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f28a1d] text-[13px] font-bold text-white">
            %{discount}
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col px-[18px] pb-[16px] pt-[14px]">
        <div className="min-h-[116px]">
          <p className="text-[16px] font-semibold leading-[1.2] text-[#2f2f2f]">{brand}</p>
          <p className="mt-1 text-[14px] font-normal leading-[1.35] text-[#4a4a4a] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
            {productName}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#ececec] pt-3">
          <div className="flex min-w-0 flex-col leading-tight">
            {oldPrice && (
              <span className="mb-1 text-[14px] font-normal text-[#b8b8b8] line-through">
                {oldPrice}
              </span>
            )}
            <span
              className={`text-[20px] font-bold tracking-[-0.01em] ${
                isDiscounted ? "text-[#f28a1d]" : "text-[#4a4a4a]"
              }`}
            >
              {price}
            </span>
          </div>

          <button
            type="button"
            aria-label="Sepete ekle"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#f28a1d] text-white transition-colors duration-200 hover:bg-[#de7f1d]"
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
