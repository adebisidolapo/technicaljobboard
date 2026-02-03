"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* BRAND (TEXT ONLY) */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                TechnicalJobBoard
              </span>
              <span className="text-[var(--brand-purple)] font-extrabold text-xl md:text-2xl">
                ]
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Curated technical roles from trusted teams. Clean listings, fast apply,
              and a focus on long-term careers.
            </p>
          </div>

          {/* EXPLORE */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-white">Explore</h3>
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

          {/* COMPANY */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
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

          {/* STAY CONNECTED */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold text-white">Stay connected</h3>

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

            {/* SOCIALS (MOVED UNDER FORM) */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="h-10 w-10 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="h-10 w-10 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="h-10 w-10 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-14 h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} TechnicalJobBoard. All rights reserved.</p>

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