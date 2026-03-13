"use client";

import Image from "next/image";

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "DevOps Consultant" },
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

const LOOP_LOGOS = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

export default function CompanyLogoCarousel() {
  return (
    <div
      role="region"
      aria-label="Companies hiring through us"
      className="relative w-full overflow-hidden"
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/95 to-transparent sm:w-24 lg:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/95 to-transparent sm:w-24 lg:w-32" />

      {/* Carousel */}
      <div className="py-6 sm:py-8">
        <div className="company-logo-marquee flex w-max items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">

          {LOOP_LOGOS.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="group flex h-[90px] min-w-[170px] items-center justify-center rounded-2xl border border-slate-200/70 bg-white px-6 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)] sm:h-[100px] sm:min-w-[200px] sm:px-7 md:h-[110px] md:min-w-[220px] lg:h-[120px] lg:min-w-[240px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={80}
                className="h-10 w-auto object-contain opacity-90 transition duration-300 group-hover:opacity-100 sm:h-11 md:h-12 lg:h-14"
                priority={i < COMPANY_LOGOS.length}
              />
            </div>
          ))}

        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .company-logo-marquee {
          animation: company-marquee 34s linear infinite;
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