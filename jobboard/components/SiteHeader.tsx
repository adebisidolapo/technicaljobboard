"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/Technicaljoblogo-removebg-preview.png"
            alt="TechnicalJobboard"
            className="h-20 sm:h-24 md:h-28 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-900">
          <Link href="/" className="hover:text-[var(--brand-purple)] transition">
            Home
          </Link>

          <Link href="/all-jobs" className="hover:text-[var(--brand-purple)] transition">
            All Jobs
          </Link>

          <Link href="/#categories" className="hover:text-[var(--brand-purple)] transition">
            Categories
          </Link>

          <Link href="#" className="hover:text-[var(--brand-purple)] transition">
            Jobseeker
          </Link>

          <Link href="#" className="hover:text-[var(--brand-purple)] transition">
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
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-[var(--brand-purple)]/30 bg-white px-3 py-2 text-[var(--brand-purple)] shadow-sm hover:bg-[#EEF0FF] transition"
        >
          ☰
        </button>
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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-3">
              <Link href="/" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-gray-50">
                Home
              </Link>

              <Link href="/all-jobs" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-gray-50">
                All Jobs
              </Link>

              <Link href="/#categories" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-gray-50">
                Categories
              </Link>

              <Link href="#" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-gray-50">
                Jobseeker
              </Link>

              <Link href="#" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-gray-50">
                Employer
              </Link>

              <Link
                href="#"
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
  );
}
