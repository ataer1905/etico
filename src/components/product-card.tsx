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
      className="h-[24px] w-[24px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
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
    <article className="flex h-full min-h-[470px] flex-col overflow-hidden rounded-[6px] border border-[#e4e4e4] bg-[#fcfcfc] transition-colors duration-200 hover:border-[#3e5c76]">
      <div className="relative flex h-[250px] items-center justify-center bg-[#f7f7f7] px-4 py-4">
        {discount && (
          <span className="absolute right-4 top-4 flex h-[46px] w-[46px] items-center justify-center rounded-full border border-white/70 bg-[radial-gradient(circle_at_30%_25%,#7a97b3_0%,#587898_32%,#3e5c76_60%,#2f475d_100%)] text-[13px] font-extrabold text-white shadow-[0_8px_18px_rgba(62,92,118,0.4)]">
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
                isDiscounted ? "text-[#3e5c76]" : "text-[#4a4a4a]"
              }`}
            >
              {price}
            </span>
          </div>

          <button
            type="button"
            aria-label="Sepete ekle"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#3e5c76] bg-white text-[#3e5c76] transition-colors duration-200 hover:border-[#2f4a61] hover:text-[#2f4a61]"
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
