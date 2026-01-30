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

const FEATURED_JOBS = [
  {
    company: "NovaTech",
    location: "Remote",
    posted: "2 days ago",
    roles: [
      {
        title: "Senior Frontend Engineer",
        stack: "React • Next.js • TypeScript",
        pay: "$120k – $160k",
        posted: "2d ago",
      },
      {
        title: "DevOps Engineer",
        stack: "AWS • Terraform • CI/CD",
        pay: "$130k – $175k",
        posted: "3d ago",
      },
      {
        title: "Security Engineer",
        stack: "Cloud • AppSec • SOC2",
        pay: "$140k – $185k",
        posted: "5d ago",
      },
    ],
  },
  {
    company: "CloudSprint",
    location: "Remote",
    posted: "4 days ago",
    roles: [
      {
        title: "Backend Engineer (Node / Go)",
        stack: "Node.js • Go • Postgres",
        pay: "$130k – $175k",
        posted: "4d ago",
      },
      {
        title: "Platform Engineer",
        stack: "Kubernetes • Helm • Observability",
        pay: "$140k – $190k",
        posted: "6d ago",
      },
    ],
  },
  {
    company: "Launchify",
    location: "San Francisco, CA",
    posted: "1 week ago",
    roles: [
      {
        title: "Data Engineer",
        stack: "Python • Airflow • BigQuery",
        pay: "$125k – $170k",
        posted: "1w ago",
      },
      {
        title: "QA Automation Engineer",
        stack: "Playwright • CI",
        pay: "$95k – $130k",
        posted: "5d ago",
      },
    ],
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

{/* ================= HERO ================= */}
<section className="relative overflow-hidden bg-[#F7F8FA]">
  {/* faint purple-tinted background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F8FA] to-[#F2F4FF]" />
    <div
      className="absolute inset-0 opacity-[0.22]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(17,24,39,0.08) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center py-16 sm:py-20 md:py-28">
      {/* Headline */}
      <h1 className="text-[2.1rem] sm:text-[2.7rem] md:text-[3.2rem] font-extrabold leading-tight tracking-tight text-[#0F172A]">
        Find{" "}
        <span className="relative inline-block">
          {/* soft, wide green wash (very light) */}
          <span
            aria-hidden
            className="absolute -inset-x-14 -inset-y-10
                       bg-emerald-400/6 blur-[60px] rounded-full"
          />
          <span
            aria-hidden
            className="absolute -inset-x-8 -inset-y-6
                       bg-emerald-400/8 blur-[36px] rounded-full"
          />
          <span className="relative text-emerald-600">
            Technical Jobs
          </span>
        </span>{" "}
        built for long-term careers
      </h1>

      {/* Description */}
      <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
        Browse opportunities across engineering, infrastructure, cloud, security,
        and data — including remote options. Simple, clean, and focused on serious hiring.
      </p>

      {/* Jump to Jobs */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() =>
            document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
          }
          className="
            group inline-flex items-center justify-center gap-3
            w-full sm:w-auto
            rounded-2xl px-6 py-3.5
            bg-white/80 backdrop-blur
            border border-slate-200
            shadow-sm hover:shadow-md transition
            text-sm font-semibold text-slate-900
          "
        >
          <span
            className="
              inline-flex h-10 w-10 items-center justify-center rounded-xl
              bg-emerald-500/10 text-emerald-700
              group-hover:bg-emerald-500/15 transition
            "
            aria-hidden
          >
            ↓
          </span>

          <span className="leading-none text-left">
            Jump to Jobs
            <span className="block text-xs font-medium text-slate-500 mt-0.5">
              See all available roles
            </span>
          </span>

          <span
            className="ml-1 text-slate-400 group-hover:text-slate-700 transition"
            aria-hidden
          >
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

      {/* ================= FEATURED JOBS ================= */}
<section
  id="featured"
  className="relative py-24 border-y border-gray-200 bg-[#F7F8FC]"
>
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-[#0F1426]">
          Featured Technical Jobs
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Hand-picked engineering, DevOps, cloud, and data roles from trusted teams.
        </p>
      </div>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {FEATURED_JOBS.map((company, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-[rgba(106,111,242,0.25)]
                     shadow-sm hover:shadow-lg transition p-6"
        >
          {/* Company header */}
          <div className="flex items-center gap-4 mb-5">
            {/* green profile */}
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white
                            flex items-center justify-center font-bold">
              {company.company.charAt(0)}
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[#0F1426] truncate">
                {company.company}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {company.location}
              </p>
            </div>
          </div>

          {/* Roles (2–3 per company) */}
          <div className="space-y-3">
            {company.roles.map((role, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-[#FBFBFF] p-4"
              >
                <p className="font-semibold text-slate-900 truncate">
                  {role.title}
                </p>
                <p className="text-xs text-slate-600 mt-1 truncate">
                  {role.stack}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-900">
                    {role.pay}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {role.posted}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            {/* purple view button */}
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-[var(--brand-purple)]
                         hover:bg-[var(--brand-purple-dark)]
                         transition shadow-[0_8px_20px_rgba(106,111,242,0.25)]"
            >
              View
            </button>

            <span className="text-xs text-gray-400">
              Updated {company.posted}
            </span>
          </div>
        </div>
      ))}
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
