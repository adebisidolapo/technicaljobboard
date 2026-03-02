"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pt-5 pb-2 text-[10px] font-extrabold tracking-[0.22em] text-slate-500 uppercase">
      {children}
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cx(
        "relative block rounded-2xl px-4 py-3 transition",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.22]",
        active
          ? "bg-[color:var(--brand-purple)/0.10] ring-1 ring-[color:var(--brand-purple)/0.20]"
          : "hover:bg-slate-50"
      )}
    >
      {/* active accent */}
      <span
        className={cx(
          "absolute left-0 top-2 bottom-2 w-1 rounded-r-full",
          active ? "bg-[var(--brand-purple)]" : "bg-transparent"
        )}
      />
      <div className="flex items-center justify-between gap-3">
        <span
          className={cx(
            "text-[13px] font-extrabold tracking-tight",
            active ? "text-slate-950" : "text-slate-800"
          )}
        >
          {label}
        </span>
        <span
          className={cx(
            "text-slate-300 font-extrabold",
            active ? "text-[color:var(--brand-purple)/0.75]" : ""
          )}
        >
          ›
        </span>
      </div>
    </Link>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F6FB] text-[#0F172A]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/75 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-[13px] font-extrabold text-slate-950 tracking-tight">
              Employer
            </div>
            <div className="text-[11px] text-slate-500">
              Hiring dashboard
            </div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* Sidebar header */}
                <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.14] via-white to-[color:var(--brand-accent)/0.06]">
                  <div className="text-sm font-extrabold text-slate-950 tracking-tight">
                    Menu
                  </div>
                  <div className="mt-1 text-xs text-slate-600 leading-relaxed">
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

                  {/* Quick actions */}
                  <div className="mt-5 p-2">
                    <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4">
                      <div className="text-sm font-extrabold text-slate-950 tracking-tight">
                        Quick actions
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
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

              <div className="mt-4 text-[11px] text-slate-500 px-2">
                Tip: faster response time increases candidate quality.
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9 min-w-0">{children}</main>
        </div>
      </div>

  
    </div>
  );
}