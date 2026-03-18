"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const NAV = [
  {
    section: "Main Menu",
    items: [
      {
        href: "/employer/overview",
        label: "Dashboard",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
      {
        href: "/employer/jobs/new",
        label: "Post a Job",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        ),
      },
      {
        href: "/employer/jobs",
        label: "Manage Jobs",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h4" />
          </svg>
        ),
      },
      {
        href: "/employer/candidates",
        label: "Candidates",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
    ],
  },
  {
    section: "Insights",
    items: [
      {
        href: "/employer/analytics",
        label: "Analytics",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        ),
      },
      {
        href: "/employer/resumes",
        label: "Resume Database",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
        ),
      },
      {
        href: "/employer/messages",
        label: "Messages",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        href: "/employer/settings",
        label: "Settings",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        ),
      },
      {
        href: "/employer/billing",
        label: "Billing",
        icon: (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <path d="M1 10h22" />
          </svg>
        ),
      },
    ],
  },
];

function SidebarLink({
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
  const active =
    href === "/employer/overview"
      ? pathname === "/employer/overview" || pathname === "/employer"
      : href === "/employer/jobs"
      ? pathname === "/employer/jobs"
      : pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150",
        active
          ? "bg-[var(--brand-purple)] text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <span
        className={clsx(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
        )}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

function Sidebar({ close }: { close?: () => void }) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">

      {/* Brand header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-purple)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-slate-900 leading-none">
            TechJobBoard
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-slate-400">
            Employer Portal
          </p>
        </div>
      </div>

      {/* User row */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-extrabold text-[var(--brand-purple)]">
          E
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            Employer Account
          </p>
          <p className="truncate text-[11px] text-slate-400">Hiring Manager</p>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((group) => (
          <div key={group.section} className="mb-6">
            <p className="mb-1.5 px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  onClick={close}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade card + back to site */}
      <div className="border-t border-slate-100 p-4 space-y-2">
        <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-purple)] to-indigo-700 p-4 text-white">
          <p className="text-sm font-extrabold">Go Featured</p>
          <p className="mt-1 text-[11px] leading-5 text-indigo-200">
            Feature your jobs and reach 10x more qualified candidates.
          </p>
          <Link
            href="/employer/jobs/new"
            onClick={close}
            className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-lg bg-white text-xs font-extrabold text-[var(--brand-purple)] transition hover:bg-indigo-50"
          >
            Upgrade listing
          </Link>
        </div>

        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to site
        </Link>
      </div>
    </div>
  );
}

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="flex min-h-screen bg-[#F3F6FB]">

      {/* ── Fixed desktop sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <Sidebar />
      </aside>

      {/* ── Content area pushed right by sidebar width ── */}
      <div className="flex min-h-screen w-full flex-col lg:pl-64">

        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-3">

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Employer Dashboard
              </p>
              <p className="hidden text-[11px] text-slate-400 sm:block">
                Manage your jobs and candidates
              </p>
            </div>
          </div>

          <Link
            href="/employer/jobs/new"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--brand-purple)] px-4 text-xs font-extrabold text-white shadow-sm transition hover:opacity-90"
          >
            + Post a Job
          </Link>
        </header>

        {/* Page */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close menu"
          />
          <div className="absolute left-0 top-0 h-full w-72 shadow-2xl">
            <Sidebar close={() => setOpen(false)} />
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute left-[268px] top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-slate-600 hover:bg-slate-50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}