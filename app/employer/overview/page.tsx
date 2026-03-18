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
  icon: string;
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
        <span className={"flex h-9 w-9 items-center justify-center rounded-xl text-lg " + iconBg}>
          {icon}
        </span>
      </div>
      <p className={"mt-3 text-3xl font-extrabold tracking-tight " + valueColor}>
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
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
            Here is a snapshot of your hiring activity today.
          </p>
        </div>
        <Link
          href="/employer/jobs/new"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-5 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90"
        >
          + Post a Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Jobs" value={totalJobs} hint="All listings posted" icon="📋" tone="neutral" />
        <StatCard label="Active Jobs" value={activeJobs} hint="Currently live" icon="✅" tone="green" />
        <StatCard label="Applications" value={totalApplications} hint="All time total" icon="📨" tone="purple" />
        <StatCard label="New Today" value={recent.length} hint="Latest submissions" icon="🔔" tone="blue" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Candidates table — takes 2/3 */}
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
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Candidate
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Role
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Status
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Applied
                        </th>
                        <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Action
                        </th>
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
                          <tr key={a.id} className="group">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-extrabold text-[var(--brand-purple)]">
                                  {name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-slate-900">
                                  {name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-sm text-slate-600">
                              {role}
                            </td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={a.status} />
                            </td>
                            <td className="py-3 pr-4 text-xs text-slate-400">
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
                  <p className="text-2xl">📭</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
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

        {/* Right sidebar panels — 1/3 */}
        <div className="space-y-5">

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">
              Quick Actions
            </h3>
            <div className="mt-3 space-y-2">
              {[
                { href: "/employer/jobs/new", label: "Post a new job", icon: "+" },
                { href: "/employer/candidates", label: "Review candidates", icon: "👤" },
                { href: "/employer/jobs", label: "Manage listings", icon: "≡" },
                { href: "/employer/settings", label: "Company settings", icon: "⚙" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-white hover:text-slate-900"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                    {action.icon}
                  </span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hiring tips */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">
              Hiring Tips
            </h3>
            <div className="mt-3 space-y-3">
              {[
                { tip: "Add salary ranges", desc: "Gets 3x more qualified applicants" },
                { tip: "Clear job titles", desc: "Avoid internal jargon — keep it searchable" },
                { tip: "State remote policy", desc: "Remote / hybrid / on-site upfront" },
                { tip: "Respond in 48hrs", desc: "Top candidates move fast" },
              ].map((item) => (
                <div key={item.tip} className="flex items-start gap-2">
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

          {/* Featured job upsell */}
          <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-purple)] to-indigo-700 p-5 text-white shadow-sm">
            <p className="text-sm font-extrabold">Feature your listing</p>
            <p className="mt-1 text-xs text-indigo-200 leading-5">
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

      {/* Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-extrabold text-slate-900">
          Getting started checklist
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Complete these steps to get the most out of TechnicalJobBoard.
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
              className={"flex items-center gap-3 rounded-xl border p-3 transition hover:shadow-sm " + (step.done ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:bg-white")}
            >
              <span className={"flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold " + (step.done ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-400")}>
                {step.done ? "✓" : "○"}
              </span>
              <span className={"text-xs font-semibold " + (step.done ? "text-emerald-700" : "text-slate-700")}>
                {step.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}