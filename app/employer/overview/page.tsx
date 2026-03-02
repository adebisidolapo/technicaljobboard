import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  hint: string;
  tone?: "purple" | "accent" | "neutral";
}) {
  const top =
    tone === "purple"
      ? "bg-[var(--brand-purple)]"
      : tone === "accent"
      ? "bg-[var(--brand-accent)]"
      : "bg-slate-200";

  const glow =
    tone === "purple"
      ? "bg-[color:var(--brand-purple)/0.12]"
      : tone === "accent"
      ? "bg-[color:var(--brand-accent)/0.10]"
      : "bg-slate-100";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-0 top-0 h-1 ${top}`} />
      <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${glow}`} />

      <div className="relative">
        <div className="text-xs font-extrabold tracking-wide text-slate-500 uppercase">
          {label}
        </div>
        <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
        <div className="mt-1 text-xs text-slate-600">{hint}</div>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  actionLabel,
  actionHref,
  children,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
          ) : null}
        </div>

        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="shrink-0 text-sm font-semibold text-[var(--brand-purple)] hover:underline"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = String(status || "").toUpperCase();

  const cls =
    s === "APPLIED" || s === "NEW"
      ? "bg-[color:var(--brand-purple)/0.10] border-[color:var(--brand-purple)/0.22] text-[var(--brand-purple-dark)]"
      : s === "SHORTLISTED" || s === "HIRED"
      ? "bg-[color:var(--brand-accent)/0.10] border-[color:var(--brand-accent)/0.22] text-[var(--brand-accent-dark)]"
      : "bg-slate-100 border-slate-200 text-slate-700";

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border ${cls}`}>
      {s}
    </span>
  );
}

export default async function EmployerOverviewPage() {
  // Later: derive from logged-in employer
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const { metrics } = await getEmployerDashboard(companyId);

  const totalJobs = metrics?.totalJobs ?? 0;
  const activeJobs = metrics?.activeJobs ?? 0;
  const totalApplications = metrics?.totalApplications ?? 0;
  const recent = (metrics?.recentApplications ?? []) as any[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            A clear snapshot of jobs and candidate activity — built for U.S. hiring.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/employer/jobs"
            className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
          >
            View jobs
          </Link>
          <Link
            href="/employer/candidates"
            className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
          >
            View candidates
          </Link>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total jobs" value={totalJobs} hint="All listings" tone="neutral" />
        <StatCard label="Active jobs" value={activeJobs} hint="Live on the board" tone="purple" />
        <StatCard label="Applications" value={totalApplications} hint="All-time total" tone="accent" />
        <StatCard label="Recent applicants" value={recent.length} hint="Latest submissions" tone="neutral" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left */}
        <div className="xl:col-span-8 space-y-6">
          <Panel
            title="Recent applicants"
            subtitle="Newest candidates across your published jobs"
            actionLabel="View all"
            actionHref="/employer/candidates"
          >
            {recent.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-extrabold text-slate-500 uppercase tracking-wide">
                      <th className="py-2 pr-3">Candidate</th>
                      <th className="py-2 pr-3">Role</th>
                      <th className="py-2 pr-3">Stage</th>
                      <th className="py-2 pr-3">Applied</th>
                      <th className="py-2 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-slate-700">
                    {recent.slice(0, 8).map((a: any) => {
                      const name =
                        a.user?.jobseekerProfile?.fullName ||
                        a.user?.email ||
                        "Applicant";

                      const role = a.job?.title || "—";
                      const stage = a.status || "APPLIED";
                      const appliedAt = a.createdAt
                        ? new Date(a.createdAt).toLocaleDateString()
                        : "—";

                      return (
                        <tr key={a.id} className="border-t border-slate-200">
                          <td className="py-3 pr-3 font-semibold text-slate-900 whitespace-nowrap">
                            {name}
                          </td>
                          <td className="py-3 pr-3 min-w-[220px]">{role}</td>
                          <td className="py-3 pr-3">
                            <StatusBadge status={stage} />
                          </td>
                          <td className="py-3 pr-3 text-slate-600 whitespace-nowrap">
                            {appliedAt}
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              href="/employer/candidates"
                              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-xs hover:bg-slate-50 transition"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-[#F4F6FB] p-6">
                <div className="text-sm font-extrabold text-slate-900">No applications yet</div>
                <p className="mt-1 text-sm text-slate-600">
                  Publish jobs to start receiving candidates.
                </p>
                <Link
                  href="/employer/jobs/new"
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-5 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
                >
                  Post a job
                </Link>
              </div>
            )}
          </Panel>

          <Panel
            title="Hiring checklist"
            subtitle="Glassdoor-style quick guidance to improve response rates"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Add salary range", note: "Boosts qualified applies (U.S. market expects it)" },
                { title: "Use clear job titles", note: "Avoid internal titles; keep it searchable" },
                { title: "Remote policy clarity", note: "Remote / hybrid / on-site — say it upfront" },
                { title: "Fast follow-up", note: "Respond within 48 hours to win top talent" },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{x.note}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right */}
        <div className="xl:col-span-4 space-y-6">
          <Panel title="At a glance" subtitle="Keep your pipeline healthy">
            <div className="grid gap-3">
              <div className="rounded-2xl border border-slate-200 bg-[#F4F6FB] p-4">
                <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">
                  Recommended actions
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                    Review new applicants daily
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
                    Refresh posts older than 14 days
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-slate-400" />
                    Add 5–8 key skills to improve matching
                  </li>
                </ul>
              </div>

              <Link
                href="/employer/jobs"
                className="h-11 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Manage jobs
              </Link>

              <Link
                href="/employer/candidates"
                className="h-11 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Review candidates
              </Link>

              <Link
                href="/employer/settings"
                className="h-11 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Company settings
              </Link>
            </div>
          </Panel>

          <Panel title="Employer tips" subtitle="Zip-style best practices">
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="font-extrabold text-slate-900">Short job descriptions win</div>
                <p className="mt-1 text-xs text-slate-600">
                  Lead with impact, tools, and salary. Keep requirements tight.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="font-extrabold text-slate-900">Make location obvious</div>
                <p className="mt-1 text-xs text-slate-600">
                  U.S. candidates filter heavily by state/city and remote policy.
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}