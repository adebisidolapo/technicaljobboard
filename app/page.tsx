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

  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const container =
    "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

  const sectionSpace = "py-14 sm:py-16 md:py-20";

  const eyebrow =
    "text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500";

  const sectionTitle =
    "mt-3 text-[clamp(1.7rem,3.2vw,2.45rem)] font-extrabold tracking-tight text-[#0F172A]";

  const sectionBody =
    "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]";

  const inputBase =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100";

  const primaryButton =
    "inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(76,61,196,0.24)] transition hover:opacity-95";

  const secondaryButton =
    "inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";

  const textLinkButton =
    "inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-purple)] transition hover:opacity-80";

  const chipBase =
    "shrink-0 snap-start rounded-full border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.99]";

  return (
    <main className="min-h-screen bg-[#F6F8FC] font-sans text-[#0F172A]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#EEF6F2]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF6F2] via-[#EEF6F2] to-[#F6F8FC]" />
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className={`relative ${container}`}>
          <div className="mx-auto max-w-3xl py-14 text-center sm:py-18 md:py-22 lg:py-24">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Curated roles • Remote friendly • Fast apply
            </div>

            <h1 className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-[#0F172A]">
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

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-[16px]">
              Browse opportunities across engineering, infrastructure, cloud,
              security, and data — including remote options. Simple, clean, and
              focused on serious hiring.
            </p>

            <div className="mt-8">
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
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
                    className={`${primaryButton} w-full md:w-auto`}
                  >
                    Search Jobs
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-500">Popular</span>
                  {["Frontend", "DevOps", "Data", "Security"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setHeroQ(t);
                        setTimeout(runHeroSearch, 0);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:underline"
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY TEAMS ================= */}
      <section className={`bg-white ${sectionSpace}`}>
        <div className={container}>
          <div className="text-center">
            <p className={eyebrow}>Trusted by teams</p>
            <h2 className={sectionTitle}>
              Popular Companies We Have Worked With
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-[15px]">
              Teams across the US trust TechnicalJobboard to hire technical
              talent without the noise.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200/70 bg-slate-50 px-4 py-6 sm:mt-12 sm:px-6 md:mt-14 md:px-8">
            <CompanyLogoCarousel />
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section id="featured" className={sectionSpace}>
        <div className={container}>
          <div className="mb-8 sm:mb-10">
            <p className={eyebrow}>Featured roles</p>
            <h2 className={sectionTitle}>Explore serious opportunities</h2>
            <p className={sectionBody}>
              Handpicked technical jobs from employers actively hiring for
              long-term, high-value roles.
            </p>
          </div>

          <FeaturedJobsSection />
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section id="categories" className={`bg-[#F3F6FB] ${sectionSpace}`}>
        <div className={container}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrow}>Categories</p>
              <h3 className={sectionTitle}>Browse by category</h3>
              <p className={sectionBody}>
                Search and swipe through categories — tap one to explore
                matching roles.
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
                  placeholder="Search categories..."
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

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:mt-10">
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
                    !selectedCategory
                      ? "border-[#0F172A] bg-[#0F172A] text-white"
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
                        active
                          ? "border-[rgba(106,111,242,0.24)] bg-[rgba(106,111,242,0.10)] text-[var(--brand-purple)]"
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

              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent"
                aria-hidden
              />
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Tip: swipe sideways to see more categories.
            </div>
          </div>

          {filteredCategories.length === 0 && (
            <div className="mt-6 text-sm text-slate-600">
              No categories match{" "}
              <span className="font-semibold">“{categoryQuery}”</span>.
            </div>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE THE PLATFORM ================= */}
      <section className={`bg-white ${sectionSpace}`}>
        <div className={container}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
            <div className="rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-5">
              <img
                src="/empower-platform.png"
                alt="Job platform dashboard illustration"
                className="w-full rounded-2xl"
              />
            </div>

            <div>
              <p className={eyebrow}>Why choose us</p>
              <h3 className={sectionTitle}>Built for real technical hiring</h3>
              <p className={sectionBody}>
                Discover vetted technical roles, cleaner job discovery, and a
                platform designed for people building long-term careers — not
                just chasing random listings.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    ✓
                  </div>
                  <h4 className="text-base font-semibold text-slate-900">
                    Verified opportunities
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Roles focused on technical talent, not cluttered generic job
                    listings.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(106,111,242,0.10)] text-[var(--brand-purple)]">
                    ↗
                  </div>
                  <h4 className="text-base font-semibold text-slate-900">
                    Career-first experience
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Cleaner discovery, smarter filtering, and better alignment
                    with long-term growth.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    $
                  </div>
                  <h4 className="text-base font-semibold text-slate-900">
                    Better transparency
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Clearer expectations around role level, fit, and employer
                    intent.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    ⚡
                  </div>
                  <h4 className="text-base font-semibold text-slate-900">
                    Faster application flow
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Less friction, less noise, and a more direct route to
                    serious opportunities.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/all-jobs")}
                  className={primaryButton}
                >
                  Explore Jobs
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/all-jobs?loc=Remote")}
                  className={secondaryButton}
                >
                  Browse Remote Roles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMPLOYER CTA ================= */}
      <section className={`${sectionSpace} bg-[#EEF2FF]`}>
        <div className={container}>
          <div className="rounded-[32px] border border-[rgba(106,111,242,0.14)] bg-white px-6 py-10 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:px-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className={eyebrow}>For employers</p>
              <h3 className={sectionTitle}>
                Reach technical talent with more precision
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]">
                Showcase your openings to professionals looking for serious,
                high-quality technical roles — with a platform experience that
                feels focused and credible.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/post-a-job")}
                  className={primaryButton}
                >
                  Post a Job
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/contact")}
                  className={secondaryButton}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}