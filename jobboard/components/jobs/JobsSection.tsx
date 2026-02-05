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

const TYPES = ["All", "Full-time", "Contract", "Part-time"];
const LOCATIONS = ["All", "Remote", "New York, NY", "Chicago, IL", "Denver, CO"];

function norm(s: string) {
  return s.toLowerCase().trim();
}

function words(s: string) {
  return norm(s).split(/\s+/).filter(Boolean);
}

function payToNumber(raw: string): number {
  // supports: "$120k – $160k", "$120,000", "120000"
  const t = norm(raw).replace(/,/g, "");
  const m = t.match(/(\d+(\.\d+)?)(k)?/); // first numeric token
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
      job.posted,
      job.tags.join(" "),
      job.description,
    ].join(" ")
  );
}

export default function JobsSection() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("All");
  const [type, setType] = useState<string>("All");
  const [cat, setCat] = useState("");
  const [minPay, setMinPay] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sort, setSort] = useState<"relevance" | "newest" | "payHigh">("relevance");

  // read query params (?q=...&loc=...&cat=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q0 = params.get("q") ?? "";
    const loc0 = params.get("loc") ?? "All";
    const cat0 = params.get("cat") ?? "";
    setQ(q0);
    setLoc(loc0 || "All");
    setCat(cat0);
  }, []);

  const filtered = useMemo(() => {
    const qWords = words(q);
    const catWords = words(cat);

    const min = minPay.trim() ? payToNumber(minPay) : 0;

    let list = JOBS.filter((job) => {
      const h = jobHaystack(job);

      // keyword: ALL query words must appear (better filtering)
      if (qWords.length && !qWords.every((w) => h.includes(w))) return false;

      // category: if provided, require ANY category word
      if (catWords.length) {
        const catHay = norm([job.title, job.description, job.tags.join(" "), job.company].join(" "));
        if (!catWords.some((w) => catHay.includes(w))) return false;
      }

      // location
      if (loc !== "All") {
        if (!norm(job.location).includes(norm(loc))) return false;
      }

      // remote toggle
      if (remoteOnly) {
        if (!norm(job.location).includes("remote")) return false;
      }

      // type
      if (type !== "All") {
        if (job.type !== type) return false;
      }

      // min pay (compares against the LOWER bound of pay range)
      if (min > 0) {
        const lower = payToNumber(job.pay);
        if (lower < min) return false;
      }

      return true;
    });

    // sorting
    if (sort === "payHigh") {
      list = list.slice().sort((a, b) => payToNumber(b.pay) - payToNumber(a.pay));
    } else if (sort === "newest") {
      // your "posted" is text; keep stable for now. (If you later store actual dates, we’ll sort by date)
      list = list.slice();
    } else {
      // relevance: simple scoring by keyword matches
      const score = (job: Job) => {
        const h = jobHaystack(job);
        let s = 0;
        for (const w of qWords) if (h.includes(w)) s += 2;
        for (const w of catWords) if (h.includes(w)) s += 1;
        if (remoteOnly && norm(job.location).includes("remote")) s += 1;
        return s;
      };
      list = list.slice().sort((a, b) => score(b) - score(a));
    }

    return list;
  }, [q, loc, type, cat, minPay, remoteOnly, sort]);

  const clearAll = () => {
    setQ("");
    setLoc("All");
    setType("All");
    setCat("");
    setMinPay("");
    setRemoteOnly(false);
    setSort("relevance");
    window.history.replaceState({}, "", "/all-jobs");
  };

  const activeChips = [
    q.trim() ? { k: "q", label: `Keyword: ${q.trim()}` } : null,
    cat.trim() ? { k: "cat", label: `Category: ${cat.trim()}` } : null,
    loc !== "All" ? { k: "loc", label: `Location: ${loc}` } : null,
    type !== "All" ? { k: "type", label: `Type: ${type}` } : null,
    minPay.trim() ? { k: "minPay", label: `Min pay: ${minPay.trim()}` } : null,
    remoteOnly ? { k: "remote", label: "Remote only" } : null,
  ].filter(Boolean) as { k: string; label: string }[];

  const input =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none " +
    "focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300";

  const pillBase =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold";

  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">All Jobs</h1>
            <p className="mt-2 text-sm text-slate-600">
              Filter cleanly by keyword, location, type, and pay.
            </p>
          </div>

          <div className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            result{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Sticky filter bar */}
        <div className="sticky top-4 z-10">
          <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Keyword */}
              <div className="md:col-span-5">
                <label className="text-xs font-semibold text-slate-600">Keyword</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="React, AWS, Security…"
                  className={"mt-2 " + input}
                />
              </div>

              {/* Category */}
              <div className="md:col-span-3">
                <label className="text-xs font-semibold text-slate-600">Category</label>
                <input
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  placeholder="Frontend, DevOps…"
                  className={"mt-2 " + input}
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Location</label>
                <select value={loc} onChange={(e) => setLoc(e.target.value)} className={"mt-2 " + input}>
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className={"mt-2 " + input}>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              {/* Min Pay */}
              <div className="sm:col-span-4">
                <label className="text-xs font-semibold text-slate-600">Min pay</label>
                <input
                  value={minPay}
                  onChange={(e) => setMinPay(e.target.value)}
                  placeholder="120k or 120000"
                  className={"mt-2 " + input}
                />
              </div>

              {/* Remote toggle */}
              <div className="sm:col-span-4">
                <label className="text-xs font-semibold text-slate-600">Remote</label>
                <button
                  type="button"
                  onClick={() => setRemoteOnly((v) => !v)}
                  className={[
                    "mt-2 h-11 w-full rounded-xl border text-sm font-semibold transition",
                    remoteOnly
                      ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {remoteOnly ? "Remote only: ON" : "Remote only: OFF"}
                </button>
              </div>

              {/* Sort */}
              <div className="sm:col-span-4">
                <label className="text-xs font-semibold text-slate-600">Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className={"mt-2 " + input}
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="payHigh">Pay (high)</option>
                </select>
              </div>
            </div>

            {/* Active chips + actions */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {activeChips.length === 0 ? (
                  <span className="text-xs text-slate-500">No filters applied.</span>
                ) : (
                  activeChips.map((c) => (
                    <span
                      key={c.k}
                      className={[
                        pillBase,
                        "bg-indigo-50 text-indigo-700 border-indigo-100",
                      ].join(" ")}
                    >
                      {c.label}
                    </span>
                  ))
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearAll}
                  className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h3 className="text-lg font-extrabold">No results</h3>
            <p className="mt-2 text-sm text-slate-600">Try fewer keywords, or remove filters.</p>
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
    </section>
  );
}
