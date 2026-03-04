"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Item({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

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

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.10] via-white to-[#F4F6FB]">
        <div className="text-sm font-extrabold text-slate-900">Jobseeker</div>
        <div className="mt-1 text-xs text-slate-600">
          Applications, saved jobs, and resume.
        </div>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export default function JobseekerLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const menu = (
    <CardShell>
      <div className="space-y-1">
        <Item href="/jobseeker/overview" label="Overview" onClick={() => setOpen(false)} />
        <Item href="/jobseeker/applications" label="Applications" onClick={() => setOpen(false)} />
        <Item href="/jobseeker/saved" label="Saved jobs" onClick={() => setOpen(false)} />
        <Item href="/jobseeker/settings" label="Settings & Resume" onClick={() => setOpen(false)} />
      </div>

      <div className="mt-4 p-3">
        <div className="rounded-3xl border border-slate-200 bg-[#F4F6FB] p-4">
          <div className="text-sm font-extrabold text-slate-900">Quick</div>
          <div className="mt-2 grid gap-2">
            <Link
              href="/all-jobs"
              onClick={() => setOpen(false)}
              className="h-10 rounded-xl bg-white border border-slate-200 text-slate-900 font-extrabold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
            >
              Browse jobs
            </Link>
          </div>
        </div>
      </div>
    </CardShell>
  );

  return (
    <div className="min-h-screen bg-[#F4F6FB] overflow-x-hidden">
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden h-10 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition font-extrabold text-slate-900"
              aria-label="Open menu"
            >
              Menu
            </button>

            <div className="leading-tight min-w-0">
              <div className="text-sm font-extrabold text-slate-900 truncate">Jobseeker</div>
              <div className="text-xs text-slate-500 truncate">Your dashboard</div>
            </div>
          </div>

          <Link
            href="/"
            className="h-10 px-3 sm:px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-extrabold text-slate-900"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-3">{menu}</aside>
          <main className="lg:col-span-9 min-w-0">{children}</main>
        </div>
      </div>

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
            {menu}
          </div>
        </div>
      )}
    </div>
  );
}