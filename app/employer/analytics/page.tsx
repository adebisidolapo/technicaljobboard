import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const dynamic = "force-dynamic";

function MetricCard({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  hint: string;
  tone?: "purple" | "accent" | "neutral";
}) {
  const top =
    tone === "purple"
      ? "bg-[var(--brand-purple)]"
      : tone === "accent"
      ? "bg-[var(--brand-accent)]"
      : "bg-slate-200";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className={`h-1 ${top}`} />
      <div className="p-5">
        <div className="text-xs font-extrabold tracking-wide text-slate-500 uppercase">
          {label}
        </div>
        <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
        <div className="mt-1 text-xs text-slate-600">{hint}</div>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  actionLabel,
  actionHref,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold text-slate-900">{title}</div>
          {subtitle ? <div className="mt-1 text-xs text-slate-600">{subtitle}</div> : null}
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

export default async function EmployerAnalyticsPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";
  const { metrics } = await getEmployerDashboard(companyId);

  const totalJobs = metrics?.totalJobs ?? 0;
  const activeJobs = metrics?.activeJobs ?? 0;
  const totalApplications = metrics?.totalApplications ?? 0;

  // Best-effort breakdown from what you already have:
  const recent = (metrics?.recentApplications ?? []) as any[];
  const appliedLast7 = recent.length; // placeholder until you add real date-window metrics

  // Lightweight “trend” without charts (no build errors, still looks pro)
  const trend = [
    { day: "Mon", count: 3 },
    { day: "Tue", count: 5 },
    { day: "Wed", count: 2 },
    { day: "Thu", count: 6 },
    { day: "Fri", count: 4 },
    { day: "Sat", count: 1 },
    { day: "Sun", count: 2 },
  ];

  const max = Math.max(...trend.map((x) => x.count), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Analytics
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitor job performance and candidate flow.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/employer/jobs"
            className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
          >
            Jobs
          </Link>
          <Link
            href="/employer/candidates"
            className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
          >
            Candidates
          </Link>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Total jobs" value={totalJobs} hint="All listings" />
        <MetricCard label="Active jobs" value={activeJobs} hint="Live on the board" tone="purple" />
        <MetricCard label="Applications" value={totalApplications} hint="All-time total" tone="accent" />
        <MetricCard label="New (recent)" value={appliedLast7} hint="Recent submissions" />
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <Panel
            title="Applicant trend (demo)"
            subtitle="A simple weekly trend until you add real view/apply tracking"
          >
            <div className="grid grid-cols-7 gap-2 items-end">
              {trend.map((x) => (
                <div key={x.day} className="text-center">
                  <div
                    className="mx-auto w-full max-w-[40px] rounded-xl bg-[color:var(--brand-purple)/0.18] border border-[color:var(--brand-purple)/0.22]"
                    style={{ height: `${Math.round((x.count / max) * 120) + 12}px` }}
                    title={`${x.count}`}
                  />
                  <div className="mt-2 text-[11px] font-extrabold text-slate-500 uppercase">
                    {x.day}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Next: track impressions, clicks, and applies per job (Zip-style).
            </div>
          </Panel>

          <Panel
            title="Quality tips"
            subtitle="Glassdoor-style suggestions to improve applicant quality"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Add salary ranges", note: "Improves conversion in the U.S." },
                { title: "Tighten requirements", note: "Less noise, more qualified applies." },
                { title: "Clear remote policy", note: "Reduce drop-offs and confusion." },
                { title: "Fast follow-up", note: "Respond in 48 hours to win talent." },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{x.note}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="xl:col-span-4 space-y-6">
          <Panel title="Quick actions" subtitle="Move faster">
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
                href="/employer/candidates"
                className="h-11 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Review candidates
              </Link>
            </div>
          </Panel>

          <Panel title="Notes" subtitle="What we add next (backend-ready)">
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-[#F4F6FB] p-4">
                <div className="font-extrabold text-slate-900">Per-job analytics</div>
                <div className="mt-1 text-xs text-slate-600">
                  Views → clicks → applies (Zip-like funnel).
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#F4F6FB] p-4">
                <div className="font-extrabold text-slate-900">Stage conversion</div>
                <div className="mt-1 text-xs text-slate-600">
                  Applied → reviewing → shortlisted → hired.
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}