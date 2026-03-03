import Link from "next/link";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

function spGet(sp: SearchParams, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

function cleanStr(v?: string | null) {
  return (v ?? "").trim();
}

function toBool(v?: string | null) {
  if (!v) return undefined;
  const s = v.trim().toLowerCase();
  if (["true", "1", "yes", "y", "on"].includes(s)) return true;
  if (["false", "0", "no", "n", "off"].includes(s)) return false;
  return undefined;
}

function buildQuery(params: Record<string, string | undefined>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v && v.trim()) qs.set(k, v.trim());
  });
  return qs.toString();
}

type ApiJob = {
  id: string;
  title: string;
  description: string;
  jobType?: string | null;
  level?: string | null;
  remote?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  publishedAt?: string | null;
  company?: { name?: string | null } | null;
  locations?: Array<{ label?: string | null; city?: string | null; state?: string | null; country?: string | null }>;
  skills?: Array<{ name: string }>;
};

function locationText(j: ApiJob) {
  if (j.remote) return "Remote";
  const l0 = j.locations?.[0];
  return (
    l0?.label ||
    [l0?.city, l0?.state].filter(Boolean).join(", ") ||
    l0?.country ||
    "United States"
  );
}

function payText(j: ApiJob) {
  const min = j.salaryMin ?? null;
  const max = j.salaryMax ?? null;
  if (min && max) return `$${Number(min).toLocaleString()} – $${Number(max).toLocaleString()}`;
  if (min) return `From $${Number(min).toLocaleString()}`;
  if (max) return `Up to $${Number(max).toLocaleString()}`;
  return "—";
}

function postedText(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "—";
  }
}

async function fetchJobs(args: {
  q: string;
  location: string;
  remote?: boolean;
  jobType: string;
  level: string;
  take: number;
  page: number;
}) {
  const { q, location, remote, jobType, level, take, page } = args;
  const skip = Math.max((page - 1) * take, 0);

  const qs = buildQuery({
    q: q || undefined,
    location: location || undefined,
    remote: typeof remote === "boolean" ? String(remote) : undefined,
    jobType: jobType || undefined,
    level: level || undefined,
    take: String(take),
    skip: String(skip),
  });

  const url = `${getBaseUrl()}/api/jobs/search?${qs}`;
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`API did not return JSON.\nStatus: ${res.status}\nURL: ${url}\n\n${text.slice(0, 400)}`);
  }

  if (!res.ok || data?.ok === false) throw new Error(data?.error || `Failed (${res.status})`);

  return {
    items: (data?.items ?? []) as ApiJob[],
    total: Number(data?.total ?? 0),
    take: Number(data?.take ?? take),
    skip: Number(data?.skip ?? skip),
  };
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

export default async function AllJobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const q = cleanStr(spGet(sp, "q"));
  const location = cleanStr(spGet(sp, "location")) || cleanStr(spGet(sp, "loc"));
  const remote = toBool(spGet(sp, "remote") ?? null);
  const jobType = cleanStr(spGet(sp, "jobType"));
  const level = cleanStr(spGet(sp, "level"));

  const take = Math.min(Math.max(parseInt(spGet(sp, "take") || "20", 10), 10), 50);
  const page = Math.max(parseInt(spGet(sp, "page") || "1", 10), 1);

  const { items, total } = await fetchJobs({ q, location, remote, jobType, level, take, page });
  const totalPages = Math.max(Math.ceil(total / take), 1);

  const baseParams = {
    q: q || undefined,
    location: location || undefined,
    remote: typeof remote === "boolean" ? String(remote) : undefined,
    jobType: jobType || undefined,
    level: level || undefined,
    take: String(take),
  };

  const prevHref = page > 1 ? `/all-jobs?${buildQuery({ ...baseParams, page: String(page - 1) })}` : null;
  const nextHref = page < totalPages ? `/all-jobs?${buildQuery({ ...baseParams, page: String(page + 1) })}` : null;

  const appliedFilters = [
    q ? `Keyword: ${q}` : null,
    location ? `Location: ${location}` : null,
    typeof remote === "boolean" ? (remote ? "Remote only" : "On-site only") : null,
    jobType ? `Type: ${jobType}` : null,
    level ? `Level: ${level}` : null,
  ].filter(Boolean) as string[];

  return (
    <main className="bg-[#F3F6FB] text-slate-900">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">All Jobs</h1>
              <p className="mt-2 text-sm text-slate-600">
                Clean listings, strong filters — built for U.S. job search.
              </p>
            </div>

            <div className="text-sm text-slate-600">
              <span className="font-extrabold text-slate-900">{total}</span> result{total === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile Filters (better than details — always visible panel) */}
        <div className="lg:hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold text-slate-900">Filters</div>
            <Link href="/all-jobs" className="text-sm font-semibold text-[var(--brand-purple)] hover:underline">
              Reset
            </Link>
          </div>

          <div className="mt-4">
            <FilterForm q={q} location={location} remote={remote} jobType={jobType} level={level} take={take} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 lg:mt-0">
          {/* Desktop Filters */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200">
                <div className="text-sm font-extrabold text-slate-900">Refine search</div>
                <div className="mt-1 text-xs text-slate-600">Fast filtering, clean results.</div>
              </div>
              <div className="p-6">
                <FilterForm q={q} location={location} remote={remote} jobType={jobType} level={level} take={take} />
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* Applied */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm font-extrabold text-slate-900">
                  Results
                  <span className="ml-2 text-xs text-slate-500 font-semibold">
                    Page {page} of {totalPages}
                  </span>
                </div>
              </div>

              {appliedFilters.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {appliedFilters.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-500">Tip: Use filters to narrow down quickly.</div>
              )}
            </div>

            {/* List */}
            <div className="space-y-3">
              {items.length ? (
                items.map((j) => (
                  <article
                    key={j.id}
                    className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col gap-3">
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                              {j.title}
                            </h2>
                            {j.remote ? (
                              <span className="shrink-0 inline-flex items-center rounded-full border border-[color:var(--brand-purple)/0.25] bg-[color:var(--brand-purple)/0.10] px-3 py-1 text-xs font-extrabold text-[var(--brand-purple-dark)]">
                                Remote
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-1 text-sm text-slate-600">
                            <span className="font-semibold text-slate-900">{j.company?.name ?? "—"}</span> •{" "}
                            {locationText(j)}
                          </p>

                          <p className="mt-3 text-sm text-slate-600 line-clamp-2">{j.description}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Pill>{j.jobType ?? "—"}</Pill>
                            <Pill>{payText(j)}</Pill>
                            <Pill>Posted: {postedText(j.publishedAt)}</Pill>
                            {j.level ? <Pill>{j.level}</Pill> : null}
                          </div>
                        </div>

                        {/* Mobile-friendly CTA row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <Link
                            href={`/jobs/${j.id}`}
                            className="h-11 rounded-2xl bg-[var(--brand-purple)] text-white text-sm font-semibold inline-flex items-center justify-center hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
                          >
                            View job
                          </Link>
                          <Link
                            href={`/jobs/${j.id}`}
                            className="h-11 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold inline-flex items-center justify-center hover:bg-slate-50 transition"
                          >
                            Save / Apply
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8 text-center">
                  <div className="text-lg font-extrabold text-slate-900">No jobs found</div>
                  <p className="mt-2 text-sm text-slate-600">Try removing filters or searching broader keywords.</p>
                  <Link
                    href="/all-jobs"
                    className="mt-5 inline-flex h-11 px-6 items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition"
                  >
                    Reset search
                  </Link>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between gap-3">
                {prevHref ? (
                  <Link
                    href={prevHref}
                    className="h-11 px-5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold inline-flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    ← Prev
                  </Link>
                ) : (
                  <span className="h-11 px-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 text-sm font-semibold inline-flex items-center justify-center">
                    ← Prev
                  </span>
                )}

                <div className="text-sm text-slate-600">
                  <span className="font-extrabold text-slate-900">{page}</span> /{" "}
                  <span className="font-extrabold text-slate-900">{totalPages}</span>
                </div>

                {nextHref ? (
                  <Link
                    href={nextHref}
                    className="h-11 px-5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold inline-flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="h-11 px-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 text-sm font-semibold inline-flex items-center justify-center">
                    Next →
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterForm({
  q,
  location,
  remote,
  jobType,
  level,
  take,
}: {
  q: string;
  location: string;
  remote?: boolean;
  jobType: string;
  level: string;
  take: number;
}) {
  return (
    <form action="/all-jobs" method="GET" className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        <div className="space-y-2">
          <div className="text-xs font-extrabold text-slate-700 uppercase">Keyword</div>
          <input
            name="q"
            defaultValue={q}
            placeholder="Title, skill, company…"
            className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-extrabold text-slate-700 uppercase">Location</div>
          <input
            name="location"
            defaultValue={location}
            placeholder="City, State, Remote…"
            className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
        <div className="space-y-2">
          <div className="text-xs font-extrabold text-slate-700 uppercase">Job type</div>
          <select
            name="jobType"
            defaultValue={jobType || ""}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          >
            <option value="">Any</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-extrabold text-slate-700 uppercase">Level</div>
          <select
            name="level"
            defaultValue={level || ""}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          >
            <option value="">Any</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-extrabold text-slate-700 uppercase">Remote</div>
          <select
            name="remote"
            defaultValue={typeof remote === "boolean" ? String(remote) : ""}
            className="w-full h-11 px-3 rounded-2xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          >
            <option value="">Any</option>
            <option value="true">Remote only</option>
            <option value="false">On-site only</option>
          </select>
        </div>
      </div>

      <input type="hidden" name="take" value={String(take)} />

      <button
        type="submit"
        className="w-full h-11 rounded-2xl bg-[var(--brand-purple)] text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
      >
        Apply filters
      </button>

      <div className="text-xs text-slate-500">
        Tip: Use broad location like “Texas” to see more results.
      </div>
    </form>
  );
}