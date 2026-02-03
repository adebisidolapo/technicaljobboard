"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1426] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* BRAND */}
          <div className="md:col-span-4">
          <img
  src="/logo.png"
  alt="TechnicalJobboard Logo"
  className="
    h-14 md:h-16 lg:h-[72px]
    w-auto object-contain
   filter brightness-0 invert opacity-90
    hover:opacity-100 transition
  "
/>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Curated technical roles from trusted teams. Clean listings, fast apply,
              and a focus on long-term careers.
            </p>

            {/* SOCIALS (NO MAPPING, NO TS ERRORS) */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="h-10 w-10 rounded-xl border border-white/15 bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-white/15 transition"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-xl border border-white/15 bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-white/15 transition"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="h-10 w-10 rounded-xl border border-white/15 bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-white/15 transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="h-10 w-10 rounded-xl border border-white/15 bg-white/10
                           flex items-center justify-center text-white/90
                           hover:bg-white/15 transition"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/all-jobs" className="hover:text-white transition">
                  All Jobs
                </Link>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Career Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* EMAIL */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold">Stay connected</h3>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="h-11 flex-1 rounded-xl border border-white/15 bg-white/10
                           px-4 text-sm text-white placeholder:text-white/50 outline-none
                           focus:ring-2 focus:ring-[rgba(106,111,242,0.55)]"
              />
              <button
                type="button"
                className="h-11 rounded-xl px-5 text-sm font-semibold text-white
                           bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                           transition shadow-[0_10px_22px_rgba(106,111,242,0.25)]"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-12 h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-white/60 md:flex-row">
          <p>© {year} TechnicalJobboard. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
