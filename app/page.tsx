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
<section className="relative isolate overflow-hidden bg-[#f6f8fc]">

  {/* Background — unified aurora sweep */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#f6f8fc]" />

    {/* Single unified band that sweeps across the full width */}
    <div
      className="absolute -inset-x-10 top-0 h-[420px] blur-[80px]"
      style={{
        background: `linear-gradient(
          105deg,
          transparent 0%,
          rgba(120, 226, 209, 0.30) 15%,
          rgba(52, 211, 153, 0.45) 30%,
          rgba(167, 139, 250, 0.35) 55%,
          rgba(181, 166, 255, 0.28) 72%,
          transparent 90%
        )`,
        backgroundSize: "200% 100%",
        animation: "auroraSweep 10s ease-in-out infinite",
      }}
    />

    {/* Second softer layer moving opposite */}
    <div
      className="absolute -inset-x-10 top-0 h-[300px] blur-[60px]"
      style={{
        background: `linear-gradient(
          95deg,
          transparent 0%,
          rgba(181, 166, 255, 0.20) 20%,
          rgba(52, 211, 153, 0.18) 50%,
          rgba(120, 226, 209, 0.22) 78%,
          transparent 95%
        )`,
        backgroundSize: "200% 100%",
        animation: "auroraSweep2 14s ease-in-out infinite",
      }}
    />

    {/* Fade to page bg at bottom */}
    <div className="absolute -inset-x-10 top-0 h-[420px] bg-gradient-to-b from-transparent via-transparent to-[#f6f8fc]" />

    {/* White center — keeps text sharp */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_20%,rgba(255,255,255,0.72),transparent_60%)]" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-6 md:px-10">
    <div className="mx-auto max-w-4xl py-20 text-center md:py-28">

      {/* Badge */}
      <div className="mx-auto mb-10 flex w-fit items-center gap-3 rounded-full border border-white/70 bg-white/80 px-6 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur">
        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
        <span className="text-sm font-medium text-slate-700">
          Technical Roles • Remote Jobs • Fast Apply
        </span>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-[#0b1736] md:text-7xl md:leading-[0.95]">
        Discover Top{" "}
        <span className="text-[#059669]">Technical Jobs</span>
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mt-7 max-w-2xl text-xl leading-9 text-slate-500 md:text-[22px]">
        Browse the best technical roles in engineering, cloud, security,
        data, and infrastructure —{" "}
        <span className="font-semibold text-slate-700">
          remote and on-site.
        </span>
      </p>

      {/* Search Card */}
      <div className="mx-auto mt-14 max-w-6xl rounded-[30px] border border-white/80 bg-white/90 p-7 shadow-[0_22px_60px_rgba(15,23,42,0.10)] backdrop-blur-sm md:p-8">

        {/* Inputs + button */}
        <div className="flex flex-col gap-4 lg:flex-row">
          <input
            type="text"
            value={heroQ}
            onChange={(e) => setHeroQ(e.target.value)}
            placeholder="Job title, skill, or keyword"
            className="h-16 flex-1 rounded-[18px] border border-slate-200 bg-[#f9fafb] px-6 text-[17px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#10b981] focus:ring-4 focus:ring-emerald-100"
            onKeyDown={(e) => { if (e.key === "Enter") runHeroSearch(); }}
          />
          <input
            type="text"
            value={heroLoc}
            onChange={(e) => setHeroLoc(e.target.value)}
            placeholder="City, state, remote, or hybrid"
            className="h-16 flex-1 rounded-[18px] border border-slate-200 bg-[#f9fafb] px-6 text-[17px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#10b981] focus:ring-4 focus:ring-emerald-100"
            onKeyDown={(e) => { if (e.key === "Enter") runHeroSearch(); }}
          />
          <button
            type="button"
            onClick={runHeroSearch}
            className="h-16 rounded-[18px] bg-[#0b1736] px-10 text-[17px] font-semibold text-white transition hover:-translate-y-0.5 lg:min-w-[200px]"
            style={{
              boxShadow: "0 10px 24px rgba(11,23,54,0.28), 0 4px 20px rgba(16,185,129,0.25)",
            }}
          >
            Search Jobs
          </button>
        </div>

        {/* Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "Popular", active: true },
            { label: "Engineering", active: false },
            { label: "DevOps", active: false },
            { label: "Project Management", active: false },
            { label: "Data", active: false },
            { label: "Security", active: false },
            { label: "Cloud", active: false },
          ].map(({ label, active }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (label !== "Popular") {
                  setHeroQ(label);
                  setTimeout(runHeroSearch, 0);
                }
              }}
              className={`rounded-full border px-5 py-2.5 text-base font-medium transition ${
                active
                  ? "border-[#b7ead7] bg-[#ecfdf5] text-[#059669]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[15px] text-slate-500">
            <span>Trusted employers</span>
            <span className="text-[#10b981]">•</span>
            <span>Remote + on-site</span>
            <span className="text-[#10b981]">•</span>
            <span>Fast apply</span>
          </div>
        </div>
      </div>

      {/* Jump */}
      <div className="mt-10">
        <button
          type="button"
          onClick={jumpToFeatured}
          className="text-sm font-medium text-slate-400 transition hover:text-slate-700"
        >
          Jump To Jobs <span aria-hidden>↓</span>
        </button>
      </div>

    </div>
  </div>

  <style jsx>{`
    @keyframes auroraSweep {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes auroraSweep2 {
      0%   { background-position: 100% 50%; }
      50%  { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
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