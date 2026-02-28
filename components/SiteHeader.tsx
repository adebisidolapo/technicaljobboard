"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname?.startsWith(href.replace("/#", "/")) || pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "text-[var(--brand-purple)] bg-[rgba(106,111,242,0.10)]"
          : "text-slate-800 hover:text-[var(--brand-purple)] hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:h-20 lg:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/Technicaljoblogo-removebg-preview.png"
            alt="TechnicalJobboard"
            className="h-11 w-auto object-contain sm:h-12 lg:h-14"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/all-jobs">All Jobs</NavLink>
          <NavLink href="/#categories">Categories</NavLink>
          <NavLink href="/jobseeker/login">Jobseeker</NavLink>
          <NavLink href="/employer">Employer</NavLink>

          <Link
            href="/employer/jobs/new"
            className="ml-2 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-purple-dark)]"
          >
            Post Job
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden">
          {/* overlay */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/35"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          {/* panel */}
          <div className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm border-l border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/Technicaljoblogo-removebg-preview.png"
                  alt="TechnicalJobboard"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="flex flex-col gap-1">
                <NavLink href="/" onClick={() => setOpen(false)}>
                  Home
                </NavLink>
                <NavLink href="/all-jobs" onClick={() => setOpen(false)}>
                  All Jobs
                </NavLink>
                <NavLink href="/#categories" onClick={() => setOpen(false)}>
                  Categories
                </NavLink>
                <NavLink href="/jobseeker/login" onClick={() => setOpen(false)}>
                  Jobseeker
                </NavLink>
                <NavLink href="/employer/login" onClick={() => setOpen(false)}>
                  Employer
                </NavLink>

                <Link
                  href="/employer/jobs/new"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--brand-purple)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-purple-dark)]"
                >
                  Post Job
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Tip: Post a job to start receiving applicants.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}