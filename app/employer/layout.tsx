"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-extrabold tracking-wide text-slate-500 px-2 pt-4 pb-2">
      {children}
    </div>
  );
}

function SidebarItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "block w-full px-4 py-3 rounded-2xl text-sm font-extrabold transition",
        "min-w-0 truncate",
        active
          ? "bg-[color:var(--brand-purple)/0.10] text-slate-900 ring-1 ring-[color:var(--brand-purple)/0.18]"
          : "text-slate-700 hover:bg-slate-50"
      )}
    >
      {label}
    </Link>
  );
}

function EmployerSidebar({ close }: { close?: () => void }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Sidebar header */}
      <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.12] via-white to-[color:var(--brand-accent)/0.06]">
        <div className="text-sm font-extrabold text-slate-900">Menu</div>
        <div className="mt-1 text-xs text-slate-600">
          Manage jobs, candidates, resumes, and hiring activity.
        </div>
      </div>

      <div className="p-3">
        <SectionLabel>Workspace</SectionLabel>
        <div className="space-y-1">
          <SidebarItem href="/employer/overview" label="Overview" onClick={close} />
          <SidebarItem href="/employer/jobs" label="Jobs" onClick={close} />
          <SidebarItem href="/employer/candidates" label="Candidates" onClick={close} />
          <SidebarItem href="/employer/resumes" label="Resume database" onClick={close} />
        </div>

        <SectionLabel>Communication</SectionLabel>
        <div className="space-y-1">
          <SidebarItem href="/employer/messages" label="Messages" onClick={close} />
        </div>

        <SectionLabel>Insights</SectionLabel>
        <div className="space-y-1">
          <SidebarItem href="/employer/analytics" label="Analytics" onClick={close} />
        </div>

        <SectionLabel>Account</SectionLabel>
        <div className="space-y-1">
          <SidebarItem href="/employer/settings" label="Settings" onClick={close} />
        </div>

        {/* Quick actions */}
        <div className="mt-4 p-3">
          <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4">
            <div className="text-sm font-extrabold text-slate-900">Quick actions</div>
            <p className="mt-1 text-xs text-slate-600">Jump to your most common tasks.</p>

            <div className="mt-3 grid gap-2">
              <Link
                href="/employer/candidates"
                onClick={close}
                className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-extrabold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Review candidates
              </Link>

              <Link
                href="/employer/jobs"
                onClick={close}
                className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-extrabold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Manage jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // lock scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-[#F4F6FB] overflow-x-hidden">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition grid place-items-center font-extrabold text-slate-900"
              aria-label="Open menu"
            >
              Menu
            </button>

            <div className="leading-tight min-w-0">
              <div className="text-sm font-extrabold text-slate-900 truncate">Employer</div>
              <div className="text-xs text-slate-500 truncate">Hiring dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Home/back to site (VISIBLE on mobile too) */}
            <Link
              href="/"
              className="h-10 px-3 sm:px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-extrabold text-slate-900"
            >
              Home
            </Link>

            <Link
              href="/employer/jobs/new"
              className="h-10 px-3 sm:px-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-extrabold shadow-sm"
            >
              Post a job
            </Link>
          </div>
        </div>
      </div>

      {/* Shell */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <EmployerSidebar />
          </aside>

          {/* Main */}
          <main className="lg:col-span-9 min-w-0">{children}</main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/35"
            aria-label="Close menu"
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-[360px] bg-[#F4F6FB] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-900">Menu</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-white font-extrabold text-slate-900"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <EmployerSidebar close={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}