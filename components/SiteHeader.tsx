"use client";

import { useEffect, useRef, useState } from "react";
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
      : href.startsWith("/#")
      ? false
      : pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "text-[var(--brand-purple)] bg-[rgba(106,111,242,0.12)]"
          : "text-slate-900 hover:text-[var(--brand-purple)] hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide on scroll down, show on scroll up / stop
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const stopTimer = useRef<number | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (open) return; // don't hide while menu is open

      const y = window.scrollY;
      const delta = y - lastY.current;

      // small threshold to avoid jitter
      if (Math.abs(delta) < 6) return;

      if (delta > 0 && y > 80) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }

      lastY.current = y;

      // when user stops scrolling, show header
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => {
        setHidden(false);
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 w-full",
          "transition-transform duration-200 ease-out",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        {/* Only visible when header is visible (no overlay while hidden) */}
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
          {/* Give the logo room to look premium */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 md:h-28 flex items-center justify-between">
            {/* LOGO (bigger than your original, not smaller) */}
            <Link href="/" className="flex items-center">
              <img
                src="/Technicaljoblogo-removebg-preview.png"
                alt="TechnicalJobboard"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/all-jobs">All Jobs</NavLink>

              {/* Hash link */}
              <Link
                href="/#categories"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 transition hover:text-[var(--brand-purple)] hover:bg-slate-50"
              >
                Categories
              </Link>

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
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--brand-purple)]/30 bg-white text-[var(--brand-purple)] shadow-sm transition hover:bg-[#EEF0FF]"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden">
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/30"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />

            <div className="relative z-50 border-t border-slate-200 bg-white">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-2">
                <NavLink href="/" onClick={() => setOpen(false)}>
                  Home
                </NavLink>

                <NavLink href="/all-jobs" onClick={() => setOpen(false)}>
                  All Jobs
                </NavLink>

                <Link
                  href="/#categories"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-slate-50 hover:text-[var(--brand-purple)] text-slate-900"
                >
                  Categories
                </Link>

                <NavLink href="/jobseeker/login" onClick={() => setOpen(false)}>
                  Jobseeker
                </NavLink>

                <NavLink href="/employer/login" onClick={() => setOpen(false)}>
                  Employer
                </NavLink>

                <Link
                  href="/employer/jobs/new"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center py-3 rounded-2xl bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white font-semibold shadow-sm transition"
                >
                  Post Job
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't go under fixed header */}
      <div className="h-24 md:h-28" />
    </>
  );
}