"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function clsx(...c: any[]) {
  return c.filter(Boolean).join(" ");
}

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={clsx(
        "block px-4 py-3 rounded-xl text-sm font-semibold transition",
        active
          ? "bg-[color:var(--brand-purple)/0.10] text-slate-900"
          : "text-slate-600 hover:bg-slate-100"
      )}
    >
      {label}
    </Link>
  );
}

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="w-64 h-full bg-white border-r border-slate-200 p-4">
      <div className="text-lg font-extrabold text-slate-900 mb-6">
        Employer
      </div>

      <div className="space-y-2">
        <NavItem href="/employer/overview" label="Overview" />
        <NavItem href="/employer/jobs" label="Jobs" />
        <NavItem href="/employer/candidates" label="Candidates" />
        <NavItem href="/employer/messages" label="Messages" />
        <NavItem href="/employer/analytics" label="Analytics" />
        <NavItem href="/employer/settings" label="Settings" />
        <NavItem href="/employer/resumes" label="Resume Database" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      {/* Top Bar */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center px-4 justify-between">
        <button
          className="lg:hidden text-slate-700 font-bold"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <div className="font-extrabold text-slate-900">
          Employer Dashboard
        </div>

        <Link
          href="/employer/jobs/new"
          className="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white text-sm font-semibold"
        >
          Post Job
        </Link>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">{sidebar}</div>

        {/* Mobile Drawer */}
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
            />

            <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-lg">
              {sidebar}
            </div>
          </>
        )}

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}