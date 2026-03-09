import Image from "next/image";

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "Devops" },
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

function LogoRow() {
  const items = [...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS];

  return (
    <div
      className={[
        "flex w-max items-center",
        "gap-16 md:gap-24",
        "py-6",
        "animate-marquee-slow",
      ].join(" ")}
    >
      {items.map((logo, idx) => (
        <div
          key={`${logo.alt}-${idx}`}
          className="flex items-center justify-center"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={220}
            height={90}
            className={[
              "w-auto object-contain",
              "h-12 md:h-16",
              "opacity-50 grayscale",
              "transition duration-500",
              "hover:opacity-100 hover:grayscale-0 hover:scale-105",
            ].join(" ")}
          />
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
      aria-label="Company logos"
    >
      {/* fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />

      {/* frame */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="px-6 py-10">
          <LogoRow />
        </div>
      </div>
    </div>
  );
}