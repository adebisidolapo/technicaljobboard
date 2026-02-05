"use client";

import React, { useEffect, useMemo, useState } from "react";
import JobCard, { Job } from "@/components/jobs/JobCard";

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

// helpers
function norm(s: string) {
  return s.toLowerCase().trim();
}

function words(s: string) {
  return norm(s).split(/\s+/).filter(Boolean);
}

function payToNumber(raw: string): number {
  // supports: "$120k – $160k", "$120,000", "120000", "120k"
  const t = norm(raw).replace(/,/g, "");
  const m = t.match(/(\d+(\.\d+)?)(k)?/);
  if (!m) return 0;
  const base = Number(m[1]);
  if (Number.isNaN(base)) return 0;
  return m[3] ? Math.round(base * 1000) : Math.round(base);
}

function haystack(job: Job) {
  return norm(
    [
      job.title,
      job.company,
      job.location,
      job.type,
      job.pay,
      job.tags.join(" "),
      job.description,
    ].join(" ")
  );
}

const TYPE_OPTIONS = ["Full-time", "Contract", "Part-time"];
const LOCATION_OPTIONS = ["Remote", "New York, NY", "Chicago, IL", "Denver, CO"];
const PAY_BUCKETS = [
  { label: "$100k+", min: 100000 },
  { label: "$120k+", min: 120000 },
  { label: "$140k+", min: 140000 },
  { label: "$160k+", min: 160000 },
];

export default function JobsSection() {
  // main search
  const [q, setQ] = useState("");

  // narrowed filters
  const [type, setType] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [payMin, setPayMin] = useState<number | null>(null);
  const [sort, setSort] = useState<"relevance" | "payHigh">("relevance");

  // read query params (?q=...&loc=...&cat=...) - keep q + loc only
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q0 = params.get("q") ?? "";
    const loc0 = params.get("loc");
    setQ(q0);

    if (loc0 && loc0.trim() && loc0 !== "All") {
      setLocation([loc0]);
    }
  }, []);

  const filtered = useMemo(() => {
    const qWords = words(q);

    let list = JOBS.filter((job) => {
      const h = haystack(job);

      // keyword: ALL words must match (narrower / better)
      if (qWords.length && !qWords.every((w) => h.includes(w))) return false;

      // type checkboxes
      if (type.length && !type.includes(job.type)) return false;

      // location checkboxes
      if (location.length) {
        const jl = norm(job.location);
        const ok = location.some((l) => jl.includes(norm(l)));
        if (!ok) return false;
      }

      // pay bucket
      if (payMin != null) {
        const lower = payToNumber(job.pay);
        if (lower < payMin) return false;
      }

      return true;
    });

    if (sort === "payHigh") {
      list = list.slice().sort((a, b) => payToNumber(b.pay) - payToNumber(a.pay));
    }

    // relevance sort: basic scoring (keyword matches)
    if (sort === "relevance") {
      const score = (job: Job) => {
        const h = haystack(job);
        let s = 0;
        for (const w of qWords) if (h.includes(w)) s += 3;
        if (norm(job.location).includes("remote")) s += 1;
        return s;
      };
      list = list.slice().sort((a, b) => score(b) - score(a));
    }

    return list;
  }, [q, type, location, payMin, sort]);

  const clearAll = () => {
    setQ("");
    setType([]);
    setLocation([]);
    setPayMin(null);
    setSort("relevance");
    window.history.replaceState({}, "", "/all-jobs");
  };

  const toggle = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition"
      aria-label={`Remove filter ${label}`}
      title="Remove"
    >
      {label}
      <span className="text-indigo-600">✕</span>
    </button>
  );

  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">All Jobs</h1>
            <p className="mt-2 text-sm text-slate-600">
              Search and filter roles like Indeed/ZipRecruiter style.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
              result{filtered.length === 1 ? "" : "s"}
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Search row (horizontal) */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-600">Keyword</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, company, skill (react aws security)…"
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              />
            </div>

            <div className="md:w-56">
              <label className="text-xs font-semibold text-slate-600">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              >
                <option value="relevance">Relevance</option>
                <option value="payHigh">Pay (high)</option>
              </select>
            </div>
          </div>

          {/* Active chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {q.trim() ? <Chip label={`Keyword: ${q.trim()}`} onRemove={() => setQ("")} /> : null}
            {type.map((t) => (
              <Chip key={t} label={`Type: ${t}`} onRemove={() => setType((x) => x.filter((v) => v !== t))} />
            ))}
            {location.map((l) => (
              <Chip
                key={l}
                label={`Location: ${l}`}
                onRemove={() => setLocation((x) => x.filter((v) => v !== l))}
              />
            ))}
            {payMin != null ? (
              <Chip label={`Pay: ${payMin.toLocaleString()}+`} onRemove={() => setPayMin(null)} />
            ) : null}

            {q.trim() || type.length || location.length || payMin != null ? null : (
              <span className="text-xs text-slate-500">No filters applied.</span>
            )}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Filters */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-extrabold text-slate-900">Filters</h2>
              <p className="mt-1 text-xs text-slate-500">Narrow results with checkboxes.</p>

              {/* Type */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-700">Job type</div>
                <div className="mt-3 space-y-2">
                  {TYPE_OPTIONS.map((t) => (
                    <label key={t} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={type.includes(t)}
                        onChange={() => setType((x) => toggle(x, t))}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-200"
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
                        checked={location.includes(l)}
                        onChange={() => setLocation((x) => toggle(x, l))}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-200"
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              {/* Pay */}
              <div className="mt-6">
                <div className="text-xs font-semibold text-slate-700">Pay range</div>
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
                            ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={clearAll}
                className="mt-6 h-11 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* RIGHT: Results */}
          <div className="lg:col-span-8">
            {/* Results header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
                result{filtered.length === 1 ? "" : "s"}
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                Tip: Search “react remote” to narrow fast.
              </div>
            </div>

            {/* Cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <h3 className="text-lg font-extrabold text-slate-900">No results</h3>
                <p className="mt-2 text-sm text-slate-600">Try removing some filters.</p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 h-11 px-5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
