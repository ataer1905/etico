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

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.35-7-10.04A4.18 4.18 0 0 1 9.2 5.7c1.17 0 2.3.48 3.1 1.34.8-.86 1.93-1.34 3.1-1.34A4.18 4.18 0 0 1 19.6 9.96C19.6 15.65 12 20 12 20Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 fill-[#3a3a3a] text-[#3a3a3a]"
      viewBox="0 0 24 24"
    >
      <path d="m12 2.4 2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.47l-5.9 3.1 1.13-6.57L2.45 9.34l6.6-.96L12 2.4Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5h2l1.4 8.1a2 2 0 0 0 2 1.67h7.9a2 2 0 0 0 2-1.55L20 7H7" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export function ProductCard({
  title,
  imageSrc,
  imageAlt,
  badge,
  rating,
  reviewCount,
  promoLabel,
  promoAmount,
  oldPrice,
  price,
}: ProductCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[16px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-white">
        {/* Badge */}
        {badge ? (
          <span
            className={`absolute left-3 top-3 z-10 inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${
              badge === "Avantajli"
                ? "bg-[#14a83a]"
                : badge === "9 Taksit"
                  ? "bg-[#6b36e7]"
                  : "bg-[#3a3a3a]"
            }`}
          >
            {badge}
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Favorilere ekle"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#4a4a4a] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
        >
          <HeartIcon />
        </button>

        {/* Image */}
        <div className="flex h-[180px] items-center justify-center overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-3">
        {/* Title */}
        <h3 className="min-h-[40px] overflow-hidden text-[13px] font-semibold leading-[1.35] text-[#1a1a1a] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px]">
          <StarIcon />
          <span className="font-semibold text-[#222]">{rating}</span>
          <span className="text-[#767676]">({reviewCount})</span>
        </div>

        {/* Promo Section */}
        {promoLabel && promoAmount ? (
          <div className="mt-2 inline-flex items-center gap-1">
            <span className="text-[10px] font-semibold text-[#6b36e7]">{promoLabel}</span>
            <span className="inline-flex items-center rounded-md bg-[#6b36e7] px-2 py-1 text-[10px] font-bold text-white">
              {promoAmount}
            </span>
          </div>
        ) : (
          <div className="mt-2 h-5" />
        )}

        {/* Divider */}
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-[#e8e8e8] to-transparent" />

        {/* Price Section */}
        <div className="mt-2 flex items-end justify-between">
          <div className="flex flex-col">
            {oldPrice ? (
              <p className="text-[10px] font-medium text-[#999] line-through">
                {oldPrice}
              </p>
            ) : null}
            <p className="[font-family:'Arial','Helvetica',sans-serif] text-[12px] font-black leading-[1.2] tracking-[-0.01em] text-[#1a1a1a]">
              {price}
            </p>
          </div>

          {/* Cart Button */}
          <button
            type="button"
            aria-label="Sepete ekle"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a3a3a] text-white shadow-lg transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-[0_4px_12px_rgba(58,58,58,0.3)] active:scale-95"
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
