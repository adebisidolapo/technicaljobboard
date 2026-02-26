import Link from "next/link";

export const dynamic = "force-dynamic";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      {/* Employer Top Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold text-slate-900">Employer Dashboard</div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              ← Back to Home
            </Link>

            <Link
              href="/employer/jobs/new"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm"
            >
              + Post Job
            </Link>
          </div>
        </div>
      </div>

      {/* Employer Shell */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <nav className="space-y-2 text-sm">
                <Link
                  href="/employer/dashboard"
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800"
                >
                  Dashboard
                </Link>
                <Link
                  href="/employer/jobs"
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800"
                >
                  Jobs
                </Link>
                <Link
                  href="/employer/jobs/new"
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800"
                >
                  Post a Job
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="md:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}