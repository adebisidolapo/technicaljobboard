"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";

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

export default function Home() {
  const router = useRouter();

  // hero inputs
  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");

  // category chips
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const inputBase =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-200";

  const chipBase =
    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-[0.99]";

  const filteredCategories = useMemo(() => {
    const q = categoryQuery.toLowerCase().trim();
    return CATEGORIES.filter((c) => c.toLowerCase().includes(q));
  }, [categoryQuery]);

  const runHeroSearch = () => {
    const params = new URLSearchParams();
    if (heroQ.trim()) params.set("q", heroQ.trim());
    if (heroLoc.trim()) params.set("loc", heroLoc.trim());
    const qs = params.toString();
    router.push(qs ? `/all-jobs?${qs}` : "/all-jobs");
  };

  const jumpToFeatured = () => {
    const el = document.getElementById("featured");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#F3F6FB] font-sans text-[#0F172A]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#EEF6F2]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF6F2] via-[#EEF6F2] to-[#F3F6FB]" />
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl py-14 text-center sm:py-18 md:py-22 lg:py-24">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Curated roles • Remote friendly • Fast apply
            </div>

            <h1 className="mt-6 font-extrabold leading-[1.05] tracking-tight text-[#0F172A] text-[clamp(2rem,4.2vw,3.25rem)]">
              Find{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute -inset-x-12 -inset-y-10 rounded-full bg-emerald-400/12 blur-[70px]"
                />
                <span
                  aria-hidden
                  className="absolute -inset-x-8 -inset-y-6 rounded-full bg-emerald-400/16 blur-[42px]"
                />
                <span className="relative text-emerald-600">
                  Technical Jobs
                </span>
              </span>{" "}
              built for long-term careers
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-relaxed text-slate-600 sm:text-[15.5px] md:text-[16px]">
              Browse opportunities across engineering, infrastructure, cloud,
              security, and data — including remote options. Simple, clean, and
              focused on serious hiring.
            </p>

            <div className="mt-8">
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                {/* On small screens: stacked inputs + button. On md+: grid. */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
                  <label className="sr-only" htmlFor="hero-q">
                    Job title or keyword
                  </label>
                  <input
                    id="hero-q"
                    value={heroQ}
                    onChange={(e) => setHeroQ(e.target.value)}
                    type="text"
                    placeholder="Job title, keyword"
                    className={inputBase}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") runHeroSearch();
                    }}
                  />

                  <label className="sr-only" htmlFor="hero-loc">
                    Location
                  </label>
                  <input
                    id="hero-loc"
                    value={heroLoc}
                    onChange={(e) => setHeroLoc(e.target.value)}
                    type="text"
                    placeholder="Location (Remote, Lagos, New York)"
                    className={inputBase}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") runHeroSearch();
                    }}
                  />

                  <button
                    type="button"
                    onClick={runHeroSearch}
                    className="h-12 w-full rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 md:w-auto shadow-[0_10px_26px_rgba(2,6,23,0.22)]"
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
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 hover:border-slate-300"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={jumpToFeatured}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY TEAMS ================= */}
      <section className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-400">
              Trusted by teams
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold tracking-tight text-[#0B1222]">
              Popular Companies We Have Worked With
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
              Teams across the US trust TechnicalJobboard to hire technical
              talent.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-14">
            <CompanyLogoCarousel />
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section
        id="categories"
        className="relative overflow-hidden bg-[#F4F6FB] py-14 sm:py-16 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FC] via-[#F4F6FB] to-white" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">
                Categories
              </p>
              <h3 className="mt-3 text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold tracking-tight text-[#0B1222]">
                Browse by category
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                Search and swipe through categories — tap one to explore matching
                roles.
              </p>
            </div>

            <div className="w-full md:w-[380px]">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="text-slate-400" aria-hidden>
                  ⌕
                </span>
                <input
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                  placeholder="Search categories…"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              {selectedCategory && (
                <div className="mt-2 text-xs text-slate-500">
                  Selected:{" "}
                  <span className="font-semibold text-slate-700">
                    {selectedCategory}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("");
                      setCategoryQuery("");
                    }}
                    className="ml-2 font-semibold text-[var(--brand-purple)] hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            {/* Better mobile experience: snap + padding + gradient edges */}
            <div className="relative">
              <div className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth py-2 pr-2 snap-x snap-mandatory">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    setCategoryQuery("");
                    router.push("/all-jobs");
                  }}
                  className={[
                    chipBase,
                    "snap-start",
                    !selectedCategory
                      ? "border-[#0B1222] bg-[#0B1222] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
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
                        router.push(`/all-jobs?cat=${encodeURIComponent(cat)}`);
                      }}
                      className={[
                        chipBase,
                        "snap-start",
                        active
                          ? "border-[rgba(106,111,242,0.25)] bg-[rgba(106,111,242,0.12)] text-[var(--brand-purple)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mr-2 inline-block h-2 w-2 rounded-full",
                          active
                            ? "bg-[var(--brand-purple)]"
                            : "bg-emerald-500/80",
                        ].join(" ")}
                        aria-hidden
                      />
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* subtle fade edges */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F4F6FB] to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F4F6FB] to-transparent"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Tip: swipe sideways to see more categories.
          </div>

          {filteredCategories.length === 0 && (
            <div className="mt-6 text-sm text-slate-600">
              No categories match{" "}
              <span className="font-semibold">“{categoryQuery}”</span>.
            </div>
          )}
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <FeaturedJobsSection />

      {/* ================= EMPOWERING ================= */}
      <section className="relative overflow-hidden bg-[#F3F4FA] py-14 sm:py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(106,111,242,0.16)] blur-3xl" />
          <div className="absolute -bottom-36 right-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.14)] blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex justify-center md:justify-start">
              <div className="rounded-2xl bg-white p-3 shadow-[0_12px_28px_rgba(15,23,42,0.10)]">
                <img
                  src="/empower-platform.png"
                  alt="Job platform dashboard illustration"
                  className="w-full max-w-[520px] rounded-xl"
                />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
                Built for Technical Careers
              </span>

              <h3 className="mt-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-slate-900">
                Empowering Job Seekers
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                Discover vetted Technical roles, transparent salary ranges, and
                trusted employers — all in one place designed to support long-term
                career growth.
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
                onClick={() => router.push("/all-jobs")}
                className="btn-primary mt-8 inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-semibold shadow-md"
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