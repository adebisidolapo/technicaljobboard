export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
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
        <div className="text-xs font-extrabold text-slate-500 uppercase">
          {label}
        </div>
        <div className="mt-2 text-3xl font-extrabold text-slate-900">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function JobseekerOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Overview</h1>
        <p className="text-sm text-slate-600 mt-1">
          Track your job search and progress.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Applications" value={12} tone="purple" />
        <StatCard label="Interviews" value={3} tone="accent" />
        <StatCard label="Saved jobs" value={5} />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="font-extrabold text-slate-900">
          Tips to improve your chances
        </div>
        <ul className="mt-3 text-sm text-slate-600 space-y-2">
          <li>• Keep your resume updated.</li>
          <li>• Apply within 48 hours of posting.</li>
          <li>• Customize applications for each role.</li>
        </ul>
      </div>
    </div>
  );
}