"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const dynamic = "force-dynamic";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({
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
        "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-extrabold transition",
        active
          ? "bg-[color:var(--brand-purple)/0.12] text-slate-900 ring-1 ring-[color:var(--brand-purple)/0.22]"
          : "text-slate-700 hover:bg-slate-50"
      )}
    >
      <span>{label}</span>
      <span
        className={clsx(
          "text-slate-300 font-black",
          active ? "text-[color:var(--brand-purple)/0.70]" : ""
        )}
      >
        ›
      </span>
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-5 pb-2 text-[11px] font-extrabold tracking-[0.18em] uppercase text-slate-500">
      {children}
    </div>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // close menu on route change (pathname change)
  const pathname = usePathname();
  useEffect(() => setMenuOpen(false), [pathname]);

  // ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll when open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const MenuContent = useMemo(() => {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.14] via-white to-[color:var(--brand-accent)/0.06]">
          <div className="text-sm font-extrabold text-slate-900">Employer menu</div>
          <div className="mt-1 text-xs text-slate-600">
            Manage jobs, candidates, and hiring activity.
          </div>
        </div>

        <div className="p-3">
          <SectionLabel>Workspace</SectionLabel>
          <div className="space-y-1">
            <NavItem href="/employer/overview" label="Overview" onClick={() => setMenuOpen(false)} />
            <NavItem href="/employer/jobs" label="Jobs" onClick={() => setMenuOpen(false)} />
            <NavItem href="/employer/candidates" label="Candidates" onClick={() => setMenuOpen(false)} />
          </div>

          <SectionLabel>Communication</SectionLabel>
          <div className="space-y-1">
            <NavItem href="/employer/messages" label="Messages" onClick={() => setMenuOpen(false)} />
          </div>

          <SectionLabel>Insights</SectionLabel>
          <div className="space-y-1">
            <NavItem href="/employer/analytics" label="Analytics" onClick={() => setMenuOpen(false)} />
          </div>

          <SectionLabel>Account</SectionLabel>
          <div className="space-y-1">
            <NavItem href="/employer/settings" label="Settings" onClick={() => setMenuOpen(false)} />
          </div>

          {/* Quick actions */}
          <div className="mt-4 p-3">
            <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4">
              <div className="text-sm font-extrabold text-slate-900">Quick actions</div>
              <p className="mt-1 text-xs text-slate-600">Common tasks for busy hiring teams.</p>

              <div className="mt-3 grid gap-2">
                <Link
                  href="/employer/jobs/new"
                  onClick={() => setMenuOpen(false)}
                  className="h-11 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
                >
                  Post a job
                </Link>

                <Link
                  href="/employer/candidates"
                  onClick={() => setMenuOpen(false)}
                  className="h-11 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                >
                  Review candidates
                </Link>
              </div>
            </div>
          </div>

          {/* footer links */}
          <div className="px-4 pb-5 pt-2 text-xs text-slate-500">
            <Link href="/" className="font-semibold hover:underline">
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: brand */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden h-10 w-10 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition grid place-items-center"
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <div className="h-9 w-9 rounded-2xl bg-[var(--brand-purple)] text-white grid place-items-center font-extrabold shadow-sm">
                  TJ
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-[color:var(--brand-purple)/0.12] blur-xl -z-10" />
              </div>

              <div className="leading-tight min-w-0">
                <div className="text-sm font-extrabold text-slate-900 truncate">
                  Employer Dashboard
                </div>
                <div className="text-xs text-slate-500 truncate">
                  Hiring tools • U.S. focused
                </div>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/employer/jobs/new"
              className="h-10 px-4 hidden sm:inline-flex items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm"
            >
              Post a job
            </Link>

            <Link
              href="/"
              className="h-10 px-4 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Shell */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">{MenuContent}</div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed z-50 inset-y-0 left-0 w-[86%] max-w-[360px] p-4">
            <div className="h-full overflow-auto">{MenuContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}