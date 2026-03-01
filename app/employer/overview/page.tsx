import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";
import ChartClient from "./ChartClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Card({
  title,
  subtitle,
  actionLabel,
  actionHref,
  tone = "plain",
  children,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  tone?: "plain" | "tinted";
  children: React.ReactNode;
}) {
  return (
    <section
      className={cx(
        "rounded-3xl border border-slate-200 shadow-sm overflow-hidden",
        tone === "tinted" ? "bg-[color:var(--brand-purple)/0.04]" : "bg-white"
      )}
    >
      <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-[15px] font-extrabold text-slate-950 tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>

        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="shrink-0 text-sm font-semibold text-[var(--brand-purple)] hover:underline"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}

function Metric({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "purple" | "accent";
}) {
  const vClass =
    tone === "purple"
      ? "text-[var(--brand-purple-dark)]"
      : tone === "accent"
      ? "text-[var(--brand-accent-dark)]"
      : "text-slate-950";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="text-[10px] font-extrabold tracking-[0.18em] text-slate-500 uppercase">
        {label}
      </div>
      <div className={cx("mt-2 text-2xl font-extrabold tracking-tight", vClass)}>
        {value}
      </div>
    </div>
  );
}

function HealthRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="text-sm font-extrabold text-slate-950">{value}</div>
    </div>
  );
}

function CandidateRow({ name, meta }: { name: string; meta: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="font-extrabold text-slate-950">{name}</div>
      <div className="mt-1 text-xs text-slate-600">{meta}</div>

      <div className="mt-3 flex gap-2">
        <button className="h-9 flex-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-xs font-semibold">
          View
        </button>
        <button className="h-9 flex-1 rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-xs font-semibold">
          Message
        </button>
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
      className={cx(
        "h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center transition",
        primary
          ? "bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] shadow-sm"
          : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
      )}
    >
      {label}
    </Link>
  );
}

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const recent = metrics.recentApplications ?? [];

  // pipeline from recent apps only (NO applicationsByStatus)
  const pipeline = recent.reduce<Record<string, number>>((acc, app: any) => {
    const key = String(app.status || "APPLIED").toUpperCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const stages = ["APPLIED", "REVIEWING", "SHORTLISTED", "HIRED", "REJECTED"];
  const denom = Math.max(recent.length, 1);

  // “Glassdoor-ish” signals (safe UI signals)
  const hiringVelocity = recent.length >= 8 ? "High" : recent.length >= 3 ? "Moderate" : "Low";
  const responsiveness = recent.length >= 5 ? "On track" : "Needs attention";
  const companyHealthScore = Math.min(92, 70 + Math.floor(recent.length * 3));

  // simple analytics placeholders (replace with real later)
  const chartData = [
    { day: "Sat", value: 80 },
    { day: "Sun", value: 120 },
    { day: "Mon", value: 180 },
    { day: "Tue", value: 240 },
    { day: "Wed", value: 210 },
    { day: "Thu", value: 160 },
    { day: "Fri", value: 130 },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header + KPIs */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[color:var(--brand-purple)/0.12] via-white to-[color:var(--brand-accent)/0.10] px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                Overview
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Performance, applicants, and hiring activity at a glance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Link
                href="/employer/jobs"
                className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
              >
                View jobs
              </Link>
              <Link
                href="/employer/candidates"
                className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm"
              >
                Review candidates
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Metric label="Total jobs" value={metrics.totalJobs ?? 0} />
            <Metric label="Active jobs" value={metrics.activeJobs ?? 0} tone="purple" />
            <Metric label="Total applications" value={metrics.totalApplications ?? 0} />
            <Metric label="Recent applicants" value={recent.length} tone="accent" />
          </div>
        </div>
      </section>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left column */}
        <div className="xl:col-span-8 space-y-6">
          <Card title="Job interest (last 7 days)" subtitle="Daily views trend">
            <div className="h-64 sm:h-72">
              <ChartClient data={chartData} />
            </div>
          </Card>

          <Card title="Candidate pipeline" subtitle="Distribution from recent applications">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {stages.map((stage) => {
                const count = pipeline[stage] ?? 0;
                const pct = Math.round((count / denom) * 100);

                return (
                  <div key={stage} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-extrabold text-slate-950 tracking-tight">
                        {stage}
                      </div>
                      <div className="text-sm font-extrabold text-slate-950">
                        {count}
                      </div>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-accent)] transition-all duration-700 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="mt-2 text-xs text-slate-500">{pct}% of recent</div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Recent applicants" actionLabel="View all" actionHref="/employer/candidates">
            <div className="space-y-3">
              {recent.length ? (
                recent.slice(0, 6).map((a: any) => (
                  <div
                    key={a.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-extrabold text-slate-950 truncate">
                          {a.user?.jobseekerProfile?.fullName ||
                            a.user?.email ||
                            "Applicant"}
                        </div>
                        <div className="text-sm text-slate-600 truncate">
                          Applied to:{" "}
                          <span className="font-semibold">{a.job?.title || "—"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[color:var(--brand-purple)/0.10] text-[var(--brand-purple-dark)]">
                          {a.status}
                        </span>
                        <Link
                          href="/employer/candidates"
                          className="h-9 px-3 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-xs font-semibold"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-600">No applications yet.</div>
              )}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="xl:col-span-4 space-y-6 xl:sticky xl:top-24 h-fit">
          <Card title="Company health" subtitle="Signals that help you hire faster" tone="tinted">
            <div className="space-y-3">
              <HealthRow label="Health score" value={`${companyHealthScore}/100`} />
              <HealthRow label="Hiring velocity" value={hiringVelocity} />
              <HealthRow label="Recruiter responsiveness" value={responsiveness} />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-extrabold text-slate-950 tracking-tight">
                Recommended
              </div>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Review new applicants daily to improve response rate and candidate quality.
              </p>
              <Link
                href="/employer/candidates"
                className="mt-3 h-10 w-full inline-flex items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm"
              >
                Review applicants
              </Link>
            </div>
          </Card>

          <Card title="Suggested candidates" subtitle="Shortlist-ready profiles" tone="tinted">
            <div className="space-y-3">
              <CandidateRow name="David M." meta="New York, NY • Backend" />
              <CandidateRow name="Sarah T." meta="Remote • Frontend" />
              <CandidateRow name="Michael B." meta="Chicago, IL • DevOps" />
            </div>
          </Card>

          <Card title="Quick actions" subtitle="Common tasks" tone="tinted">
            <div className="grid gap-2">
              <ActionButton href="/employer/jobs/new" label="Post a job" primary />
              <ActionButton href="/employer/jobs" label="Manage jobs" />
              <ActionButton href="/employer/settings" label="Company settings" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}