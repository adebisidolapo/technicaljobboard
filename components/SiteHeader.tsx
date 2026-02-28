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

  // Basic active logic
  const active =
    href === "/"
      ? pathname === "/"
      : href.startsWith("/#")
      ? false
      : pathname?.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "text-[var(--brand-purple)] bg-[rgba(106,111,242,0.12)]"
          : "text-gray-900 hover:text-[var(--brand-purple)] hover:bg-gray-50",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Hide while scrolling, show when scrolling stops
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef<number | null>(null);

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

  // Scroll behavior: hide while scrolling, show shortly after stopping
  useEffect(() => {
    const onScroll = () => {
      // If mobile menu is open, don't hide the header
      if (open) return;

      setIsScrolling(true);

      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 160);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full",
        // Only render the overlay when header is visible
        isScrolling && !open ? "pointer-events-none" : "pointer-events-auto",
        "transition-transform duration-200 ease-out",
        isScrolling && !open ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      {/* Visible header surface */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur">
        {/* Taller header so big logo looks right */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-28 md:h-32 flex items-center justify-between">
          {/* LOGO — bigger than original, safe Tailwind sizes */}
          <Link href="/" className="flex items-center">
            <img
              src="/Technicaljoblogo-removebg-preview.png"
              alt="TechnicalJobboard"
              className="h-24 sm:h-28 md:h-32 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-900">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/all-jobs">All Jobs</NavLink>

            {/* hash links can't be reliably "active" without extra logic */}
            <Link
              href="/#categories"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 transition hover:text-[var(--brand-purple)] hover:bg-gray-50"
            >
              Categories
            </Link>

            <NavLink href="/jobseeker/login">Jobseeker</NavLink>
            <NavLink href="/employer">Employer</NavLink>

            <Link
              href="/employer/jobs/new"
              className="ml-2 px-4 py-2 rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
            >
              Post Job
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-[var(--brand-purple)]/30 bg-white px-3 py-2 text-[var(--brand-purple)] shadow-sm hover:bg-[#EEF0FF] transition"
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

          <div className="relative z-50 border-t border-gray-200 bg-white">
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
                className="rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-gray-50 hover:text-[var(--brand-purple)]"
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

      {/* Spacer so content doesn't jump under fixed header */}
      <div className="h-28 md:h-32" />
    </header>
  );
}