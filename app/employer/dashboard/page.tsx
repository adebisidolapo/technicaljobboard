import { getBaseUrl } from "@/lib/baseUrl";

export const dynamic = "force-dynamic";

async function getDashboard(companyId: string) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/employer/dashboard?companyId=${companyId}`;

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Dashboard API not JSON (${res.status})\n${text.slice(0, 400)}`);
  }

  if (!res.ok) throw new Error(data?.message || `Failed to load dashboard (${res.status})`);
  return data;
}

export default async function EmployerDashboardPage() {
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const { metrics } = await getDashboard(companyId);

  const byStatus = metrics.applicationsByStatus || {};
  const statuses = ["APPLIED", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"];

  return (
    <main className="min-h-screen bg-gray-100 text-[#02000D] font-sans">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Employer Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Jobs, applicants, and pipeline performance.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-sm text-slate-600">Total Jobs</div>
            <div className="text-3xl font-extrabold mt-2">{metrics.totalJobs}</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-sm text-slate-600">Active Jobs</div>
            <div className="text-3xl font-extrabold mt-2">{metrics.activeJobs}</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-sm text-slate-600">Total Applications</div>
            <div className="text-3xl font-extrabold mt-2">{metrics.totalApplications}</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="text-lg font-extrabold text-slate-900">
            Application Pipeline
          </h2>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {statuses.map((s) => (
              <div
                key={s}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="text-xs font-semibold text-slate-600">{s}</div>
                <div className="text-2xl font-extrabold mt-2">
                  {byStatus[s] ?? 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
