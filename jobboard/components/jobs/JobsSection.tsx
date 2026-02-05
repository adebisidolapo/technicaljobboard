"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  tags: string[];
  description: string;
};

const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "2 days ago",
    tags: ["React", "Next.js", "TypeScript"],
    description: "Build performance-first UI systems with React + Next.js.",
  },
  {
    id: "2",
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "5 days ago",
    tags: ["AWS", "CI/CD", "Terraform"],
    description: "Own CI/CD, infra automation, and reliability workflows.",
  },
  {
    id: "3",
    title: "Data Engineer",
    company: "ByteForge",
    location: "New York, NY",
    type: "Full-time",
    pay: "$125k – $175k",
    posted: "4 days ago",
    tags: ["Pipelines", "SQL", "ETL"],
    description: "Build robust data pipelines and analytics foundations.",
  },
  {
    id: "4",
    title: "Security Engineer",
    company: "SentinelWorks",
    location: "Remote",
    type: "Full-time",
    pay: "$145k – $200k",
    posted: "6 days ago",
    tags: ["AppSec", "Cloud", "IAM"],
    description: "Secure-by-default systems, AppSec and cloud controls.",
  },
  {
    id: "5",
    title: "QA Automation Engineer",
    company: "VerityLabs",
    location: "Chicago, IL",
    type: "Full-time",
    pay: "$110k – $150k",
    posted: "5 days ago",
    tags: ["Automation", "Playwright", "CI"],
    description: "Test automation, CI integration and reliability.",
  },
  {
    id: "6",
    title: "Cloud Engineer (AWS)",
    company: "Northwind",
    location: "Denver, CO",
    type: "Full-time",
    pay: "$125k – $170k",
    posted: "3 days ago",
    tags: ["AWS", "Networking", "Security"],
    description: "AWS infra, IAM, networking, and security best practices.",
  },
];

const JOB_TYPES = ["Full-time", "Contract", "Part-time", "Internship"];
const SALARY_RANGES = [
  { label: "$100k+", min: 100000 },
  { label: "$120k+", min: 120000 },
  { label: "$140k+", min: 140000 },
  { label: "$160k+", min: 160000 },
];

function norm(s: string) {
  return s.toLowerCase().trim();
}
function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "C") + (parts[1]?.[0] ?? "")).toUpperCase();
}
function parseMinPay(pay: string) {
  const m = pay.replace(/,/g, "").match(/(\d+)\s*k/i);
  if (!m) return 0;
  return Number(m[1]) * 1000;
}
function toggle(arr: string[], v: string) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export default function AllJobsPage() {
  const router = useRouter();

  // Filters
  const [q, setQ] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("Anywhere");

  const locations = useMemo(() => {
    const unique = Array.from(new Set(JOBS.map((j) => j.location)));
    return ["Anywhere", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean);

    return JOBS.filter((job) => {
      const hay = norm(
        [
          job.title,
          job.company,
          job.location,
          job.type,
          job.tags.join(" "),
          job.description,
        ].join(" ")
      );

      // Narrowed search: ALL words must match
      if (words.length && !words.every((w) => hay.includes(w))) return false;

      if (types.length && !types.includes(job.type)) return false;

      if (remoteOnly && !norm(job.location).includes("remote")) return false;

      if (salaryMin != null && parseMinPay(job.pay) < salaryMin) return false;

      if (location !== "Anywhere" && job.location !== location) return false;

      return true;
    });
  }, [q, types, remoteOnly, salaryMin, location]);

  const clearFilters = () => {
    setQ("");
    setTypes([]);
    setRemoteOnly(false);
    setSalaryMin(null);
    setLocation("Anywhere");
  };

  return (
    <main className="bg-[#F5F7FB] text-[#0B1222]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-white">
        {/* soft background (indigo + faint green) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[rgba(99,102,241,0.16)] blur-3xl" />
          <div className="absolute -top-10 right-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(34,197,94,0.10)] blur-3xl" />
          <div className="absolute bottom-[-180px] left-[20%] h-[520px] w-[520px] rounded-full bg-[rgba(99,102,241,0.10)] blur-3xl" />
        </div>

        {/* moved UP */}
        <div className="relative max-w-7xl mx-auto px-6 pt-2 pb-6 md:pt-4 md:pb-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-4 py-1.5 text-xs font-semibold">
              Browse verified technical roles
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#0B1222] leading-tight">
              Find your next technical role — faster, cleaner, and transparent.
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
              A technical job site built for developers, engineers, data, cloud,
              security, and product teams. Filter by role type, location, and
              salary range — then apply in one click.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LATEST JOBS + FILTER ================= */}
      <section id="latest" className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mt-3 mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold">Latest jobs</h2>
            <p className="mt-1 text-xs text-slate-500">
              Search across title, company, location, tags and description.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            results
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Jobs list */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition px-5 py-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="h-11 w-11 rounded-2xl bg-[#0B1222] text-white flex items-center justify-center font-extrabold shrink-0">
                        {initials(job.company)}
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-extrabold truncate">
                          {job.title}
                        </div>
                        <div className="mt-1 text-xs text-slate-500 truncate">
                          {job.company} • {job.pay}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {job.type}
                          </span>
                          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {job.location}
                          </span>
                          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                            {job.posted}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition shrink-0"
                    >
                      Apply →
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                  <div className="text-lg font-extrabold">No results</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Try removing filters or changing keywords.
                  </div>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 h-11 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200/80 shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold">Filters</div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Reset
                </button>
              </div>

              {/* Search */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-600">
                  Search
                </div>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Title, company, skill…"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                />
              </div>

              {/* Job Type */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-600">
                  Job Type
                </div>
                <div className="mt-3 space-y-2">
                  {JOB_TYPES.map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={types.includes(t)}
                        onChange={() => setTypes((x) => toggle(x, t))}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Remote Only */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-600">
                  Remote Only
                </div>
                <button
                  type="button"
                  onClick={() => setRemoteOnly((v) => !v)}
                  className={[
                    "mt-2 h-10 w-full rounded-xl border text-sm font-semibold transition flex items-center justify-between px-4",
                    remoteOnly
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span>{remoteOnly ? "Enabled" : "Disabled"}</span>
                  <span className="text-xs opacity-90">
                    {remoteOnly ? "ON" : "OFF"}
                  </span>
                </button>
              </div>

              {/* Salary */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-600">
                  Salary Range
                </div>
                <div className="mt-3 space-y-2">
                  {SALARY_RANGES.map((r) => (
                    <label
                      key={r.label}
                      className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="salary"
                        checked={salaryMin === r.min}
                        onChange={() => setSalaryMin(r.min)}
                        className="h-4 w-4 border-slate-300 text-emerald-600 focus:ring-emerald-200"
                      />
                      {r.label}
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSalaryMin(null)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700 mt-2"
                  >
                    No minimum
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-600">
                  Location
                </div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("latest")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 h-11 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
              >
                Apply filters
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
