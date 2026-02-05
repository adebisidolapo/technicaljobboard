"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "@/components/jobs/JobCard";

/** Demo data — keep yours if you already fetch from API */
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

const TYPE_OPTIONS = ["Full-time", "Contract", "Part-time"];
const LOCATION_OPTIONS = ["Remote", "New York, NY", "Chicago, IL", "Denver, CO"];

const PAY_BUCKETS = [
  { label: "$100k+", min: 100000 },
  { label: "$120k+", min: 120000 },
  { label: "$140k+", min: 140000 },
  { label: "$160k+", min: 160000 },
];

function norm(s: string) {
  return s.toLowerCase().trim();
}

function splitWords(s: string) {
  return norm(s).split(/\s+/).filter(Boolean);
}

function payLowerBound(raw: string): number {
  const t = norm(raw).replace(/,/g, "");
  const m = t.match(/(\d+(\.\d+)?)(k)?/);
  if (!m) return 0;
  const base = Number(m[1]);
  if (Number.isNaN(base)) return 0;
  return m[3] ? Math.round(base * 1000) : Math.round(base);
}

function jobHaystack(job: Job) {
  return norm(
    [
      job.title,
      job.company,
      job.location,
      job.type,
      job.pay,
      job.tags?.join(" ") ?? "",
      job.description ?? "",
    ].join(" ")
  );
}

function toggle(arr: string[], v: string) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "C";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function JobsSection() {
  const router = useRouter();

  const [q, setQ] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [locs, setLocs] = useState<string[]>([]);
  const [payMin, setPayMin] = useState<number | null>(null);
  const [sort, setSort] = useState<"relevance" | "payHigh">("relevance");

  // Load query params (?q=...&loc=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q0 = params.get("q") ?? "";
    const loc0 = params.get("loc");
    setQ(q0);
    if (loc0 && loc0.trim() && loc0 !== "All") setLocs([loc0]);
  }, []);

  const filtered = useMemo(() => {
    const words = splitWords(q);

    let list = JOBS.filter((job) => {
      const h = jobHaystack(job);

      // keyword: ALL words must match
      if (words.length && !words.every((w) => h.includes(w))) return false;

      if (types.length && !types.includes(job.type)) return false;

      if (locs.length) {
        const jl = norm(job.location);
        const ok = locs.some((l) => jl.includes(norm(l)));
        if (!ok) return false;
      }

      if (payMin != null) {
        if (payLowerBound(job.pay) < payMin) return false;
      }

      return true;
    });

    if (sort === "payHigh") {
      list = list.slice().sort((a, b) => payLowerBound(b.pay) - payLowerBound(a.pay));
    } else {
      // relevance: simple scoring by word matches
      const score = (job: Job) => {
        const h = jobHaystack(job);
        let s = 0;
        for (const w of words) if (h.includes(w)) s += 3;
        if (norm(job.location).includes("remote")) s += 1;
        return s;
      };
      list = list.slice().sort((a, b) => score(b) - score(a));
    }

    return list;
  }, [q, types, locs, payMin, sort]);

  const resetFilters = () => {
    setQ("");
    setTypes([]);
    setLocs([]);
    setPayMin(null);
    setSort("relevance");
    window.history.replaceState({}, "", "/all-jobs");
  };

  const hasFilters = q.trim() || types.length || locs.length || payMin != null;

  // “Search” button: just updates URL (so it feels like action), does NOT clear anything
  const applySearch = () => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (locs.length === 1) params.set("loc", locs[0]);
    const qs = params.toString();
    const nextUrl = qs ? `/all-jobs?${qs}` : "/all-jobs";
    window.history.replaceState({}, "", nextUrl);
  };

  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">All Jobs</h1>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
              result{filtered.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-full md:w-[520px]">
              <label className="sr-only">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, company, skill…"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
              />
            </div>

            <button
              type="button"
              onClick={applySearch}
              className="h-11 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition text-sm font-semibold shadow-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900">Filters</h2>
                {hasFilters ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Reset
                  </button>
                ) : null}
              </div>

              {/* Type */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-700">Job type</div>
                <div className="mt-3 space-y-2">
                  {TYPE_OPTIONS.map((t) => (
                    <label key={t} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
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

              {/* Location */}
              <div className="mt-6">
                <div className="text-xs font-semibold text-slate-700">Location</div>
                <div className="mt-3 space-y-2">
                  {LOCATION_OPTIONS.map((l) => (
                    <label key={l} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={locs.includes(l)}
                        onChange={() => setLocs((x) => toggle(x, l))}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              {/* Pay */}
              <div className="mt-6">
                <div className="text-xs font-semibold text-slate-700">Minimum pay</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {PAY_BUCKETS.map((b) => {
                    const active = payMin === b.min;
                    return (
                      <button
                        key={b.label}
                        type="button"
                        onClick={() => setPayMin(active ? null : b.min)}
                        className={[
                          "h-10 rounded-xl border text-xs font-semibold transition",
                          active
                            ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div className="mt-6">
                <div className="text-xs font-semibold text-slate-700">Sort</div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                >
                  <option value="relevance">Relevance</option>
                  <option value="payHigh">Pay (high)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 h-11 w-full rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-sm font-semibold transition"
              >
                Clear filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-8">
            {/* Results toolbar (kept as small clean bar) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between">
              <div className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
                result{filtered.length === 1 ? "" : "s"}
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                {hasFilters ? "Filtered results" : "Use filters to narrow results"}
              </div>
            </div>

            {/* JOBS LIST — no “card wrapper”, just clean rows */}
            <div className="mt-4">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-slate-200/70 last:border-b-0"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="h-12 w-12 rounded-2xl bg-[#0B1222] text-white flex items-center justify-center font-extrabold shrink-0">
                      {initials(job.company)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-slate-900 truncate">
                            {job.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600 truncate">
                            {job.company} • {job.location} • {job.type}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-sm font-semibold text-slate-900">{job.pay}</div>
                          <span className="text-xs text-slate-400">{job.posted}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {(job.tags ?? []).slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition shadow-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <h3 className="text-lg font-extrabold text-slate-900">No results</h3>
                  <p className="mt-2 text-sm text-slate-600">Try removing some filters.</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 h-11 px-5 rounded-2xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
