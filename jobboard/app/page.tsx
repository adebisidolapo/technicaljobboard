"use client";

import React, { useMemo, useRef, useState } from "react";

type Category = { label: string; slug: string };

type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  description?: string;
};

const FEATURED_JOBS: FeaturedJob[] = [
  {
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$110k – $150k",
    posted: "2 days ago",
    description: "Build fast, accessible interfaces and modern workflows for production apps.",
  },
  {
    title: "Backend Engineer (Node/Go)",
    company: "TechNova",
    location: "Austin, TX",
    type: "Full-time",
    pay: "$115k – $170k",
    posted: "1 day ago",
    description: "Own API design, data flows, and reliable backend services at scale.",
  },
  {
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $180k",
    posted: "1 day ago",
    description: "Improve deployments, observability, CI/CD pipelines, and infra reliability.",
  },
  {
    title: "Product Designer",
    company: "Lumen",
    location: "New York, NY",
    type: "Full-time",
    pay: "$95k – $145k",
    posted: "3 days ago",
    description: "Design clean, intuitive product experiences with strong UX foundations.",
  },
];

const COMPANY_LOGOS = [
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/Devops.png", alt: "DevOps Team" },
  { src: "/Architects.png", alt: "Architects" },
  { src: "/logo.png", alt: "Technical Job Board" },
  { src: "/logo-removebg-preview.png", alt: "Brand Logo" },
];

const CATEGORIES: Category[] = [
  { label: "Healthcare IT", slug: "healthcare-it" },
  { label: "Aerospace / Defense", slug: "aerospace-defense" },
  { label: "Architecture", slug: "architecture" },
  { label: "Project Management", slug: "project-management" },
  { label: "Construction / Building Systems", slug: "construction-mep" },
  { label: "Manufacturing / Production", slug: "manufacturing-production" },
  { label: "Field Service / Commissioning", slug: "field-service" },
  { label: "Quality / Compliance", slug: "quality-compliance" },
  { label: "Maintenance / Reliability", slug: "maintenance-reliability" },
];

export default function Home() {
  // hero search
  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");

  // category filter just like old (tap category → go to all-jobs with category)
  const [activeCat, setActiveCat] = useState<string>("");

  const featuredRef = useRef<HTMLDivElement | null>(null);

  const runHeroSearch = () => {
    const params = new URLSearchParams();
    if (heroQ.trim()) params.set("q", heroQ.trim());
    if (heroLoc.trim()) params.set("loc", heroLoc.trim());
    window.location.href = params.toString() ? `/all-jobs?${params.toString()}` : "/all-jobs";
  };

  const goCategory = (slug: string) => {
    setActiveCat(slug);
    const params = new URLSearchParams();
    params.set("cat", slug);
    window.location.href = `/all-jobs?${params.toString()}`;
  };

  const popularPills = useMemo(() => ["Popular", "Frontend", "DevOps", "Data", "Security"], []);

  // create a fuller grid like the screenshot by repeating logos
  const logoGrid = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push(COMPANY_LOGOS[i % COMPANY_LOGOS.length]);
    }
    return items;
  }, []);

  return (
    <main className="font-sans bg-[#F6F7FB] text-[#0F172A]">
      {/* ================= HERO ================= */}
      <section className="bg-[#F7F8FA]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center py-16 sm:py-20 md:py-24">
            {/* pill */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Curated roles • Remote friendly • Fast apply
            </div>

            <h1 className="mt-6 text-[2.05rem] sm:text-[2.6rem] md:text-[3.1rem] font-extrabold leading-tight tracking-tight text-slate-900">
              Find{" "}
              <span className="text-emerald-600">Technical Jobs</span> built for long-term careers
            </h1>

            <p className="mt-4 text-sm sm:text-[15px] md:text-[15px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Browse opportunities across engineering, infrastructure, cloud, security, and data —
              including remote options. Simple, clean, and focused on serious hiring.
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

                {/* popular pills under inputs */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                  {popularPills.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setHeroQ(t === "Popular" ? "" : t);
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

            {/* jump */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("featured");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= COMPANIES ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.25em] text-slate-400 font-semibold uppercase">
              Trusted by teams
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900">
              Popular companies we have worked with
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              A quick look at teams that trust TechnicalJobboard.
            </p>
          </div>

          {/* logo grid like screenshot */}
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-10 gap-y-8 items-center justify-items-center">
              {logoGrid.map((logo, idx) => (
                <div key={`${logo.src}-${idx}`} className="opacity-70">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 sm:h-8 w-auto grayscale"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-lg font-semibold text-slate-900">Available Categories</h3>
          <p className="mt-1 text-xs text-slate-500">Tap a category to filter jobs below.</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCat === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => goCategory(cat.slug)}
                  className={[
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section id="featured" className="bg-[#EEF0F6] py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Featured Jobs</h3>
              <p className="mt-1 text-xs text-slate-500">
                A curated selection of standout roles from trusted teams.
              </p>
            </div>

            {/* arrows (top-right like screenshot) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => featuredRef.current?.scrollBy({ left: -420, behavior: "smooth" })}
                className="h-9 w-9 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => featuredRef.current?.scrollBy({ left: 420, behavior: "smooth" })}
                className="h-9 w-9 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={featuredRef}
            className="mt-8 flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            {FEATURED_JOBS.map((job, idx) => (
              <article
                key={idx}
                className="snap-start flex-none w-[320px] bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      Featured
                    </span>
                    <button className="text-slate-300 hover:text-slate-500" aria-label="Save job">
                      ★
                    </button>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                      {job.company.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">{job.title}</h4>
                      <p className="text-xs text-slate-500 truncate">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {job.type}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {job.pay}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-500 line-clamp-2">
                    {job.description ?? "Strong role with a clean hiring process and fast turnaround."}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => (window.location.href = "/all-jobs")}
                      className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                      View
                    </button>
                    <span className="text-[11px] text-slate-400">Posted {job.posted}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EMPOWERING JOB SEEKERS ================= */}
      <section className="bg-[#F6F7FB] py-20">
        <div className="max-w-7xl mx-auto px-6">
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
                Discover vetted Technical roles, transparent salary ranges, and trusted employers —
                all in one place designed to support long-term career growth.
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

      {/* NOTE: "Explore Technical opportunities / All Jobs" section intentionally removed from homepage */}
    </main>
  );
}