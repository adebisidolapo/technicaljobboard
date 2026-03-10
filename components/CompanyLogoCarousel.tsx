"use client";

import Image from "next/image";

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "Devops" },
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

const LOOP_LOGOS = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

export default function CompanyLogoCarousel() {
  return (
    <div
      role="region"
      aria-label="Company logos"
      className="relative w-full overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24 lg:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24 lg:w-32" />

      <div className="py-4 sm:py-6 md:py-8">
        <div className="company-logo-marquee flex w-max items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20">
          {LOOP_LOGOS.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex h-[110px] min-w-[180px] items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:h-[130px] sm:min-w-[220px] sm:px-8 md:h-[150px] md:min-w-[260px] lg:h-[170px] lg:min-w-[300px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={220}
                height={90}
                className="h-12 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14 md:h-16 lg:h-20"
                priority={i < COMPANY_LOGOS.length}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .company-logo-marquee {
          animation: company-marquee 28s linear infinite;
        }

        .company-logo-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes company-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}