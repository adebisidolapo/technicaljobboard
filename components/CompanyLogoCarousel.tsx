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
    }, 3200);

    return () => clearInterval(id);
  }, []);

  return (
    <div role="region" aria-label="Company logos" className="relative w-full">
      <div className="relative h-[150px] sm:h-[180px] md:h-[220px] lg:h-[240px] w-full overflow-hidden">
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
                  ? "opacity-0 -translate-x-16 scale-95"
                  : "opacity-0 translate-x-16 scale-95",
              ].join(" ")}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={700}
                height={220}
                priority={i === 0}
                className={[
                  "w-auto object-contain",
                  "h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36",
                  "grayscale opacity-50",
                  "transition-all duration-700",
                ].join(" ")}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {COMPANY_LOGOS.map((logo, i) => {
          const active = i === index;

          return (
            <button
              key={logo.alt}
              type="button"
              aria-label={`Show ${logo.alt}`}
              onClick={() => setIndex(i)}
              className={[
                "h-2 rounded-full transition-all duration-300",
                active
                  ? "w-8 bg-slate-500"
                  : "w-2 bg-slate-300 hover:bg-slate-400",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}