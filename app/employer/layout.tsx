"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SidebarItem({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition",
        "min-w-0", // prevent overflow
        active
          ? "bg-[color:var(--brand-purple)/0.10] text-slate-900 ring-1 ring-[color:var(--brand-purple)/0.18]"
          : "text-slate-700 hover:bg-slate-50"
      )}
    >
      <span
        className={clsx(
          "h-9 w-9 rounded-xl grid place-items-center border transition shrink-0",
          active
            ? "bg-white border-[color:var(--brand-purple)/0.25] text-[var(--brand-purple)]"
            : "bg-white border-slate-200 text-slate-500 group-hover:text-slate-700"
        )}
      >
        {icon}
      </span>

      <span className="flex-1 truncate">{label}</span>

      <span
        className={clsx(
          "text-slate-300 transition shrink-0",
          active ? "text-[color:var(--brand-purple)/0.60]" : "group-hover:text-slate-400"
        )}
      >
        ›
      </span>
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-extrabold tracking-wide text-slate-500 px-2 pt-4 pb-2">
      {children}
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmployerSidebar({ close }: { close?: () => void }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Sidebar header */}
      <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.12] via-white to-[color:var(--brand-accent)/0.06]">
        <div className="text-sm font-extrabold text-slate-900">Menu</div>
        <div className="mt-1 text-xs text-slate-600">Manage jobs, candidates, and hiring activity.</div>
      </div>

      <div className="p-3">
        <SectionLabel>Workspace</SectionLabel>
        <div className="space-y-1">
          <SidebarItem
            href="/employer/overview"
            label="Overview"
            icon={<Icon d="M3 12l2-2 4 4 8-8 4 4v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z" />}
            onClick={close}
          />
          <SidebarItem
            href="/employer/jobs"
            label="Jobs"
            icon={<Icon d="M7 7h10v3H7V7zm-2 4h14v10H5V11z" />}
            onClick={close}
          />
          <SidebarItem
            href="/employer/candidates"
            label="Candidates"
            icon={<Icon d="M16 21v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 9v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />}
            onClick={close}
          />
        </div>

        <SectionLabel>Communication</SectionLabel>
        <div className="space-y-1">
          <SidebarItem
            href="/employer/messages"
            label="Messages"
            icon={<Icon d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />}
            onClick={close}
          />
        </div>

        <SectionLabel>Insights</SectionLabel>
        <div className="space-y-1">
          <SidebarItem
            href="/employer/analytics"
            label="Analytics"
            icon={<Icon d="M3 3v18h18M7 15v3M12 11v7M17 7v11" />}
            onClick={close}
          />
        </div>

        <SectionLabel>Account</SectionLabel>
        <div className="space-y-1">
          <SidebarItem
            href="/employer/settings"
            label="Settings"
            icon={
              <Icon d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zM19.4 15a7.7 7.7 0 0 0 .1-1 7.7 7.7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7.4 7.4 0 0 0-1.7-1l-.3-2.5H9l-.3 2.5a7.4 7.4 0 0 0-1.7 1l-2.3-1-2 3.5L4.6 13a7.7 7.7 0 0 0-.1 1 7.7 7.7 0 0 0 .1 1l-2 1.5 2 3.5 2.3-1a7.4 7.4 0 0 0 1.7 1l.3 2.5h6l.3-2.5a7.4 7.4 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5z" />
            }
            onClick={close}
          />
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
                className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
              >
                Review candidates
              </Link>
              <Link
                href="/employer/jobs"
                onClick={close}
                className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
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

  // lock body scroll when drawer open
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
              className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition grid place-items-center"
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="leading-tight min-w-0">
              <div className="text-sm font-extrabold text-slate-900 truncate">Employer</div>
              <div className="text-xs text-slate-500 truncate">Hiring dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              className="h-10 px-4 hidden sm:inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
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
          {/* overlay */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/35"
            aria-label="Close menu"
          />
          {/* panel */}
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-[360px] bg-[#F4F6FB] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-900">Menu</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white grid place-items-center"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <EmployerSidebar close={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}