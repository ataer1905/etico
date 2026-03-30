"use client";

import { useState } from "react";

type HeroBannerProps = {
  banners: string[];
};

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 ${left ? "" : "rotate-180"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = banners.length;
  const currentBanner = banners[activeIndex] ?? banners[0] ?? "";

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <article className="relative min-h-[270px] overflow-hidden rounded-[18px] border border-[#e5ddd1] bg-[#d8ecf6] md:min-h-[360px]">
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${currentBanner}')`,
          backgroundSize: "100% 100%",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.14)_100%)]" />

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Onceki kampanya"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/92 text-[#2b2b2b] shadow-sm transition hover:bg-white"
          >
            <ArrowIcon left />
          </button>
          <button
            type="button"
            aria-label="Sonraki kampanya"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/92 text-[#2b2b2b] shadow-sm transition hover:bg-white"
          >
            <ArrowIcon />
          </button>
        </>
      ) : null}

      <span className="absolute bottom-3 right-3 z-20 rounded-md bg-black/45 px-2 py-1 text-[12px] font-semibold text-white">
        {activeIndex + 1} / {total || 1}
      </span>
    </article>
  );
}
