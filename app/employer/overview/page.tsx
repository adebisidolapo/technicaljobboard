import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";
import ChartClient from "./ChartClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const recent = metrics.recentApplications ?? [];

  // Pipeline computed from recent applications (safe, no extra backend fields)
  const pipeline = recent.reduce<Record<string, number>>((acc, app: any) => {
    const key = String(app.status || "APPLIED").toUpperCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const orderedStages = ["APPLIED", "REVIEWING", "SHORTLISTED", "HIRED", "REJECTED"];
  const totalRecent = Math.max(recent.length, 1);

  // “Glassdoor-ish” insights (UI signals; later you can replace with real metrics)
  const hiringVelocity = recent.length >= 8 ? "High" : recent.length >= 3 ? "Moderate" : "Low";
  const responsiveness = recent.length >= 5 ? "On track" : "Needs attention";
  const companyHealthScore = Math.min(92, 70 + Math.floor(recent.length * 3)); // safe UI score

  // Chart data placeholder (client component)
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
    <div className="space-y-8">
      {/* ===== Top KPI strip (Zip feel) ===== */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[color:var(--brand-purple)/0.12] via-white to-[color:var(--brand-accent)/0.10] px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Overview
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Performance, applicants, and hiring activity at a glance.
              </p>
            </div>

            <div className="flex gap-2">
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

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Metric label="Total jobs" value={metrics.totalJobs ?? 0} />
            <Metric label="Active jobs" value={metrics.activeJobs ?? 0} tone="purple" />
            <Metric label="Total applications" value={metrics.totalApplications ?? 0} />
            <Metric label="Recent applicants" value={recent.length} tone="accent" />
          </div>
        </div>
      </section>

      {/* ===== Main grid (Zip structure + Glassdoor insights) ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-8 space-y-6">
          {/* Chart */}
          <Card title="Job interest (last 7 days)" subtitle="Daily views trend">
            <ChartClient data={chartData} />
          </Card>

          {/* Pipeline */}
          <Card title="Candidate pipeline" subtitle="Distribution from recent applications">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {orderedStages.map((stage) => {
                const count = pipeline[stage] ?? 0;
                const pct = Math.round((count / totalRecent) * 100);

                return (
                  <div key={stage} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-extrabold text-slate-900">{stage}</div>
                      <div className="text-sm font-extrabold text-slate-900">{count}</div>
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

          {/* Recent applicants */}
          <Card title="Recent applicants" actionHref="/employer/candidates" actionLabel="View all">
            <div className="space-y-3">
              {recent.length ? (
                recent.slice(0, 6).map((a: any) => (
                  <div
                    key={a.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition"
                  >
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900 truncate">
                        {a.user?.jobseekerProfile?.fullName || a.user?.email || "Applicant"}
                      </div>
                      <div className="text-sm text-slate-600 truncate">
                        Applied to: <span className="font-semibold">{a.job?.title || "—"}</span>
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
                ))
              ) : (
                <div className="text-sm text-slate-600">No applications yet.</div>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT (Sticky insights panel) */}
        <div className="xl:col-span-4 space-y-6 xl:sticky xl:top-24 h-fit">
          {/* Glassdoor-ish “Company health” */}
          <Card
            title="Company health"
            subtitle="Signals that help you hire faster"
            tone="tinted"
          >
            <div className="space-y-4">
              <HealthRow label="Health score" value={`${companyHealthScore}/100`} />
              <HealthRow label="Hiring velocity" value={hiringVelocity} />
              <HealthRow label="Recruiter responsiveness" value={responsiveness} />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-extrabold text-slate-900">Recommended</div>
              <p className="mt-1 text-xs text-slate-600">
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

          {/* Suggested candidates (kept minimal, no icons) */}
          <Card title="Suggested candidates" subtitle="Shortlist-ready profiles" tone="tinted">
            <div className="space-y-4">
              <CandidateRow name="David M." meta="New York, NY • Backend" />
              <CandidateRow name="Sarah T." meta="Remote • Frontend" />
              <CandidateRow name="Michael B." meta="Chicago, IL • DevOps" />
            </div>
          </Card>

          {/* Quick actions */}
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

/* ========= UI Bits (no icons) ========= */

function Metric({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: any;
  tone?: "neutral" | "purple" | "accent";
}) {
  const valueClass =
    tone === "purple"
      ? "text-[var(--brand-purple-dark)]"
      : tone === "accent"
      ? "text-[var(--brand-accent-dark)]"
      : "text-slate-900";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="text-xs font-extrabold text-slate-500">{label}</div>
      <div className={`mt-2 text-2xl font-extrabold tracking-tight ${valueClass}`}>
        {value}
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  actionHref,
  actionLabel,
  tone = "plain",
  children,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
  tone?: "plain" | "tinted";
  children: React.ReactNode;
}) {
  return (
    <section
      className={[
        "rounded-3xl border border-slate-200 shadow-sm overflow-hidden",
        tone === "tinted" ? "bg-[color:var(--brand-purple)/0.04]" : "bg-white",
      ].join(" ")}
    >
      <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
          ) : null}
        </div>

        {actionHref && actionLabel ? (
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

function HealthRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="text-sm font-extrabold text-slate-900">{value}</div>
    </div>
  );
}

function CandidateRow({ name, meta }: { name: string; meta: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="font-extrabold text-slate-900">{name}</div>
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
      className={[
        "h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center transition",
        primary
          ? "bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] shadow-sm"
          : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}