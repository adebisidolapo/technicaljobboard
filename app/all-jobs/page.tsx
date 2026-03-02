import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] ?? "" : v ?? "";
}

function toBool(v: string) {
  const s = v.trim().toLowerCase();
  if (["1", "true", "yes", "y"].includes(s)) return true;
  if (["0", "false", "no", "n"].includes(s)) return false;
  return undefined;
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
  // ✅ Next 16: searchParams is async
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

  const now = new Date();

  const where: any = {
    status: "PUBLISHED",
    publishedAt: { not: null, lte: now },

    ...(typeof remote === "boolean" ? { remote } : {}),
    ...(jobType ? { jobType } : {}),
    ...(level ? { level } : {}),

    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { company: { name: { contains: q, mode: "insensitive" } } },
            { skills: { some: { name: { contains: q, mode: "insensitive" } } } },
          ],
        }
      : {}),

    ...(location
      ? {
          locations: {
            some: {
              OR: [
                { country: { contains: location, mode: "insensitive" } },
                { city: { contains: location, mode: "insensitive" } },
                { label: { contains: location, mode: "insensitive" } },
              ],
            },
          },
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip,
      take,
      include: { company: true, locations: true, skills: true },
    }),
    prisma.job.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / take));

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
            <span className="font-extrabold text-slate-900">{total}</span>{" "}
            result{total === 1 ? "" : "s"}
          </div>
        </div>

        {/* Filters */}
        <form action="/all-jobs" className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-4">
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
              Tip: try <span className="mx-1 font-semibold text-slate-700">AWS</span>,
              <span className="mx-1 font-semibold text-slate-700">React</span>,
              <span className="mx-1 font-semibold text-slate-700">Security</span>.
            </div>
          </div>
        </form>

        {/* Results */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 space-y-3">
            {items.length ? (
              items.map((j: any) => (
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
                      {j.skills.slice(0, 8).map((s: any, idx: number) => (
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
                <div className="text-lg font-extrabold text-slate-900">No jobs found</div>
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

          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="text-sm font-extrabold text-slate-900">Search tips</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Use skill keywords (React, AWS, Kubernetes)</li>
                <li>• Try broader locations (“Texas”, “California”)</li>
                <li>• Toggle Remote only for remote roles</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="text-sm font-extrabold text-slate-900">For employers</div>
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