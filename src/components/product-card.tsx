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
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.2 5.2h2.1l1.2 4.2h11.1l-1.7 5.8H8.8" />
      <path d="M7.5 9.4h10.9" />
      <path d="M8.6 11.7h8.8" />
      <path d="M9.3 13.9h7.5" />
      <path d="M11.7 9.4l-.55 5.3" />
      <path d="M14.7 9.4l-.35 5.3" />
      <circle cx="9.4" cy="18.3" r="1.15" />
      <circle cx="15.2" cy="18.3" r="1.15" />
    </svg>
  );
}

export function ProductCard({ title, imageSrc, imageAlt, oldPrice, price }: ProductCardProps) {
  const { brand, productName } = splitBrandAndName(title);
  const discount = oldPrice ? calcDiscount(oldPrice, price) : null;
  const isDiscounted = Boolean(oldPrice);

  return (
    <article className="flex h-full min-h-[364px] flex-col overflow-hidden rounded-[10px] border border-[#e6e6e6] bg-[#fcfcfc] shadow-[0_1px_8px_rgba(0,0,0,0.035)] transition-all duration-200 hover:border-[#c8d2dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.065)]">
      <div className="relative flex h-[170px] items-center justify-center border-b border-[#efefef] bg-[#fafafa] px-4 py-4 sm:h-[184px]">
        {discount && (
          <span className="absolute left-3 top-3 rounded-full border border-[#d5dee6] bg-[#f1f5f8] px-2 py-0.5 text-[10px] font-semibold text-[#3e5c76]">
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

      <div className="flex flex-1 flex-col px-4 pb-3.5 pt-3">
        <div className="min-h-[78px]">
          <p className="text-[14px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#2f2f2f]">
            {brand}
          </p>
          <p className="mt-1 text-[13px] font-normal leading-[1.3] text-[#4f4f4f] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
            {productName}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#ececec] pt-2">
          <div className="flex min-w-0 flex-col leading-tight">
            {oldPrice && (
              <span className="mb-0.5 text-[11px] font-normal text-[#b9b9b9] line-through">
                {oldPrice}
              </span>
            )}
            <span
              className={`text-[18px] font-semibold tracking-[-0.02em] sm:text-[19px] ${
                isDiscounted ? "text-[#3e5c76]" : "text-[#4a4a4a]"
              }`}
            >
              {price}
            </span>
          </div>

          <button
            type="button"
            aria-label="Sepete ekle"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d2dbe3] bg-white text-[#3e5c76] transition-colors duration-200 hover:border-[#3e5c76] hover:bg-[#f5f8fb]"
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
