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
        "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold transition border",
        active
          ? "bg-[color:var(--brand-purple)/0.12] border-[color:var(--brand-purple)/0.25] text-slate-900"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
      )}
    >
      {label}
      <span className="text-slate-300">›</span>
    </Link>
  );
}

export default function JobseekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3F6FB] text-slate-900">
      {/* Top */}
      <div className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <div className="text-sm font-extrabold">Jobseeker Dashboard</div>
            <div className="text-xs text-slate-500">
              Applications, saved jobs, profile
            </div>
          </div>

          <Link
            href="/all-jobs"
            className="h-10 px-4 rounded-xl bg-[var(--brand-purple)] text-white text-sm font-semibold inline-flex items-center justify-center hover:bg-[var(--brand-purple-dark)] transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <NavItem href="/jobseeker/overview" label="Overview" />
          <NavItem href="/jobseeker/applications" label="Applications" />
          <NavItem href="/jobseeker/saved" label="Saved Jobs" />
          <NavItem href="/jobseeker/settings" label="Settings" />
        </aside>

        {/* Content */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}