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

  const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
  const wideContainer = "mx-auto w-full px-4 sm:px-6 lg:px-8";
  const sectionPadding = "py-14 sm:py-16 md:py-20";

  const eyebrow =
    "text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500";
  const sectionTitle =
    "mt-3 text-[clamp(1.6rem,3.2vw,2.35rem)] font-extrabold tracking-tight text-[#0F172A]";
  const sectionBody =
    "mt-3 max-w-2xl text-[15px] leading-7 text-slate-600";

  const inputBase =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100";

  const primaryButton =
    "inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(2,6,23,0.18)] transition hover:bg-slate-800";

  const secondaryButton =
    "inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";

  const textButton =
    "inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline";

  const chipBase =
    "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.99]";

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
              security, and data — including remote options.
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
  className="h-12 w-full rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-semibold text-white transition hover:opacity-95 md:w-auto shadow-[0_10px_24px_rgba(106,111,242,0.24)]"
>
  Search Jobs
</button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-slate-500">
                  <span className="mr-1 font-medium">Popular</span>
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
              className={`mt-7 ${textButton}`}
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY TEAMS ================= */}
      <section className={`bg-white ${sectionPadding}`}>
        <div className={container}>
          <div className="text-center">
            <p className={eyebrow}>Trusted by teams</p>
            <h2 className={sectionTitle}>Companies hiring through us</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
              Trusted by teams hiring technical talent across high-value roles.
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-14">
          <div className={wideContainer}>
            <CompanyLogoCarousel />
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
<section id="featured" className="py-14 sm:py-16 md:py-20 bg-[#F2F4F8]">
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mb-8 sm:mb-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
        Featured jobs
      </p>
      <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold tracking-tight text-[#0B1222]">
        Opportunities worth a closer look
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
        A curated selection of standout technical roles.
      </p>
    </div>

    <FeaturedJobsSection />
  </div>
</section>

      {/* ================= CATEGORIES ================= */}
<section
  id="categories"
  className="relative overflow-hidden bg-[#F4F6FB] py-14 sm:py-16 md:py-20"
>
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FC] via-[#F4F6FB] to-white" />
    <div className="absolute -top-24 right-[-100px] h-[280px] w-[280px] rounded-full bg-[rgba(106,111,242,0.08)] blur-3xl" />
  </div>

  <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-slate-500">
          Categories
        </p>
        <h3 className="mt-3 text-[clamp(1.55rem,3.2vw,2.4rem)] font-extrabold tracking-tight text-[#0B1222]">
          Explore roles by specialization
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-slate-600">
          Browse technical roles by category and move directly into the area
          that matches your experience.
        </p>
      </div>

      <div className="w-full md:w-[390px]">
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

    {/* top chip rail */}
    <div className="mt-8 sm:mt-10">
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
            All Categories
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

    {/* category preview grid */}
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {filteredCategories.slice(0, 6).map((cat, index) => (
        <button
          key={cat}
          type="button"
          onClick={() => {
            setSelectedCategory(cat);
            router.push(`/all-jobs?cat=${encodeURIComponent(cat)}`);
          }}
          className="group rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className={[
                  "inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold shadow-sm",
                  index % 3 === 0
                    ? "bg-[rgba(106,111,242,0.10)] text-[var(--brand-purple)]"
                    : index % 3 === 1
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-700",
                ].join(" ")}
              >
                {cat
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <h4 className="mt-4 text-base font-extrabold text-[#0B1222]">
                {cat}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore open roles in {cat.toLowerCase()} and related technical
                specializations.
              </p>
            </div>

            <span className="mt-1 text-slate-300 transition group-hover:text-[var(--brand-purple)]">
              →
            </span>
          </div>
        </button>
      ))}
    </div>

    <div className="mt-8 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => router.push("/all-jobs")}
        className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(106,111,242,0.24)] transition hover:opacity-95"
      >
        Explore All Jobs
      </button>

      <button
        type="button"
        onClick={() => router.push("/categories")}
        className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        View All Categories
      </button>
    </div>

    {filteredCategories.length === 0 && (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-sm">
        No categories match{" "}
        <span className="font-semibold">“{categoryQuery}”</span>.
      </div>
    )}
  </div>
</section>

     {/* ================= EMPOWERING ================= */}
<section className={`relative overflow-hidden bg-white ${sectionPadding}`}>
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(106,111,242,0.10)] blur-3xl" />
    <div className="absolute -bottom-36 right-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.08)] blur-3xl" />
  </div>

  <div className={`relative ${container}`}>
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
      <div className="flex justify-center md:justify-start">
        <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-3 shadow-[0_12px_28px_rgba(15,23,42,0.07)]">
          <img
            src="/empower-platform.png"
            alt="Job platform dashboard illustration"
            className="w-full max-w-[560px] rounded-2xl"
          />
        </div>
      </div>

      <div>
        <span className="inline-flex items-center rounded-full border border-[rgba(106,111,242,0.16)] bg-[rgba(106,111,242,0.08)] px-4 py-1.5 text-xs font-semibold text-[var(--brand-purple)]">
          Built for Technical Careers
        </span>

        <h3 className="mt-4 text-[clamp(1.55rem,3vw,2rem)] font-extrabold tracking-tight text-slate-900">
          Empowering Job Seekers
        </h3>

        <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-600">
          Discover vetted technical roles, transparent salary ranges, and
          trusted employers in one focused experience.
        </p>

        <ul className="mt-6 space-y-3 text-sm text-slate-700">
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            Verified technical opportunities
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            Clearer expectations and visibility
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            Roles built for long-term growth
          </li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => router.push("/all-jobs")}
            className="inline-flex h-12 items-center gap-3 rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(106,111,242,0.24)] transition hover:opacity-95"
          >
            Get Started
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/all-jobs?loc=Remote")}
            className={secondaryButton}
          >
            Remote Roles
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}