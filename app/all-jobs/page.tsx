import Link from "next/link";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

function first(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

function toBool(v: string) {
  const s = v.trim().toLowerCase();
  if (["1", "true", "yes", "y"].includes(s)) return true;
  if (["0", "false", "no", "n"].includes(s)) return false;
  return undefined;
}

async function fetchJobs(params: {
  q?: string;
  location?: string;
  remote?: boolean;
  jobType?: string;
  level?: string;
  take?: number;
  skip?: number;
}) {
  const baseUrl = getBaseUrl();
  const sp = new URLSearchParams();

  if (params.q) sp.set("q", params.q);
  if (params.location) sp.set("location", params.location);
  if (typeof params.remote === "boolean") sp.set("remote", String(params.remote));
  if (params.jobType) sp.set("jobType", params.jobType);
  if (params.level) sp.set("level", params.level);

  sp.set("take", String(params.take ?? 20));
  sp.set("skip", String(params.skip ?? 0));

  const url = `${baseUrl}/api/jobs/search?${sp.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`API did not return JSON. Status ${res.status}. Response: ${text.slice(0, 300)}`);
  }

  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || `Failed to load jobs (${res.status})`);
  }

  return data as {
    ok: true;
    total: number;
    take: number;
    skip: number;
    items: Array<{
      id: string;
      title: string;
      description: string;
      remote?: boolean;
      jobType?: string | null;
      level?: string | null;
      salaryMin?: number | null;
      salaryMax?: number | null;
      currency?: string | null;
      publishedAt?: string | null;
      company?: { name?: string | null } | null;
      locations?: Array<{ label?: string | null; city?: string | null; state?: string | null; country?: string | null }>;
      skills?: Array<{ name: string }>;
    }>;
  };
}

function payText(j: any) {
  const min = j.salaryMin ?? null;
  const max = j.salaryMax ?? null;

  if (min && max) return `$${Number(min).toLocaleString()} – $${Number(max).toLocaleString()}`;
  if (min) return `From $${Number(min).toLocaleString()}`;
  if (max) return `Up to $${Number(max).toLocaleString()}`;
  return "—";
}

function pickLocation(j: any) {
  if (j.remote) return "Remote";
  const l0 = j.locations?.[0];
  const label =
    l0?.label ||
    [l0?.city, l0?.state].filter(Boolean).join(", ") ||
    l0?.country ||
    "United States";
  return label;
}

export default async function AllJobsPage({
  searchParams,
}: {
  // ✅ Next 16 expects this to be async
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  const q = first(sp.q).trim();
  const location = first(sp.location).trim();
  const remote = toBool(first(sp.remote));
  const jobType = first(sp.jobType).trim();
  const level = first(sp.level).trim();

  const page = Math.max(parseInt(first(sp.page) || "1", 10), 1);
  const take = 20;
  const skip = (page - 1) * take;

  const data = await fetchJobs({ q, location, remote, jobType, level, take, skip });
  const items = data.items ?? [];
  const total = data.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / take));

  // Helper to build pagination links
  const makeHref = (nextPage: number) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (location) p.set("location", location);
    if (typeof remote === "boolean") p.set("remote", String(remote));
    if (jobType) p.set("jobType", jobType);
    if (level) p.set("level", level);
    p.set("page", String(nextPage));
    return `/all-jobs?${p.toString()}`;
  };

  return (
    <main className="min-h-screen bg-[#F3F6FB] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              All Jobs
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Search curated technical roles across the U.S. — remote-friendly and employer-verified.
            </p>
          </div>

          <div className="text-sm text-slate-600">
            <span className="font-extrabold text-slate-900">{total}</span> result{total === 1 ? "" : "s"}
          </div>
        </div>

        {/* Filters (simple + clean, no extra boxes) */}
        <form
          action="/all-jobs"
          className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-5">
              <input
                name="q"
                defaultValue={q}
                placeholder="Job title, keyword, skill (e.g., React, DevOps)"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div className="md:col-span-4">
              <input
                name="location"
                defaultValue={location}
                placeholder="Location (City, State) or Remote"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div className="md:col-span-3 flex gap-2">
              <button
                type="submit"
                className="h-11 flex-1 rounded-2xl bg-[var(--brand-purple)] text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
              >
                Search
              </button>

              <Link
                href="/all-jobs"
                className="h-11 px-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Reset
              </Link>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-3">
              <select
                name="jobType"
                defaultValue={jobType}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none"
              >
                <option value="">Job type (any)</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <select
                name="level"
                defaultValue={level}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none"
              >
                <option value="">Level (any)</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>

            <div className="lg:col-span-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 h-11">
              <input
                id="remote"
                name="remote"
                value="true"
                defaultChecked={remote === true}
                type="checkbox"
                className="h-4 w-4"
              />
              <label htmlFor="remote" className="text-sm text-slate-700 font-semibold">
                Remote only
              </label>
            </div>

            <div className="lg:col-span-3 flex items-center text-xs text-slate-500">
              Tip: use keywords like <span className="mx-1 font-semibold text-slate-700">AWS</span>,
              <span className="mx-1 font-semibold text-slate-700">React</span>,
              <span className="mx-1 font-semibold text-slate-700">Security</span>.
            </div>
          </div>
        </form>

        {/* Results */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List */}
          <section className="lg:col-span-8 space-y-3">
            {items.length ? (
              items.map((j) => (
                <Link
                  key={j.id}
                  href={`/jobs/${j.id}`}
                  className="block rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-lg font-extrabold text-slate-900 truncate">
                        {j.title}
                      </div>
                      <div className="mt-1 text-sm text-slate-600 truncate">
                        {j.company?.name ?? "—"} • {pickLocation(j)}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                          {j.jobType ?? "—"}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                          {j.level ?? "—"}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                          {j.remote ? "Remote" : "On-site"}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[color:var(--brand-purple)/0.10] text-[var(--brand-purple-dark)]">
                          {payText(j)}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-sm font-semibold text-[var(--brand-purple)]">
                      View →
                    </div>
                  </div>

                  {j.skills?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {j.skills.slice(0, 8).map((s, idx) => (
                        <span
                          key={`${j.id}-skill-${idx}`}
                          className="text-xs px-3 py-1 rounded-full bg-[#F4F6FB] text-slate-700 border border-slate-200"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              ))
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="text-lg font-extrabold text-slate-900">
                  No jobs found
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Try broadening your search keywords or clearing filters.
                </p>
                <Link
                  href="/all-jobs"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--brand-purple)] px-6 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
                >
                  Reset filters
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 ? (
              <div className="pt-4 flex items-center justify-between gap-3">
                <Link
                  href={makeHref(Math.max(1, page - 1))}
                  className={`h-10 px-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold inline-flex items-center justify-center hover:bg-slate-50 transition ${
                    page <= 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  ← Prev
                </Link>

                <div className="text-sm text-slate-600">
                  Page <span className="font-extrabold text-slate-900">{page}</span> of{" "}
                  <span className="font-extrabold text-slate-900">{totalPages}</span>
                </div>

                <Link
                  href={makeHref(Math.min(totalPages, page + 1))}
                  className={`h-10 px-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold inline-flex items-center justify-center hover:bg-slate-50 transition ${
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Next →
                </Link>
              </div>
            ) : null}
          </section>

          {/* Side info panel (light, not busy) */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="text-sm font-extrabold text-slate-900">
                Search tips
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Use skill keywords (React, AWS, Kubernetes)</li>
                <li>• Try broader locations (“Texas”, “California”)</li>
                <li>• Toggle Remote only for remote roles</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="text-sm font-extrabold text-slate-900">
                For employers
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Post a role and start receiving vetted candidates.
              </p>
              <Link
                href="/employer"
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
              >
                Go to employer dashboard
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}