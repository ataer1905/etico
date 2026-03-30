type BrandLogoProps = {
  alt: string;
  src: string;
};

export function BrandLogo({ alt, src }: BrandLogoProps) {
  return (
    <div className="flex shrink-0 items-center">
      <div className="flex min-w-0 items-center py-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="block h-[60px] w-auto object-contain sm:h-[66px] lg:h-[72px]"
        />
      </div>
    </div>
  );
}
