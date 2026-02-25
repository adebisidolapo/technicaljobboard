import Link from "next/link";

export const dynamic = "force-dynamic";

export default function EmployerLandingPage() {
  return (
    <main className="min-h-screen bg-[#F4F6FB]">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Employer
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Post jobs, manage postings, and review candidates in your ATS.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/employer/dashboard"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[var(--brand-purple)] text-white font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/employer/jobs"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition"
            >
              Manage Jobs
            </Link>

            <Link
              href="/employer/jobs/new"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#0B1222] text-white font-semibold hover:bg-slate-900 transition"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">What you can do here</h2>
          <ul className="mt-3 text-sm text-slate-600 space-y-2 list-disc pl-5">
            <li>Create and publish jobs</li>
            <li>View applicants per job (candidates pipeline)</li>
            <li>Track recruiter actions (audit logs)</li>
            <li>See metrics on the dashboard</li>
          </ul>
        </div>
      </section>
    </main>
  );
}