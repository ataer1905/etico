const dealers = [
  { name: "Alarko Carrier", src: "/bayiler/alarko.jpg" },
  { name: "Aldag", src: "/bayiler/aldag.jpeg" },
  { name: "Armas", src: "/bayiler/armas.png" },
  { name: "Ayvaz", src: "/bayiler/ayvaz.jpg" },
  { name: "Duyar", src: "/bayiler/duyar.png" },
  { name: "Eska Valve", src: "/bayiler/eskavalve.png" },
  { name: "Kalde", src: "/bayiler/kalde.jpg" },
  { name: "Kas Vana", src: "/bayiler/kasvana.jpg" },
  { name: "Klepsan", src: "/bayiler/klepsan.png" },
  { name: "Konsan", src: "/bayiler/konsan.png" },
  { name: "Madas", src: "/bayiler/madas.jpg" },
  { name: "Ontrol", src: "/bayiler/ontrol.jpg" },
  { name: "Pakkens", src: "/bayiler/pakkens.jpg" },
  { name: "73 Pepe", src: "/bayiler/pepe.jpg" },
  { name: "GPD", src: "/bayiler/sarimalzemeler.jpg" },
  { name: "Standart Vana", src: "/bayiler/standart vana.png" },
  { name: "Standart", src: "/bayiler/standart.png" },
  { name: "TDS Tekniciler", src: "/bayiler/tekneciler.jpg" },
  { name: "Teknopomp", src: "/bayiler/teknopomp.jpeg" },
  { name: "Termo", src: "/bayiler/termo.jpg" },
  { name: "Trakya Dokum", src: "/bayiler/trakyadokum.jpg" },
];

export function DealerShowcase() {
  return (
    <section className="mx-auto w-full max-w-[1760px] px-4 pb-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-[#e3ddd3] bg-[linear-gradient(180deg,#fcfbf8_0%,#f7f4ef_100%)] p-5 sm:p-6 lg:p-7">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f685e]">
              Guvenilir Is Ortaklari
            </p>
            <h2 className="mt-1 text-[26px] font-bold tracking-[-0.02em] text-[#1c1c1c] sm:text-[32px]">
              Bayilerimiz
            </h2>
          </div>
          <p className="hidden text-[13px] text-[#7d766d] md:block">
            Sektorun lider markalariyla guclu tedarik zinciri
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {dealers.map((dealer) => (
            <article
              key={dealer.name}
              className="group flex h-[96px] items-center justify-center rounded-xl border border-[#e7e2d9] bg-white/85 p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cfc8be] hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.09)]"
              title={dealer.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dealer.src}
                alt={dealer.name}
                loading="lazy"
                decoding="async"
                className="max-h-12 w-auto object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
