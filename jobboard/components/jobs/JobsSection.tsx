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
  // "$120k – $160k" -> 120000
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
    <main className="bg-[#F6F7FB] text-[#0B1222]">
    {/* ================= HERO ================= */}
<section className="relative overflow-hidden bg-white border-b border-slate-200/70">
  {/* subtle background only (no loud blobs) */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(900px_300px_at_18%_0%,rgba(99,102,241,0.10),transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(900px_320px_at_85%_-10%,rgba(34,197,94,0.08),transparent_55%)]" />
  </div>

  {/* keep YOUR text/content below exactly how you had it */}
  <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-8 md:pt-10 md:pb-10">
    <div className="max-w-3xl">
      <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-4 py-1.5 text-xs font-semibold">
        Browse verified technical roles
      </span>

      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#0B1222] leading-tight">
        Find your next technical role — faster, cleaner, and transparent.
      </h1>

      <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
        A technical job site built for developers, engineers, data, cloud, security, and product teams.
        Filter by role type, location, and salary range — then apply in one click.
      </p>
    </div>
  </div>
</section>


      {/* ================= RESULTS + FILTER ================= */}
      <section id="latest" className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold">Latest listings</h2>
            <p className="mt-1 text-xs text-slate-500">
              Use filters to narrow results (search matches ALL keywords).
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            roles
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Jobs list */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition px-5 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="h-11 w-11 rounded-2xl bg-[#0B1222] text-white flex items-center justify-center font-extrabold shrink-0">
                        {initials(job.company)}
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-extrabold truncate">
                          {job.title}
                        </div>

                        <div className="mt-1 text-xs text-slate-500 truncate">
                          {job.company} • {job.location} • {job.pay}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                            {job.type}
                          </span>
                          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {job.posted}
                          </span>
                          {job.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[11px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                            >
                              {t}
                            </span>
                          ))}
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
                  <div className="text-lg font-extrabold">No matches found</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Try fewer keywords or reset filters.
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
            <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-5 sticky top-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold">Filter jobs</div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Reset
                </button>
              </div>

              {/* Search */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-600">
                  Keywords
                </div>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="e.g. react remote aws"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                />
                <div className="mt-2 text-[11px] text-slate-500">
                  Tip: all words must match to show a job.
                </div>
              </div>

              {/* Job Type */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-600">Job type</div>
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
                <div className="text-xs font-semibold text-slate-600">Remote</div>
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
                  <span>{remoteOnly ? "Remote only" : "Any location"}</span>
                  <span className="text-xs opacity-90">{remoteOnly ? "ON" : "OFF"}</span>
                </button>
              </div>

              {/* Salary */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-600">Salary</div>
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
                <div className="text-xs font-semibold text-slate-600">Location</div>
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
                  document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 h-11 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
              >
                Search jobs
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
