import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const dynamic = "force-dynamic";

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const { metrics } = await getEmployerDashboard(companyId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Overview
        </h1>
        <p className="mt-2 text-slate-600">
          Monitor performance, applicants, and hiring activity.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm text-slate-500">Total Jobs</div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900">
            {metrics.totalJobs}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm text-slate-500">Active Jobs</div>
          <div className="mt-3 text-3xl font-extrabold text-[var(--brand-purple)]">
            {metrics.activeJobs}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm text-slate-500">Applications</div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900">
            {metrics.totalApplications}
          </div>
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-extrabold text-slate-900">
            Recent Applicants
          </h2>
          <Link
            href="/employer/candidates"
            className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="p-6 space-y-4">
          {metrics.recentApplications.length ? (
            metrics.recentApplications.map((a: any) => (
              <div
                key={a.id}
                className="flex justify-between items-center border border-slate-200 rounded-2xl p-4"
              >
                <div>
                  <div className="font-bold text-slate-900">
                    {a.user?.jobseekerProfile?.fullName ||
                      a.user?.email ||
                      "Applicant"}
                  </div>
                  <div className="text-sm text-slate-600">
                    {a.job?.title}
                  </div>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[color:var(--brand-purple)/0.10] text-[var(--brand-purple-dark)]">
                  {a.status}
                </span>
              </div>
            ))
          ) : (
            <div className="text-slate-600 text-sm">
              No applications yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}