"use client";

import React, { useEffect, useMemo, useState } from "react";
import JobCard, { Job } from "@/components/jobs/JobCard";

const TYPES = ["All", "Full-time", "Contract", "Part-time"];
const LOCATIONS = ["All", "Remote", "New York, NY", "Chicago, IL", "Denver, CO"];

function normalize(s: string) {
  return s.toLowerCase().trim();
}

// ✅ match if ANY keyword appears in ANY field
function matchesKeywords(job: Job, rawQuery: string) {
  const q = normalize(rawQuery);
  if (!q) return true;

  const haystack = normalize(
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

  const keywords = q.split(/\s+/).filter(Boolean);
  return keywords.some((kw) => haystack.includes(kw));
}

// ✅ category filter (simple keyword match against job fields)
function matchesCategory(job: Job, rawCat: string) {
  const c = normalize(rawCat);
  if (!c) return true;

  const haystack = normalize(
    [job.title, job.description, job.tags.join(" "), job.company].join(" ")
  );

  // Example: "Healthcare IT" → matches if "healthcare" or "it" appears
  const parts = c.split(/\s+/).filter(Boolean);
  return parts.some((p) => haystack.includes(p));
}

function mapApiJobToCard(job: any): Job {
  const loc0 = job.locations?.[0];

  const primaryLoc =
    loc0?.label ||
    [loc0?.city, loc0?.country].filter(Boolean).join(", ") ||
    (job.remote ? "Remote" : "—");

  const tags = (job.skills ?? []).map((s: any) => s.name).slice(0, 6);

  const pay =
    job.salaryMin && job.salaryMax
      ? `$${Number(job.salaryMin).toLocaleString()} – $${Number(
          job.salaryMax
        ).toLocaleString()}`
      : job.salaryMin
      ? `From $${Number(job.salaryMin).toLocaleString()}`
      : job.salaryMax
      ? `Up to $${Number(job.salaryMax).toLocaleString()}`
      : "—";

  const posted = job.publishedAt ? "Recently" : "—";

  return {
    id: job.id,
    title: job.title,
    company: job.company?.name ?? "—",
    location: primaryLoc,
    type: job.jobType ?? "—",
    pay,
    posted,
    tags,
    description: job.description,
  };
}

export default function JobsSection() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [cat, setCat] = useState("");

  const [type, setType] = useState<string>("All");
  const [minPay, setMinPay] = useState<string>("");
  const [sort, setSort] = useState<"newest" | "payHigh">("newest");

  const [popKey, setPopKey] = useState(0);

  const [apiJobs, setApiJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // ✅ Load query params (?q=...&loc=...&cat=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get("q") ?? "");
    setLoc(params.get("loc") ?? "");
    setCat(params.get("cat") ?? "");
  }, []);

  // ✅ Load jobs from backend
  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        setLoading(true);
        setApiError(null);

        // Fetch published jobs; filters can remain client-side for now.
        const res = await fetch("/api/jobs/search?take=100&skip=0", {
          cache: "no-store",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch jobs");

        const mapped = (data.items ?? []).map(mapApiJobToCard);
        if (!cancelled) setApiJobs(mapped);
      } catch (e: any) {
        if (!cancelled) setApiError(e?.message || "Error loading jobs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadJobs();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = apiJobs.slice();

    // keyword search
    list = list.filter((job) => matchesKeywords(job, q));

    // category search
    list = list.filter((job) => matchesCategory(job, cat));

    // location filter
    if (loc && normalize(loc) !== "all") {
      const locQ = normalize(loc);
      list = list.filter((job) => normalize(job.location).includes(locQ));
    }

    // type filter
    if (type !== "All") {
      list = list.filter((job) => job.type === type);
    }

    // min pay filter
    if (minPay.trim()) {
      const min = Number(minPay.replace(/[^\d]/g, ""));
      if (!Number.isNaN(min) && min > 0) {
        list = list.filter((job) => {
          const firstNum = Number(job.pay.match(/\d+/)?.[0] ?? "0");
          return firstNum >= min;
        });
      }
    }

    // sort
    if (sort === "payHigh") {
      list.sort((a, b) => {
        const aNum = Number(a.pay.match(/\d+/)?.[0] ?? "0");
        const bNum = Number(b.pay.match(/\d+/)?.[0] ?? "0");
        return bNum - aNum;
      });
    }

    return list;
  }, [apiJobs, q, loc, cat, type, minPay, sort]);

  useEffect(() => {
    setPopKey((k) => k + 1);
  }, [q, loc, cat, type, minPay, sort]);

  const clearAll = () => {
    setQ("");
    setLoc("");
    setCat("");
    setType("All");
    setMinPay("");
    setSort("newest");
    window.history.replaceState({}, "", "/all-jobs");
  };

  const inputBase =
    "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]";

  return (
    <section className="bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                {filtered.length}
              </span>{" "}
              result{filtered.length === 1 ? "" : "s"}
              <span className="ml-2 text-xs text-slate-500">
                (matches title, company, location, tags, description)
              </span>
              {cat.trim() && (
                <span className="ml-2 text-xs text-slate-500">
                  • Category: <span className="font-semibold">{cat}</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={clearAll}
              className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              Clear filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Keyword */}
            <div className="md:col-span-5">
              <label className="text-xs font-semibold text-slate-600">
                Keyword
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, company, skill (React, AWS, BIM)…"
                className={inputBase}
              />
            </div>

            {/* Location */}
            <div className="md:col-span-3">
              <label className="text-xs font-semibold text-slate-600">
                Location
              </label>
              <select
                value={loc || "All"}
                onChange={(e) =>
                  setLoc(e.target.value === "All" ? "" : e.target.value)
                }
                className={inputBase}
              >
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
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputBase}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Pay */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-600">
                Min pay
              </label>
              <input
                value={minPay}
                onChange={(e) => setMinPay(e.target.value)}
                placeholder="120000"
                className={inputBase}
              />
            </div>
          </div>

          {/* Sort row */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-slate-500">
              Tip: typing <span className="font-semibold">“aws”</span> or{" "}
              <span className="font-semibold">“remote”</span> will instantly match
              jobs.
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Sort</span>

              <button
                type="button"
                onClick={() => setSort("newest")}
                className={[
                  "h-9 px-3 rounded-xl text-xs font-semibold border transition",
                  sort === "newest"
                    ? "bg-[rgba(106,111,242,0.12)] text-[var(--brand-purple)] border-[rgba(106,111,242,0.25)]"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                Newest
              </button>

              <button
                type="button"
                onClick={() => setSort("payHigh")}
                className={[
                  "h-9 px-3 rounded-xl text-xs font-semibold border transition",
                  sort === "payHigh"
                    ? "bg-[rgba(106,111,242,0.12)] text-[var(--brand-purple)] border-[rgba(106,111,242,0.25)]"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                Pay (high)
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="mt-8 text-sm text-slate-600">Loading jobs...</div>
        )}

        {apiError && (
          <div className="mt-8 text-sm text-red-600">{apiError}</div>
        )}

        {/* RESULTS */}
        <div
          key={popKey}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-[pop_220ms_ease-out]"
        >
          {!loading &&
            !apiError &&
            filtered.map((job) => <JobCard key={job.id} job={job} />)}
        </div>

        {!loading && !apiError && filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h3 className="text-lg font-extrabold">No results</h3>
            <p className="mt-2 text-sm text-slate-600">
              Try fewer keywords, or remove filters.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 h-11 px-5 rounded-xl bg-[#0B1222] text-white text-sm font-semibold hover:bg-slate-900 transition"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* keyframes */}
      <style jsx global>{`
        @keyframes pop {
          from {
            transform: scale(0.985);
            opacity: 0.6;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
