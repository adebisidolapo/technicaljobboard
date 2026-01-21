"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="relative bg-gradient-to-br from-[#02000D] via-[#140047] to-[#6F00FC] text-white">
        {/* Soft glow accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* TOP: Logo + writeup (centered) */}
          <div className="flex flex-col items-center text-center">
            {/* Logo card so it stays visible on gradient */}
            <div className="rounded-3xl bg-white/95 text-[#02000D] shadow-xl border border-white/20 px-7 py-6 sm:px-10 sm:py-7">
              <img
                src="/logo.png"
                alt="TechnicalJobboard Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain mx-auto"
              />
            </div>

            <p className="mt-5 text-white/90 text-sm sm:text-base max-w-2xl">
              Discover verified{" "}
              <span className="font-semibold text-white">Technical jobs</span>{" "}
              and career-defining opportunities.
            </p>
          </div>

          {/* 3-COLUMN AREA (centered + aligned) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start text-center">
            {/* Explore */}
            <div className="mx-auto w-full max-w-xs">
              <h3 className="font-semibold text-lg mb-5">Explore</h3>
              <ul className="space-y-3 text-white/85 text-sm">
                <li className="hover:text-white transition cursor-pointer">
                  All Jobs
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Categories
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Career Resources
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="mx-auto w-full max-w-sm">
              <h3 className="font-semibold text-lg mb-5">Get Job Alerts</h3>
              <p className="text-white/85 text-sm mb-4">
                Weekly updates with new Technical roles — no spam.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20
                             text-white placeholder:text-white/60 outline-none
                             focus:ring-2 focus:ring-white/40"
                />
                <button className="w-full sm:w-auto bg-white text-[#02000D] px-6 py-3 rounded-2xl font-semibold hover:bg-white/90 transition">
                  Join
                </button>
              </div>
            </div>

            {/* Connect */}
            <div className="mx-auto w-full max-w-xs">
              <h3 className="font-semibold text-lg mb-5">Connect</h3>

              <div className="flex justify-center gap-4">
                {[
                  { Icon: FaTwitter, label: "Twitter" },
                  { Icon: FaLinkedinIn, label: "LinkedIn" },
                  { Icon: FaFacebookF, label: "Facebook" },
                  { Icon: FaGithub, label: "GitHub" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20
                               flex items-center justify-center hover:bg-white/20 transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <p className="text-white/75 text-sm mt-5">
                Follow us for new roles & updates.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-14 h-px bg-white/15" />

          {/* Bottom row */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/70 text-sm">
            <p>© {new Date().getFullYear()} TechnicalJobboard. All rights reserved.</p>

            <div className="flex gap-5">
              <span className="hover:text-white transition cursor-pointer">
                Privacy
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Terms
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
