"use client";

import React, { useState } from "react";
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
const [visibleCategoryCount, setVisibleCategoryCount] = useState(9);

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
  "mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-10";
const wideContainer =
  "mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-10";
  const sectionPadding = "py-14 sm:py-16 md:py-20";

  const eyebrow =
    "text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500";
  const sectionTitle =
    "mt-3 text-[clamp(1.6rem,3.2vw,2.35rem)] font-extrabold tracking-tight text-[#0F172A]";

  const inputBase =
    "h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100";

  const secondaryButton =
    "inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";

  const textButton =
    "inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline";

  return (
    <main className="min-h-screen bg-[#F6F8FC] font-sans text-[#0F172A]">
     
      {/* ================= HERO ================= */}
<section className="relative overflow-hidden bg-[#EEF6F2]">
  <div className="pointer-events-none absolute inset-0">

    {/* base gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#EEF6F2] via-[#EEF6F2] to-[#F6F8FC]" />

    {/* subtle grid texture */}
    <div
      className="absolute inset-0 opacity-[0.14]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.12) 1px, transparent 0)",
        backgroundSize: "30px 30px",
      }}
    />

    {/* corner glow top left */}
    <div className="absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-300/20 blur-[120px]" />

    {/* corner glow top right */}
    <div className="absolute -top-32 right-[-140px] h-[460px] w-[460px] rounded-full bg-indigo-300/20 blur-[140px]" />

    {/* bottom accent */}
    <div className="absolute bottom-[-120px] left-[30%] h-[380px] w-[380px] rounded-full bg-sky-200/20 blur-[120px]" />

  </div>
        <div className={`relative ${container}`}>
<div className="mx-auto max-w-5xl py-14 text-center sm:py-16 md:py-20 lg:py-24">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Curated Roles • Remote Friendly • Fast Apply
            </div>

          <h1 className="mt-6 text-[clamp(2.2rem,4.8vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-[#0F172A]">
  Find{" "}
  <span className="relative inline-block">
    <span
      aria-hidden
      className="absolute left-[42%] top-1/2 h-[36px] w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-2xl"
    />
    <span className="relative">
      <span className="text-emerald-600">Technical</span>{" "}
      <span className="text-[#0F172A]">Jobs</span>
    </span>
  </span>{" "}
  Built For Long-Term Careers
</h1>

            <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-slate-600 sm:text-[16px]">
              Browse opportunities across engineering, infrastructure, cloud,
              security, and data — including remote options.
            </p>

           <div className="mt-8">
  <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_auto] xl:items-center">
                  <label className="sr-only" htmlFor="hero-q">
                    Job Title Or Keyword
                  </label>
                  <input
                    id="hero-q"
                    value={heroQ}
                    onChange={(e) => setHeroQ(e.target.value)}
                    type="text"
                    placeholder="Job Title, Keyword"
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
                    placeholder="Location (Remote, New York, Texas)"
                    className={inputBase}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") runHeroSearch();
                    }}
                  />

                  <button
                    type="button"
                    onClick={runHeroSearch}
className="h-12 w-full rounded-xl bg-[#0B1222] px-6 text-sm font-semibold text-white transition hover:bg-black md:col-span-2 xl:col-span-1 xl:w-auto shadow-[0_10px_24px_rgba(15,23,42,0.22)]"                  >
                    Search Jobs
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-slate-500">
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
              Jump To Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY TEAMS ================= */}
      <section className={`bg-white ${sectionPadding}`}>
        <div className={container}>
          <div className="text-center">
            <p className={eyebrow}>Trusted By Teams</p>
            <h2 className={sectionTitle}>Companies Hiring Through Us</h2>
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
      <section id="featured" className="bg-[#F2F4F8] py-14 sm:py-16 md:py-20">
        <div className={container}>
          <div className="mb-8 sm:mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Featured Jobs
            </p>
            <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold tracking-tight text-[#0B1222]">
              Opportunities Worth A Closer Look
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
              A curated selection of standout technical roles.
            </p>
          </div>

          <FeaturedJobsSection />
        </div>
      </section>

     {/* ================= CATEGORIES ================= */}
<section className="relative overflow-hidden bg-[#E9EEF6] py-14 sm:py-16 md:py-20">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-[#EEF3FA] via-[#E9EEF6] to-[#E6ECF5]" />
    <div className="absolute -top-10 left-[8%] h-28 w-28 rounded-full bg-white/30 blur-2xl" />
    <div className="absolute top-16 right-[12%] h-24 w-24 rounded-full bg-white/25 blur-2xl" />
    <div className="absolute bottom-10 left-[24%] h-20 w-20 rounded-full bg-white/20 blur-2xl" />
  </div>

  <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-tight text-black">
        Popular Category
      </h2>

      <button
        type="button"
        onClick={() => router.push("/all-jobs")}
        className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0B1222] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition hover:bg-black"
      >
        All Jobs
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        "Telecommunications",
        "Network Engineering",
        "Cybersecurity",
        "Science And Research",
        "Data Analytics",
        "Cloud Computing",
        "Database Administration",
        "IT Project Management",
        "Systems Analysis",
        "Quality Assurance",
        "Healthcare IT",
        "Aerospace / Defense",
        "Architecture",
        "Project Management",
        "Construction / Building Systems",
        "Manufacturing / Production",
        "Field Service / Commissioning",
        "Quality / Compliance",
        "Maintenance / Reliability",
      ]
        .slice(0, visibleCategoryCount)
        .map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => router.push(`/all-jobs?cat=${encodeURIComponent(cat)}`)}
            className="group flex min-h-[92px] items-center gap-4 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-semibold leading-5 text-[#161616]">
                {cat}
              </h3>
              <p className="mt-1 text-sm text-[#4B5563]">0 Jobs</p>
            </div>

            <span className="text-slate-300 transition group-hover:text-slate-500">
              →
            </span>
          </button>
        ))}
    </div>

    {visibleCategoryCount < 19 && (
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setVisibleCategoryCount((prev) => prev + 6)}
          className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          Load More
        </button>
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
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-3 shadow-[0_12px_28px_rgba(15,23,42,0.07)]">
                <img
                  src="/empower-platform.png"
                  alt="Job Platform Dashboard Illustration"
                  className="w-full max-w-[560px] rounded-2xl"
                />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center rounded-full border border-[rgba(106,111,242,0.16)] bg-[rgba(106,111,242,0.08)] px-4 py-1.5 text-xs font-semibold text-[var(--brand-purple)]">
                Built For Technical Careers
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
                  Verified Technical Opportunities
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  Clearer Expectations And Visibility
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  Roles Built For Long-Term Growth
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