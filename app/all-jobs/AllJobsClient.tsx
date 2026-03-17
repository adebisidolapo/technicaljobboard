"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Initial = {
  q: string;
  loc: string;
  cat: string;
  jobType: string;
  remote: string;
  level: string;
  salaryMin: string;
  salaryMax: string;
  posted: string;
  sort: string;
};

type ApiJob = {
  id: string;
  title: string;
  description: string;
  jobType?: string | null;
  level?: string | null;
  remote?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string | null;
  publishedAt?: string | null;
  company?: { name?: string | null; logoUrl?: string | null } | null;
  locations?: Array<{
    label?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
  }>;
  skills?: Array<{ name: string }>;
};

type ApiResp = {
  ok: boolean;
  total: number;
  take: number;
  skip: number;
  items: ApiJob[];
  error?: string;
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function fmtMoney(min?: number | null, max?: number | null) {
  const a = typeof min === "number" ? min : null;
  const b = typeof max === "number" ? max : null;
  if (a != null && b != null) return `$${a.toLocaleString()} – $${b.toLocaleString()}`;
  if (a != null) return `From $${a.toLocaleString()}`;
  if (b != null) return `Up to $${b.toLocaleString()}`;
  return "Salary not listed";
}

function pickLoc(j: ApiJob) {
  if (j.remote) return "Remote";
  const l = j.locations?.[0];
  return l?.label || [l?.city, l?.state].filter(Boolean).join(", ") || l?.country || "United States";
}

function short(s: string, n = 170) {
  const t = String(s || "").replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const LEVELS = ["Entry", "Mid", "Senior", "Lead"];
const POSTED = [
  { value: "", label: "Any time" },
  { value: "1", label: "Last 24 hours" },
  { value: "3", label: "Last 3 days" },
  { value: "7", label: "Last 7 days" },
  { value: "14", label: "Last 14 days" },
];
const SORT = [
  { value: "new", label: "Newest" },
  { value: "relevant", label: "Most relevant" },
];

function Chip({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-extrabold text-slate-700">
      {label}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
          aria-label="Remove filter"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}

export default function AllJobsClient({ initial }: { initial: Initial }) {
  const router = useRouter();

  const [q, setQ] = useState(initial.q || "");
  const [loc, setLoc] = useState(initial.loc || "");
  const [cat, setCat] = useState(initial.cat || "");
  const [jobType, setJobType] = useState(initial.jobType || "");
  const [level, setLevel] = useState(initial.level || "");
  const [remote, setRemote] = useState(initial.remote === "true" || initial.remote === "1");
  const [salaryMin, setSalaryMin] = useState(initial.salaryMin || "");
  const [salaryMax, setSalaryMax] = useState(initial.salaryMax || "");
  const [posted, setPosted] = useState(initial.posted || "");
  const [sort, setSort] = useState(initial.sort || "new");

  const [dq, setDq] = useState(q);
  const [dloc, setDloc] = useState(loc);

  const [items, setItems] = useState<ApiJob[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [page, setPage] = useState(0);
  const take = 20;
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDq(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const t = setTimeout(() => setDloc(loc), 250);
    return () => clearTimeout(t);
  }, [loc]);

  const firstMountRef = useRef(true);
  useEffect(() => {
    if (firstMountRef.current) {
      firstMountRef.current = false;
      return;
    }
    setPage(0);
  }, [dq, dloc, cat, jobType, level, remote, salaryMin, salaryMax, posted, sort]);

  const params = useMemo(() => {
    const p = new URLSearchParams();
    if (dq.trim()) p.set("q", dq.trim());
    if (dloc.trim()) p.set("loc", dloc.trim());
    if (cat.trim()) p.set("cat", cat.trim());
    if (jobType.trim()) p.set("jobType", jobType.trim());
    if (level.trim()) p.set("level", level.trim());
    if (remote) p.set("remote", "true");
    if (salaryMin.trim()) p.set("salaryMin", salaryMin.trim());
    if (salaryMax.trim()) p.set("salaryMax", salaryMax.trim());
    if (posted.trim()) p.set("posted", posted.trim());
    if (sort.trim()) p.set("sort", sort.trim());
    p.set("take", String(take));
    p.set("skip", String(page * take));
    return p;
  }, [dq, dloc, cat, jobType, level, remote, salaryMin, salaryMax, posted, sort, page]);

  useEffect(() => {
    const urlParams = new URLSearchParams(params);
    urlParams.delete("take");
    urlParams.delete("skip");
    const qs = urlParams.toString();
    router.replace(qs ? `/all-jobs?${qs}` : "/all-jobs");
  }, [router, params]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(`/api/jobs/search?${params.toString()}`, {
          cache: "no-store",
        });
        const text = await res.text();
        const data = text ? (JSON.parse(text) as ApiResp) : null;

        if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to load jobs");

        if (!cancelled) {
          setItems(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (e: any) {
        if (!cancelled) {
          setItems([]);
          setTotal(0);
          setErr(e?.message || "Error loading jobs");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params]);

  const totalPages = Math.max(1, Math.ceil(total / take));

  function clearAll() {
    setQ("");
    setLoc("");
    setCat("");
    setJobType("");
    setLevel("");
    setRemote(false);
    setSalaryMin("");
    setSalaryMax("");
    setPosted("");
    setSort("new");
    setPage(0);
  }

  const appliedChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; remove: () => void }> = [];
    if (dq.trim()) chips.push({ key: "q", label: `“${dq.trim()}”`, remove: () => setQ("") });
    if (dloc.trim()) chips.push({ key: "loc", label: dloc.trim(), remove: () => setLoc("") });
    if (cat.trim()) chips.push({ key: "cat", label: `Category: ${cat.trim()}`, remove: () => setCat("") });
    if (jobType.trim()) chips.push({ key: "jobType", label: jobType.trim(), remove: () => setJobType("") });
    if (level.trim()) chips.push({ key: "level", label: `Level: ${level.trim()}`, remove: () => setLevel("") });
    if (remote) chips.push({ key: "remote", label: "Remote only", remove: () => setRemote(false) });
    if (salaryMin.trim()) chips.push({ key: "salaryMin", label: `Min: $${salaryMin.trim()}`, remove: () => setSalaryMin("") });
    if (salaryMax.trim()) chips.push({ key: "salaryMax", label: `Max: $${salaryMax.trim()}`, remove: () => setSalaryMax("") });
    if (posted.trim()) {
      const lbl = POSTED.find((x) => x.value === posted)?.label || "Posted";
      chips.push({ key: "posted", label: lbl, remove: () => setPosted("") });
    }
    if (sort !== "new") {
      const lbl = SORT.find((x) => x.value === sort)?.label || "Sort";
      chips.push({ key: "sort", label: lbl, remove: () => setSort("new") });
    }
    return chips;
  }, [dq, dloc, cat, jobType, level, remote, salaryMin, salaryMax, posted, sort]);

  const FilterPanel = (
    <div className="space-y-5">
      <div className="grid gap-3">
        <div>
          <div className="text-xs font-extrabold text-slate-500">Job type</div>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
          >
            <option value="">Any</option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-xs font-extrabold text-slate-500">Level</div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
          >
            <option value="">Any</option>
            {LEVELS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-xs font-extrabold text-slate-500">Category</div>
          <input
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            placeholder="e.g. DevOps, Security, Frontend"
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs font-extrabold text-slate-500">Salary min</div>
          <input
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            placeholder="100000"
            inputMode="numeric"
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
          />
        </div>
        <div>
          <div className="text-xs font-extrabold text-slate-500">Salary max</div>
          <input
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
            placeholder="180000"
            inputMode="numeric"
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-slate-900">Remote only</div>
          <div className="text-xs text-slate-500">Show remote jobs only</div>
        </div>
        <button
          type="button"
          onClick={() => setRemote((v) => !v)}
          className={cx("h-9 w-14 rounded-full transition relative", remote ? "bg-[var(--brand-purple)]" : "bg-slate-200")}
          aria-label="Toggle remote"
        >
          <span
            className={cx(
              "absolute top-1 h-7 w-7 rounded-full bg-white shadow-sm transition",
              remote ? "left-6" : "left-1"
            )}
          />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs font-extrabold text-slate-500">Posted</div>
          <select
            value={posted}
            onChange={(e) => setPosted(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
          >
            {POSTED.map((x) => (
              <option key={x.label} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-xs font-extrabold text-slate-500">Sort</div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
          >
            {SORT.map((x) => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
     <button
  type="button"
  onClick={() => setFiltersOpen(false)}
  className="h-11 rounded-2xl bg-[#0B1222] text-white text-sm font-extrabold inline-flex items-center justify-center hover:bg-slate-900 transition"
>
  Apply filters
</button>

        <Link
          href="/"
          className="h-11 rounded-2xl bg-[#0B1222] text-white text-sm font-extrabold inline-flex items-center justify-center hover:bg-slate-900 transition"
        >
          Home
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setFiltersOpen(false)}
        className="lg:hidden h-12 w-full rounded-2xl bg-[var(--brand-purple)] text-white text-sm font-extrabold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
      >
        Apply filters
      </button>
    </div>
  );

  return (
    <main className="bg-[#F3F6FB] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">All Jobs</h1>
              <p className="mt-1 text-sm text-slate-600">
                Search technical roles across the U.S. (remote-friendly).
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
              Live results
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Job title, keyword, company"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
              />
            </div>

            <div className="md:col-span-4">
              <input
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="Location (Remote, New York, Austin)"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden h-12 w-full rounded-2xl border border-slate-200 bg-white text-sm font-extrabold hover:bg-slate-50 transition"
              >
                Filters
              </button>

              <Link
                href="/"
                className="hidden lg:inline-flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-extrabold hover:bg-slate-50 transition"
              >
                Home
              </Link>
            </div>
          </div>

          {appliedChips.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {appliedChips.map((c) => (
                <Chip key={c.key} label={c.label} onRemove={c.remove} />
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-extrabold text-[var(--brand-purple)] hover:underline ml-1"
              >
                Reset all
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-slate-900">Filters</div>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-extrabold text-[var(--brand-purple)] hover:underline"
                >
                  Reset
                </button>
              </div>
              <div className="mt-5">{FilterPanel}</div>
            </div>
          </aside>

          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-600">
                {loading ? "Loading…" : `${total.toLocaleString()} result${total === 1 ? "" : "s"}`}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="h-10 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  className="h-10 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            {err && (
              <div className="mt-4 rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
                {err}
              </div>
            )}

            <div className="mt-4 grid gap-4">
              {loading ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-sm text-slate-600">Loading jobs…</div>
                </div>
              ) : items.length ? (
                items.map((j) => {
                  const company = j.company?.name || "Company";
                  const location = pickLoc(j);
                  const salary = fmtMoney(j.salaryMin, j.salaryMax);
                  const tags = (j.skills ?? []).slice(0, 6);

                  return (
                    <article
                      key={j.id}
                      className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                        <div className="md:col-span-9 min-w-0">
                          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                            {j.title}
                          </h2>

                          <div className="mt-1 text-sm text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-semibold text-slate-800">{company}</span>
                            <span className="text-slate-300">•</span>
                            <span>{location}</span>
                            {j.remote ? (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-[var(--brand-purple)] font-semibold">Remote</span>
                              </>
                            ) : null}
                          </div>

                          <div className="mt-2 text-sm text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                            {j.jobType ? <span className="font-semibold text-slate-800">{j.jobType}</span> : null}
                            {j.level ? (
                              <>
                                <span className="text-slate-300">•</span>
                                <span>{j.level}</span>
                              </>
                            ) : null}
                            <span className="text-slate-300">•</span>
                            <span className="font-semibold text-slate-900">{salary}</span>
                          </div>

                          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            {short(j.description || "", 180)}
                          </p>

                          {tags.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {tags.map((s) => (
                                <span
                                  key={s.name}
                                  className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                                >
                                  {s.name}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="md:col-span-3 flex md:flex-col gap-2 md:items-end">
                          <Link
                            href={`/jobs/${j.id}`}
                            className="h-11 w-full md:w-auto px-6 rounded-2xl bg-[var(--brand-purple)] text-white text-sm font-extrabold inline-flex items-center justify-center hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
                          >
                            View
                          </Link>

                          <div className="text-xs text-slate-400 md:text-right w-full">
                            {j.publishedAt ? "Posted recently" : ""}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
                  <div className="text-lg font-extrabold text-slate-900">No jobs found</div>
                  <p className="mt-2 text-sm text-slate-600">Try removing some filters or broadening your search.</p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-5 h-11 px-6 rounded-2xl bg-[#0B1222] text-white text-sm font-extrabold hover:bg-slate-900 transition"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {!loading && total > 0 && (
              <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                <div>
                  Page <span className="font-extrabold text-slate-900">{page + 1}</span> of{" "}
                  <span className="font-extrabold text-slate-900">{totalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="h-10 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    className="h-10 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {filtersOpen && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-[440px] bg-white shadow-2xl">
            <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-900">Filters</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-extrabold text-[var(--brand-purple)] hover:underline"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="h-10 w-10 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-lg"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-5 overflow-y-auto h-[calc(100%-4rem)]">
              {FilterPanel}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}