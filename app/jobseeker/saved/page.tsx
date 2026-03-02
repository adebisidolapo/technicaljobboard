import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SavedJobsPage() {
  const saved = [
    { id: 1, title: "Security Engineer", company: "Vermot" },
    { id: 2, title: "Data Engineer", company: "Architects" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Saved Jobs</h1>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {saved.map((j) => (
          <div
            key={j.id}
            className="px-6 py-5 border-b border-slate-200 last:border-none flex justify-between items-center"
          >
            <div>
              <div className="font-extrabold">{j.title}</div>
              <div className="text-sm text-slate-600">{j.company}</div>
            </div>

            <Link
              href="/all-jobs"
              className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}