"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const Social = [FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub];

  return (
    <footer className="bg-[#0F1426] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* BRAND */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="TechnicalJobboard Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-lg font-extrabold tracking-tight">
                TechnicalJobboard
              </span>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
              Curated technical roles from trusted teams. Clean listings, fast
              apply, and a focus on long-term careers.
            </p>

            <div className="mt-6 flex gap-3">
              {Social.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-xl bg-white/10 border border-white/15
                             flex items-center justify-center hover:bg-white/15 transition"
                  aria-label="Social link"
                >
                  <Icon className="text-white/90" />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS 1 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a className="hover:text-white transition" href="/all-jobs">
                  All Jobs
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#categories">
                  Categories
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Career Resources
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* LINKS 2 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a className="hover:text-white transition" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Partnerships
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Terms
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-4">
              Get job alerts
            </h3>
            <p className="text-sm text-white/70 mb-5">
              Weekly curated roles. No spam — unsubscribe anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="h-11 flex-1 rounded-xl bg-white/10 border border-white/15
                           px-4 text-sm text-white placeholder:text-white/50 outline-none
                           focus:ring-2 focus:ring-[rgba(106,111,242,0.55)]"
              />

              <button
                className="h-11 rounded-xl px-5 text-sm font-semibold text-white
                           bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                           transition shadow-[0_10px_22px_rgba(106,111,242,0.25)]"
              >
                Join
              </button>
            </div>

            <div className="mt-4 text-xs text-white/55">
              By subscribing, you agree to receive emails from TechnicalJobboard.
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-12 h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} TechnicalJobboard. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5">
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
