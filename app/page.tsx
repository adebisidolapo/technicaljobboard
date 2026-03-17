"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";

const CATEGORIES = [
  { name: "Engineering", count: "1,200+", icon: "⚙️" },
  { name: "Information Technology", count: "980+", icon: "💻" },
  { name: "Data, AI & Cybersecurity", count: "740+", icon: "🔐" },
  { name: "Cloud & DevOps", count: "620+", icon: "☁️" },
  { name: "Architecture & Design", count: "310+", icon: "📐" },
  { name: "Construction & Field Engineering", count: "450+", icon: "🏗️" },
  { name: "Manufacturing & Industrial", count: "390+", icon: "🏭" },
  { name: "Energy & Utilities", count: "280+", icon: "⚡" },
  { name: "Telecom & Network Infrastructure", count: "220+", icon: "📡" },
  { name: "Healthcare & Medical Technology", count: "190+", icon: "🏥" },
  { name: "Skilled Trades & Technical Services", count: "350+", icon: "🔧" },
  { name: "Science & Research", count: "160+", icon: "🔬" },
];

const POPULAR_TAGS = ["Frontend", "DevOps", "Data", "Security", "Cloud", "React", "Python"];

const STATS = [
  { value: "12,000+", label: "Active Jobs" },
  { value: "3,400+", label: "Companies" },
  { value: "98%", label: "Technical Roles" },
  { value: "Free", label: "To Apply" },
];

export default function Home() {
  const router = useRouter();
  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisibleCount(12);
      else if (window.innerWidth >= 640) setVisibleCount(8);
      else setVisibleCount(6);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function runSearch() {
    const p = new URLSearchParams();
    if (heroQ.trim()) p.set("q", heroQ.trim());
    if (heroLoc.trim()) p.set("loc", heroLoc.trim());
    const qs = p.toString();
    router.push(qs ? "/all-jobs?" + qs : "/all-jobs");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") runSearch();
  }

  return (
    <main className="min-h-screen bg-white text-[#0F172A]">

      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 to-white">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/4 rounded-full bg-emerald-100/50 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl py-20 text-center sm:py-24 lg:py-28">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Curated Technical Roles — Remote and On-Site
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-[#0F172A]">
              Find Your Next{" "}
              <span className="relative whitespace-nowrap text-[var(--brand-purple)]">
                Technical Role
                <svg
                  className="absolute -bottom-1 left-0 h-3 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 10 Q75 2 150 8 Q225 14 298 6"
                    stroke="var(--brand-purple)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Browse verified opportunities across Engineering, Cloud, Security,
              Data, and more — with transparent salary ranges and trusted employers.
            </p>

            {/* Search box */}
            <div className="mx-auto mt-10 w-full max-w-3xl">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4">
                  <svg className="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    value={heroQ}
                    onChange={(e) => setHeroQ(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Job title, skill, or keyword"
                    className="h-11 w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                  />
                </div>

                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4">
                  <svg className="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <input
                    value={heroLoc}
                    onChange={(e) => setHeroLoc(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="City, state, or Remote"
                    className="h-11 w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={runSearch}
                  className="h-11 w-full shrink-0 rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-bold text-white shadow-sm transition hover:opacity-90 sm:w-auto"
                >
                  Search Jobs
                </button>
              </div>

              {/* Popular tags */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-medium text-slate-400">Popular:</span>
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => { setHeroQ(tag); setTimeout(runSearch, 0); }}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-6 text-center">
                <p className="text-2xl font-extrabold text-[var(--brand-purple)]">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Trusted by teams
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
              Companies Hiring Through Us
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              From fast-growing startups to established enterprises — technical
              teams trust us to find great candidates.
            </p>
          </div>
          <div className="mt-10">
            <CompanyLogoCarousel />
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ── */}
      <section id="featured" className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Featured Jobs
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                Roles Worth Exploring
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Curated picks with transparent salaries and trusted employers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/all-jobs")}
              className="hidden shrink-0 text-sm font-semibold text-[var(--brand-purple)] transition hover:underline sm:block"
            >
              View all jobs
            </button>
          </div>
          <div className="mt-8">
            <FeaturedJobsSection />
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => router.push("/all-jobs")}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View all jobs
            </button>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Browse by field
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                Explore Categories
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Find roles in the technical fields that match your skills.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/all-jobs")}
              className="hidden shrink-0 text-sm font-semibold text-[var(--brand-purple)] transition hover:underline sm:block"
            >
              All jobs
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.slice(0, visibleCount).map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => router.push("/all-jobs?cat=" + encodeURIComponent(cat.name))}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl transition group-hover:bg-indigo-50">
                  {cat.icon}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-[var(--brand-purple)]">
                    {cat.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{cat.count}</p>
                </div>
              </button>
            ))}
          </div>

          {visibleCount < CATEGORIES.length && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((v) => Math.min(v + 4, CATEGORIES.length))}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Load more categories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                <img
                  src="/empower-platform.png"
                  alt="TechnicalJobBoard platform"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-[var(--brand-purple)]">
                Built for Technical Careers
              </span>
              <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-[#0F172A]">
                Empowering Job Seekers
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                We focus exclusively on technical roles — so every job you see is
                relevant. No noise, no generic listings. Just verified roles with
                transparent salary ranges and trusted employers.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { title: "Verified Opportunities", desc: "Every role reviewed for quality before it goes live." },
                  { title: "Salary Transparency", desc: "See pay ranges upfront — no surprises after an interview." },
                  { title: "Built for Long-Term Growth", desc: "Roles designed for engineers who want to advance." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-purple)]">
                      <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/all-jobs")}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                >
                  Browse Jobs
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/all-jobs?remote=true")}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Remote Only
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR EMPLOYERS ── */}
      <section className="bg-[var(--brand-purple)] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Hiring technical talent?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-indigo-200">
              Post your job and reach thousands of qualified engineers, developers,
              and technical specialists actively looking for their next role.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/employer/jobs/new")}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-[var(--brand-purple)] shadow-sm transition hover:bg-slate-50"
              >
                Post a Job
              </button>
              <button
                type="button"
                onClick={() => router.push("/employer")}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-bold text-white transition hover:bg-white/20"
              >
                View Employer Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}