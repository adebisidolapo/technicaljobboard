"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const mobileMenuId = useId();

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  const navLink =
    "hover:text-[var(--brand-purple)] transition text-gray-900";
  const mobileLink =
    "py-3 px-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Go to home">
          <Image
            src="/Technicaljoblogo-removebg-preview.png"
            alt="TechnicalJobboard"
            width={220}
            height={80}
            className="h-14 sm:h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/all-jobs" className={navLink}>
            All Jobs
          </Link>

          <Link href="/#categories" className={navLink}>
            Categories
          </Link>

          <Link href="#" className={navLink}>
            Jobseeker
          </Link>

          <Link href="#" className={navLink}>
            Employer
          </Link>

          <Link
            href="#"
            className="px-4 py-2 rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
          >
            Post Job
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={mobileMenuId}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-[var(--brand-purple)]/25 bg-white px-3 py-2 text-[var(--brand-purple)] shadow-sm hover:bg-[#EEF0FF] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40 transition"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden">
          {/* Overlay */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30"
            aria-label="Close menu overlay"
            onClick={close}
          />

          {/* Panel */}
          <div
            id={mobileMenuId}
            className="relative z-50 border-t border-gray-200 bg-white"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-2">
              <Link href="/all-jobs" onClick={close} className={mobileLink}>
                All Jobs
              </Link>

              <Link href="/#categories" onClick={close} className={mobileLink}>
                Categories
              </Link>

              <Link href="#" onClick={close} className={mobileLink}>
                Jobseeker
              </Link>

              <Link href="#" onClick={close} className={mobileLink}>
                Employer
              </Link>

              <Link
                href="#"
                onClick={close}
                className="mt-2 inline-flex items-center justify-center py-3 rounded-2xl bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white font-semibold shadow-sm transition"
              >
                Post Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
