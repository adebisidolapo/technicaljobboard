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
      className="relative w-full overflow-hidden bg-white py-2"
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

      {/* Carousel */}
      <div className="py-4 sm:py-6">
        <div className="company-logo-marquee flex w-max items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24">
          {LOOP_LOGOS.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex items-center justify-center opacity-50 grayscale transition duration-300 hover:opacity-90 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={60}
                className="h-8 w-auto object-contain sm:h-10 md:h-12"
                priority={i < COMPANY_LOGOS.length}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .company-logo-marquee {
          animation: company-marquee 34s linear infinite;
        }
        .company-logo-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes company-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}