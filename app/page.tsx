"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";

const CATEGORIES = [
  {
    name: "Engineering",
    roles: ["Mechanical", "Electrical", "Civil", "Structural", "Industrial"],
  },
  {
    name: "Architecture & Design",
    roles: [
      "Architect",
      "Architectural Designer",
      "BIM / Revit Specialist",
      "Urban Planner",
      "CAD / Drafting",
    ],
  },
  {
    name: "Information Technology",
    roles: [
      "Software Development",
      "Systems Administration",
      "Network Engineering",
      "Cloud / DevOps",
      "IT Support",
    ],
  },
  {
    name: "Data, AI & Cybersecurity",
    roles: [
      "Data Scientist",
      "Machine Learning Engineer",
      "Cybersecurity Analyst",
      "AI Engineer",
      "Data Engineer",
    ],
  },
  {
    name: "Telecom & Network Infrastructure",
    roles: [
      "Fiber Technician",
      "OSP Engineer",
      "RF Engineer",
      "Tower Technician",
      "Broadband Network Engineer",
    ],
  },
  {
    name: "Construction & Field Engineering",
    roles: [
      "Field Engineer",
      "Construction Manager",
      "Surveyor",
      "Site Engineer",
      "Project Engineer",
    ],
  },
  {
    name: "Manufacturing & Industrial",
    roles: [
      "Manufacturing Engineer",
      "Process Engineer",
      "CNC Programmer",
      "Automation Technician",
      "Quality Engineer",
    ],
  },
  {
    name: "Energy & Utilities",
    roles: [
      "Power Systems Engineer",
      "Substation Technician",
      "Renewable Energy Engineer",
      "Grid Infrastructure Engineer",
      "Utility Technician",
    ],
  },
  {
    name: "Skilled Trades & Technical Services",
    roles: [
      "Electrician",
      "HVAC Technician",
      "Maintenance Technician",
      "Controls Technician",
      "Industrial Technician",
    ],
  },
  {
    name: "Technical Project & Operations Management",
    roles: [
      "Technical Project Manager",
      "Engineering Manager",
      "Operations Manager",
      "Program Manager",
      "Technical Director",
    ],
  },
  {
    name: "Healthcare & Medical Technology",
    roles: [
      "Biomedical Engineer",
      "Medical Device Engineer",
      "Radiology Technician",
      "Lab Technician",
      "Clinical Systems Specialist",
    ],
  },
  {
    name: "Science & Research",
    roles: [
      "Chemist",
      "Physicist",
      "Environmental Scientist",
      "Materials Scientist",
      "Laboratory Researcher",
    ],
  },
];

export default function Home() {
  const router = useRouter();

  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");
   

  const [categoryQuery, setCategoryQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [visibleCategoryCount, setVisibleCategoryCount] = useState(10);

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
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50";
  const secondaryButton =
    "inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";

  const textButton =
    "inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline";

  return (
    <main className="min-h-screen bg-[#F6F8FC] font-sans text-[#0F172A]">
     
  {/* ================= HERO ================= */}
<section className="relative isolate overflow-hidden bg-[#F4F8FC]">
  {/* Background Layer */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  {/* base */}
  <div className="absolute inset-0 bg-[#F4F8FC]" />

{/* top animated AWS-style color band */}
<div className="absolute inset-x-0 top-0 h-[230px] overflow-hidden">
  <div className="hero-top-band-clean absolute inset-0" />
  <div className="hero-top-band-clean-2 absolute inset-0" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F4F8FC]" />
</div>

  {/* subtle grid */}
  <div
    className="absolute inset-0 opacity-[0.08]"
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
      backgroundSize: "30px 30px",
    }}
  />

  {/* right shape */}
  <svg
    className="absolute right-0 top-0 h-full w-[65%] opacity-80"
    viewBox="0 0 720 520"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="awsHeroGradient"
        x1="720"
        y1="0"
        x2="260"
        y2="520"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D8EBFF" stopOpacity="0.75" />
        <stop offset="0.45" stopColor="#EAF4FF" stopOpacity="0.36" />
        <stop offset="1" stopColor="#F4F8FC" stopOpacity="0" />
      </linearGradient>
    </defs>

    <path
      d="M720 0C650 40 610 110 580 180C540 260 500 340 430 410C380 460 320 500 240 520H720V0Z"
      fill="url(#awsHeroGradient)"
    />
  </svg>

  {/* very soft extra glow */}
  <div className="absolute right-[12%] top-[36px] h-[180px] w-[240px] rounded-full bg-[#dff1ff]/70 blur-3xl" />
</div>

  {/* floating glow 1 */}
  <div className="hero-glow-float absolute right-[12%] top-[8%] h-[220px] w-[220px] rounded-full bg-[#DCEEFF]/70 blur-3xl" />

  {/* floating glow 2 */}
  <div className="hero-glow-float absolute left-[-100px] top-[160px] h-[260px] w-[260px] rounded-full bg-white/60 blur-3xl [animation-delay:-5s]" />

  {/* soft center fade */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_42%)]" />


  {/* Content */}
  <div className={`relative ${container}`}>
    <div className="mx-auto max-w-5xl py-16 text-center sm:py-18 md:py-20 lg:py-24">
      {/* Badge */}
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
         Technical Roles • Salary Visibility • Fast Apply
      </div>

     {/* Title */}
<h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#0F172A]">
  Powering{" "}
  <span className="relative inline-block">
    <span
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[42px] w-[132px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-2xl"
    />
    <span className="relative text-emerald-600">Technical</span>
  </span>{" "}
  Careers
</h1>

      {/* Subtitle */}
      <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-slate-600 sm:text-[16px] md:text-[17px]">
        Browse Curated Opportunities Across Engineering, Infrastructure, Cloud,
        Security, Data, and Skilled Technical Fields — Including Remote and
        On-Site Roles.
      </p>

      {/* Search */}
      <div className="mt-9">
        <div className="mx-auto w-full max-w-5xl rounded-[26px] border border-white/70 bg-white/88 p-3 sm:p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md">
          <div className="mb-3 text-center text-[13px] font-medium text-slate-500">
            Start with a title, keyword, or location
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_auto] xl:items-center">
            <label className="sr-only" htmlFor="hero-q">
              Job title, skill, or keyword
            </label>

            <input
              id="hero-q"
              value={heroQ}
              onChange={(e) => setHeroQ(e.target.value)}
              type="text"
              placeholder="Job title, skill, or keyword"
              className={inputBase}
              onKeyDown={(e) => {
                if (e.key === "Enter") runHeroSearch();
              }}
            />

            <label className="sr-only" htmlFor="hero-loc">
              City, state, remote, or hybrid
            </label>

            <input
              id="hero-loc"
              value={heroLoc}
              onChange={(e) => setHeroLoc(e.target.value)}
              type="text"
              placeholder="City, state, remote, or hybrid"
              className={inputBase}
              onKeyDown={(e) => {
                if (e.key === "Enter") runHeroSearch();
              }}
            />

            <button
              type="button"
              onClick={runHeroSearch}
              className="h-12 w-full rounded-xl bg-[#0B1222] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition duration-200 hover:-translate-y-[1px] hover:bg-[#111827] md:col-span-2 xl:col-span-1 xl:w-auto"
            >
              Search Jobs
            </button>
          </div>

          {/* Popular Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-slate-500">
            <span className="mr-1 font-medium">Popular</span>

            {["Frontend", "DevOps", "Data", "Security", "Cloud"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setHeroQ(t);
                  setTimeout(runHeroSearch, 0);
                }}
                className="rounded-full border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust micro-copy */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-slate-500 sm:gap-x-5">
        <span>Trusted employers</span>
        <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
        <span>Remote and on-site roles</span>
        <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
        <span>Fast applications</span>
      </div>

      {/* Jump */}
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
          </div>

          <FeaturedJobsSection />
        </div>
      </section>

   {/* ================= CATEGORIES ================= */}

<section className="bg-white py-10 sm:py-12">
  <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">


{/* Header */}
<div className="mb-6 flex items-center justify-between">
  <h2 className="text-2xl font-bold text-[#0B1222]">
    Category
  </h2>

  <button
    type="button"
    onClick={() => router.push("/all-jobs")}
    className="text-sm font-semibold text-sky-600 hover:text-sky-700"
  >
    All jobs →
  </button>
</div>

{/* Grid */}
<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
  {[
    "Engineering",
    "Architecture & Design",
    "Information Technology",
    "Data, AI & Cybersecurity",
    "Telecom & Network Infrastructure",
    "Construction & Field Engineering",
    "Manufacturing & Industrial",
    "Energy & Utilities",
    "Skilled Trades & Technical Services",
    "Technical Project & Operations Management",
    "Healthcare & Medical Technology",
    "Science & Research",
  ]
    .slice(0, visibleCategoryCount)
    .map((cat) => (
      <button
        key={cat}
        type="button"
        onClick={() =>
          router.push(`/all-jobs?cat=${encodeURIComponent(cat)}`)
        }
        className="
          flex items-center justify-between
          rounded-lg border border-slate-200
          bg-white px-4 py-3 text-left
          transition hover:border-slate-300 hover:bg-slate-50
        "
      >
        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-semibold text-[#0B1222]">
            {cat}
          </h3>
          <p className="text-xs text-slate-500">0 Jobs</p>
        </div>

        <span className="text-slate-300">→</span>
      </button>
    ))}
</div>

{/* Load more */}
{visibleCategoryCount < 12 && (
  <div className="mt-6 flex justify-center">
    <button
      type="button"
      onClick={() => setVisibleCategoryCount((prev) => prev + 6)}
      className="
        rounded-lg border border-slate-200
        bg-white px-6 py-2 text-sm font-semibold text-slate-700
        hover:bg-slate-50
      "
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