"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={clsx(
        "block rounded-2xl px-4 py-3 text-sm font-semibold transition",
        active
          ? "bg-[color:var(--brand-purple)/0.10] text-slate-900 ring-1 ring-[color:var(--brand-purple)/0.18]"
          : "text-slate-700 hover:bg-slate-50"
      )}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span
          className={clsx(
            "text-slate-300",
            active ? "text-[color:var(--brand-purple)/0.65]" : ""
          )}
        >
          ›
        </span>
      </div>
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pt-5 pb-2 text-[11px] font-extrabold tracking-wide text-slate-500">
      {children}
    </div>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6FB] via-white to-[#EEF1FF]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-slate-900">Employer</div>
            <div className="text-xs text-slate-500">Hiring dashboard</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              Back to site
            </Link>
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
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.12] via-white to-[color:var(--brand-accent)/0.06]">
                <div className="text-sm font-extrabold text-slate-900">Menu</div>
                <div className="mt-1 text-xs text-slate-600">
                  Manage jobs, candidates, and hiring activity.
                </div>
              </div>

              <div className="p-3">
                <SectionLabel>Workspace</SectionLabel>
                <div className="space-y-1">
                  <NavItem href="/employer/overview" label="Overview" />
                  <NavItem href="/employer/jobs" label="Jobs" />
                  <NavItem href="/employer/candidates" label="Candidates" />
                </div>

                <SectionLabel>Communication</SectionLabel>
                <div className="space-y-1">
                  <NavItem href="/employer/messages" label="Messages" />
                </div>

                <SectionLabel>Insights</SectionLabel>
                <div className="space-y-1">
                  <NavItem href="/employer/analytics" label="Analytics" />
                </div>

                <SectionLabel>Account</SectionLabel>
                <div className="space-y-1">
                  <NavItem href="/employer/settings" label="Settings" />
                </div>

                <div className="mt-4 p-3">
                  <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4">
                    <div className="text-sm font-extrabold text-slate-900">Quick actions</div>
                    <p className="mt-1 text-xs text-slate-600">
                      Keep hiring moving with fast tasks.
                    </p>

                    <div className="mt-3 grid gap-2">
                      <Link
                        href="/employer/candidates"
                        className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        Review candidates
                      </Link>
                      <Link
                        href="/employer/jobs"
                        className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        Manage jobs
                      </Link>
                    </div>
                  </div>
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