export const dynamic = "force-dynamic";

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Candidates</h1>
        <p className="mt-1 text-sm text-slate-600">
          Browse all candidates across roles.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">Coming next</div>
        <p className="mt-1 text-sm text-slate-600">
          This page will aggregate candidates across all jobs.
        </p>
      </div>
    </div>
  );
}