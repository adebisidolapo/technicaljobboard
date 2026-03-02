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

  return data as { jobs: any[] };
}

function StatusPill({ status }: { status: string }) {
  const s = String(status || "").toUpperCase();
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border";

  if (s === "PUBLISHED") {
    return <span className={`${base} bg-[color:var(--brand-accent)/0.10] border-[color:var(--brand-accent)/0.25] text-[var(--brand-accent-dark)]`}>Active</span>;
  }
  if (s === "PAUSED") {
    return <span className={`${base} bg-amber-50 border-amber-200 text-amber-700`}>Paused</span>;
  }
  if (s === "CLOSED") {
    return <span className={`${base} bg-slate-100 border-slate-200 text-slate-700`}>Closed</span>;
  }
  return <span className={`${base} bg-slate-50 border-slate-200 text-slate-700`}>Draft</span>;
}

function TabLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "h-10 px-4 inline-flex items-center justify-center rounded-2xl text-sm font-extrabold transition border",
        active
          ? "bg-[color:var(--brand-purple)/0.12] border-[color:var(--brand-purple)/0.25] text-slate-900"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default async function EmployerJobsPage({ searchParams }: any) {
  // Later: derive from logged-in employer
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const data = await getJobs(companyId);
  const allJobs = data?.jobs ?? [];

  const q = String(searchParams?.q ?? "").trim().toLowerCase();
  const status = String(searchParams?.status ?? "ALL").toUpperCase();

  // Lightweight filtering without breaking backend
  const jobs = allJobs.filter((j: any) => {
    const matchesQ =
      !q ||
      String(j.title ?? "").toLowerCase().includes(q) ||
      String(j.company?.name ?? "").toLowerCase().includes(q) ||
      String(j.description ?? "").toLowerCase().includes(q);

    const matchesStatus = status === "ALL" ? true : String(j.status ?? "").toUpperCase() === status;

    return matchesQ && matchesStatus;
  });

  const counts = {
    ALL: allJobs.length,
    PUBLISHED: allJobs.filter((j: any) => String(j.status).toUpperCase() === "PUBLISHED").length,
    PAUSED: allJobs.filter((j: any) => String(j.status).toUpperCase() === "PAUSED").length,
    CLOSED: allJobs.filter((j: any) => String(j.status).toUpperCase() === "CLOSED").length,
    DRAFT: allJobs.filter((j: any) => !["PUBLISHED", "PAUSED", "CLOSED"].includes(String(j.status).toUpperCase())).length,
  };

  const makeHref = (next: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status && status !== "ALL") sp.set("status", status);
    Object.entries(next).forEach(([k, v]) => {
      if (v) sp.set(k, v);
      else sp.delete(k);
    });
    const qs = sp.toString();
    return qs ? `/employer/jobs?${qs}` : "/employer/jobs";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Jobs
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage postings, monitor interest, and open candidates per role.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/employer/overview"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              Back to overview
            </Link>

            <Link
              href="/employer/jobs/new"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm"
            >
              Post a job
            </Link>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="mt-5 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <TabLink
              href={makeHref({ status: "ALL" })}
              label={`All (${counts.ALL})`}
              active={status === "ALL"}
            />
            <TabLink
              href={makeHref({ status: "PUBLISHED" })}
              label={`Active (${counts.PUBLISHED})`}
              active={status === "PUBLISHED"}
            />
            <TabLink
              href={makeHref({ status: "PAUSED" })}
              label={`Paused (${counts.PAUSED})`}
              active={status === "PAUSED"}
            />
            <TabLink
              href={makeHref({ status: "CLOSED" })}
              label={`Closed (${counts.CLOSED})`}
              active={status === "CLOSED"}
            />
            <TabLink
              href={makeHref({ status: "DRAFT" })}
              label={`Draft (${counts.DRAFT})`}
              active={status === "DRAFT"}
            />
          </div>

          <form action="/employer/jobs" method="GET" className="lg:ml-auto w-full lg:w-[420px]">
            <div className="flex items-stretch w-full rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <input
                name="q"
                defaultValue={String(searchParams?.q ?? "")}
                placeholder="Search jobs (title, company, description)…"
                className="h-11 w-full px-4 text-sm outline-none"
              />
              {/* keep status when searching */}
              {status !== "ALL" ? <input type="hidden" name="status" value={status} /> : null}

              <button
                type="submit"
                className="h-11 px-5 bg-[color:var(--brand-purple)/0.10] text-slate-900 font-extrabold text-sm border-l border-slate-200 hover:bg-[color:var(--brand-purple)/0.14] transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* List */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm font-extrabold text-slate-900">
            {jobs.length} job{jobs.length === 1 ? "" : "s"}
          </div>
          <div className="text-xs text-slate-500">
            Tip: use “View candidates” to open the ATS per job.
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {jobs.length ? (
            jobs.map((j: any) => {
              const loc =
                j.locations?.length
                  ? j.locations
                      .map((l: any) => l.label || l.city || l.state || l.country)
                      .filter(Boolean)
                      .join(", ")
                  : "United States";

              const appsCount = j._count?.applications ?? 0;

              return (
                <div key={j.id} className="px-6 py-5">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Left */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="font-extrabold text-slate-900 truncate text-base">
                          {j.title}
                        </div>
                        <StatusPill status={j.status} />
                      </div>

                      <div className="mt-1 text-sm text-slate-600">
                        {j.remote ? "Remote" : "On-site"} • {loc}
                      </div>

                      {!!(j.skills?.length) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(j.skills ?? []).slice(0, 8).map((s: any, idx: number) => (
                            <span
                              key={s?.id ?? `${j.id}-skill-${idx}`}
                              className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right */}
                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <div className="text-sm text-slate-700 mr-1">
                        <span className="font-extrabold">{appsCount}</span>{" "}
                        applicant{appsCount === 1 ? "" : "s"}
                      </div>

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
            <div className="px-6 py-12 text-center">
              <div className="text-lg font-extrabold text-slate-900">
                No jobs match your filters
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Try clearing search/status, or post a new role.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Link
                  href="/employer/jobs"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-slate-900 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Clear filters
                </Link>

                <Link
                  href="/employer/jobs/new"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
                >
                  Post a job
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}