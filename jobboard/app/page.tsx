"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  description: string;
};

type ListJob = {
  title: string;
  company: string;
  location: string;
  pay: string;
  posted: string;
  tags: string[];
};

const COMPANY_LOGOS = [
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/Devops.png", alt: "DevOps Team" },
  { src: "/Architects.png", alt: "Architects" },
  { src: "/logo.png", alt: "Technical Job Board" },
  { src: "/logo-removebg-preview.png", alt: "Brand Logo" },
];

const CATEGORIES = [
  "Healthcare IT",
  "Aerospace / Defense",
  "Architecture",
  "Project Management",
  "Construction / Building Systems",
  "Manufacturing / Production",
  "Field Service / Commissioning",
  "Quality / Compliance",
  "Maintenance / Reliability",
];

const FEATURED_JOBS: FeaturedJob[] = [
  {
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$110k – $150k",
    posted: "2 days ago",
    description: "Build fast, clean user experiences and modern workflows.",
  },
  {
    title: "Backend Engineer (Node/Go)",
    company: "TechNova",
    location: "Austin, TX",
    type: "Full-time",
    pay: "$115k – $170k",
    posted: "1 day ago",
    description: "Own APIs, services, and data flows across core systems.",
  },
  {
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $180k",
    posted: "1 day ago",
    description: "Improve CI/CD, deployments, observability, and reliability.",
  },
  {
    title: "Security Engineer",
    company: "SentinelWorks",
    location: "New York, NY",
    type: "Full-time",
    pay: "$130k – $190k",
    posted: "3 days ago",
    description: "Ship secure defaults and strengthen platform protections.",
  },
];

const LIST_JOBS: ListJob[] = [
  {
    title: "Maintenance Technician",
    company: "PlantWorks",
    location: "Houston, TX",
    pay: "$28–$38/hr",
    posted: "7 days ago",
    tags: ["Full-time", "On-site"],
  },
  {
    title: "Electrical Engineer",
    company: "Gridline",
    location: "Remote",
    pay: "$120k–$160k",
    posted: "4 days ago",
    tags: ["Remote", "Full-time", "Senior"],
  },
];

export default function Home() {
  // hero inputs
  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");

  // Featured carousel
  const featuredRef = useRef<HTMLDivElement | null>(null);

  const runHeroSearch = () => {
    const params = new URLSearchParams();
    if (heroQ.trim()) params.set("q", heroQ.trim());
    if (heroLoc.trim()) params.set("loc", heroLoc.trim());
    const qs = params.toString();
    window.location.href = qs ? `/all-jobs?${qs}` : "/all-jobs";
  };

const [categoryQuery, setCategoryQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");

const filteredCategories = CATEGORIES.filter((c) =>
  c.toLowerCase().includes(categoryQuery.toLowerCase())
);


  const logoGrid = useMemo(() => {
    // screenshot shows a “grid of many” — repeat to fill
    const items = [];
    for (let i = 0; i < 16; i++) items.push(COMPANY_LOGOS[i % COMPANY_LOGOS.length]);
    return items;
  }, []);

  // small reveal (optional, harmless)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="font-sans text-[#0F172A] bg-[#F3F6FB]">
      {/* ================= HERO (mint tint + glow like screenshot) ================= */}
      <section className="relative overflow-hidden bg-[#EEF6F2]">
        {/* subtle dot grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF6F2] via-[#EEF6F2] to-[#F3F6FB]" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center py-16 sm:py-20 md:py-24">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Curated roles • Remote friendly • Fast apply
            </div>

            <h1 className="mt-6 text-[2.1rem] sm:text-[2.7rem] md:text-[3.2rem] font-extrabold leading-tight tracking-tight text-[#0F172A]">
              Find{" "}
              <span className="relative inline-block">
                {/* green glow like screenshot */}
                <span
                  aria-hidden
                  className="absolute -inset-x-14 -inset-y-10 bg-emerald-400/12 blur-[70px] rounded-full"
                />
                <span
                  aria-hidden
                  className="absolute -inset-x-8 -inset-y-6 bg-emerald-400/16 blur-[42px] rounded-full"
                />
                <span className="relative text-emerald-600">Technical Jobs</span>
              </span>{" "}
              built for long-term careers
            </h1>

            <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Browse opportunities across engineering, infrastructure, cloud, security, and data — including
              remote options. Simple, clean, and focused on serious hiring.
            </p>

            {/* search */}
            <div className="mt-8">
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
                  <input
                    value={heroQ}
                    onChange={(e) => setHeroQ(e.target.value)}
                    type="text"
                    placeholder="Job title, keyword"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                  <input
                    value={heroLoc}
                    onChange={(e) => setHeroLoc(e.target.value)}
                    type="text"
                    placeholder="Location (Remote, Lagos, New York)"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                  <button
                    type="button"
                    onClick={runHeroSearch}
                    className="h-12 w-full md:w-auto rounded-xl px-6 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-[0_10px_26px_rgba(2,6,23,0.22)]"
                  >
                    Search Jobs
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-500">
                  <span>Popular</span>
                  {["Frontend", "DevOps", "Data", "Security"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setHeroQ(t);
                        setTimeout(runHeroSearch, 0);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-slate-300"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("featured");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

     {/* ================= TRUSTED BY TEAMS (NO BOX, bigger logos) ================= */}
<section className="bg-white py-20">
  <div className="max-w-7xl mx-auto px-6">
    {/* header */}
    <div className="text-center">
      <p className="text-[11px] tracking-[0.40em] text-slate-500 font-semibold uppercase">
        TRUSTED BY TEAMS
      </p>

      <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#0B1222] tracking-tight">
        Popular Companies We Have Worked With
      </h2>

      <p className="mt-4 text-sm md:text-base text-slate-600">
        A quick look at teams that trust TechnicalJobboard.
      </p>
    </div>

    {/* marquee area (no border/box) */}
    <div className="mt-14 relative overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Row 1 */}
      <div className="overflow-hidden">
        <div className="flex w-max items-center animate-marquee">
          {COMPANY_LOGOS.concat(COMPANY_LOGOS).concat(COMPANY_LOGOS).map((logo, idx) => (
            <div
              key={`r1-${logo.src}-${idx}`}
              className="mx-12 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 md:h-12 w-[150px] object-contain grayscale opacity-85"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-hidden mt-10">
        <div className="flex w-max items-center animate-marquee-reverse">
          {COMPANY_LOGOS.slice()
            .reverse()
            .concat(COMPANY_LOGOS.slice().reverse())
            .concat(COMPANY_LOGOS.slice().reverse())
            .map((logo, idx) => (
              <div
                key={`r2-${logo.src}-${idx}`}
                className="mx-12 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 w-[150px] object-contain grayscale opacity-80"
                  loading="lazy"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= CATEGORIES (Option 1: chips bar + search) ================= */}
<section className="relative overflow-hidden py-16 bg-[#F7F8FC]">
  {/* subtle background accents (different from company/featured) */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-40 left-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(16,185,129,0.09)] blur-3xl" />
    <div className="absolute -bottom-40 right-[-160px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.12)] blur-3xl" />
    <div
      className="absolute inset-0 opacity-[0.10]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.12) 1px, transparent 0)",
        backgroundSize: "30px 30px",
      }}
    />
  </div>

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <p className="text-[11px] tracking-[0.32em] uppercase text-slate-500 font-semibold">
          Categories
        </p>
        <h3 className="mt-3 text-2xl md:text-4xl font-extrabold text-[#0B1222] tracking-tight">
          Browse by category
        </h3>
        <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl">
          Search and swipe through categories — tap one to explore matching roles.
        </p>
      </div>

      {/* search input */}
      <div className="w-full md:w-[380px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="text-slate-400">⌕</span>
          <input
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
            placeholder="Search categories…"
            className="w-full bg-transparent outline-none text-sm text-slate-700"
          />
        </div>

        {selectedCategory && (
          <div className="mt-2 text-xs text-slate-500">
            Selected:{" "}
            <span className="font-semibold text-slate-700">{selectedCategory}</span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("");
                setCategoryQuery("");
              }}
              className="ml-2 text-[var(--brand-purple)] hover:underline font-semibold"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>

    {/* chips bar */}
    <div className="mt-10 relative">
      {/* fades on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#F7F8FC] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#F7F8FC] to-transparent z-10" />

      <div
        id="category-chips"
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth py-2 pr-10"
      >
        {/* “All” chip */}
        <button
          type="button"
          onClick={() => {
            setSelectedCategory("");
            setCategoryQuery("");
            window.location.href = "/all-jobs";
          }}
          className={[
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
            !selectedCategory
              ? "bg-[#0B1222] text-white border-[#0B1222]"
              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300",
          ].join(" ")}
        >
          All
        </button>

        {filteredCategories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                window.location.href = `/all-jobs?cat=${encodeURIComponent(cat)}`;
              }}
              className={[
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                active
                  ? "bg-[rgba(106,111,242,0.12)] text-[var(--brand-purple)] border-[rgba(106,111,242,0.25)]"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300",
              ].join(" ")}
            >
              <span
                className={[
                  "mr-2 inline-block h-2 w-2 rounded-full",
                  active ? "bg-[var(--brand-purple)]" : "bg-emerald-500/80",
                ].join(" ")}
              />
              {cat}
            </button>
          );
        })}
      </div>
    </div>

    {/* optional helper text */}
    <div className="mt-5 text-xs text-slate-500">
      Tip: swipe sideways to see more categories.
    </div>

    {filteredCategories.length === 0 && (
      <div className="mt-6 text-sm text-slate-600">
        No categories match <span className="font-semibold">“{categoryQuery}”</span>.
      </div>
    )}
  </div>
</section>



{/* ================= FEATURED JOBS (unique bg + apply + purple/green/blue accents) ================= */}
<section
  id="featured"
  className="relative overflow-hidden py-20 md:py-24 bg-[#EEF3FF]"
>
  {/* distinct background (blue outer + purple/green glow) */}
  <div className="pointer-events-none absolute inset-0">
    {/* blue-ish base gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#EAF1FF] via-[#EEF3FF] to-[#F6F7FB]" />

    {/* purple ambience */}
    <div className="absolute -top-44 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[rgba(106,111,242,0.16)] blur-3xl" />
    {/* green ambience */}
    <div className="absolute -bottom-48 right-[-180px] h-[640px] w-[640px] rounded-full bg-[rgba(16,185,129,0.12)] blur-3xl" />
    {/* subtle dots */}
    <div
      className="absolute inset-0 opacity-[0.10]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.12) 1px, transparent 0)",
        backgroundSize: "30px 30px",
      }}
    />
  </div>

  <div className="relative max-w-7xl mx-auto px-6">
    {/* header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <p className="text-[11px] tracking-[0.34em] uppercase text-slate-500 font-semibold">
          Featured
        </p>
        <h2 className="mt-3 text-2xl md:text-4xl font-extrabold text-[#0B1222] tracking-tight">
          Featured Technical Jobs
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl">
          High-signal roles from teams hiring right now — curated for clarity, pay visibility, and growth.
        </p>
      </div>

      {/* arrows */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            document.getElementById("featured-carousel")?.scrollBy({ left: -520, behavior: "smooth" })
          }
          className="h-12 w-12 rounded-xl bg-white/90 border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
          aria-label="Scroll left"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() =>
            document.getElementById("featured-carousel")?.scrollBy({ left: 520, behavior: "smooth" })
          }
          className="h-12 w-12 rounded-xl bg-white/90 border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>

    {/* carousel */}
    <div className="relative mt-12">
      {/* edge fades: blue-ish outer parts like you requested */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#EEF3FF] to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#EEF3FF] to-transparent z-10" />

      <div
        id="featured-carousel"
        className="no-scrollbar flex gap-7 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
      >
        {FEATURED_JOBS.map((job, idx) => (
          <article
            key={idx}
            className="snap-start flex-none w-[360px] sm:w-[380px] bg-white/95 backdrop-blur
                       rounded-2xl shadow-sm hover:shadow-lg transition
                       border border-[rgba(106,111,242,0.22)] relative overflow-hidden"
          >
            {/* purple side stripe */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--brand-purple)]" />

            {/* tiny green accent dot on top edge (subtle interest) */}
            <div className="absolute top-5 left-5 h-2 w-2 rounded-full bg-emerald-400/90" />

            <div className="p-6 pl-8">
              {/* pill + star */}
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full
                             bg-[rgba(106,111,242,0.10)] text-[var(--brand-purple)]
                             border border-[rgba(106,111,242,0.22)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Featured
                </span>

                <button
                  type="button"
                  aria-label="Save job"
                  className="text-slate-300 hover:text-slate-600 transition"
                >
                  ★
                </button>
              </div>

              {/* header */}
              <div className="mt-5 flex items-center gap-4">
                {/* profile badge: darker + premium */}
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0B1222] to-[#1C2A52] text-white flex items-center justify-center font-extrabold shadow-sm">
                  {job.company.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold text-[#0B1222] truncate">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-500 truncate">
                    {job.company} • {job.location}
                  </p>
                </div>
              </div>

              {/* description */}
              <p className="mt-4 text-sm text-slate-600 line-clamp-2">
                {job.description}
              </p>

              {/* pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  {job.type}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  {job.pay}
                </span>
              </div>

              {/* footer */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/all-jobs")}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                             bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                             shadow-[0_14px_26px_rgba(106,111,242,0.24)]
                             transition"
                >
                  Apply
                </button>

                <span className="text-xs text-slate-400">Posted {job.posted}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* ================= EMPOWERING (purple blobs + same vibe) ================= */}
      <section className="relative py-20 overflow-hidden bg-[#F3F4FA]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(106,111,242,0.18)] blur-3xl" />
          <div className="absolute -bottom-36 right-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.16)] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl bg-white p-4 shadow-md">
              <img
                src="/empower-platform.png"
                alt="Job platform dashboard illustration"
                className="rounded-2xl w-full"
              />
            </div>

            <div>
              <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-4 py-1.5 text-xs font-semibold">
                Built for Technical Careers
              </span>

              <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900">
                Empowering Job Seekers
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">
                Discover vetted Technical roles, transparent salary ranges, and trusted employers — all in one place
                designed to support long-term career growth.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Verified Technical opportunities only
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Clear expectations & salary visibility
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Roles built for growth, not churn
                </li>
              </ul>

              <button
                type="button"
                onClick={() => (window.location.href = "/all-jobs")}
                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-sm font-semibold shadow-md transition"
              >
                Get Started
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}