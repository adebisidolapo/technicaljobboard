"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "DevOps Consultant" },
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

export default function CompanyLogoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % COMPANY_LOGOS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── MOBILE — one logo at a time, big and bold ── */}
      <div className="block bg-white py-10 sm:hidden">
        <div className="flex items-center justify-center px-8" style={{ minHeight: 100 }}>
          {COMPANY_LOGOS.map((logo, i) => (
            <div
              key={logo.alt}
              className="absolute transition-all duration-700"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? "scale(1)" : "scale(0.92)",
                pointerEvents: i === current ? "auto" : "none",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={240}
                height={90}
                className="h-14 w-auto object-contain grayscale"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {COMPANY_LOGOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-5 bg-slate-400" : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP — all logos in a row ── */}
      <div className="hidden bg-white py-12 sm:block">
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

          <div className="company-logo-marquee flex w-max items-center gap-16 md:gap-24 lg:gap-28">
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="flex items-center justify-center opacity-40 grayscale transition duration-300 hover:opacity-80 hover:grayscale-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={70}
                  className="h-12 w-auto object-contain md:h-14"
                  priority={i < COMPANY_LOGOS.length}
                />
              </div>
            ))}
          </div>
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
    </>
  );
}