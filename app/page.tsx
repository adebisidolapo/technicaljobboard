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

  function runHeroSearch() {
    const params = new URLSearchParams();
    if (heroQ.trim()) params.set("q", heroQ.trim());
    if (heroLoc.trim()) params.set("loc", heroLoc.trim());
    const qs = params.toString();
    router.push(qs ? `/all-jobs?${qs}` : "/all-jobs");
  }

  function goToCategory(cat: string) {
    setSelectedCategory(cat);
    router.push(`/all-jobs?cat=${encodeURIComponent(cat)}`);
  }

  function jumpToFeatured() {
    const el = document.getElementById("featured");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen text-[#0F172A]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-14 pb-16 sm:pt-16 sm:pb-18 md:pt-20 md:pb-20">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold text-slate-600 shadow-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                Technical careers • Remote friendly • Employer tools built in
              </div>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.7rem)] font-extrabold leading-[1.02] tracking-tight text-slate-900">
                Find serious{" "}
                <span className="text-[var(--brand-purple)]">technical jobs</span>{" "}
                and connect with employers who are actually hiring.
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
                Search cleanly across engineering, infrastructure, security, cloud,
                field operations, healthcare IT, and other technical roles — with a
                faster hiring experience for both candidates and employers.
              </p>

              <div className="mt-8 rounded-[26px] border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr_auto]">
                  <input
                    value={heroQ}
                    onChange={(e) => setHeroQ(e.target.value)}
                    type="text"
                    placeholder="Job title, keyword, company"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[color:var(--brand-purple)/0.18]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") runHeroSearch();
                    }}
                  />

                  <input
                    value={heroLoc}
                    onChange={(e) => setHeroLoc(e.target.value)}
                    type="text"
                    placeholder="Location (Remote, Texas, New York)"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[color:var(--brand-purple)/0.18]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") runHeroSearch();
                    }}
                  />

                  <button
                    type="button"
                    onClick={runHeroSearch}
                    className="btn-primary h-12 rounded-2xl px-6"
                  >
                    Search jobs
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold">Popular:</span>
                  {["Frontend", "DevOps", "Data", "Security"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setHeroQ(t);
                        setTimeout(runHeroSearch, 0);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={jumpToFeatured} className="btn-secondary">
                  Explore featured jobs
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/employer/register")}
                  className="btn-primary"
                >
                  Hire technical talent
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-[var(--surface-muted)] p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      For jobseekers
                    </div>
                    <div className="mt-2 text-lg font-extrabold leading-snug text-slate-900">
                      Search, save, apply, and manage your resume in one place.
                    </div>
                    <div className="mt-3 text-sm leading-6 text-slate-600">
                      A cleaner workflow for technical candidates who want serious roles,
                      not endless noise.
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      For employers
                    </div>
                    <div className="mt-2 text-lg font-extrabold leading-snug text-slate-900">
                      Post jobs, review applicants, and search resumes with a focused dashboard.
                    </div>
                    <div className="mt-3 text-sm leading-6 text-slate-600">
                      Built for companies and agencies that want a professional hiring flow.
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { k: "10MB", v: "Resume upload" },
                      { k: "Fast", v: "Application flow" },
                      { k: "Clean", v: "Employer tools" },
                    ].map((x) => (
                      <div
                        key={x.v}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center"
                      >
                        <div className="text-base font-extrabold text-slate-900">{x.k}</div>
                        <div className="mt-1 text-[11px] font-semibold text-slate-500">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED COMPANIES */}
      <section className="section-pad bg-white">
        <div className="site-container">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Trusted by teams
            </p>
            <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold tracking-tight text-slate-900">
              Companies we’ve worked with
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Employers using the platform to source and manage technical talent.
            </p>
          </div>

          <div className="mt-10 sm:mt-12">
            <CompanyLogoCarousel />
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <FeaturedJobsSection />

      {/* CATEGORIES */}
      <section id="categories" className="section-pad">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
                Categories
              </p>
              <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-tight text-slate-900">
                Browse by technical discipline
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Explore industries and technical categories to narrow in on the work
                you actually want.
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

              {selectedCategory ? (
                <div className="mt-2 text-xs text-slate-500">
                  Selected:{" "}
                  <span className="font-semibold text-slate-700">{selectedCategory}</span>
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
              ) : null}
            </div>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="no-scrollbar flex gap-3 overflow-x-auto py-2 pr-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    setCategoryQuery("");
                    router.push("/all-jobs");
                  }}
                  className={[
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                    !selectedCategory
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
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
                      onClick={() => goToCategory(cat)}
                      className={[
                        "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                        active
                          ? "border-[color:var(--brand-purple)/0.25] bg-[color:var(--brand-purple)/0.10] text-[var(--brand-purple)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS PLATFORM */}
      <section className="section-pad bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex justify-center md:justify-start">
              <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
                <img
                  src="/empower-platform.png"
                  alt="Technical job platform dashboard"
                  className="w-full max-w-[560px] rounded-[20px]"
                />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-[var(--surface-muted)] px-4 py-1.5 text-xs font-bold text-slate-700">
                Built for technical careers
              </span>

              <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-slate-900">
                A more focused job board for serious technical hiring
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                We’re building a cleaner experience for both sides of the market:
                jobseekers who want better technical opportunities, and employers
                who want more organized hiring tools.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Cleaner search and category browsing",
                  "Jobseeker dashboard with resume updates",
                  "Employer dashboard with candidate and resume workflow",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-[var(--surface-muted)] px-4 py-4 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/all-jobs")}
                  className="btn-primary"
                >
                  Browse all jobs
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/jobseeker/register")}
                  className="btn-secondary"
                >
                  Create account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYER CTA */}
      <section className="section-pad">
        <div className="site-container">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
                  Employers & agencies
                </p>
                <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-tight text-slate-900">
                  Ready to hire technical talent with a cleaner workflow?
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  Build your company profile, post jobs, review applicants, and manage
                  hiring from one employer dashboard designed to stay organized.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/employer/register")}
                  className="btn-primary"
                >
                  Create employer account
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/employer/login")}
                  className="btn-secondary"
                >
                  Employer sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}