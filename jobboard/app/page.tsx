"use client";

import { useEffect, useState } from "react";
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";
import JobsSection from "../components/jobs/JobsSection";

type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  description?: string;
};

type Category = { label: string; slug: string };

const FEATURED_JOBS: FeaturedJob[] = [
  {
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "2 days ago",
    description: "Lead frontend development using React and modern UI patterns.",
  },
  {
    title: "Backend Engineer (Node/Go)",
    company: "TechNova",
    location: "Austin, TX",
    type: "Full-time",
    pay: "$130k – $175k",
    posted: "3 days ago",
    description: "Build and scale backend services with Node.js and Go.",
  },
  {
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "5 days ago",
    description: "Own CI/CD pipelines, infrastructure, and cloud reliability.",
  },
  {
    title: "Product Designer",
    company: "Launchify",
    location: "San Francisco, CA",
    type: "Contract",
    pay: "$8,000 / month",
    posted: "4 days ago",
    description: "Design product experiences and collaborate closely with engineering.",
  },
];

const CATEGORIES: Category[] = [
  { label: "Healthcare IT", slug: "healthcare-it" },
  { label: "Aerospace / Defense", slug: "aerospace-defense" },
  { label: "Architecture", slug: "architecture" },
  { label: "Project Management", slug: "project-management" },
  { label: "Construction / Building Systems", slug: "construction-mep" },
  { label: "Manufacturing / Production", slug: "manufacturing-production" },
  { label: "Field Service / Commissioning", slug: "field-service" },
  { label: "Quality / Compliance", slug: "quality-compliance" },
  { label: "Maintenance / Reliability", slug: "maintenance-reliability" },
  { label: "Engineering (Non-Software)", slug: "engineering-non-software" },
];

export default function Home() {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.label.toLowerCase().includes(categoryQuery.toLowerCase())
  );

  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">


    {/* ================= HERO (faint purple background + green “smear” ONLY behind the text) ================= */}
<section className="relative overflow-hidden bg-[#F7F8FA]">
  {/* background (keep faint purple tint like before) */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F8FA] to-[#F2F4FF]" />
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(17,24,39,0.08) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>

  {/* ✅ NO big green glows — green only exists behind the highlighted words */}
  <div className="relative mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center py-16 sm:py-18 md:py-24">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        Curated roles • Remote-friendly • Fast apply
      </div>

      <h1 className="mt-6 text-[2.05rem] sm:text-[2.7rem] md:text-[3.1rem] font-extrabold leading-[1.08] tracking-tight text-slate-900">
        Find{" "}
        {/* ✅ green spread/smear behind text (like screenshot), not everywhere */}
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute left-[-10px] right-[-10px] top-[58%] -translate-y-1/2 h-[0.95em]
                       bg-emerald-400/25 blur-[6px] rounded-[999px] rotate-[-2deg]"
          />
          <span
            aria-hidden
            className="absolute left-[-6px] right-[-6px] top-[58%] -translate-y-1/2 h-[0.70em]
                       bg-emerald-300/35 rounded-[999px] rotate-[1deg]"
          />
          <span className="relative text-emerald-700">Technical Jobs</span>
        </span>{" "}
        built for long-term careers
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-[14.5px] md:text-[15.5px] leading-relaxed text-slate-600">
        Browse opportunities across engineering, infrastructure, cloud, security, and data —
        including remote options. Simple, clean, and focused on serious hiring.
      </p>

      {/* ✅ more visible, unique “Jump to Jobs” */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() =>
            document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
          }
          className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-6 py-3
                     text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur
                     hover:bg-white hover:shadow-md transition"
        >
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                       bg-emerald-500/10 border border-emerald-500/20
                       group-hover:bg-emerald-500/15 transition"
            aria-hidden
          >
            ↓
          </span>
          Jump to Jobs
          <span className="text-emerald-700/60 group-hover:text-emerald-700 transition" aria-hidden>
            →
          </span>
        </button>
      </div>
    </div>
  </div>
</section>


      {/* ================= COMPANIES (reverted to BEFORE) ================= */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-sm font-semibold tracking-[0.22em] text-gray-500 uppercase">
              Trusted by teams
            </p>
            <h3 className="mt-3 text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Popular Companies We Have Worked With
            </h3>
            <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              A quick look at teams that trust TechnicalJobboard.
            </p>
          </div>

          <CompanyLogoCarousel />
        </div>
      </section>

      {/* ================= CATEGORIES (purple accents + nicer container) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl border border-[rgba(106,111,242,0.18)] bg-gradient-to-b from-[#FBFBFD] to-white p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
                  Browse
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
                  Explore categories
                </h2>
                <p className="text-slate-600 mt-2">
                  Pick a category to filter jobs instantly.
                </p>
              </div>

              <div className="w-full md:w-[360px]">
                <input
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                  type="text"
                  placeholder="Search categories…"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none
                             focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
                />
              </div>
            </div>

            {selectedCategory && (
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-600">Selected:</span>

                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.label ??
                    "Category"}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    setCategoryQuery("");
                  }}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {filteredCategories.map((cat) => {
                const isActive = selectedCategory === cat.slug;

                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      document
                        .getElementById("jobs")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={[
                      "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                      isActive
                        ? "bg-slate-900 text-white border-slate-900"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-2 w-2 rounded-full transition",
                        isActive ? "bg-white" : "bg-[var(--brand-purple)]",
                      ].join(" ")}
                    />
                    <span className="font-medium">{cat.label}</span>
                    <span
                      className={[
                        "ml-1 text-xs transition",
                        isActive ? "opacity-80" : "opacity-0 group-hover:opacity-70",
                      ].join(" ")}
                      aria-hidden
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredCategories.length === 0 && (
              <div className="mt-6 text-sm text-slate-600">
                No categories match “{categoryQuery}”.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS (remove green spread: neutral + keep existing) ================= */}
      <section
        id="featured"
        className="relative py-24 border-y border-gray-200 overflow-hidden bg-[#F7F8FC]"
      >
        {/* toned down glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-slate-900/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-slate-900/5 blur-3xl" />

        <div className="relative w-full">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#0F1426]">
                Featured Jobs
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                A curated selection of standout roles from trusted teams.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("featured-carousel")
                    ?.scrollBy({ left: -420, behavior: "smooth" })
                }
                className="px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition"
                aria-label="Scroll left"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("featured-carousel")
                    ?.scrollBy({ left: 420, behavior: "smooth" })
                }
                className="px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div className="relative w-full">
            <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[#F7F8FC] to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#F7F8FC] to-transparent z-10" />

            <div
              id="featured-carousel"
              className="no-scrollbar flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory px-6 md:px-12"
            >
              {FEATURED_JOBS.map((job, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-none w-[320px] sm:w-[360px] md:w-[400px]
                             bg-white rounded-2xl shadow-sm hover:shadow-lg transition
                             border border-gray-200 relative overflow-hidden"
                >
                  {/* removed green stripe */}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-gray-500" />
                        Featured
                      </span>

                      <button
                        aria-label="Save job"
                        className="text-gray-400 hover:text-[#1A2040] transition"
                      >
                        ★
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1A2040] text-white flex items-center justify-center font-bold shadow-sm">
                        {job.company.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-[#0F1426] truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        {job.type}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        {job.pay}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                      {job.description ??
                        "Fast hiring teams, clear expectations, and modern workflows."}
                    </p>

                    <div className="mt-6 flex justify-between items-center">
                      <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition">
                        View
                      </button>

                      <span className="text-xs text-gray-400">
                        Posted {job.posted}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ALL JOBS ================= */}
      <JobsSection />

      {/* ================= EMPOWERING (unchanged from your code) ================= */}
      <section id="empowering" className="relative py-28 overflow-hidden bg-[#F6F7FB]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#F6F7FB] to-[#F2F4FF]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="reveal flex flex-col md:flex-row items-center gap-14">
            <div className="md:w-1/2 w-full">
              <div className="relative rounded-3xl bg-white p-4 shadow-xl">
                <img
                  src="/empower-platform.png"
                  alt="Job platform dashboard illustration"
                  className="rounded-2xl w-full"
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <span
                className="inline-block mb-4 text-sm font-semibold text-[var(--brand-purple)]
                               bg-[rgba(106,111,242,0.10)] px-4 py-1.5 rounded-full"
              >
                Built for Technical Careers
              </span>

              <h2 className="text-[1.9rem] md:text-[2.3rem] font-semibold mb-6 tracking-tight text-gray-900">
                Empowering Job Seekers
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed max-w-xl">
                Discover vetted Technical roles, transparent salary ranges, and trusted employers — all in one place
                designed to support long-term career growth.
              </p>

              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Verified Technical opportunities only
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Clear expectations & salary visibility
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Roles built for growth, not churn
                </li>
              </ul>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-3 bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                           text-white px-7 py-3 rounded-2xl font-semibold transition shadow-lg"
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
