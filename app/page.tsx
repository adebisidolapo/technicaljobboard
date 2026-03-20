"use client";

import React, { useEffect, useState } from "react";
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
const ALL_CATEGORIES = [
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
  "Cloud & DevOps",
  "Product & Technical Support",
  "QA & Compliance",
  "Automation & Control Systems",
];

const [visibleCategoryCount, setVisibleCategoryCount] = useState(6);

useEffect(() => {
  const updateCategoryCount = () => {
    if (window.innerWidth >= 1024) {
      setVisibleCategoryCount(12);
    } else if (window.innerWidth >= 640) {
      setVisibleCategoryCount(8);
    } else {
      setVisibleCategoryCount(6);
    }
  };

  updateCategoryCount();
  window.addEventListener("resize", updateCategoryCount);

  return () => window.removeEventListener("resize", updateCategoryCount);
}, []);

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
<section className="relative isolate overflow-hidden bg-[#F7F8FB]">
 {/* Background Layer */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute inset-0 bg-white" />

  {/* Hex grid */}
  <div
    className="absolute inset-0 opacity-100"
    style={{
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zM28 100L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='rgba(99%2C102%2C241%2C0.07)' stroke-width='0.8'/%3E%3C/svg%3E\")",
      backgroundSize: "56px 100px",
    }}
  />

  {/* Aurora sweep on top of hex */}
  <div className="absolute inset-x-0 top-0 h-[280px] overflow-hidden">
    <div
      className="absolute inset-0 blur-[54px]"
      style={{
        background: `linear-gradient(
          100deg,
          rgba(255,255,255,0) 0%,
          rgba(52,211,153,0.30) 20%,
          rgba(167,139,250,0.22) 48%,
          rgba(52,211,153,0.18) 74%,
          rgba(255,255,255,0) 92%
        )`,
        backgroundSize: "300% 100%",
        animation: "awsBandMove 10s ease-in-out infinite",
      }}
    />
    <div
      className="absolute inset-0 blur-[88px]"
      style={{
        background: `linear-gradient(
          92deg,
          rgba(255,255,255,0) 0%,
          rgba(167,139,250,0.12) 28%,
          rgba(52,211,153,0.10) 60%,
          rgba(99,179,255,0.04) 78%,
          rgba(255,255,255,0) 95%
        )`,
        backgroundSize: "300% 100%",
        animation: "awsBandMove2 14s ease-in-out infinite",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
  </div>

  {/* right shape */}
  <svg
    className="absolute right-0 top-0 h-full w-[62%] opacity-70"
    viewBox="0 0 720 520"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="awsHeroGradient" x1="720" y1="0" x2="260" y2="520" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EEE9FF" stopOpacity="0.82" />
        <stop offset="0.35" stopColor="#F3EEFF" stopOpacity="0.32" />
        <stop offset="0.75" stopColor="#F8FBFA" stopOpacity="0.10" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M720 0C650 40 610 110 580 180C540 260 500 340 430 410C380 460 320 500 240 520H720V0Z"
      fill="url(#awsHeroGradient)"
    />
  </svg>

  {/* glows */}
  <div className="absolute left-[7%] top-[6px] h-[150px] w-[240px] rounded-full bg-emerald-300/20 blur-[95px]" />
  <div className="absolute right-[7%] top-[12px] h-[165px] w-[250px] rounded-full bg-violet-300/16 blur-[100px]" />

  {/* center softness keeps text crisp */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_0%,rgba(255,255,255,0.85),transparent_56%)]" />

  {/* bottom lift into white */}
  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white" />
</div>

  {/* Content */}
  <div className={`relative ${container}`}>
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20 lg:py-24">
      {/* Badge */}
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/82 px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-[0_8px_22px_rgba(15,23,42,0.05)] backdrop-blur-sm">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        Technical Roles • Remote Jobs • Fast Apply
      </div>

      {/* Title */}
      <h1 className="mx-auto mt-6 text-[clamp(2rem,4.5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0F172A]">
        Discover Top{" "}
        <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          Technical
        </span>{" "}
        Jobs
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-slate-500 sm:text-base">
        Browse the best technical roles in engineering, cloud, security,
        data, and infrastructure —{" "}
        <strong className="font-semibold text-slate-700">
          remote and on-site.
        </strong>
      </p>

      {/* Search card */}
      <div className="mt-10 mx-auto w-full max-w-4xl rounded-[28px] border border-slate-200/80 bg-white/88 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        {/* Inputs + button row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="hero-q"
            value={heroQ}
            onChange={(e) => setHeroQ(e.target.value)}
            type="text"
            placeholder="Job title, skill, or keyword"
            className={`${inputBase} h-14 rounded-[18px] border-slate-200 bg-white/96 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] placeholder:text-slate-400`}
            onKeyDown={(e) => {
              if (e.key === "Enter") runHeroSearch();
            }}
          />
          <input
            id="hero-loc"
            value={heroLoc}
            onChange={(e) => setHeroLoc(e.target.value)}
            type="text"
            placeholder="City, state, remote, or hybrid"
            className={`${inputBase} h-14 rounded-[18px] border-slate-200 bg-white/96 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] placeholder:text-slate-400`}
            onKeyDown={(e) => {
              if (e.key === "Enter") runHeroSearch();
            }}
          />
          <button
            type="button"
            onClick={runHeroSearch}
            className="h-14 w-full shrink-0 rounded-[18px] bg-[#081225] px-7 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(8,18,37,0.18),0_3px_0_rgba(16,185,129,0.36)] transition hover:bg-[#0f172a] sm:w-auto"
          >
            Search Jobs
          </button>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
            Popular
          </span>
          {[
            "Engineering",
            "DevOps",
            "Project Management",
            "Data",
            "Security",
            "Cloud",
          ].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setHeroQ(t);
                setTimeout(runHeroSearch, 0);
              }}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Trust line */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 pt-4 text-[12px] text-slate-400">
          <span>Trusted employers</span>
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          <span>Remote + on-site</span>
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          <span>Fast apply</span>
        </div>
      </div>

      {/* Jump */}
      <button
        type="button"
        onClick={jumpToFeatured}
        className={`mt-8 ${textButton}`}
      >
        Jump To Jobs <span aria-hidden>↓</span>
      </button>
    </div>
  </div>

  <style jsx>{`
    @keyframes awsBandMove {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    @keyframes awsBandMove2 {
      0% {
        background-position: 100% 50%;
      }
      50% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 100% 50%;
      }
    }
  `}</style>
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
<FeaturedJobsSection />


{/* ================= CATEGORIES ================= */}
<section
  className="relative overflow-hidden py-10 sm:py-12"
  style={{
    background: "linear-gradient(180deg, #ffffff 0%, #F5F3FF 30%, #F5F3FF 70%, #ffffff 100%)",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='rgba(99%2C102%2C241%2C0.12)'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='rgba(99%2C102%2C241%2C0.12)'/%3E%3Ccircle cx='40' cy='0' r='1.5' fill='rgba(99%2C102%2C241%2C0.12)'/%3E%3Ccircle cx='0' cy='40' r='1.5' fill='rgba(99%2C102%2C241%2C0.12)'/%3E%3Ccircle cx='40' cy='40' r='1.5' fill='rgba(99%2C102%2C241%2C0.12)'/%3E%3Cline x1='0' y1='0' x2='20' y2='20' stroke='rgba(99%2C102%2C241%2C0.04)' stroke-width='0.5'/%3E%3Cline x1='40' y1='0' x2='20' y2='20' stroke='rgba(99%2C102%2C241%2C0.04)' stroke-width='0.5'/%3E%3Cline x1='0' y1='40' x2='20' y2='20' stroke='rgba(99%2C102%2C241%2C0.04)' stroke-width='0.5'/%3E%3Cline x1='40' y1='40' x2='20' y2='20' stroke='rgba(99%2C102%2C241%2C0.04)' stroke-width='0.5'/%3E%3C/svg%3E\")",
    backgroundSize: "40px 40px",
  }}
>
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    <div className="absolute right-[-60px] top-[-30px] h-36 w-36 rounded-full bg-emerald-200/20 blur-3xl" />
    <div className="absolute left-[-50px] bottom-[-50px] h-40 w-40 rounded-full bg-indigo-100/25 blur-3xl" />
  </div>

  <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-[#0B1222]">
        Popular Category
      </h2>

      <button
        type="button"
        onClick={() => router.push("/all-jobs")}
        className="text-sm font-semibold text-sky-600 transition hover:text-sky-700"
      >
        All jobs →
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ALL_CATEGORIES.slice(0, visibleCategoryCount).map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() =>
            router.push(`/all-jobs?cat=${encodeURIComponent(cat)}`)
          }
          className="
            group relative flex items-start justify-between gap-3
            overflow-hidden rounded-[24px]
            border border-slate-200/90 bg-white/95
            px-4 py-4 text-left
            shadow-[0_6px_18px_rgba(15,23,42,0.035)]
            transition duration-200
            hover:-translate-y-[2px]
            hover:border-slate-300
            hover:shadow-[0_12px_26px_rgba(15,23,42,0.06)]
          "
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-5 -top-5 h-14 w-14 rounded-full bg-emerald-100/60 blur-2xl transition duration-300 group-hover:bg-emerald-100/80" />
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-emerald-400/70 via-emerald-300/20 to-transparent" />
          </div>

          <div className="relative min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2.5 w-2.5 flex-none rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
              <h3 className="line-clamp-2 text-[14px] font-semibold leading-5 text-[#0B1222]">
                {cat}
              </h3>
            </div>

            <p className="mt-2 pl-5 text-sm font-medium text-slate-700">
              0 Jobs
            </p>
          </div>

          <span className="relative mt-1 text-slate-300 transition duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500">
            →
          </span>
        </button>
      ))}
    </div>

    {visibleCategoryCount < ALL_CATEGORIES.length && (
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() =>
            setVisibleCategoryCount((prev) =>
              Math.min(prev + 4, ALL_CATEGORIES.length)
            )
          }
          className="
            rounded-full border border-slate-200
            bg-white px-6 py-2.5 text-sm font-semibold text-slate-700
            shadow-sm transition duration-200
            hover:border-slate-300 hover:bg-slate-50
          "
        >
          Load More
        </button>
      </div>
    )}
  </div>
</section>


      {/* ================= EMPOWERING ================= */}
 <section
  className={`relative overflow-hidden ${sectionPadding}`}
  style={{
    background: "#ffffff",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 0 L60 0 L60 60 L0 60 Z' fill='none' stroke='rgba(99%2C102%2C241%2C0.06)' stroke-width='0.5'/%3E%3Cpath d='M0 0 L60 60 M60 0 L0 60' stroke='rgba(99%2C102%2C241%2C0.04)' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='2' fill='rgba(99%2C102%2C241%2C0.08)'/%3E%3C/svg%3E\")",
    backgroundSize: "60px 60px",
  }}
>
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(106,111,242,0.07)] blur-3xl" />
    <div className="absolute -bottom-36 right-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.05)] blur-3xl" />
    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
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