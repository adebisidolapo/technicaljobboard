import Image from "next/image";

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "Devops" },
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

function LogoRow({
  reverse = false,
  ariaHidden = false,
}: {
  reverse?: boolean;
  ariaHidden?: boolean;
}) {
  // duplicate enough times so it never “runs out” on wide screens
  const items = [
    ...COMPANY_LOGOS,
    ...COMPANY_LOGOS,
    ...COMPANY_LOGOS,
    ...COMPANY_LOGOS,
  ];

  return (
    <div
      aria-hidden={ariaHidden}
      className={[
        "flex w-max items-center",
        "gap-10 sm:gap-12 md:gap-16",
        "py-3 select-none",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      ].join(" ")}
    >
      {items.map((logo, idx) => (
        <div
          key={`${logo.alt}-${idx}`}
          className="flex items-center justify-center"
        >
          <div className="group flex items-center justify-center px-2 sm:px-3">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={72}
              className={[
                "w-auto object-contain",
                "h-7 sm:h-8 md:h-10",
                "opacity-60 grayscale",
                "transition duration-300",
                "group-hover:opacity-100 group-hover:grayscale-0",
              ].join(" ")}
              priority={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CompanyLogoCarousel() {
  return (
    <div
      className="relative"
      role="region"
      aria-label="Company logos marquee"
    >
      {/* Soft fades at edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 md:w-20 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 md:w-20 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />

      {/* Marquee frame */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="px-4 py-5 sm:px-6 sm:py-6">
          {/* Primary row (screen reader visible) */}
          <LogoRow />

          {/* Secondary row (purely decorative) */}
          <div className="mt-2 opacity-70">
            <LogoRow reverse ariaHidden />
          </div>
        </div>
      </div>
    </div>
  );
}