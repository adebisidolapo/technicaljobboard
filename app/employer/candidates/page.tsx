import Link from "next/link";
import { getEmployerDashboard } from "@/lib/employer/dashboard";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  const s = String(status || "").toUpperCase();

  const cls =
    s === "APPLIED" || s === "NEW"
      ? "bg-[color:var(--brand-purple)/0.10] border-[color:var(--brand-purple)/0.25] text-[var(--brand-purple-dark)]"
      : s === "SHORTLISTED" || s === "HIRED"
      ? "bg-[color:var(--brand-accent)/0.10] border-[color:var(--brand-accent)/0.25] text-[var(--brand-accent-dark)]"
      : s === "REJECTED"
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-slate-100 border-slate-200 text-slate-700";

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border ${cls}`}>
      {s}
    </span>
  );
}

function FilterButton({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={[
        "px-4 h-9 rounded-xl text-xs font-extrabold transition border",
        active
          ? "bg-[var(--brand-purple)] text-white border-[var(--brand-purple)]"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default async function CandidatesPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const { metrics } = await getEmployerDashboard(companyId);

  const applications = (metrics?.recentApplications ?? []) as any[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Candidates
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage applicants across all your job listings.
          </p>
        </div>

        <Link
          href="/employer/jobs"
          className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
        >
          View jobs
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Search by name or role..."
            className="flex-1 h-10 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          />

          <div className="flex flex-wrap gap-2">
            <FilterButton label="All" active />
            <FilterButton label="Applied" />
            <FilterButton label="Shortlisted" />
            <FilterButton label="Hired" />
            <FilterButton label="Rejected" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <div className="text-sm font-extrabold text-slate-900">
            {applications.length} applicant{applications.length === 1 ? "" : "s"}
          </div>
          <div className="text-xs text-slate-500">
            Click “Review” to manage candidate stage.
          </div>
        </div>

        {applications.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-extrabold text-slate-500 uppercase tracking-wide">
                  <th className="py-3 px-6">Candidate</th>
                  <th className="py-3 px-6">Role</th>
                  <th className="py-3 px-6">Stage</th>
                  <th className="py-3 px-6">Applied</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="text-slate-700">
                {applications.map((a: any) => {
                  const name =
                    a.user?.jobseekerProfile?.fullName ||
                    a.user?.email ||
                    "Applicant";

                  const role = a.job?.title || "—";
                  const stage = a.status || "APPLIED";

                  const appliedAt = a.createdAt
                    ? new Date(a.createdAt).toLocaleDateString()
                    : "—";

                  return (
                    <tr key={a.id} className="border-t border-slate-200 hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-900 whitespace-nowrap">
                        {name}
                      </td>

                      <td className="py-4 px-6 min-w-[220px]">
                        {role}
                      </td>

                      <td className="py-4 px-6">
                        <StatusBadge status={stage} />
                      </td>

                      <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                        {appliedAt}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button className="h-9 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-xs hover:bg-slate-100 transition">
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="text-lg font-extrabold text-slate-900">
              No candidates yet
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Publish a job to start receiving applications.
            </p>

            <Link
              href="/employer/jobs/new"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-white text-sm font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
            >
              Post a job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}