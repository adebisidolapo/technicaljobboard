"use client";

import React, { useEffect, useState } from "react";

type Category = { label: string; slug: string };

type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  stack?: string;
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
    stack: "React, Next.js, Accessibility",
    description: "Build fast, clean UIs with strong performance and UX foundations.",
  },
  {
    title: "Backend Engineer (Node/Go)",
    company: "TechNova",
    location: "Austin, TX",
    type: "Full-time",
    pay: "$115k – $170k",
    posted: "1 day ago",
    stack: "Node.js, Go, APIs, PostgreSQL",
    description: "Design reliable backend services and scalable APIs for production systems.",
  },
  {
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $180k",
    posted: "1 day ago",
    stack: "AWS, CI/CD, Observability",
    description: "Improve deployments, infra reliability, and developer velocity.",
  },
  {
    title: "Security Engineer",
    company: "SentinelWorks",
    location: "New York, NY",
    type: "Full-time",
    pay: "$130k – $190k",
    posted: "3 days ago",
    stack: "AppSec, Threat Modeling, IAM",
    description: "Build secure systems, improve controls, and ship safe defaults.",
  },
  // extra to feel “more full” like old site
  {
    title: "Data Engineer",
    company: "ByteForge",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $175k",
    posted: "4 days ago",
    stack: "ETL, Snowflake, Python",
    description: "Own pipelines, quality, and analytics foundations across teams.",
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
  { label: "Engineering (Non-Software)", slug: "engineering-non-software" },
];

export default function Home() {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // HERO SEARCH STATE
  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");

  // company carousel
  const [activeLogo, setActiveLogo] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogo((i) => (i + 1) % COMPANY_LOGOS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // scroll reveal (optional)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const runHeroSearch = () => {
    const params = new URLSearchParams();
    if (heroQ.trim()) params.set("q", heroQ.trim());
    if (heroLoc.trim()) params.set("loc", heroLoc.trim());
    const qs = params.toString();
    window.location.href = qs ? `/all-jobs?${qs}` : "/all-jobs";
  };

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.label.toLowerCase().includes(categoryQuery.toLowerCase())
  );

  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#F7F8FA]">
        {/* bring back the layered glow + subtle dot grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F8FA] to-[#F2F4FF]" />
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(17,24,39,0.08) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center py-16 sm:py-20 md:py-28">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Curated roles • Remote friendly • Fast apply
            </div>

            <h1 className="mt-6 text-[2.1rem] sm:text-[2.7rem] md:text-[3.2rem] font-extrabold leading-tight tracking-tight text-[#0F172A]">
              Find{" "}
              <span className="relative inline-block">
                {/* ✅ THIS is the green glow you’re missing */}
                <span
                  aria-hidden
                  className="absolute -inset-x-14 -inset-y-10 bg-emerald-400/10 blur-[70px] rounded-full"
                />
                <span
                  aria-hidden
                  className="absolute -inset-x-8 -inset-y-6 bg-emerald-400/14 blur-[42px] rounded-full"
                />
                <span className="relative text-emerald-600">Technical Jobs</span>
              </span>{" "}
              built for long-term careers
            </h1>

            <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Browse opportunities across engineering, infrastructure, cloud, security, and data — including
              remote options. Simple, clean, and focused on serious hiring.
            </p>

            {/* HERO SEARCH BAR */}
            <div className="mt-8">
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur">
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
                  <span>Popular:</span>
                  {["Popular", "Frontend", "DevOps", "Data", "Security"].map((t) => (
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

            <button
              type="button"
              onClick={() => (window.location.href = "/all-jobs")}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= COMPANIES (carousel like before) ================= */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#FBFBFF]" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(106,111,242,0.12)] blur-3xl" />
          <div className="absolute -bottom-44 right-[-120px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.08)] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-14">
            {/* ✅ make this visible */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[rgba(106,111,242,0.22)] bg-[rgba(106,111,242,0.12)] px-4 py-2 text-xs font-semibold text-[var(--brand-purple)] shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
              Trusted by teams
            </div>

            <h3 className="mt-5 text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Popular companies we have worked with
            </h3>

            <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              A quick look at teams that trust TechnicalJobboard.
            </p>
          </div>

          {/* ✅ One logo at a time carousel */}
          <div className="relative w-full h-[90px] sm:h-[110px] md:h-[130px] flex items-center justify-center overflow-hidden">
            {COMPANY_LOGOS.map((logo, index) => {
              const isActive = index === activeLogo;
              return (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className={[
                    "absolute w-auto",
                    "h-14 sm:h-16 md:h-20",
                    "transition-all duration-700 ease-out",
                    isActive ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES (RESTORED to your boxed gradient version) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl border border-[rgba(106,111,242,0.18)] bg-gradient-to-b from-[#FBFBFD] to-white p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">Browse</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
                  Explore categories
                </h2>
                <p className="text-slate-600 mt-2">Pick a category to filter jobs instantly.</p>
              </div>

              <div className="w-full md:w-[360px]">
                <input
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                  type="text"
                  placeholder="Search categories…"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none
                             focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
                />
              </div>
            </div>

            {selectedCategory && (
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-600">Selected:</span>

                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.label ?? "Category"}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    setCategoryQuery("");
                  }}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {filteredCategories.map((cat) => {
                const isActive = selectedCategory === cat.slug;

                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={[
                      "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                      isActive
                        ? "bg-slate-900 text-white border-slate-900"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300",
                    ].join(" ")}
                  >
                    <span className={["h-2 w-2 rounded-full transition", isActive ? "bg-white" : "bg-[var(--brand-purple)]"].join(" ")} />
                    <span className="font-medium">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {filteredCategories.length === 0 && (
              <div className="mt-6 text-sm text-slate-600">No categories match "{categoryQuery}".</div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS (RESTORED to your screenshot style) ================= */}
      <section id="featured" className="relative py-24 border-y border-gray-200 overflow-hidden bg-[#F7F8FC]">
        <div className="pointer-events-none absolute -top-36 -left-36 w-[38rem] h-[38rem] rounded-full bg-[rgba(106,111,242,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 -right-36 w-[38rem] h-[38rem] rounded-full bg-[rgba(106,111,242,0.08)] blur-3xl" />

        <div className="relative w-full">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#0F1426]">Featured Jobs</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                A curated selection of standout roles from trusted teams.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("featured-carousel")?.scrollBy({ left: -520, behavior: "smooth" })}
                className="px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition"
                aria-label="Scroll left"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => document.getElementById("featured-carousel")?.scrollBy({ left: 520, behavior: "smooth" })}
                className="px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div className="relative w-full">
            <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[#F7F8FC] to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#F7F8FC] to-transparent z-10" />

            <div
              id="featured-carousel"
              className="no-scrollbar flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory px-6 md:px-12"
            >
              {FEATURED_JOBS.map((job, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-none w-[320px] sm:w-[360px] md:w-[400px]
                             bg-white rounded-2xl shadow-sm hover:shadow-lg transition
                             border border-slate-200 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--brand-purple)]" />

                  <div className="p-6 pl-8">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full
                                   bg-[rgba(106,111,242,0.10)] text-[var(--brand-purple)]
                                   border border-[rgba(106,111,242,0.22)]"
                      >
                        <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                        Featured
                      </span>

                      <button aria-label="Save job" className="text-gray-400 hover:text-[#1A2040] transition">
                        ★
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
                        {job.company.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-[#0F1426] truncate">{job.title}</h3>
                        <p className="text-sm text-gray-600 truncate">
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>

                    {job.stack && <p className="mt-3 text-xs text-slate-600 truncate">{job.stack}</p>}

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">{job.type}</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">{job.pay}</span>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <button
                        onClick={() => (window.location.href = "/all-jobs")}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white
                                   bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                                   shadow-[0_8px_20px_rgba(106,111,242,0.22)]
                                   transition"
                      >
                        View
                      </button>

                      <span className="text-xs text-gray-400">Posted {job.posted}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMPOWERING (restored gradient bg) ================= */}
      <section id="empowering" className="relative py-28 overflow-hidden bg-[#F6F7FB]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#F6F7FB] to-[#F2F4FF]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="reveal flex flex-col md:flex-row items-center gap-14">
            <div className="md:w-1/2 w-full">
              <div className="relative rounded-3xl bg-white p-4 shadow-xl">
                <img
                  src="/empower-platform.png"
                  alt="Job platform dashboard illustration"
                  className="rounded-2xl w-full"
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <span
                className="inline-block mb-4 text-sm font-semibold text-[var(--brand-purple)]
                           bg-[rgba(106,111,242,0.10)] px-4 py-1.5 rounded-full"
              >
                Built for Technical Careers
              </span>

              <h2 className="text-[1.9rem] md:text-[2.3rem] font-semibold mb-6 tracking-tight text-gray-900">
                Empowering Job Seekers
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed max-w-xl">
                Discover vetted Technical roles, transparent salary ranges, and trusted employers —
                all in one place designed to support long-term career growth.
              </p>

              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Verified Technical opportunities only
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Clear expectations & salary visibility
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Roles built for growth, not churn
                </li>
              </ul>

              <button
                type="button"
                onClick={() => (window.location.href = "/all-jobs")}
                className="inline-flex items-center gap-3 bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                           text-white px-7 py-3 rounded-2xl font-semibold transition shadow-lg"
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
