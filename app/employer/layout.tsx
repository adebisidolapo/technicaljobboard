import Link from "next/link";

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
      className="group flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-[#EEF0FF] hover:text-[var(--brand-purple)] transition"
    >
      <span className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 group-hover:bg-[var(--brand-purple)] transition" />
        {label}
      </span>
      <span className="text-sm text-slate-400 group-hover:text-[var(--brand-purple)] transition">
        ›
      </span>
    </Link>
  );
}

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = [
    { href: "/employer/dashboard", label: "Dashboard" },
    { href: "/employer/jobs", label: "Jobs" },
    { href: "/employer/candidates", label: "Candidates" },
    { href: "/employer/resumes", label: "Resume Database" },
    { href: "/employer/metrics", label: "Metrics" },
    { href: "/employer/messages", label: "Messages" },
    { href: "/employer/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F4F6FB] text-[#02000D]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 border-r border-slate-200 bg-white">
          <div className="h-24 px-8 flex items-center border-b border-slate-200">
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                Employer ATS
              </div>
              <div className="text-sm font-medium text-slate-500">
                TechnicalJobboard
              </div>
            </div>
          </div>

          <nav className="px-6 py-6 space-y-2">
            {nav.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="mt-auto p-6 border-t border-slate-200">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
              <div className="text-base font-extrabold text-slate-900">
                Quick actions
              </div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                Post roles, review candidates, and manage your hiring pipeline.
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  href="#"
                  className="h-12 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white text-base font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-md"
                >
                  + Post a Job
                </a>

                <Link
                  href="/employer/jobs"
                  className="h-12 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-base font-semibold text-slate-800"
                >
                  View Jobs
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 lg:pl-80">
          {/* Top bar */}
          <header className="sticky top-0 z-40 h-24 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="max-w-[1500px] mx-auto px-8 h-24 flex items-center justify-between">
              <div>
                <div className="text-lg font-extrabold text-slate-900">
                  Hiring Dashboard
                </div>
                <div className="text-sm text-slate-500">
                  Track jobs, candidates, and hiring performance
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/employer/help"
                  className="h-11 px-5 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-base font-semibold text-slate-800"
                >
                  Help
                </Link>

                <Link
                  href="/employer/resumes"
                  className="hidden sm:inline-flex h-11 px-5 items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-base font-semibold text-slate-800"
                >
                  Resume Database
                </Link>

                <a
                  href="#"
                  className="h-11 px-6 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-base font-semibold shadow-md"
                >
                  + Post Job
                </a>
              </div>
            </div>
          </header>

          <main className="max-w-[1500px] mx-auto px-8 py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
