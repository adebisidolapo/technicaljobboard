import Link from "next/link";

export const dynamic = "force-dynamic";

async function getJobs(companyId: string) {
  const url = `/api/employer/jobs?companyId=${encodeURIComponent(companyId)}`;

  const res = await fetch(url, { cache: "no-store" });

  // Safer than res.json() (prevents "Unexpected end of JSON input")
  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `API did not return JSON.\nStatus: ${res.status}\nURL: ${url}\n\nResponse:\n${text.slice(
        0,
        400
      )}`
    );
  }

  if (!res.ok) {
    throw new Error(data?.message || `Failed (${res.status})`);
  }

  return data;
}

function StatusPill({ status }: { status: string }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border";

  if (status === "PUBLISHED") {
    return (
      <span className={`${base} bg-green-50 border-green-200 text-green-700`}>
        Active
      </span>
    );
  }
  if (status === "PAUSED") {
    return (
      <span className={`${base} bg-amber-50 border-amber-200 text-amber-700`}>
        Paused
      </span>
    );
  }
  if (status === "CLOSED") {
    return (
      <span className={`${base} bg-slate-100 border-slate-200 text-slate-700`}>
        Closed
      </span>
    );
  }
  return (
    <span className={`${base} bg-slate-50 border-slate-200 text-slate-700`}>
      Draft
    </span>
  );
}

export default async function EmployerJobsPage() {
  // Later: derive from logged-in employer
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const data = await getJobs(companyId);
  const jobs = data?.jobs ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Jobs
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage postings and review candidates.
            </p>
          </div>

          <Link
            href="/employer/jobs/new"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-5 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
          >
            + Post a Job
          </Link>
        </div>
      </section>

      {/* List */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">
            {jobs.length} job{jobs.length === 1 ? "" : "s"}
          </div>

          <div className="text-xs text-slate-500">
            Tip: click “View candidates” to open ATS per job.
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {jobs.length ? (
            jobs.map((j: any) => {
              const loc =
                j.locations?.length
                  ? j.locations
                      .map((l: any) => l.label || l.city || l.country)
                      .filter(Boolean)
                      .join(", ")
                  : "United States";

              const appsCount = j._count?.applications ?? 0;

              return (
                <div key={j.id} className="px-6 py-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="font-extrabold text-slate-900 truncate">
                          {j.title}
                        </div>
                        <StatusPill status={j.status} />
                      </div>

                      <div className="mt-1 text-sm text-slate-600">
                        {j.remote ? "Remote" : "On-site"} • {loc}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {(j.skills ?? []).slice(0, 6).map((s: any, idx: number) => (
                          <span
                            key={s?.id ?? `${j.id}-skill-${idx}`}
                            className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                      <div className="text-sm text-slate-700">
                        <span className="font-extrabold">{appsCount}</span>{" "}
                        applicant{appsCount === 1 ? "" : "s"}
                      </div>

                      {/* ✅ This generates a REAL jobId URL */}
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
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-10 text-center">
              <div className="text-lg font-extrabold text-slate-900">
                No jobs yet
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Post your first role to start receiving candidates.
              </p>
              <Link
                href="/employer/jobs/new"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
              >
                + Post a Job
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
