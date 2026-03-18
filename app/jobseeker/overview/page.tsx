export const dynamic = "force-dynamic";

import Link from "next/link";

function StatCard({
  label,
  value,
  icon,
  tone = "neutral",
}: {
  label: string;
  value: number;
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
    </div>
  );
}

const RECENT_APPS = [
  { role: "Senior Frontend Engineer", company: "Vermot", status: "REVIEWING", date: "Mar 14" },
  { role: "DevOps Platform Engineer", company: "NovaTech", status: "APPLIED", date: "Mar 12" },
  { role: "Backend Engineer (Node)", company: "Redtail", status: "SHORTLISTED", date: "Mar 10" },
];

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "SHORTLISTED"
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : status === "REVIEWING"
      ? "bg-sky-50 border-sky-200 text-sky-700"
      : status === "REJECTED"
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-indigo-50 border-indigo-200 text-[var(--brand-purple)]";

  return (
    <span className={"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold " + cls}>
      {status}
    </span>
  );
}

export default function JobseekerOverviewPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your applications and manage your job search.
          </p>
        </div>
        <Link
          href="/all-jobs"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-5 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90"
        >
          Browse Jobs
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Applications" value={12} icon="📨" tone="purple" />
        <StatCard label="Interviews" value={3} icon="🗓" tone="green" />
        <StatCard label="Saved Jobs" value={8} icon="♡" tone="blue" />
        <StatCard label="Profile Views" value={24} icon="👁" tone="neutral" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Recent applications — 2/3 */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Recent Applications
                </h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  Your latest job applications
                </p>
              </div>
              <Link
                href="/jobseeker/applications"
                className="text-xs font-semibold text-[var(--brand-purple)] transition hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="p-6">
              {RECENT_APPS.length > 0 ? (
                <div className="space-y-3">
                  {RECENT_APPS.map((app, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {app.role}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {app.company} • {app.date}
                        </p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-2xl">📭</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    No applications yet
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Start applying to jobs to track them here.
                  </p>
                  <Link
                    href="/all-jobs"
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[var(--brand-purple)] px-4 text-xs font-extrabold text-white shadow-sm transition hover:opacity-90"
                  >
                    Browse jobs
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right col — 1/3 */}
        <div className="space-y-5">

          {/* Profile completion */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">
                Profile Strength
              </h3>
              <span className="text-xs font-semibold text-[var(--brand-purple)]">60%</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--brand-purple)] transition-all"
                style={{ width: "60%" }}
              />
            </div>
            <div className="mt-3 space-y-2">
              {[
                { label: "Add your name", done: true },
                { label: "Upload resume", done: false },
                { label: "Add headline", done: false },
                { label: "Set location", done: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={"flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] " + (item.done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400")}>
                    {item.done ? "✓" : "○"}
                  </span>
                  <span className={"text-xs " + (item.done ? "text-slate-500 line-through" : "text-slate-700")}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/jobseeker/settings"
              className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 transition hover:bg-white"
            >
              Complete profile
            </Link>
          </div>

          {/* Quick links */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">
              Quick Links
            </h3>
            <div className="mt-3 space-y-2">
              {[
                { href: "/all-jobs", label: "Browse all jobs", icon: "🔍" },
                { href: "/jobseeker/saved", label: "Saved jobs", icon: "♡" },
                { href: "/jobseeker/applications", label: "My applications", icon: "📋" },
                { href: "/jobseeker/settings", label: "Upload resume", icon: "📄" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-white"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-purple)] to-indigo-700 p-5 text-white shadow-sm">
            <p className="text-sm font-extrabold">Job Search Tips</p>
            <ul className="mt-3 space-y-2 text-xs text-indigo-200">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">•</span>
                Apply within 48hrs of posting for best results
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">•</span>
                Tailor your resume to each role
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">•</span>
                Keep your profile 100% complete
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Recommended jobs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">
            Recommended for You
          </h3>
          <Link
            href="/all-jobs"
            className="text-xs font-semibold text-[var(--brand-purple)] hover:underline"
          >
            See all
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Senior Frontend Engineer", company: "Vermot", salary: "$120k - $160k", type: "Remote" },
            { title: "DevOps Engineer", company: "NovaTech", salary: "$135k - $185k", type: "Remote" },
            { title: "Data Engineer", company: "Redtail", salary: "$125k - $175k", type: "Austin, TX" },
          ].map((job) => (
            <Link
              key={job.title}
              href="/all-jobs"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">{job.title}</p>
              <p className="mt-0.5 text-xs text-slate-400">{job.company} • {job.type}</p>
              <p className="mt-2 text-xs font-semibold text-emerald-600">{job.salary}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}