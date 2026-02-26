import Link from "next/link";

export const dynamic = "force-dynamic";

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
    <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm overflow-hidden">
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
  actionLabel,
  actionHref,
  children,
}: {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function EmployerOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Track jobs, candidates, and hiring activity in one place.
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

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Active jobs" value="3" hint="Live on the board" tone="purple" />
        <StatCard label="New applicants" value="12" hint="Last 7 days" tone="accent" />
        <StatCard label="In review" value="8" hint="Awaiting decision" />
        <StatCard label="Messages" value="2" hint="Unread" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left */}
        <div className="xl:col-span-8 space-y-6">
          <Panel title="Recent applicants" actionLabel="View all" actionHref="/employer/candidates">
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
                  {[
                    { name: "Jordan M.", role: "Frontend Engineer", stage: "New", applied: "Today", badge: "purple" },
                    { name: "Sam K.", role: "Backend Engineer", stage: "Reviewed", applied: "1d ago", badge: "neutral" },
                    { name: "Taylor R.", role: "DevOps Engineer", stage: "Interview", applied: "2d ago", badge: "accent" },
                    { name: "Avery L.", role: "Product Designer", stage: "New", applied: "3d ago", badge: "purple" },
                  ].map((row) => (
                    <tr key={row.name} className="border-t border-slate-200">
                      <td className="py-3 pr-3 font-semibold text-slate-900">{row.name}</td>
                      <td className="py-3 pr-3">{row.role}</td>
                      <td className="py-3 pr-3">
                        <span
                          className={[
                            "inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold border",
                            row.badge === "purple"
                              ? "bg-[color:var(--brand-purple)/0.10] border-[color:var(--brand-purple)/0.20] text-[var(--brand-purple-dark)]"
                              : row.badge === "accent"
                              ? "bg-[color:var(--brand-accent)/0.10] border-[color:var(--brand-accent)/0.20] text-[var(--brand-accent-dark)]"
                              : "bg-slate-100 border-slate-200 text-slate-700",
                          ].join(" ")}
                        >
                          {row.stage}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-slate-600">{row.applied}</td>
                      <td className="py-3 text-right">
                        <Link
                          href="/employer/candidates"
                          className="inline-flex items-center justify-center h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-xs hover:bg-slate-50 transition"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Candidate pipeline">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "New", value: "12", tone: "purple" },
                { label: "Reviewed", value: "8", tone: "neutral" },
                { label: "Interview", value: "3", tone: "accent" },
                { label: "Offer", value: "1", tone: "accent" },
              ].map((x) => (
                <div
                  key={x.label}
                  className={[
                    "rounded-2xl border p-4",
                    x.tone === "purple"
                      ? "bg-[color:var(--brand-purple)/0.06] border-[color:var(--brand-purple)/0.16]"
                      : x.tone === "accent"
                      ? "bg-[color:var(--brand-accent)/0.06] border-[color:var(--brand-accent)/0.16]"
                      : "bg-[#F4F6FB] border-slate-200",
                  ].join(" ")}
                >
                  <div className="text-xs font-extrabold text-slate-500">{x.label}</div>
                  <div className="mt-1 text-xl font-extrabold text-slate-900">{x.value}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right */}
        <div className="xl:col-span-4 space-y-6">
          <Panel title="Jobs needing attention" actionLabel="Manage jobs" actionHref="/employer/jobs">
            <div className="space-y-3">
              {[
                { title: "Backend Engineer", note: "No applicants in 7 days", tone: "purple" },
                { title: "Product Designer", note: "Expires in 3 days", tone: "accent" },
              ].map((x) => (
                <div
                  key={x.title}
                  className={[
                    "rounded-2xl border bg-white p-4",
                    x.tone === "purple"
                      ? "border-[color:var(--brand-purple)/0.25]"
                      : "border-[color:var(--brand-accent)/0.25]",
                  ].join(" ")}
                >
                  <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{x.note}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Next steps">
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
}   