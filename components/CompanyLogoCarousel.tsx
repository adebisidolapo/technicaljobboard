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
    <div className="relative w-full overflow-hidden bg-white py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

      <div className="company-logo-marquee flex w-max items-center gap-16 sm:gap-20 md:gap-24 lg:gap-28">
        {LOOP_LOGOS.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center grayscale opacity-40 transition duration-300 hover:opacity-80 hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={70}
              className="h-10 w-auto object-contain sm:h-12 md:h-14"
              priority={i < COMPANY_LOGOS.length}
            />
          </div>
        ))}
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