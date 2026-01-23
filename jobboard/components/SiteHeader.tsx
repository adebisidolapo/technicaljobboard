"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
        <Link href="/" className="flex items-center">
          <img
            src="/Technicaljoblogo-removebg-preview.png"
            alt="TechnicalJobboard"
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-900">
          <Link href="#jobs" className="hover:text-[#5F6BF2] transition">
            All Jobs
          </Link>
          <Link href="#" className="hover:text-[#5F6BF2] transition">
            Jobseeker
          </Link>
          <Link href="#" className="hover:text-[#5F6BF2] transition">
            Employer
          </Link>

          <Link
            href="#"
            className="px-4 py-2 rounded-xl bg-[#5F6BF2] text-white hover:bg-[#4B55D8] transition shadow-sm"
          >
            Post Job
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
    <button
  type="button"
  onClick={() => setOpen((v) => !v)}
  aria-expanded={open}
  aria-controls="mobile-menu"
  aria-label="Open menu"
  className="
    md:hidden inline-flex items-center justify-center
    rounded-xl
    border border-[#5F6BF2]/30
    bg-white
    px-3 py-2
    text-[#5F6BF2]
    shadow-sm
    hover:bg-[#EEF0FF]
    focus:outline-none
    focus:ring-2 focus:ring-[#5F6BF2]/40
    transition
  "
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
                className="mt-2 inline-flex items-center justify-center py-3 rounded-2xl bg-[#5F6BF2] hover:bg-[#4B55D8] text-white font-semibold shadow-sm transition"
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
