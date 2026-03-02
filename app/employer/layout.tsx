"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SidebarItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={clsx(
        "group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-extrabold transition",
        active
          ? "bg-[color:var(--brand-purple)/0.12] text-slate-900 ring-1 ring-[color:var(--brand-purple)/0.18]"
          : "text-slate-800 hover:bg-slate-50"
      )}
    >
      <span className="tracking-tight">{label}</span>

      <span
        className={clsx(
          "text-slate-300 transition",
          active ? "text-[color:var(--brand-purple)/0.70]" : "group-hover:text-slate-400"
        )}
        aria-hidden
      >
        ›
      </span>
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-slate-500 px-2 pt-5 pb-2">
      {children}
    </div>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F6FB] text-slate-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="h-9 w-9 rounded-xl bg-[var(--brand-purple)] text-white flex items-center justify-center font-extrabold shadow-sm">
                TJ
              </div>
              <div className="absolute -inset-2 rounded-2xl bg-[color:var(--brand-purple)/0.12] blur-xl -z-10" />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="text-sm font-extrabold text-slate-900 truncate">
                Employer Dashboard
              </div>
              <div className="text-xs text-slate-500 truncate">
                Hiring, candidates, and performance
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex h-10 px-4 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.12] via-white to-[color:var(--brand-accent)/0.06]">
                <div className="text-sm font-extrabold text-slate-900">Menu</div>
                <div className="mt-1 text-xs text-slate-600">
                  Keep hiring organized and moving.
                </div>
              </div>

              <div className="p-3">
                <SectionLabel>Workspace</SectionLabel>
                <div className="space-y-1">
                  <SidebarItem href="/employer/overview" label="Overview" />
                  <SidebarItem href="/employer/jobs" label="Jobs" />
                  <SidebarItem href="/employer/candidates" label="Candidates" />
                </div>

                <SectionLabel>Communication</SectionLabel>
                <div className="space-y-1">
                  <SidebarItem href="/employer/messages" label="Messages" />
                </div>

                <SectionLabel>Insights</SectionLabel>
                <div className="space-y-1">
                  <SidebarItem href="/employer/analytics" label="Analytics" />
                </div>

                <SectionLabel>Account</SectionLabel>
                <div className="space-y-1">
                  <SidebarItem href="/employer/settings" label="Settings" />
                </div>

                {/* Quick actions */}
                <div className="mt-5 p-3">
                  <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4">
                    <div className="text-sm font-extrabold text-slate-900">Quick actions</div>
                    <p className="mt-1 text-xs text-slate-600">
                      Fast shortcuts to daily tasks.
                    </p>

                    <div className="mt-3 grid gap-2">
                      <Link
                        href="/employer/jobs"
                        className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        Manage jobs
                      </Link>
                      <Link
                        href="/employer/candidates"
                        className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                      >
                        Review candidates
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9">
            <div className="min-w-0">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}