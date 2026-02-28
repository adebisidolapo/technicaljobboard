import Link from "next/link";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const recent = metrics.recentApplications ?? [];

  // Safely compute pipeline from recentApplications
  const pipeline = recent.reduce<Record<string, number>>((acc, app: any) => {
    const key = app.status || "APPLIED";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { day: "Sat", views: 80 },
    { day: "Sun", views: 120 },
    { day: "Mon", views: 180 },
    { day: "Tue", views: 240 },
    { day: "Wed", views: 210 },
    { day: "Thu", views: 160 },
    { day: "Fri", views: 130 },
  ];

  return (
    <div className="space-y-10">

      {/* KPI STRIP */}
      <div className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[color:var(--brand-purple)/0.12] via-white to-[color:var(--brand-accent)/0.08] px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Metric label="Total Jobs" value={metrics.totalJobs ?? 0} />
            <Metric label="Active Jobs" value={metrics.activeJobs ?? 0} />
            <Metric label="Applications" value={metrics.totalApplications ?? 0} />
            <Metric label="Recent Applicants" value={recent.length} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* LEFT */}
        <div className="xl:col-span-8 space-y-10">

          {/* Chart */}
          <Card title="Daily Job Views">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="var(--brand-purple)"
                    fill="url(#colorViews)"
                    strokeWidth={3}
                    dot={false}
                  />
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-purple)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pipeline */}
          <Card title="Candidate Pipeline">
            <div className="space-y-6">
              {Object.entries(pipeline).map(([status, count]) => {
                const percent = Math.min((Number(count) / 10) * 100, 100);

                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm font-semibold text-slate-700">
                      <span>{status}</span>
                      <span>{count}</span>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-accent)] transition-all duration-700 ease-out"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent Applicants */}
          <Card title="Recent Applicants" actionHref="/employer/candidates" actionLabel="View all">
            <div className="space-y-4">
              {recent.length ? (
                recent.slice(0, 5).map((a: any) => (
                  <div
                    key={a.id}
                    className="flex justify-between items-center rounded-2xl border border-slate-200 p-4 hover:shadow-md transition"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {a.user?.jobseekerProfile?.fullName ||
                          a.user?.email ||
                          "Applicant"}
                      </div>
                      <div className="text-sm text-slate-500">
                        {a.job?.title}
                      </div>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[color:var(--brand-accent)/0.12] text-[var(--brand-accent-dark)]">
                      {a.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">
                  No applications yet.
                </div>
              )}
            </div>
          </Card>

        </div>

        {/* RIGHT */}
        <div className="xl:col-span-4 space-y-10 sticky top-24 h-fit">

          <Card title="Quick Actions">
            <div className="space-y-4">
              <ActionButton href="/employer/jobs/new" label="Post a Job" primary />
              <ActionButton href="/employer/candidates" label="Review Candidates" />
              <ActionButton href="/employer/settings" label="Company Settings" />
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-3xl font-extrabold text-slate-900">
        {value}
      </div>
      <div className="text-sm text-slate-600 mt-1">
        {label}
      </div>
    </div>
  );
}

function Card({
  title,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  actionHref?: string;
  actionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">
          {title}
        </h2>
        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

function ActionButton({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center transition ${
        primary
          ? "bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] shadow-md"
          : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
      }`}
    >
      {label}
    </Link>
  );
}