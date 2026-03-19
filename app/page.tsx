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
<section className="relative isolate overflow-hidden bg-white">
  {/* Background Layer */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* true white base */}
    <div className="absolute inset-0 bg-white" />

    {/* top animated wash - softer so white still reads as white */}
    <div className="absolute inset-x-0 top-0 h-[220px] overflow-hidden">
      <div
        className="absolute inset-0 blur-[52px]"
        style={{
          background: `linear-gradient(
            100deg,
            rgba(255,255,255,0) 0%,
            rgba(52,211,153,0.20) 22%,
            rgba(167,139,250,0.16) 52%,
            rgba(52,211,153,0.12) 75%,
            rgba(255,255,255,0) 92%
          )`,
          backgroundSize: "300% 100%",
          animation: "awsBandMove 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 blur-[84px]"
        style={{
          background: `linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(167,139,250,0.10) 28%,
            rgba(52,211,153,0.08) 60%,
            rgba(99,179,255,0.06) 78%,
            rgba(255,255,255,0) 95%
          )`,
          backgroundSize: "300% 100%",
          animation: "awsBandMove2 13s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
    </div>

    {/* left mint side shade */}
    <div className="absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-emerald-300/18 blur-[115px]" />

    {/* soft center top light */}
    <div className="absolute left-1/2 top-[-40px] h-[180px] w-[760px] -translate-x-1/2 rounded-full bg-sky-100/50 blur-[110px]" />

    {/* right violet side shade */}
    <div className="absolute -right-24 top-[-10px] h-[340px] w-[340px] rounded-full bg-violet-300/16 blur-[120px]" />

    {/* subtle aws-style right arc */}
    <div className="absolute right-[-130px] top-[-30px] h-[420px] w-[420px] rounded-full border-[34px] border-violet-100/90" />

    {/* soft white fade so center remains crisp */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_0%,rgba(255,255,255,0.78),transparent_58%)]" />
  </div>

  {/* Content */}
  <div className={`relative ${container}`}>
    <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:py-16 lg:py-20">
      {/* Badge */}
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/92 px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-[0_6px_18px_rgba(15,23,42,0.05)] backdrop-blur-sm">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        <span>Technical Roles</span>
        <span className="text-emerald-500">•</span>
        <span>Remote Jobs</span>
        <span className="text-emerald-500">•</span>
        <span>Fast Apply</span>
      </div>

      {/* Title */}
      <h1 className="mx-auto mt-6 max-w-[980px] text-[clamp(2.2rem,5vw,4.15rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#0B1222]">
        Discover Top <span className="text-emerald-600">Technical</span> Jobs
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-slate-600 sm:text-[16px]">
        Browse the best technical roles in engineering, cloud, security, data,
        and infrastructure —{" "}
        <strong className="font-semibold text-slate-700">
          remote and on-site.
        </strong>
      </p>

      {/* Search card */}
      <div className="mx-auto mt-10 w-full max-w-[1040px] overflow-hidden rounded-[30px] border border-slate-200/90 bg-white/92 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              id="hero-q"
              value={heroQ}
              onChange={(e) => setHeroQ(e.target.value)}
              type="text"
              placeholder="Job title, skill, or keyword"
              className="h-14 min-w-0 flex-1 rounded-[18px] border border-slate-200 bg-white px-6 text-[15px] text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70"
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
              className="h-14 min-w-0 flex-1 rounded-[18px] border border-slate-200 bg-white px-6 text-[15px] text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70"
              onKeyDown={(e) => {
                if (e.key === "Enter") runHeroSearch();
              }}
            />

            <button
              type="button"
              onClick={runHeroSearch}
              className="h-14 shrink-0 rounded-[18px] bg-[#081225] px-7 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(8,18,37,0.20),0_3px_0_rgba(16,185,129,0.38)] transition hover:bg-[#0f172a] md:min-w-[180px]"
            >
              Search Jobs
            </button>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[12px] font-semibold text-emerald-700">
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
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Trust line */}
        <div className="border-t border-slate-200/80 bg-slate-50/45 px-5 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[13px] text-slate-500 sm:gap-5">
            <span>Trusted employers</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
            <span>Remote + on-site</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
            <span>Fast apply</span>
          </div>
        </div>
      </div>

      {/* Jump */}
      <button
        type="button"
        onClick={jumpToFeatured}
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
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
<section className="relative overflow-hidden bg-white py-10 sm:py-12">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.04),transparent_18%)]" />
    <div
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.12))",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.12))",
      }}
    />
    <div className="absolute right-[-60px] top-[-30px] h-36 w-36 rounded-full bg-emerald-200/30 blur-3xl" />
    <div className="absolute left-[-50px] bottom-[-50px] h-40 w-40 rounded-full bg-indigo-100/35 blur-3xl" />
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
<section className={`relative overflow-hidden bg-white ${sectionPadding}`}>
  {/* Background (FIXED GLOW + TECH FEEL) */}
  <div className="pointer-events-none absolute inset-0">
    {/* Top-left glow */}
    <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[rgba(106,111,242,0.14)] blur-[120px]" />

    {/* Bottom-right glow */}
    <div className="absolute -bottom-40 right-[-160px] h-[520px] w-[520px] rounded-full bg-[rgba(16,185,129,0.12)] blur-[140px]" />

    {/* Center soft wash */}
    <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_20%,rgba(106,111,242,0.08),transparent)]" />

    {/* Subtle grid */}
    <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#0B1222_1px,transparent_1px),linear-gradient(to_bottom,#0B1222_1px,transparent_1px)] bg-[size:36px_36px]" />
  </div>

  <div className={`relative ${container}`}>
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
      
      {/* IMAGE */}
      <div className="order-1 flex justify-center lg:justify-start">
        <div className="w-full max-w-[620px] rounded-[28px] border border-slate-200/80 bg-[#F8FAFC]/90 p-2 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-3">
          <img
            src="/empower-platform.png"
            alt="Job Platform Dashboard Illustration"
            className="block w-full rounded-[22px]"
          />
        </div>
      </div>

      {/* TEXT */}
      <div className="order-2 mx-auto w-full max-w-xl lg:mx-0">
        <span className="inline-flex items-center rounded-full border border-[rgba(106,111,242,0.16)] bg-[rgba(106,111,242,0.08)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-purple)] sm:text-xs">
          Built For Technical Careers
        </span>

        <h3 className="mt-4 text-[1.8rem] font-extrabold tracking-tight text-slate-900 sm:text-[2rem] lg:text-[2.15rem]">
          Empowering Job Seekers
        </h3>

        <p className="mt-3 max-w-xl text-[14px] leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
          Discover vetted technical roles, transparent salary ranges, and
          trusted employers in one focused experience.
        </p>

        <ul className="mt-6 space-y-3 text-[14px] text-slate-700 sm:text-sm">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-indigo-500" />
            <span>Verified Technical Opportunities</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-indigo-500" />
            <span>Clearer Expectations And Visibility</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-indigo-500" />
            <span>Roles Built For Long-Term Growth</span>
          </li>
        </ul>

        {/* CTA */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => router.push("/all-jobs")}
            className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(106,111,242,0.24)] transition hover:opacity-95 sm:w-auto"
          >
            Get Started
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/all-jobs?loc=Remote")}
            className={`h-12 w-full justify-center sm:w-auto ${secondaryButton}`}
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