"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "Devops" },
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

export default function CompanyLogoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % COMPANY_LOGOS.length);
    }, 2600);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="region"
      aria-label="Company logos"
      className="relative w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white"
    >
      {/* soft edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />

      {/* track */}
      <div className="relative h-[140px] sm:h-[170px] md:h-[190px] lg:h-[210px] w-full">
        {COMPANY_LOGOS.map((logo, i) => {
          const active = i === index;

          return (
            <div
              key={logo.alt}
              className={[
                "absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out",
                active
                  ? "opacity-100 translate-x-0 scale-100"
                  : i < index
                  ? "opacity-0 -translate-x-24 scale-95"
                  : "opacity-0 translate-x-24 scale-95",
              ].join(" ")}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={520}
                height={180}
                priority={i === 0}
                className={[
                  "w-auto object-contain",
                  "h-16 sm:h-20 md:h-24 lg:h-28",
                  "grayscale opacity-70",
                  "transition duration-700",
                ].join(" ")}
              />
            </div>
          );
        })}
      </div>

      {/* indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {COMPANY_LOGOS.map((logo, i) => {
          const active = i === index;
          return (
            <button
              key={logo.alt}
              type="button"
              aria-label={`Show ${logo.alt}`}
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                active
                  ? "w-8 bg-[var(--brand-purple)]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}