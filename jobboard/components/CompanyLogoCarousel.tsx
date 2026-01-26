// components/CompanyLogoCarousel.tsx

type Logo = { name: string; src: string };

const LOGOS: Logo[] = [
  { name: "Google", src: "/logos/google.svg" },
  { name: "Microsoft", src: "/logos/microsoft.svg" },
  { name: "Amazon", src: "/logos/amazon.svg" },
  { name: "Meta", src: "/logos/meta.svg" },
  { name: "Netflix", src: "/logos/netflix.svg" },
  { name: "Stripe", src: "/logos/stripe.svg" },
  { name: "Shopify", src: "/logos/shopify.svg" },
  { name: "Adobe", src: "/logos/adobe.svg" },
];

function LogoRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div
      className={[
        "flex w-max items-center gap-10 md:gap-14 py-3",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      ].join(" ")}
    >
      {items.map((logo, idx) => (
        <div key={`${logo.name}-${idx}`} className="flex items-center justify-center">
          <div className="group flex h-12 md:h-14 items-center justify-center px-4 md:px-6">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-7 md:h-8 w-auto object-contain opacity-60 grayscale
                         transition duration-300
                         group-hover:opacity-100 group-hover:grayscale-0"
              loading="lazy"
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="px-6 py-6">
          <LogoRow />
          <div className="mt-2 opacity-70">
            <LogoRow reverse />
          </div>
        </div>
      </div>
    </div>
  );
}
