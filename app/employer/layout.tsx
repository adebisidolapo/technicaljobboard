import Link from "next/link";

export const dynamic = "force-dynamic";

function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
    >
      <span>{label}</span>
      <span className="text-slate-300">›</span>
    </Link>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      {/* App Top Bar (Zip-style: simple, functional, one primary CTA) */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[var(--brand-purple)] text-white flex items-center justify-center font-extrabold">
              TJ
            </div>

            <div className="leading-tight">
              <div className="text-sm font-extrabold text-slate-900">Employer</div>
              <div className="text-xs text-slate-500">Hiring dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              Back to site
            </Link>

            {/* THE ONLY PRIMARY CTA IN THE EMPLOYER APP */}
            <Link
              href="/employer/jobs/new"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm"
            >
              Post a job
            </Link>
          </div>
        </div>
      </div>

      {/* Shell */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-extrabold text-slate-500 px-3 pb-2">
                MENU
              </div>

              <div className="space-y-1">
                <NavItem href="/employer/overview" label="Overview" />
                <NavItem href="/employer/jobs" label="Jobs" />
                <NavItem href="/employer/candidates" label="Candidates" />
                <NavItem href="/employer/messages" label="Messages" />
                <NavItem href="/employer/analytics" label="Analytics" />
                <NavItem href="/employer/settings" label="Settings" />
              </div>

              {/* Quick actions: NO Post Job button here */}
              <div className="mt-4 rounded-2xl bg-[#F4F6FB] border border-slate-200 p-4">
                <div className="text-sm font-extrabold text-slate-900">Quick actions</div>
                <p className="mt-1 text-xs text-slate-600">
                  Review candidates, track pipeline, and manage roles.
                </p>

                <div className="mt-3 grid gap-2">
                  <Link
                    href="/employer/jobs"
                    className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    View jobs
                  </Link>

                  <Link
                    href="/employer/candidates"
                    className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    View candidates
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}