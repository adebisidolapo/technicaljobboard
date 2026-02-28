import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getOrigin() {
  const h = await headers();

  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");

  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return { ok: false, error: `Non-JSON response: ${text.slice(0, 250)}` };
  }
}

async function getDashboard(companyId: string) {
  const origin = await getOrigin();

  const res = await fetch(
    `${origin}/api/employer/dashboard?companyId=${encodeURIComponent(companyId)}`,
    { cache: "no-store" }
  );

  const data = await safeJson(res);
  if (!res.ok || data?.ok === false) {
    throw new Error(
      data?.message || data?.error || `Dashboard failed (${res.status})`
    );
  }

  return data as { metrics: any };
}

async function getAudit(companyId: string) {
  const origin = await getOrigin();

  const res = await fetch(
    `${origin}/api/employer/audit?companyId=${encodeURIComponent(
      companyId
    )}&take=20`,
    { cache: "no-store" }
  );

  const data = await safeJson(res);
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.message || data?.error || `Audit failed (${res.status})`);
  }

  return data as { logs: any[] };
}

function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "purple" | "accent" | "neutral";
}) {
  const top =
    tone === "purple"
      ? "before:bg-[var(--brand-purple)]"
      : tone === "accent"
      ? "before:bg-[var(--brand-accent)]"
      : "before:bg-slate-200";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-0 top-0 h-1 ${top}`} />
      <div className="text-xs font-extrabold text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-600">{hint}</div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  actionLabel,
  actionHref,
  children,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
        <div>
          <div className="text-sm font-extrabold text-slate-900">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-xs text-slate-600">{subtitle}</div>
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
    </div>
  );
}

function badgeClass(kind: "purple" | "accent" | "neutral") {
  if (kind === "purple")
    return "bg-[color:var(--brand-purple)/0.10] border-[color:var(--brand-purple)/0.20] text-[var(--brand-purple-dark)]";
  if (kind === "accent")
    return "bg-[color:var(--brand-accent)/0.10] border-[color:var(--brand-accent)/0.20] text-[var(--brand-accent-dark)]";
  return "bg-slate-100 border-slate-200 text-slate-700";
}

function statusTone(status: string): "purple" | "accent" | "neutral" {
  const s = String(status || "").toUpperCase();
  if (s === "APPLIED" || s === "NEW") return "purple";
  if (s === "SHORTLISTED" || s === "HIRED") return "accent";
  return "neutral";
}

export default async function EmployerOverviewPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  try {
    const [{ metrics }, audit] = await Promise.all([
      getDashboard(companyId),
      getAudit(companyId),
    ]);

    const byStatus = metrics.applicationsByStatus || {};
    const statuses = ["APPLIED", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"];
    const recentApps = metrics.recentApplications ?? [];
    const topJobs = metrics.topJobsByApplications ?? [];
    const logs = audit?.logs ?? [];

    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Overview
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Track jobs, applicants, and hiring activity in one place.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/employer/jobs"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition"
            >
              View jobs
            </Link>
            <Link
              href="/employer/candidates"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition"
            >
              View candidates
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total jobs" value={String(metrics.totalJobs ?? 0)} hint="All listings" />
          <StatCard label="Active jobs" value={String(metrics.activeJobs ?? 0)} hint="Live on the board" tone="purple" />
          <StatCard label="Total applications" value={String(metrics.totalApplications ?? 0)} hint="All-time" tone="accent" />
          <StatCard label="Recent applicants" value={String(recentApps.length)} hint="Most recent submissions" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 space-y-6">
            <Panel
              title="Recent applicants"
              subtitle="Latest applications across your jobs"
              actionLabel="View all"
              actionHref="/employer/candidates"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-extrabold text-slate-500">
                      <th className="py-2 pr-3">Candidate</th>
                      <th className="py-2 pr-3">Role</th>
                      <th className="py-2 pr-3">Stage</th>
                      <th className="py-2 pr-3">Applied</th>
                      <th className="py-2 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-slate-700">
                    {recentApps.length ? (
                      recentApps.slice(0, 6).map((a: any) => {
                        const name =
                          a.user?.jobseekerProfile?.fullName ||
                          a.user?.email ||
                          "Applicant";
                        const role = a.job?.title || "—";
                        const stage = a.status || "APPLIED";
                        const tone = statusTone(stage);
                        const appliedAt = a.createdAt
                          ? new Date(a.createdAt).toLocaleDateString()
                          : "—";

                        return (
                          <tr key={a.id} className="border-t border-slate-200">
                            <td className="py-3 pr-3 font-semibold text-slate-900">
                              {name}
                            </td>
                            <td className="py-3 pr-3">{role}</td>
                            <td className="py-3 pr-3">
                              <span
                                className={[
                                  "inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold border",
                                  badgeClass(tone),
                                ].join(" ")}
                              >
                                {stage}
                              </span>
                            </td>
                            <td className="py-3 pr-3 text-slate-600">
                              {appliedAt}
                            </td>
                            <td className="py-3 text-right">
                              <Link
                                href="/employer/candidates"
                                className="inline-flex items-center justify-center h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-xs hover:bg-slate-50 transition"
                              >
                                Review
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="border-t border-slate-200">
                        <td className="py-4 text-sm text-slate-600" colSpan={5}>
                          No applications yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="Candidate pipeline" subtitle="Counts by stage across your job listings">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {statuses.map((s) => {
                  const tone = statusTone(s);
                  return (
                    <div
                      key={s}
                      className={[
                        "rounded-2xl border p-4",
                        tone === "purple"
                          ? "bg-[color:var(--brand-purple)/0.06] border-[color:var(--brand-purple)/0.16]"
                          : tone === "accent"
                          ? "bg-[color:var(--brand-accent)/0.06] border-[color:var(--brand-accent)/0.16]"
                          : "bg-[#F4F6FB] border-slate-200",
                      ].join(" ")}
                    >
                      <div className="text-xs font-extrabold text-slate-500">{s}</div>
                      <div className="mt-1 text-xl font-extrabold text-slate-900">
                        {String(byStatus[s] ?? 0)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel title="Recruiter activity" subtitle="Audit trail of actions (status changes, notes, downloads)">
              <div className="space-y-3">
                {logs.length ? (
                  logs.map((log: any) => (
                    <div key={log.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-slate-900">{log.action}</div>
                          <div className="mt-1 text-xs text-slate-600">
                            By <span className="font-semibold">{log.actorUser?.email ?? "Unknown"}</span>
                          </div>
                        </div>

                        <div className="shrink-0 text-xs text-slate-500">
                          {log.createdAt ? new Date(log.createdAt).toLocaleString() : ""}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-600">No activity yet.</div>
                )}
              </div>
            </Panel>
          </div>

          <div className="xl:col-span-4 space-y-6">
            <Panel
              title="Top jobs by applications"
              subtitle="Listings getting the most applicant traffic"
              actionLabel="Manage jobs"
              actionHref="/employer/jobs"
            >
              <div className="space-y-3">
                {topJobs.length ? (
                  topJobs.slice(0, 5).map((j: any) => (
                    <div key={j.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="text-sm font-extrabold text-slate-900">{j.title}</div>
                      <div className="mt-2 text-xs font-semibold text-slate-900">
                        {j.applications} applicant{j.applications === 1 ? "" : "s"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-600">No jobs yet.</div>
                )}
              </div>
            </Panel>

            <Panel title="Next steps" subtitle="Fast actions to keep hiring moving">
              <div className="grid gap-2">
                <Link
                  href="/employer/candidates"
                  className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                >
                  Review candidates
                </Link>
                <Link
                  href="/employer/jobs"
                  className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                >
                  Check job performance
                </Link>
                <Link
                  href="/employer/settings"
                  className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                >
                  Company settings
                </Link>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  } catch (e: any) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
        <div className="text-lg font-extrabold">Employer overview failed to load</div>
        <div className="mt-2 text-sm text-rose-800">
          Open Vercel logs — message below tells you what failed.
        </div>
        <pre className="mt-4 overflow-auto rounded-xl bg-white/60 p-4 text-xs text-rose-900">
{String(e?.message ?? e)}
        </pre>
      </div>
    );
  }
}