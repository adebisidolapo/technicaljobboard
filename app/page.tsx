"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";
type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  description: string;
};

const COMPANY_LOGOS = [
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/Devops.png", alt: "DevOps Team" },
  { src: "/Architects.png", alt: "Architects" },
  { src: "/logo.png", alt: "Technical Job Board" },
  { src: "/logo-removebg-preview.png", alt: "Brand Logo" },
];

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

const FEATURED_JOBS: FeaturedJob[] = [
  {
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "2 days ago",
    description: "React + Next.js, performance-first UI systems.",
  },
  {
    title: "Backend Engineer (Node/Go)",
    company: "TechNova",
    location: "Austin, TX",
    type: "Full-time",
    pay: "$130k – $175k",
    posted: "3 days ago",
    description: "APIs, services, and scalable backend systems.",
  },
  {
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "5 days ago",
    description: "CI/CD, infra automation, and reliability.",
  },
  {
    title: "Data Engineer",
    company: "ByteForge",
    location: "New York, NY",
    type: "Full-time",
    pay: "$125k – $175k",
    posted: "4 days ago",
    description: "Pipelines, quality, and analytics foundations.",
  },
  {
    title: "Security Engineer",
    company: "SentinelWorks",
    location: "Remote",
    type: "Full-time",
    pay: "$145k – $200k",
    posted: "6 days ago",
    description: "AppSec + cloud controls, secure-by-default.",
  },
  {
    title: "Site Reliability Engineer",
    company: "Stackline",
    location: "Remote",
    type: "Full-time",
    pay: "$135k – $185k",
    posted: "2 days ago",
    description: "Observability, incident response, SLAs.",
  },
  {
    title: "QA Automation Engineer",
    company: "VerityLabs",
    location: "Chicago, IL",
    type: "Full-time",
    pay: "$110k – $150k",
    posted: "5 days ago",
    description: "Automation, CI, and test reliability.",
  },
  {
    title: "Product Designer",
    company: "Lumen",
    location: "San Francisco, CA",
    type: "Contract",
    pay: "$70 – $95/hr",
    posted: "1 week ago",
    description: "Product UX, systems thinking, crisp UI.",
  },
  {
    title: "Cloud Engineer (AWS)",
    company: "Northwind",
    location: "Denver, CO",
    type: "Full-time",
    pay: "$125k – $170k",
    posted: "3 days ago",
    description: "AWS infra, IAM, networking, security.",
  },
  {
    title: "Full Stack Engineer",
    company: "BrightOps",
    location: "Dallas, TX",
    type: "Full-time",
    pay: "$120k – $165k",
    posted: "4 days ago",
    description: "Next.js + APIs, ship features end-to-end.",
  },
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
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200";

  const chipBase =
    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition";

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

  const marqueeLogos = useMemo(() => {
    return COMPANY_LOGOS.concat(COMPANY_LOGOS).concat(COMPANY_LOGOS);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="font-sans text-[#0F172A] bg-[#F3F6FB]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#EEF6F2]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF6F2] via-[#EEF6F2] to-[#F3F6FB]" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center py-16 sm:py-20 md:py-24">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Curated roles • Remote friendly • Fast apply
            </div>

            <h1 className="mt-6 text-[2.1rem] sm:text-[2.7rem] md:text-[3.2rem] font-extrabold leading-tight tracking-tight text-[#0F172A]">
              Find{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute -inset-x-14 -inset-y-10 bg-emerald-400/12 blur-[70px] rounded-full"
                />
                <span
                  aria-hidden
                  className="absolute -inset-x-8 -inset-y-6 bg-emerald-400/16 blur-[42px] rounded-full"
                />
                <span className="relative text-emerald-600">Technical Jobs</span>
              </span>{" "}
              built for long-term careers
            </h1>

            <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Browse opportunities across engineering, infrastructure, cloud, security, and data — including remote
              options. Simple, clean, and focused on serious hiring.
            </p>

            <div className="mt-8">
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
                  <input
                    value={heroQ}
                    onChange={(e) => setHeroQ(e.target.value)}
                    type="text"
                    placeholder="Job title, keyword"
                    className={inputBase}
                  />
                  <input
                    value={heroLoc}
                    onChange={(e) => setHeroLoc(e.target.value)}
                    type="text"
                    placeholder="Location (Remote, Lagos, New York)"
                    className={inputBase}
                  />
                  <button
                    type="button"
                    onClick={runHeroSearch}
                    className="h-12 w-full md:w-auto rounded-xl px-6 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-[0_10px_26px_rgba(2,6,23,0.22)]"
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
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-slate-300"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY TEAMS ================= */}
<section className="bg-white py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center">
      <p className="text-[10px] tracking-[0.34em] text-slate-400 font-semibold uppercase">
        Trusted by teams
      </p>
      <h2 className="mt-3 text-2xl md:text-4xl font-extrabold text-[#0B1222] tracking-tight">
        Popular Companies We Have Worked With
      </h2>
      <p className="mt-3 text-sm text-slate-500 max-w-2xl mx-auto">
        Teams across the US trust TechnicalJobboard to hire technical talent.
      </p>
    </div>

    <div className="mt-14">
      {/* Company logo carousel */}
      <CompanyLogoCarousel />
    </div>
  </div>
</section>



      {/* ================= CATEGORIES ================= */}
      <section id="categories" className="relative overflow-hidden py-16 bg-[#F4F6FB]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FC] via-[#F4F6FB] to-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-slate-500 font-semibold">Categories</p>
              <h3 className="mt-3 text-2xl md:text-4xl font-extrabold text-[#0B1222] tracking-tight">
                Browse by category
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl">
                Search and swipe through categories — tap one to explore matching roles.
              </p>
            </div>

            <div className="w-full md:w-[380px]">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="text-slate-400">⌕</span>
                <input
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                  placeholder="Search categories…"
                  className="w-full bg-transparent outline-none text-sm text-slate-700"
                />
              </div>

              {selectedCategory && (
                <div className="mt-2 text-xs text-slate-500">
                  Selected: <span className="font-semibold text-slate-700">{selectedCategory}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("");
                      setCategoryQuery("");
                    }}
                    className="ml-2 text-[var(--brand-purple)] hover:underline font-semibold"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth py-2">
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
                    ? "bg-[#0B1222] text-white border-[#0B1222]"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300",
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
                        ? "bg-[rgba(106,111,242,0.12)] text-[var(--brand-purple)] border-[rgba(106,111,242,0.25)]"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "mr-2 inline-block h-2 w-2 rounded-full",
                        active ? "bg-[var(--brand-purple)]" : "bg-emerald-500/80",
                      ].join(" ")}
                    />
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 text-xs text-slate-500">Tip: swipe sideways to see more categories.</div>

          {filteredCategories.length === 0 && (
            <div className="mt-6 text-sm text-slate-600">
              No categories match <span className="font-semibold">“{categoryQuery}”</span>.
            </div>
          )}
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
 <FeaturedJobsSection />

      {/* ================= EMPOWERING ================= */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-[#F3F4FA]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[rgba(106,111,242,0.16)] blur-3xl" />
          <div className="absolute -bottom-36 right-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.14)] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="rounded-2xl bg-white p-3 shadow-[0_12px_28px_rgba(15,23,42,0.10)]">
                <img
                  src="/empower-platform.png"
                  alt="Job platform dashboard illustration"
                  className="rounded-xl w-[440px] max-w-full"
                />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-4 py-1.5 text-xs font-semibold">
                Built for Technical Careers
              </span>

              <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900">
                Empowering Job Seekers
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">
                Discover vetted Technical roles, transparent salary ranges, and trusted employers — all in one place
                designed to support long-term career growth.
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