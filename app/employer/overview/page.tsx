import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";
import ChartClient from "./ChartClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const recent = metrics.recentApplications ?? [];

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

        <div className="xl:col-span-8 space-y-10">

          <Card title="Daily Job Views">
            <ChartClient data={chartData} />
          </Card>

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

        </div>

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

/* SMALL COMPONENTS */

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-3xl font-extrabold text-slate-900">{value}</div>
      <div className="text-sm text-slate-600 mt-1">{label}</div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
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