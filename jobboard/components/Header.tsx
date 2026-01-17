"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close menu on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent body scroll when menu is open (mobile)
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo (far left) */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/Technicaljoblogo.png"
            alt="TechnicalJobboard"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu (far right) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-900">
          <Link href="#jobs" className="hover:text-[#3017D3] transition">
            All Jobs
          </Link>
          <Link href="#" className="hover:text-[#3017D3] transition">
            Jobseeker
          </Link>
          <Link href="#" className="hover:text-[#3017D3] transition">
            Employer
          </Link>
          <Link
            href="#"
            className="px-4 py-2 rounded-xl bg-[#3017D3] text-white hover:opacity-95 transition shadow-sm"
          >
            Post Job
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown + Overlay */}
      {open && (
        <div className="md:hidden">
          {/* Overlay */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown */}
          <div
            id="mobile-menu"
            className="relative z-50 border-t border-gray-200 bg-white"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-3">
              <Link
                href="#jobs"
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium"
              >
                All Jobs
              </Link>

              <Link
                href="#"
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium"
              >
                Jobseeker
              </Link>

              <Link
                href="#"
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium"
              >
                Employer
              </Link>

              <Link
                href="#"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center py-3 rounded-2xl bg-[#3017D3] text-white font-semibold shadow-sm"
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
