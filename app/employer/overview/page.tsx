import Link from "next/link";
import ChartClient, { type Point } from "@/components/employer/ChartClient";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const dynamic = "force-dynamic";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold text-slate-900">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-xs text-slate-600">{subtitle}</div>
          ) : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "purple" | "accent" | "neutral";
}) {
  const ring =
    tone === "purple"
      ? "ring-[color:var(--brand-purple)/0.20]"
      : tone === "accent"
      ? "ring-[color:var(--brand-accent)/0.20]"
      : "ring-slate-200";

  const top =
    tone === "purple"
      ? "bg-[color:var(--brand-purple)/0.10]"
      : tone === "accent"
      ? "bg-[color:var(--brand-accent)/0.10]"
      : "bg-slate-100";

  const valueColor =
    tone === "purple"
      ? "text-[var(--brand-purple)]"
      : tone === "accent"
      ? "text-[var(--brand-accent-dark)]"
      : "text-slate-900";

  return (
    <div className={cx("rounded-3xl bg-white ring-1", ring, "p-5")}>
      <div className={cx("h-1.5 w-12 rounded-full", top)} />
      <div className="mt-3 text-xs font-extrabold tracking-wide text-slate-500 uppercase">
        {label}
      </div>
      <div className={cx("mt-2 text-3xl font-extrabold tracking-tight", valueColor)}>
        {value}
      </div>
    </div>
  );
}

function StagePill({ stage }: { stage: string }) {
  const s = String(stage || "").toUpperCase();

  const cls =
    s === "APPLIED" || s === "NEW"
      ? "bg-[color:var(--brand-purple)/0.10] border-[color:var(--brand-purple)/0.22] text-[var(--brand-purple-dark)]"
      : s === "SHORTLISTED" || s === "HIRED"
      ? "bg-[color:var(--brand-accent)/0.10] border-[color:var(--brand-accent)/0.22] text-[var(--brand-accent-dark)]"
      : "bg-slate-100 border-slate-200 text-slate-700";

  return (
    <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border", cls)}>
      {s}
    </span>
  );
}

export default async function EmployerOverviewPage() {
  // Later: derive from logged-in employer session
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const { metrics } = await getEmployerDashboard(companyId);

  const recent = metrics?.recentApplications ?? [];

  // Build pipeline counts from recent applications (no dependency on applicationsByStatus)
  const pipelineKeys = ["APPLIED", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"] as const;
  const byStatus: Record<string, number> = {};
  pipelineKeys.forEach((k) => (byStatus[k] = 0));
  for (const a of recent) {
    const s = String(a?.status || "APPLIED").toUpperCase();
    byStatus[s] = (byStatus[s] ?? 0) + 1;
  }

  // ✅ FIX: Chart points MUST have `views` (not value)
  const chartData: Point[] = [
    { day: "Sat", views: 60 },
    { day: "Sun", views: 95 },
    { day: "Mon", views: 150 },
    { day: "Tue", views: 240 },
    { day: "Wed", views: 210 },
    { day: "Thu", views: 165 },
    { day: "Fri", views: 130 },
  ];

  // “Glassdoor-ish” company health widgets (static placeholders for now)
  const healthScore = 73;
  const hiringVelocity = "Low";
  const recruiterResponsiveness = "Needs attention";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Performance, applicants, and hiring activity at a glance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/employer/jobs"
            className="h-10 px-4 inline-flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition"
          >
            View jobs
          </Link>
          <Link
            href="/employer/candidates"
            className="h-10 px-4 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
          >
            Review candidates
          </Link>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat label="Total jobs" value={metrics?.totalJobs ?? 0} />
        <Stat label="Active jobs" value={metrics?.activeJobs ?? 0} tone="purple" />
        <Stat label="Total applications" value={metrics?.totalApplications ?? 0} tone="accent" />
        <Stat label="Recent applicants" value={recent.length} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left column */}
        <div className="xl:col-span-8 space-y-6">
          <Card title="Job interest (last 7 days)" subtitle="Daily views trend">
            <div className="h-64 sm:h-72">
              <ChartClient data={chartData} />
            </div>
          </Card>

          <Card title="Candidate pipeline" subtitle="Distribution from recent applications">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pipelineKeys.map((k) => {
                const v = byStatus[k] ?? 0;
                const total = Math.max(1, recent.length);
                const pct = Math.round((v / total) * 100);

                const barTone =
                  k === "SHORTLISTED" || k === "HIRED"
                    ? "bg-[var(--brand-accent)]"
                    : "bg-[var(--brand-purple)]";

                return (
                  <div key={k} className="rounded-3xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-extrabold text-slate-900">{k}</div>
                      <div className="text-xs font-extrabold text-slate-900">{v}</div>
                    </div>

                    <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={cx("h-full rounded-full", barTone)} style={{ width: `${pct}%` }} />
                    </div>

                    <div className="mt-2 text-xs text-slate-600">{pct}% of recent</div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title="Recent applicants"
            right={
              <Link
                href="/employer/candidates"
                className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
              >
                View all
              </Link>
            }
          >
            <div className="space-y-3">
              {recent.length ? (
                recent.slice(0, 6).map((a: any) => {
                  const name =
                    a.user?.jobseekerProfile?.fullName ||
                    a.user?.email ||
                    "Applicant";

                  const role = a.job?.title || "—";
                  const stage = a.status || "APPLIED";

                  return (
                    <div
                      key={a.id}
                      className="rounded-3xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-slate-900 truncate">
                          {name}
                        </div>
                        <div className="mt-1 text-xs text-slate-600 truncate">
                          Applied to: <span className="font-semibold text-slate-800">{role}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-between sm:justify-end">
                        <StagePill stage={stage} />
                        <Link
                          href="/employer/candidates"
                          className="h-9 px-3 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 font-semibold text-xs hover:bg-slate-50 transition"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-slate-600">No applications yet.</div>
              )}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="xl:col-span-4 space-y-6">
          <Card title="Company health" subtitle="Signals that help you hire faster">
            <div className="space-y-3">
              <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4 flex items-center justify-between">
                <div className="text-xs font-extrabold text-slate-600">Health score</div>
                <div className="text-sm font-extrabold text-slate-900">{healthScore}/100</div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4 flex items-center justify-between">
                <div className="text-xs font-extrabold text-slate-600">Hiring velocity</div>
                <div className="text-sm font-extrabold text-slate-900">{hiringVelocity}</div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4 flex items-center justify-between">
                <div className="text-xs font-extrabold text-slate-600">Recruiter responsiveness</div>
                <div className="text-sm font-extrabold text-slate-900">{recruiterResponsiveness}</div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <div className="text-sm font-extrabold text-slate-900">Recommended</div>
                <p className="mt-1 text-xs text-slate-600">
                  Review new applicants daily to improve response rate and candidate quality.
                </p>
                <Link
                  href="/employer/candidates"
                  className="mt-3 h-10 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-[var(--brand-purple-dark)] transition shadow-sm w-full"
                >
                  Review applicants
                </Link>
              </div>
            </div>
          </Card>

          <Card title="Quick actions" subtitle="Common tasks">
            <div className="grid gap-2">
              <Link
                href="/employer/jobs/new"
                className="h-11 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
              >
                Post a job
              </Link>

              <Link
                href="/employer/jobs"
                className="h-11 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Manage jobs
              </Link>

              <Link
                href="/employer/settings"
                className="h-11 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Company settings
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}