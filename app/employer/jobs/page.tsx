import Link from "next/link";

export const dynamic = "force-dynamic";

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

async function getJobs(companyId: string) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/employer/jobs?companyId=${encodeURIComponent(companyId)}`;

  const res = await fetch(url, { cache: "no-store" });

  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `API did not return JSON.\nStatus: ${res.status}\nURL: ${url}\n\nResponse:\n${text.slice(0, 400)}`
    );
  }

  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || `Failed (${res.status})`);
  }

  return data;
}

function StatusPill({ status }: { status: string }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border";

  switch (status) {
    case "PUBLISHED":
      return (
        <span className={`${base} bg-emerald-50 border-emerald-200 text-emerald-700`}>
          Active
        </span>
      );
    case "PAUSED":
      return (
        <span className={`${base} bg-amber-50 border-amber-200 text-amber-700`}>
          Paused
        </span>
      );
    case "CLOSED":
      return (
        <span className={`${base} bg-slate-100 border-slate-200 text-slate-700`}>
          Closed
        </span>
      );
    default:
      return (
        <span className={`${base} bg-slate-50 border-slate-200 text-slate-700`}>
          Draft
        </span>
      );
  }
}

function jobLocation(j: any) {
  if (j.remote) return "Remote";
  if (j.locations?.length) {
    const loc = j.locations
      .map((l: any) => l.label || l.city || l.state || l.country)
      .filter(Boolean)
      .join(", ");
    return loc || "United States";
  }
  return "United States";
}

function normalizeStatus(s: string) {
  return String(s || "").toUpperCase();
}

export default async function EmployerJobsPage() {
  // Later: derive from logged-in employer
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const data = await getJobs(companyId);
  const jobs = (data?.jobs ?? []) as any[];

  // Server-side filtering (simple + clean). Later you can move to query params.
  const statusOptions = ["ALL", "PUBLISHED", "PAUSED", "CLOSED", "DRAFT"];

  return (
    <div className="space-y-6">
      {/* Header row (no giant card, employer layout already frames) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Jobs
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage postings and review candidates per job.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/employer/overview"
            className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 transition"
          >
            Back to overview
          </Link>
        </div>
      </div>

      {/* Controls (Zip-like) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm font-semibold text-slate-900">
            {jobs.length} job{jobs.length === 1 ? "" : "s"}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end w-full lg:w-auto">
            {/* Search (UI only for now — wire later to query params) */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10 w-full sm:w-[280px]">
              <span className="text-slate-400">⌕</span>
              <input
                placeholder="Search jobs…"
                className="w-full bg-transparent outline-none text-sm text-slate-700"
              />
            </div>

            {/* Status filter (UI only for now) */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 h-10 w-full sm:w-[190px]">
              <span className="text-slate-400">⎇</span>
              <select className="w-full bg-transparent outline-none text-sm text-slate-700">
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s === "ALL" ? "All statuses" : s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Tip: click <span className="font-semibold">View candidates</span> to open ATS per job.
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-extrabold text-slate-500">
                <th className="px-6 py-4">Job</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Applicants</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {jobs.length ? (
                jobs.map((j: any) => {
                  const loc = jobLocation(j);
                  const appsCount = j._count?.applications ?? 0;
                  const status = normalizeStatus(j.status);

                  return (
                    <tr key={j.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-6 py-5">
                        <div className="font-extrabold text-slate-900">{j.title}</div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {(j.skills ?? []).slice(0, 4).map((s: any, idx: number) => (
                            <span
                              key={s?.id ?? `${j.id}-skill-${idx}`}
                              className="text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700"
                            >
                              {s.name}
                            </span>
                          ))}
                          {(j.skills ?? []).length > 4 ? (
                            <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                              +{(j.skills ?? []).length - 4}
                            </span>
                          ) : null}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <StatusPill status={status} />
                      </td>

                      <td className="px-6 py-5 text-slate-700">
                        {j.remote ? "Remote" : "On-site"} • {loc}
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-extrabold text-slate-900">{appsCount}</span>{" "}
                        <span className="text-slate-600">
                          applicant{appsCount === 1 ? "" : "s"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/employer/jobs/${j.id}/candidates`}
                            className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
                          >
                            View candidates
                          </Link>

                          <Link
                            href={`/employer/jobs/${j.id}/edit`}
                            className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[#0B1222] text-white hover:bg-slate-900 transition text-sm font-semibold"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-14 text-center">
                    <div className="text-lg font-extrabold text-slate-900">No jobs yet</div>
                    <p className="mt-2 text-sm text-slate-600">
                      Post your first role to start receiving candidates.
                    </p>
                    <Link
                      href="/employer/jobs/new"
                      className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
                    >
                      Post a job
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile / Tablet cards */}
      <div className="lg:hidden space-y-3">
        {jobs.length ? (
          jobs.map((j: any) => {
            const loc = jobLocation(j);
            const appsCount = j._count?.applications ?? 0;
            const status = normalizeStatus(j.status);

            return (
              <div
                key={j.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-extrabold text-slate-900 truncate">{j.title}</div>
                    <div className="mt-1 text-sm text-slate-600">
                      {j.remote ? "Remote" : "On-site"} • {loc}
                    </div>
                  </div>
                  <StatusPill status={status} />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(j.skills ?? []).slice(0, 6).map((s: any, idx: number) => (
                    <span
                      key={s?.id ?? `${j.id}-skill-${idx}`}
                      className="text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-sm text-slate-700">
                    <span className="font-extrabold text-slate-900">{appsCount}</span>{" "}
                    applicant{appsCount === 1 ? "" : "s"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/employer/jobs/${j.id}/candidates`}
                      className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
                    >
                      Candidates
                    </Link>
                    <Link
                      href={`/employer/jobs/${j.id}/edit`}
                      className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[#0B1222] text-white hover:bg-slate-900 transition text-sm font-semibold"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-lg font-extrabold text-slate-900">No jobs yet</div>
            <p className="mt-2 text-sm text-slate-600">
              Post your first role to start receiving candidates.
            </p>
            <Link
              href="/employer/jobs/new"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
            >
              Post a job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}