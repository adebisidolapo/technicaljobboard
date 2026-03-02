export const dynamic = "force-dynamic";

export default function ApplicationsPage() {
  const apps = [
    { role: "Frontend Engineer", company: "NovaTech", status: "Reviewing" },
    { role: "DevOps Engineer", company: "Cloudify", status: "Applied" },
    { role: "Backend Engineer", company: "Redtail", status: "Interview" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Applications</h1>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {apps.map((a, i) => (
          <div
            key={i}
            className="px-6 py-5 border-b border-slate-200 last:border-none flex justify-between items-center"
          >
            <div>
              <div className="font-extrabold">{a.role}</div>
              <div className="text-sm text-slate-600">{a.company}</div>
            </div>
            <div className="text-sm font-semibold text-[var(--brand-purple)]">
              {a.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}