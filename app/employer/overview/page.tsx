import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const recent = metrics.recentApplications ?? [];

  return (
    <div className="space-y-8">

      {/* ===== KPI STRIP ===== */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Metric label="Job Views (7d)" value="1,226" />
          <Metric label="Matched Candidates" value="83" />
          <Metric label="New Candidates" value="70" />
          <Metric label="Clicks to Apply" value="14" />
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* LEFT COLUMN */}
        <div className="xl:col-span-8 space-y-8">

          {/* Overview Stats */}
          <Card title="Overview">
            <div className="grid grid-cols-3 gap-6">
              <MiniStat label="Open Jobs" value={metrics.activeJobs} />
              <MiniStat label="Candidates Reviewed" value={42} />
              <MiniStat label="Candidates Rated" value={4} />
            </div>
          </Card>

          {/* Recent Applicants */}
          <Card title="Recent Applicants" actionHref="/employer/candidates" actionLabel="View all">
            <div className="space-y-4">
              {recent.length ? (
                recent.slice(0,5).map((a: any) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
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

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-4 space-y-8">

          {/* Suggested Candidates (UI Demo Version) */}
          <Card title="Suggested Candidates">
            <div className="space-y-5">
              <CandidateCard name="David M." location="New York, NY" />
              <CandidateCard name="Sarah T." location="Los Angeles, CA" />
              <CandidateCard name="Michael B." location="Chicago, IL" />
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Metric({ label, value }: { label: string; value: string }) {
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

function MiniStat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl bg-[#F4F6FB] p-5 border border-slate-200">
      <div className="text-2xl font-extrabold text-slate-900">
        {value}
      </div>
      <div className="text-sm text-slate-500 mt-1">
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