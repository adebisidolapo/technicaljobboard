"use client";

import React, { useEffect, useMemo, useState } from "react";
import JobCard, { Job } from "@/components/jobs/JobCard";

const TYPES = ["All", "Full-time", "Contract", "Part-time", "Internship"];
const LOCATIONS = [
  "All",
  "Remote",
  "United States",
  "New York, NY",
  "Chicago, IL",
  "Denver, CO",
];

function normalize(s: string) {
  return (s ?? "").toLowerCase().trim();
}

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

function matchesCategory(job: Job, rawCat: string) {
  const c = normalize(rawCat);
  if (!c) return true;

  const haystack = normalize(
    [job.title, job.description, job.tags.join(" "), job.company].join(" ")
  );

  const parts = c.split(/\s+/).filter(Boolean);
  return parts.some((p) => haystack.includes(p));
}

function normalizeJobType(v: any) {
  const s = String(v ?? "").toLowerCase();
  if (!s) return "—";
  if (s.includes("full")) return "Full-time";
  if (s.includes("part")) return "Part-time";
  if (s.includes("contract")) return "Contract";
  if (s.includes("intern")) return "Internship";
  return "—";
}

function mapApiJobToCard(
  job: any
): Job & { _publishedAt?: string | null; _salaryNum?: number } {
  const loc0 = job.locations?.[0];

  const primaryLoc =
    loc0?.label ||
    [loc0?.city, loc0?.state, loc0?.country].filter(Boolean).join(", ") ||
    (job.remote ? "Remote" : "United States");

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

  const salaryNum = job.salaryMax
    ? Number(job.salaryMax)
    : job.salaryMin
    ? Number(job.salaryMin)
    : 0;

  const publishedAt = job.publishedAt ? String(job.publishedAt) : null;

  return {
    id: job.id,
    title: job.title,
    company: job.company?.name ?? "—",
    location: primaryLoc,
    type: normalizeJobType(job.jobType),
    pay,
    posted: publishedAt ? "Recently" : "—",
    tags,
    description: job.description ?? "",
    _publishedAt: publishedAt,
    _salaryNum: salaryNum,
  };
}

export default function JobsSection() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [cat, setCat] = useState("");

  const [type, setType] = useState<string>("All");
  const [minPay, setMinPay] = useState<string>("");
  const [sort, setSort] = useState<"newest" | "payHigh">("newest");

  const [apiJobs, setApiJobs] = useState<
    (Job & { _publishedAt?: string | null; _salaryNum?: number })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load query params (?q=...&loc=...&cat=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get("q") ?? "");
    setLoc(params.get("loc") ?? "");
    setCat(params.get("cat") ?? "");
  }, []);

  // Fetch jobs from backend
  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        setLoading(true);
        setApiError(null);

        const params = new URLSearchParams();

        if (q.trim()) params.set("q", q.trim());

        const locVal = loc && normalize(loc) !== "all" ? loc : "";
        const isRemote = normalize(locVal) === "remote";

        if (isRemote) params.set("remote", "true");
        else if (locVal) params.set("location", locVal);

        params.set("take", "100");
        params.set("skip", "0");

        const url = `/api/jobs/search?${params.toString()}`;
        const res = await fetch(url, { cache: "no-store" });

        const text = await res.text();
        let data: any;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          throw new Error(
            `API did not return JSON. Status=${res.status}. Body: ${text.slice(
              0,
              140
            )}`
          );
        }

        if (!res.ok || data?.ok === false) {
          throw new Error(data?.error || `Failed (${res.status})`);
        }

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
  }, [q, loc]);

  const filtered = useMemo(() => {
    let list = apiJobs.slice();

    list = list.filter((job) => matchesKeywords(job, q));
    list = list.filter((job) => matchesCategory(job, cat));

    if (type !== "All") list = list.filter((job) => job.type === type);

    if (minPay.trim()) {
      const min = Number(minPay.replace(/[^\d]/g, ""));
      if (!Number.isNaN(min) && min > 0) {
        list = list.filter((job) => {
          const firstNum = Number(job.pay.match(/\d+/)?.[0] ?? "0");
          return firstNum >= min;
        });
      }
    }

    if (sort === "payHigh") {
      list.sort((a, b) => Number(b._salaryNum ?? 0) - Number(a._salaryNum ?? 0));
    } else {
      list.sort((a, b) => {
        const aT = a._publishedAt ? new Date(a._publishedAt).getTime() : 0;
        const bT = b._publishedAt ? new Date(b._publishedAt).getTime() : 0;
        return bT - aT;
      });
    }

    return list;
  }, [apiJobs, q, cat, type, minPay, sort]);

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
    <div className="space-y-8">
      {/* FILTERS */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-sm text-slate-700">
            <span className="font-extrabold text-slate-900">
              {filtered.length}
            </span>{" "}
            result{filtered.length === 1 ? "" : "s"}
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

        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Keyword */}
          <div className="md:col-span-5">
            <label className="text-xs font-semibold text-slate-600">Keyword</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Title, company, skill (React, AWS, BIM)…"
              className={inputBase}
            />
          </div>

          {/* Location */}
          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-slate-600">Location</label>
            <select
              value={loc || "All"}
              onChange={(e) => setLoc(e.target.value === "All" ? "" : e.target.value)}
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
            <label className="text-xs font-semibold text-slate-600">Min pay</label>
            <input
              value={minPay}
              onChange={(e) => setMinPay(e.target.value)}
              placeholder="120000"
              className={inputBase}
            />
          </div>
        </div>

        <div className="px-5 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs text-slate-500">
            Tip: typing <span className="font-semibold">“aws”</span> or{" "}
            <span className="font-semibold">“remote”</span> will match jobs.
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

      {/* STATES */}
      {loading && <div className="text-sm text-slate-600">Loading jobs…</div>}
      {apiError && <div className="text-sm text-red-600">{apiError}</div>}

      {/* RESULTS */}
      {!loading && !apiError && (
        <>
          {filtered.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <h3 className="text-lg font-extrabold text-slate-900">No results</h3>
              <p className="mt-2 text-sm text-slate-600">
                Try fewer keywords, or remove filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 h-11 px-6 rounded-xl bg-[#0B1222] text-white text-sm font-semibold hover:bg-slate-900 transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}