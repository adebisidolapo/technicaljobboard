import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const recent = metrics.recentApplications ?? [];
  const topJobs = metrics.topJobsByApplications ?? [];
  const byStatus = metrics.applicationsByStatus ?? {};

  return (
    <div className="space-y-8">

      {/* ================= KPI STRIP ================= */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Metric label="Total Jobs" value={metrics.totalJobs ?? 0} />
          <Metric label="Active Jobs" value={metrics.activeJobs ?? 0} />
          <Metric label="Total Applications" value={metrics.totalApplications ?? 0} />
          <Metric label="Recent Applicants" value={recent.length} />
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* ================= LEFT COLUMN ================= */}
        <div className="xl:col-span-8 space-y-8">

          {/* ===== Pipeline ===== */}
          <Card title="Active Candidates">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["APPLIED","REVIEWING","SHORTLISTED","REJECTED","HIRED"].map((s) => (
                <PipelineBox
                  key={s}
                  label={s}
                  value={byStatus[s] ?? 0}
                />
              ))}
            </div>
          </Card>

          {/* ===== Top Jobs ===== */}
          <Card title="Top Jobs" actionHref="/employer/jobs" actionLabel="View all">
            <div className="space-y-4">
              {topJobs.length ? (
                topJobs.slice(0,5).map((j: any) => (
                  <div
                    key={j.id}
                    className="flex justify-between items-center border border-slate-200 rounded-2xl p-4"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {j.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        Status: {j.status}
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">
                      {j.applications} applicants
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">
                  No jobs yet.
                </div>
              )}
            </div>
          </Card>

          {/* ===== Recent Applicants ===== */}
          <Card title="Recent Applicants" actionHref="/employer/candidates" actionLabel="View all">
            <div className="space-y-4">
              {recent.length ? (
                recent.slice(0,5).map((a: any) => (
                  <div
                    key={a.id}
                    className="flex justify-between items-center border border-slate-200 rounded-2xl p-4"
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

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[color:var(--brand-purple)/0.10] text-[var(--brand-purple-dark)]">
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

        {/* ================= RIGHT COLUMN ================= */}
        <div className="xl:col-span-4 space-y-8">

          {/* ===== Suggested Candidates ===== */}
          <Card title="Suggested Candidates">
            <div className="space-y-5">
              <CandidateCard name="David M." location="New York, NY" />
              <CandidateCard name="Sarah T." location="Los Angeles, CA" />
              <CandidateCard name="Michael B." location="Chicago, IL" />
            </div>
          </Card>

          {/* ===== Quick Actions ===== */}
          <Card title="Quick Actions">
            <div className="space-y-3">
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

/* ================= COMPONENTS ================= */

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-3xl font-extrabold text-slate-900">
        {value}
      </div>
      <div className="text-sm text-slate-500 mt-1">
        {label}
      </div>
    </div>
  );
}

function PipelineBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-[#F4F6FB] p-5 border border-slate-200">
      <div className="text-xl font-extrabold text-slate-900">
        {value}
      </div>
      <div className="text-xs text-slate-500 mt-1">
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
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
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

function CandidateCard({ name, location }: { name: string; location: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-sm text-slate-500">{location}</div>
      </div>

      <button className="h-9 px-4 rounded-xl bg-[var(--brand-purple)] text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition">
        Message
      </button>
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
      className={`h-10 rounded-xl text-sm font-semibold inline-flex items-center justify-center transition ${
        primary
          ? "bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)]"
          : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
      }`}
    >
      {label}
    </Link>
  );
}