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
    tone === "purple" ? "bg-indigo-50 text-[var(--brand-purple)]" :
    tone === "green"  ? "bg-emerald-50 text-emerald-600" :
    tone === "blue"   ? "bg-sky-50 text-sky-600" :
    "bg-slate-100 text-slate-400";

  const valueColor =
    tone === "purple" ? "text-[var(--brand-purple)]" :
    tone === "green"  ? "text-emerald-600" :
    tone === "blue"   ? "text-sky-600" :
    "text-slate-900";

  const borderAccent =
    tone === "purple" ? "border-t-[var(--brand-purple)]" :
    tone === "green"  ? "border-t-emerald-500" :
    tone === "blue"   ? "border-t-sky-500" :
    "border-t-slate-300";

  return (
    <div className={"rounded-2xl border border-slate-200 bg-white p-5 shadow-sm border-t-2 " + borderAccent}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-lg " + iconBg}>
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
      ? "bg-sky-50 border-sky-200 text-sky-600"
      : s === "REJECTED"
      ? "bg-red-50 border-red-200 text-red-600"
      : "bg-indigo-50 border-indigo-200 text-[var(--brand-purple)]";

  return (
    <span className={"inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold " + cls}>
      {s}
    </span>
  );
}

const HIRING_TIPS = [
  { tip: "Add salary ranges", desc: "Gets 3x more qualified applicants" },
  { tip: "Use clear job titles", desc: "Avoid jargon — keep it searchable" },
  { tip: "State remote policy", desc: "Remote / hybrid / on-site upfront" },
  { tip: "Respond within 48hrs", desc: "Top candidates move fast" },
];

const CHECKLIST = [
  { label: "Post your first job", key: "jobs", href: "/employer/jobs/new" },
  { label: "Complete company profile", key: "profile", href: "/employer/settings" },
  { label: "Review first applicant", key: "applicants", href: "/employer/candidates" },
  { label: "Feature a listing", key: "feature", href: "/employer/jobs/new" },
];

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const totalJobs = metrics?.totalJobs ?? 0;
  const activeJobs = metrics?.activeJobs ?? 0;
  const totalApplications = metrics?.totalApplications ?? 0;
  const recent = (metrics?.recentApplications ?? []) as any[];

  const checklistDone: Record<string, boolean> = {
    jobs: totalJobs > 0,
    profile: false,
    applicants: totalApplications > 0,
    feature: false,
  };

  const doneCount = Object.values(checklistDone).filter(Boolean).length;
  const progressPct = Math.round((doneCount / CHECKLIST.length) * 100);

  return (
    <div className="space-y-6">

      {/* Page header — one clean title, no duplicate button */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Your hiring activity at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total Jobs"
          value={totalJobs}
          hint="All listings posted"
          tone="neutral"
          icon={
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
          }
        />
        <StatCard
          label="Active Jobs"
          value={activeJobs}
          hint="Currently live"
          tone="green"
          icon={
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
          }
        />
        <StatCard
          label="Applications"
          value={totalApplications}
          hint="All time total"
          tone="purple"
          icon={
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Candidates table — 2/3 width */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
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

            <div className="p-5">
              {recent.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Candidate</th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Role</th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Applied</th>
                        <th className="pb-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">Action</th>
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
                          <tr key={a.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-3 pr-3">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-extrabold text-[var(--brand-purple)]">
                                  {name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                                  {name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 pr-3 text-sm text-slate-600 max-w-[140px] truncate">
                              {role}
                            </td>
                            <td className="py-3 pr-3">
                              <StatusBadge status={a.status} />
                            </td>
                            <td className="py-3 pr-3 text-xs text-slate-400 whitespace-nowrap hidden sm:table-cell">
                              {appliedAt}
                            </td>
                            <td className="py-3 text-right">
                              <Link
                                href="/employer/candidates"
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
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
                  <p className="mt-1 text-xs text-slate-400">
                    Publish a job to start receiving candidates.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column — 1/3 width */}
        <div className="space-y-4">

          {/* Setup progress */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">
                Setup Progress
              </h3>
              <span className="text-xs font-semibold text-[var(--brand-purple)]">
                {doneCount}/{CHECKLIST.length}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--brand-purple)] transition-all duration-500"
                style={{ width: progressPct + "%" }}
              />
            </div>
            <div className="mt-4 space-y-2.5">
              {CHECKLIST.map((step) => {
                const done = checklistDone[step.key];
                return (
                  <Link
                    key={step.key}
                    href={step.href}
                    className={
                      "flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold transition hover:bg-slate-50 " +
                      (done ? "text-slate-400" : "text-slate-700")
                    }
                  >
                    <span
                      className={
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold " +
                        (done
                          ? "bg-[var(--brand-purple)] text-white"
                          : "border-2 border-slate-200 bg-white text-slate-300")
                      }
                    >
                      {done ? "✓" : ""}
                    </span>
                    <span className={done ? "line-through" : ""}>{step.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Hiring tips — compact */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">
              Hiring Tips
            </h3>
            <div className="mt-3 space-y-3">
              {HIRING_TIPS.map((item) => (
                <div key={item.tip} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[9px] font-extrabold text-[var(--brand-purple)]">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{item.tip}</p>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upsell — compact, brand colors only */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
            <p className="text-sm font-extrabold text-[var(--brand-purple)]">
              Feature your listing
            </p>
            <p className="mt-1 text-xs leading-5 text-indigo-400">
              Reach 10x more qualified technical candidates with a featured post.
            </p>
            <Link
              href="/employer/jobs/new"
              className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-xl bg-[var(--brand-purple)] text-xs font-extrabold text-white transition hover:opacity-90"
            >
              Upgrade your post
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}