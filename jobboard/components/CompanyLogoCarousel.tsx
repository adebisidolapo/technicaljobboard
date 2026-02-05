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
  // Duplicate enough times so it never “runs out” on wide screens
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
        "flex w-max items-center gap-12 md:gap-16 py-3 select-none",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      ].join(" ")}
    >
      {items.map((logo, idx) => (
        <div key={`${logo.alt}-${idx}`} className="flex items-center justify-center">
          <div className="group flex h-12 md:h-14 items-center justify-center px-3 md:px-4">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={60}
              className="h-8 md:h-10 w-auto object-contain opacity-60 grayscale
                         transition duration-300
                         group-hover:opacity-100 group-hover:grayscale-0"
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
    <div className="relative">
      {/* Soft fades at edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Marquee frame */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="px-6 py-6">
          <LogoRow />
          <div className="mt-2 opacity-70">
            <LogoRow reverse ariaHidden />
          </div>
        </div>
      </div>
    </div>
  );
}
