"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const NAV_SECTIONS = [
  {
    label: "Main Menu",
    items: [
      { href: "/jobseeker/overview", label: "Dashboard", icon: "▦" },
      { href: "/jobseeker/applications", label: "My Applications", icon: "📋" },
      { href: "/jobseeker/saved", label: "Saved Jobs", icon: "♡" },
      { href: "/jobseeker/settings", label: "Profile & Resume", icon: "👤" },
    ],
  },
  {
    label: "Explore",
    items: [
      { href: "/all-jobs", label: "Find Jobs", icon: "🔍" },
      { href: "/#categories", label: "Categories", icon: "▤" },
    ],
  },
  {
    label: "Resources",
    items: [
      { href: "/support", label: "Help Center", icon: "?" },
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
  icon: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active =
    href === "/jobseeker/overview"
      ? pathname === "/jobseeker/overview" || pathname === "/jobseeker"
      : pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
        active
          ? "bg-[var(--brand-purple)] text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <span
        className={clsx(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm",
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
    <div className="flex h-full flex-col bg-white">

      {/* Logo / brand top */}
      <div className="border-b border-slate-100 px-5 py-4">
        <Link href="/" onClick={close} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-purple)]">
            <span className="text-sm font-extrabold text-white">T</span>
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-900 leading-none">
              TechJobBoard
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">Job Seeker Portal</p>
          </div>
        </Link>
      </div>

      {/* User row */}
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-600">
            J
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              My Account
            </p>
            <p className="truncate text-xs text-slate-400">Job Seeker</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
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

      {/* Pro upgrade card */}
      <div className="border-t border-slate-100 p-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white">
          <p className="text-sm font-extrabold">Pro Job Seeker</p>
          <p className="mt-1 text-xs text-emerald-100 leading-5">
            Get resume reviews, career tips, and priority application status.
          </p>
          <button
            type="button"
            className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-lg bg-white text-xs font-extrabold text-emerald-600 transition hover:bg-emerald-50"
          >
            Upgrade — Free trial
          </button>
        </div>

        <Link
          href="/"
          onClick={close}
          className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="text-base">←</span>
          Back to site
        </Link>
      </div>
    </div>
  );
}

export default function JobseekerLayout({
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

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex min-h-screen w-full flex-col lg:pl-64">

        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Jobseeker Dashboard
              </p>
              <p className="hidden text-xs text-slate-400 sm:block">
                Track your applications and job search
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/all-jobs"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-xs font-extrabold text-slate-700 transition hover:bg-slate-50"
            >
              Browse Jobs
            </Link>
            <Link
              href="/jobseeker/settings"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--brand-purple)] px-4 text-xs font-extrabold text-white shadow-sm transition hover:opacity-90"
            >
              My Profile
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
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
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              aria-label="Close"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}