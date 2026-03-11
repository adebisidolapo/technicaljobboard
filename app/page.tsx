"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";
import {
  Waypoints,
  ShieldCheck,
  FlaskConical,
  Database,
  Cloud,
  BriefcaseBusiness,
  SearchCode,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
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
  className="h-12 w-full rounded-xl bg-[#0B1222] px-6 text-sm font-semibold text-white transition hover:bg-black md:w-auto shadow-[0_10px_24px_rgba(15,23,42,0.22)]"
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
<section className="bg-[#F3F3F3] py-14 sm:py-16 md:py-20">
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mb-8 flex items-center justify-between sm:mb-10">
      <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-tight text-black">
        Category
      </h2>

      <button
        type="button"
        onClick={() => router.push("/all-jobs")}
        className="inline-flex items-center gap-1 text-sm font-medium text-sky-500 transition hover:text-sky-600"
      >
        All jobs
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {[
        {
          name: "Telecommunications",
          jobs: 0,
          icon: Waypoints,
        },
        {
          name: "Network Engineering",
          jobs: 0,
          icon: SearchCode,
        },
        {
          name: "Cybersecurity",
          jobs: 0,
          icon: ShieldCheck,
        },
        {
          name: "Science and Research",
          jobs: 0,
          icon: FlaskConical,
        },
        {
          name: "Data Analytics",
          jobs: 0,
          icon: Database,
        },
        {
          name: "Cloud Computing",
          jobs: 0,
          icon: Cloud,
        },
        {
          name: "Database Administration",
          jobs: 0,
          icon: Database,
        },
        {
          name: "IT Project Management",
          jobs: 0,
          icon: BriefcaseBusiness,
        },
        {
          name: "Systems Analysis",
          jobs: 0,
          icon: SearchCode,
        },
        {
          name: "Quality Assurance",
          jobs: 0,
          icon: BadgeCheck,
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.name}
            type="button"
            onClick={() =>
              router.push(`/all-jobs?cat=${encodeURIComponent(item.name)}`)
            }
            className="flex min-h-[78px] items-center gap-4 rounded-xl border border-[#D9D9D9] bg-[#F8F8F8] px-5 py-4 text-left transition hover:border-slate-300 hover:bg-white"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
              <Icon className="h-6 w-6 text-sky-400" strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold leading-5 text-[#161616]">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-[#222222]">{item.jobs} Jobs</p>
            </div>
          </button>
        );
      })}
    </div>
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