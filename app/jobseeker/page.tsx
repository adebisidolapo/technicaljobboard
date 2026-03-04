import Link from "next/link";

export const dynamic = "force-dynamic";

export default function JobseekerHome() {
  return (
    <div className="min-h-[60vh] bg-[#F4F6FB] px-4">
      <div className="max-w-5xl mx-auto py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Jobseeker
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage your applications, saved jobs, and resume.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/jobseeker/overview"
              className="h-11 px-5 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
            >
              Go to dashboard
            </Link>

            <Link
              href="/all-jobs"
              className="h-11 px-5 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 font-semibold hover:bg-slate-50 transition"
            >
              Browse jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}