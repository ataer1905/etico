"use client";

import { useState } from "react";

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

function calcDiscount(oldStr: string, newStr: string): number | null {
  const parse = (s: string) =>
    parseFloat(s.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, ""));
  const o = parse(oldStr);
  const n = parse(newStr);
  if (!o || !n || o <= n) return null;
  return Math.round(((o - n) / o) * 100);
}

const BADGE: Record<ProductBadge, { label: string; bg: string; color: string }> = {
  Avantajli: { label: "Avantajli", bg: "#dcfce7", color: "#15803d" },
  "9 Taksit": { label: "9 Taksit", bg: "#ede9fe", color: "#7c3aed" },
  "5G": { label: "5G", bg: "#fff7ed", color: "#c2410c" },
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-all duration-200"
      viewBox="0 0 24 24"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "currentColor"}
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
    <svg aria-hidden="true" className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 24 24">
      <path d="m12 2.4 2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.47l-5.9 3.1 1.13-6.57L2.45 9.34l6.6-.96L12 2.4Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
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
  const [wishlisted, setWishlisted] = useState(false);
  const discountPct = oldPrice ? calcDiscount(oldPrice, price) : null;
  const badgeInfo = badge ? BADGE[badge] : null;

  return (
    <article
      className="
      group relative flex flex-col overflow-hidden
      rounded-2xl bg-white
      border border-[#ede8df]
      shadow-[0_1px_6px_rgba(0,0,0,0.07)]
      transition-all duration-300
      hover:-translate-y-1.5
      hover:shadow-[0_12px_32px_rgba(0,0,0,0.13)]
      hover:border-[#cfc8be]
    "
    >
      <div className="relative overflow-hidden bg-[#f7f4ef] border-b border-[#ede8df]">
        {badgeInfo && (
          <span
            className="absolute left-3 top-3 z-10 inline-flex items-center
                       rounded-full px-2.5 py-1 text-[10px] font-bold
                       tracking-wide shadow-sm"
            style={{ backgroundColor: badgeInfo.bg, color: badgeInfo.color }}
          >
            {badgeInfo.label}
          </span>
        )}

        {discountPct && (
          <span
            className="absolute bottom-3 left-3 z-10 inline-flex items-center
                           rounded-md bg-red-500 px-2 py-0.5
                           text-[10px] font-bold text-white shadow-sm"
          >
            %{discountPct} Indirim
          </span>
        )}

        <button
          type="button"
          aria-label={wishlisted ? "Favorilerden cikar" : "Favorilere ekle"}
          onClick={() => setWishlisted((v) => !v)}
          className={`
            absolute right-3 top-3 z-10
            flex h-8 w-8 items-center justify-center
            rounded-full shadow-md backdrop-blur-sm
            transition-all duration-200 active:scale-95
            ${
              wishlisted
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-white/90 text-[#bbb] hover:bg-white hover:text-red-400"
            }
          `}
        >
          <HeartIcon filled={wishlisted} />
        </button>

        <div className="flex h-[190px] items-center justify-center p-4 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain
                       transition-transform duration-300
                       group-hover:scale-[1.06]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3
          className="
          min-h-[38px] text-[13px] font-semibold
          leading-[1.4] text-[#1a1a1a]
          [display:-webkit-box] [-webkit-box-orient:vertical]
          [-webkit-line-clamp:2] overflow-hidden
        "
        >
          {toTitleCase(title)}
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <StarIcon />
          <span className="text-[12px] font-bold text-[#1a1a1a]">{rating}</span>
          <span className="text-[11px] text-[#aaa]">({reviewCount.toLocaleString("tr-TR")})</span>
        </div>

        <div className="mt-2 min-h-[26px]">
          {promoLabel && promoAmount ? (
            <div
              className="inline-flex items-center gap-1.5
                            rounded-lg bg-violet-50 px-2.5 py-1"
            >
              <span className="text-[10px] font-medium text-violet-600">{promoLabel}</span>
              <span
                className="rounded bg-violet-600 px-1.5 py-0.5
                               text-[10px] font-bold text-white"
              >
                {promoAmount}
              </span>
            </div>
          ) : null}
        </div>

        <div className="my-3 h-px bg-[#ede8df]" />

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col leading-tight">
            {oldPrice && <span className="text-[10px] text-[#b0a898] line-through">{oldPrice}</span>}
            <span className="text-[15px] font-black tracking-tight text-[#1a1a1a]">{price}</span>
          </div>

          <button
            type="button"
            aria-label="Sepete ekle"
            className="
              flex items-center gap-1.5
              rounded-xl bg-[#3a3a3a]
              px-3 py-2
              text-[11px] font-bold text-white
              shadow-md
              transition-all duration-200
              hover:bg-[#1a1a1a]
              hover:shadow-[0_4px_14px_rgba(0,0,0,0.22)]
              active:scale-95
            "
          >
            <CartIcon />
            <span>Sepete Ekle</span>
          </button>
        </div>
      </div>
    </article>
  );
}
