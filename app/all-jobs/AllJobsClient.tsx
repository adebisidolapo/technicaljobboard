"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
  company?: { name?: string | null } | null;
  locations?: Array<{
    label?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
  }>;
  skills?: Array<{ name: string }>;
};

type SearchResponse = {
  ok?: boolean;
  items?: ApiJob[];
  total?: number;
  error?: string;
};

function pickLocation(j: ApiJob) {
  if (j.remote) return "Remote";
  const l0 = j.locations?.[0];
  const label =
    l0?.label ||
    [l0?.city, l0?.state].filter(Boolean).join(", ") ||
    l0?.country ||
    "United States";
  return label;
}

function payText(j: ApiJob) {
  const min = j.salaryMin ?? null;
  const max = j.salaryMax ?? null;

  if (min && max) return `$${Number(min).toLocaleString()} – $${Number(max).toLocaleString()}`;
  if (min) return `From $${Number(min).toLocaleString()}`;
  if (max) return `Up to $${Number(max).toLocaleString()}`;
  return "—";
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-extrabold tracking-[0.22em] text-slate-500 uppercase">
      {children}
    </div>
  );
}

function Field({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
    />
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
    >
      {children}
    </select>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cx(
        "w-full h-11 rounded-2xl border px-4 text-sm font-semibold transition flex items-center justify-between",
        checked
          ? "bg-[color:var(--brand-purple)/0.10] border-[color:var(--brand-purple)/0.25] text-slate-900"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
      )}
    >
      <span>{label}</span>
      <span
        className={cx(
          "h-6 w-11 rounded-full border relative transition",
          checked
            ? "bg-[var(--brand-purple)] border-[var(--brand-purple)]"
            : "bg-slate-100 border-slate-200"
        )}
      >
        <span
          className={cx(
            "absolute top-1 h-4 w-4 rounded-full bg-white transition",
            checked ? "left-6" : "left-1"
          )}
        />
      </span>
    </button>
  );
}

export default function AllJobsClient({
  initial,
}: {
  initial: {
    q: string;
    loc: string;
    cat: string;
    jobType: string;
    remote: string;
    salaryMin: string;
    salaryMax: string;
    posted: string;
    sort: string;
  };
}) {
  const router = useRouter();
  const sp = useSearchParams();

  // Keep your original search params but map them correctly for API
  const [q, setQ] = useState(initial.q);
  const [location, setLocation] = useState(initial.loc || ""); // UI uses loc, API uses location
  const [jobType, setJobType] = useState(initial.jobType);
  const [level, setLevel] = useState(""); // API supports level (optional)
  const [remote, setRemote] = useState(initial.remote === "true");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiJob[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const debounceRef = useRef<any>(null);

  // Build URL params ONLY your API supports
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (location.trim()) params.set("location", location.trim());
    if (jobType) params.set("jobType", jobType);
    if (level) params.set("level", level);
    if (remote) params.set("remote", "true");

    params.set("take", "20");
    params.set("skip", "0");

    return params.toString();
  }, [q, location, jobType, level, remote]);

  const syncUrl = (qs: string) => {
    // Keep your existing public URL style: q + loc
    const publicParams = new URLSearchParams();
    if (q.trim()) publicParams.set("q", q.trim());
    if (location.trim()) publicParams.set("loc", location.trim());
    if (jobType) publicParams.set("jobType", jobType);
    if (level) publicParams.set("level", level);
    if (remote) publicParams.set("remote", "true");

    router.replace(
      publicParams.toString() ? `/all-jobs?${publicParams.toString()}` : "/all-jobs",
      { scroll: false }
    );
  };

  async function fetchJobs(qs: string) {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/jobs/search?${qs}`, { cache: "no-store" });
      const text = await res.text();
      const data: SearchResponse = text ? JSON.parse(text) : {};

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Failed to load jobs.");
      }

      setItems(data.items ?? []);
      setTotal(data.total ?? (data.items?.length ?? 0));
    } catch (e: any) {
      setItems([]);
      setTotal(0);
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      syncUrl(queryString);
      fetchJobs(queryString);
    }, 250);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  useEffect(() => {
    const current = sp?.toString() ?? "";
    // if user loaded with public params like loc, convert to API qs
    if (current.includes("loc=") && !current.includes("location=")) {
      const p = new URLSearchParams(current);
      const loc = p.get("loc") || "";
      if (loc) {
        p.delete("loc");
        p.set("location", loc);
      }
      fetchJobs(p.toString());
      return;
    }
    fetchJobs(current || queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAll = () => {
    setQ("");
    setLocation("");
    setJobType("");
    setLevel("");
    setRemote(false);
  };

  const FilterPanel = ({ compact }: { compact?: boolean }) => (
    <div className={cx(compact ? "" : "sticky top-24")}>
      <div className={cx(compact ? "" : "rounded-3xl border border-slate-200 bg-white shadow-sm")}>
        <div className={cx("p-5", compact ? "" : "border-b border-slate-200")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-extrabold text-slate-950 tracking-tight">
                Filters
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Clean, fast narrowing.
              </div>
            </div>

            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <Label>Job type</Label>
            <Select value={jobType} onChange={setJobType}>
              <option value="">Any</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Internship</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Level</Label>
            <Select value={level} onChange={setLevel}>
              <option value="">Any</option>
              <option value="ENTRY">Entry</option>
              <option value="MID">Mid</option>
              <option value="SENIOR">Senior</option>
              <option value="LEAD">Lead</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Remote</Label>
            <Toggle checked={remote} onChange={setRemote} label="Remote only" />
          </div>

          {compact ? (
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full h-11 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold hover:bg-[var(--brand-purple-dark)] transition"
            >
              Apply filters
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* TOP SEARCH BAR (sticky) */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/75 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                value={q}
                onChange={setQ}
                placeholder="Job title, keyword (e.g. Frontend, AWS)"
              />
              <Field
                value={location}
                onChange={setLocation}
                placeholder="Location (Remote, New York, TX)"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden h-11 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
              >
                Filters
              </button>

              <Link
                href="/employer/jobs/new"
                className="h-11 px-4 rounded-2xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm inline-flex items-center justify-center"
              >
                Post a job
              </Link>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {q.trim() ? <Chip>Keyword: {q.trim()}</Chip> : null}
            {location.trim() ? <Chip>Location: {location.trim()}</Chip> : null}
            {jobType ? <Chip>Type: {jobType.replaceAll("_", " ")}</Chip> : null}
            {level ? <Chip>Level: {level}</Chip> : null}
            {remote ? <Chip>Remote only</Chip> : null}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <FilterPanel />
          </aside>

          <section className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                  All Jobs
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  {loading ? "Loading roles…" : `${total} result${total === 1 ? "" : "s"} found`}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                U.S focus • Remote friendly
              </div>
            </div>

            <div className="mt-5 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {error ? (
                <div className="p-6 text-sm text-rose-600">{error}</div>
              ) : loading ? (
                <div className="p-6 text-sm text-slate-600">Loading jobs…</div>
              ) : items.length ? (
                items.map((j) => {
                  const company = j.company?.name ?? "—";
                  const locText = pickLocation(j);
                  const pay = payText(j);

                  return (
                    <Link
                      key={j.id}
                      href={`/jobs/${j.id}`}
                      className="block p-5 sm:p-6 hover:bg-[#F6F8FF] transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-lg font-extrabold text-slate-950 tracking-tight truncate">
                            {j.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600 truncate">
                            {company} • {locText}
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                              {j.jobType ?? "—"}
                            </span>

                            {j.level ? (
                              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                {j.level}
                              </span>
                            ) : null}

                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                              {pay}
                            </span>

                            {j.remote ? (
                              <span className="inline-flex items-center rounded-full bg-[color:var(--brand-purple)/0.10] px-3 py-1 text-xs font-semibold text-[var(--brand-purple-dark)]">
                                Remote
                              </span>
                            ) : null}
                          </div>

                          {j.skills?.length ? (
                            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                              {j.skills.slice(0, 8).map((s) => (
                                <span
                                  key={s.name}
                                  className="text-[11px] font-semibold text-slate-500"
                                >
                                  {s.name}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="shrink-0">
                          <span className="inline-flex h-10 items-center justify-center rounded-2xl bg-[var(--brand-purple)] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-purple-dark)] transition">
                            View
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <div className="text-lg font-extrabold text-slate-950">No results</div>
                  <p className="mt-2 text-sm text-slate-600">
                    Try removing filters or searching a broader keyword.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-4 h-11 px-6 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Tip: use Remote + Job type for faster narrowing.
            </div>
          </section>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 z-50 bg-black/35"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed z-50 left-0 right-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white border-t border-slate-200 shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-slate-200">
              <div className="text-sm font-extrabold text-slate-950">Filters</div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="h-10 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <FilterPanel compact />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}