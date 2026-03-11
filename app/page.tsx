"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";

const CATEGORIES = [
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
];

export default function Home() {
  const router = useRouter();

  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");

  const runHeroSearch = () => {
    const params = new URLSearchParams();
    if (heroQ.trim()) params.set("q", heroQ.trim());
    if (heroLoc.trim()) params.set("loc", heroLoc.trim());

    const qs = params.toString();
    router.push(qs ? `/all-jobs?${qs}` : "/all-jobs");
  };

  const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
  const sectionPadding = "py-14 sm:py-16 md:py-20";

  const titleFont = "font-[family-name:var(--font-title)]";

  const inputBase =
    "h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100";

  const secondaryButton =
    "inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";

  return (
    <main className="min-h-screen bg-[#F6F8FC] text-[#0F172A]">

      {/* HERO */}

      <section className="bg-[#EEF6F2]">
        <div className={`${container} text-center py-20 lg:py-28 max-w-5xl`}>

          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Curated Roles • Remote Friendly • Fast Apply
          </div>

          <h1 className={`${titleFont} mt-6 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-tight`}>
            Find{" "}
            <span>
              <span className="text-emerald-600">Technical</span>{" "}
              <span>Jobs</span>
            </span>{" "}
            Built For Long-Term Careers
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Browse opportunities across engineering, infrastructure, cloud,
            security, and data across the United States.
          </p>

          {/* SEARCH BAR */}

          <div className="mt-10">
            <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-slate-200 bg-white p-4 shadow-lg">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_auto]">

                <input
                  value={heroQ}
                  onChange={(e) => setHeroQ(e.target.value)}
                  placeholder="Job Title Or Keyword"
                  className={inputBase}
                />

                <input
                  value={heroLoc}
                  onChange={(e) => setHeroLoc(e.target.value)}
                  placeholder="Location (Remote Or U.S. City)"
                  className={inputBase}
                />

                <button
                  onClick={runHeroSearch}
                  className="h-14 rounded-2xl bg-black px-8 text-white font-semibold hover:bg-slate-800"
                >
                  Search Jobs
                </button>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUSTED */}

      <section className={`bg-white ${sectionPadding}`}>
        <div className={container}>
          <div className="text-center">
            <h2 className={`${titleFont} text-3xl font-extrabold`}>
              Companies Hiring Through Us
            </h2>
          </div>
        </div>

        <div className="mt-12">
          <CompanyLogoCarousel />
        </div>
      </section>

      {/* FEATURED */}

      <section id="featured" className="bg-[#F2F4F8] py-20">
        <div className={container}>
          <h2 className={`${titleFont} text-3xl font-extrabold`}>
            Featured Jobs
          </h2>

          <div className="mt-10">
            <FeaturedJobsSection />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="bg-[#E9EEF6] py-20">
        <div className={container}>

          <div className="flex justify-between items-center mb-10">
            <h2 className={`${titleFont} text-3xl font-extrabold`}>
              Popular Category
            </h2>

            <button
              onClick={() => router.push("/all-jobs")}
              className="bg-black text-white px-5 py-2 rounded-xl font-semibold"
            >
              All Jobs
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  router.push(`/all-jobs?cat=${encodeURIComponent(cat)}`)
                }
                className="flex items-center gap-4 border bg-white px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>

                <div>
                  <p className="font-semibold">{cat}</p>
                  <p className="text-sm text-slate-500">0 Jobs</p>
                </div>
              </button>
            ))}

          </div>

        </div>
      </section>

      {/* EMPOWERING */}

      <section className={`bg-white ${sectionPadding}`}>
        <div className={`${container} grid gap-12 lg:grid-cols-2 items-center`}>

          <img
            src="/empower-platform.png"
            className="rounded-2xl"
            alt="Job Platform"
          />

          <div>
            <h3 className={`${titleFont} text-3xl font-extrabold`}>
              Empowering Job Seekers
            </h3>

            <p className="mt-4 text-slate-600">
              Discover vetted technical roles, transparent salary ranges, and
              trusted employers in one focused experience.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => router.push("/all-jobs")}
                className="bg-black text-white px-6 py-3 rounded-xl font-semibold"
              >
                Get Started
              </button>

              <button
                onClick={() => router.push("/all-jobs?loc=Remote")}
                className={secondaryButton}
              >
                Remote Roles
              </button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}