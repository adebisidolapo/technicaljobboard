import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  hint: string;
  icon: React.ReactNode;
  tone?: "purple" | "green" | "blue" | "neutral";
}) {
  const iconBg =
    tone === "purple" ? "bg-indigo-100 text-[var(--brand-purple)]" :
    tone === "green"  ? "bg-emerald-100 text-emerald-600" :
    tone === "blue"   ? "bg-sky-100 text-sky-600" :
    "bg-slate-100 text-slate-500";

  const valueColor =
    tone === "purple" ? "text-[var(--brand-purple)]" :
    tone === "green"  ? "text-emerald-600" :
    tone === "blue"   ? "text-sky-600" :
    "text-slate-900";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <span className={"flex h-9 w-9 items-center justify-center rounded-xl " + iconBg}>
          {icon}
        </span>
      </div>
      <p className={"mt-3 text-3xl font-extrabold tracking-tight " + valueColor}>
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = String(status || "").toUpperCase();
  const cls =
    s === "SHORTLISTED" || s === "HIRED"
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : s === "REVIEWING"
      ? "bg-sky-50 border-sky-200 text-sky-700"
      : s === "REJECTED"
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-indigo-50 border-indigo-200 text-[var(--brand-purple)]";

  return (
    <span className={"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold " + cls}>
      {s}
    </span>
  );
}

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const totalJobs = metrics?.totalJobs ?? 0;
  const activeJobs = metrics?.activeJobs ?? 0;
  const totalApplications = metrics?.totalApplications ?? 0;
  const recent = (metrics?.recentApplications ?? []) as any[];

  return (
    <div className="space-y-8">

      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here is a snapshot of your hiring activity.
          </p>
        </div>
        <Link
          href="/employer/jobs/new"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-5 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90"
        >
          + Post a Job
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Jobs"
          value={totalJobs}
          hint="All listings posted"
          tone="neutral"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
          }
        />
        <StatCard
          label="Active Jobs"
          value={activeJobs}
          hint="Currently live on the board"
          tone="green"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
          }
        />
        <StatCard
          label="Applications"
          value={totalApplications}
          hint="All time total received"
          tone="purple"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          }
        />
        <StatCard
          label="New Today"
          value={recent.length}
          hint="Latest submissions"
          tone="blue"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Left — candidates table */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Recent Applicants
                </h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  Newest candidates across your published jobs
                </p>
              </div>
              <Link
                href="/employer/candidates"
                className="text-xs font-semibold text-[var(--brand-purple)] transition hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="p-6">
              {recent.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Candidate</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Role</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Applied</th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {recent.slice(0, 8).map((a: any) => {
                        const name =
                          a.user?.jobseekerProfile?.fullName ||
                          a.user?.email ||
                          "Applicant";
                        const role = a.job?.title || "—";
                        const appliedAt = a.createdAt
                          ? new Date(a.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "—";

                        return (
                          <tr key={a.id}>
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-extrabold text-[var(--brand-purple)]">
                                  {name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                                  {name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-sm text-slate-600 min-w-[160px]">
                              {role}
                            </td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={a.status} />
                            </td>
                            <td className="py-3 pr-4 text-xs text-slate-400 whitespace-nowrap">
                              {appliedAt}
                            </td>
                            <td className="py-3 text-right">
                              <Link
                                href="/employer/candidates"
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
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
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    No applications yet
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Publish jobs to start receiving candidates.
                  </p>
                  <Link
                    href="/employer/jobs/new"
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[var(--brand-purple)] px-4 text-xs font-extrabold text-white shadow-sm transition hover:opacity-90"
                  >
                    Post your first job
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar panels */}
        <div className="space-y-5">

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">Quick Actions</h3>
            <div className="mt-3 space-y-2">
              {[
                {
                  href: "/employer/jobs/new",
                  label: "Post a new job",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  ),
                },
                {
                  href: "/employer/candidates",
                  label: "Review candidates",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  href: "/employer/jobs",
                  label: "Manage listings",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                      <rect x="9" y="3" width="6" height="4" rx="1" />
                    </svg>
                  ),
                },
                {
                  href: "/employer/settings",
                  label: "Company settings",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                    </svg>
                  ),
                },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-white hover:text-slate-900"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm text-slate-500">
                    {action.icon}
                  </span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hiring tips */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">Hiring Tips</h3>
            <div className="mt-3 space-y-3">
              {[
                { tip: "Add salary ranges", desc: "Gets 3x more qualified applicants" },
                { tip: "Clear job titles", desc: "Avoid jargon — keep it searchable" },
                { tip: "State remote policy", desc: "Remote / hybrid / on-site upfront" },
                { tip: "Respond in 48hrs", desc: "Top candidates move fast" },
              ].map((item) => (
                <div key={item.tip} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-extrabold text-emerald-600">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{item.tip}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured upsell */}
          <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-purple)] to-indigo-700 p-5 text-white shadow-sm">
            <p className="text-sm font-extrabold">Feature your listing</p>
            <p className="mt-1 text-xs leading-5 text-indigo-200">
              Get 10x more visibility and reach pre-vetted technical candidates faster.
            </p>
            <Link
              href="/employer/jobs/new"
              className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-xl bg-white text-xs font-extrabold text-[var(--brand-purple)] transition hover:bg-indigo-50"
            >
              Upgrade your post
            </Link>
          </div>
        </div>
      </div>

      {/* Getting started checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-extrabold text-slate-900">
          Getting started checklist
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Complete these to get the most out of TechnicalJobBoard.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Post your first job", done: totalJobs > 0, href: "/employer/jobs/new" },
            { label: "Complete company profile", done: false, href: "/employer/settings" },
            { label: "Review first applicant", done: totalApplications > 0, href: "/employer/candidates" },
            { label: "Feature a listing", done: false, href: "/employer/jobs/new" },
          ].map((step) => (
            <Link
              key={step.label}
              href={step.href}
              className={
                "flex items-center gap-3 rounded-xl border p-3 transition hover:shadow-sm " +
                (step.done
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-slate-50 hover:bg-white")
              }
            >
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold " +
                  (step.done
                    ? "bg-emerald-500 text-white"
                    : "border border-slate-200 bg-white text-slate-400")
                }
              >
                {step.done ? "✓" : "○"}
              </span>
              <span
                className={
                  "text-xs font-semibold " +
                  (step.done ? "text-emerald-700" : "text-slate-700")
                }
              >
                {step.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}