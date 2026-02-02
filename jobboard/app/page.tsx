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

      {/* ================= TRUSTED BY TEAMS (grid like screenshot) ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.28em] text-slate-400 font-semibold uppercase">
              Trusted by teams
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900">
              Popular companies we have worked with
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              A quick look at teams that trust TechnicalJobboard.
            </p>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-10">
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-y-8 gap-x-10 items-center justify-items-center opacity-70">
                {logoGrid.map((logo, idx) => (
                  <img
                    key={`${logo.src}-${idx}`}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 w-auto grayscale"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES (simple like screenshot) ================= */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-sm font-semibold text-slate-900">Available Categories</h3>
          <p className="mt-1 text-xs text-slate-500">Tap a category to filter jobs below.</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => (window.location.href = `/all-jobs?cat=${encodeURIComponent(c)}`)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 hover:border-slate-300 transition"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED (carousel + arrows like screenshot) ================= */}
      <section id="featured" className="bg-[#F4F6FB] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Featured Jobs</h3>
              <p className="mt-1 text-xs text-slate-500">
                A curated selection of standout roles from trusted teams.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => featuredRef.current?.scrollBy({ left: -520, behavior: "smooth" })}
                className="h-9 w-9 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => featuredRef.current?.scrollBy({ left: 520, behavior: "smooth" })}
                className="h-9 w-9 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
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
                className="snap-start flex-none w-[320px] sm:w-[360px] bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {/* little blue dot detail like screenshot */}
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      Featured
                    </span>
                    <button className="text-slate-300 hover:text-slate-500" aria-label="Close">
                      ×
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

                  <p className="mt-3 text-xs text-slate-500 line-clamp-2">{job.description}</p>

                  <div className="mt-4 flex gap-2">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {job.type}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {job.pay}
                    </span>
                  </div>

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

      {/* ================= ALL JOBS PREVIEW (the section you showed in screenshot) ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-indigo-500 uppercase">
            All Jobs
          </p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                Explore Technical opportunities
              </h3>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                Filter by keyword, location, job type, and experience — then explore what matches.
              </p>
            </div>

            <button
              type="button"
              onClick={() => (window.location.href = "/all-jobs")}
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              Load More Jobs →
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
            {/* filters */}
            <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-900">Filters</h4>
                <button className="text-xs text-slate-500 hover:text-slate-700">Reset</button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Keyword</label>
                  <input
                    placeholder="e.g. Maintenance, PLC, Quality"
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Location</label>
                  <input
                    placeholder="Remote, New York, Austin"
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Job Type</label>
                  <select className="mt-2 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    <option>Any</option>
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Part-time</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Experience</label>
                  <select className="mt-2 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    <option>Any</option>
                    <option>Junior</option>
                    <option>Mid</option>
                    <option>Senior</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Quick Filters</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Remote", "Full-time", "Senior", "Contract"].map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => (window.location.href = "/all-jobs")}
                  className="w-full mt-2 h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* job list */}
            <div className="space-y-4">
              {LIST_JOBS.map((j, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      {j.company.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">{j.title}</h4>
                      <p className="text-xs text-slate-500 truncate">
                        {j.company} • {j.location}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {j.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-indigo-600">{j.pay}</div>
                    <button
                      type="button"
                      onClick={() => (window.location.href = "/all-jobs")}
                      className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                      View
                    </button>
                    <div className="mt-2 text-[11px] text-slate-400">Posted {j.posted}</div>
                  </div>
                </div>
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