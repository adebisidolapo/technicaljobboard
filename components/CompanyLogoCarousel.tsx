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

export default function CompanyLogoCarousel() {
  return (
    <div className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <p className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:mb-12">
          Companies Hiring Through Us
        </p>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 md:gap-x-20 lg:gap-x-24">
          {COMPANY_LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center opacity-40 grayscale transition duration-300 hover:opacity-80 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={70}
                className="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}