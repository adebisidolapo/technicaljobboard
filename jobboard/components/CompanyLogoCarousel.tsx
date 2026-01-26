// components/CompanyLogoCarousel.tsx
"use client";

import React from "react";

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "Devops" },
  { src: "/Hiredengineer.png", alt: "HiredEngineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

function LogoItem({ src, alt }: CompanyLogo) {
  const [ok, setOk] = React.useState(true);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-3">
      {ok ? (
        <img
          src={src}
          alt={alt}
          onError={() => setOk(false)}
          className="h-10 w-auto object-contain opacity-70 grayscale"
        />
      ) : (
        <div className="h-10 w-28 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-500">
          Missing
        </div>
      )}

      <div className="mt-2 text-[11px] text-slate-500">
        {alt} — <span className="font-mono">{src}</span>
      </div>
    </div>
  );
}

export default function CompanyLogoCarousel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-slate-800 mb-3">
        Logos Debug Preview
      </div>

      <div className="flex flex-wrap gap-4">
        {COMPANY_LOGOS.map((l) => (
          <LogoItem key={l.src} src={l.src} alt={l.alt} />
        ))}
      </div>
    </div>
  );
}
