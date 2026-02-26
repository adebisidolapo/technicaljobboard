export const dynamic = "force-dynamic";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Messages</h1>
        <p className="mt-1 text-sm text-slate-600">
          Candidate communication in one place.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">Coming next</div>
        <p className="mt-1 text-sm text-slate-600">
          Add inbox threads per candidate and job.
        </p>
      </div>
    </div>
  );
}