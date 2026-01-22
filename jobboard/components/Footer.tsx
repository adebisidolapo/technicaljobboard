"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="relative bg-gradient-to-br from-[#02000D] via-[#1a0b5c] to-[#3017D3] text-white">
        {/* Soft glow accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3017D3]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#6F00FC]/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          {/* TOP: Logo + writeup */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="TechnicalJobboard Logo"
              className="h-28 sm:h-32 md:h-36 w-auto object-contain"
            />

            <p className="mt-3 text-white/90 text-sm sm:text-base max-w-xl">
              Discover verified{" "}
              <span className="font-semibold text-white">Technical jobs</span>{" "}
              and career-defining opportunities.
            </p>
          </div>

          {/* 3 columns (closer to logo) */}
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Explore */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Explore</h3>
              <ul className="space-y-3 text-white/80 text-sm">
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
            <div>
              <h3 className="font-semibold text-lg mb-4">Get Job Alerts</h3>
              <p className="text-white/80 text-sm mb-4">
                Weekly updates — no spam.
              </p>

              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                             text-white placeholder:text-white/60 outline-none
                             focus:ring-2 focus:ring-[#3017D3]"
                />
                <button className="bg-[#3017D3] hover:bg-[#2a12c0] text-white px-6 py-3 rounded-xl font-semibold transition">
                  Join
                </button>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <div className="flex justify-center gap-4">
                {[FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="h-11 w-11 rounded-xl bg-white/10 border border-white/20
                                 flex items-center justify-center hover:bg-white/20 transition"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 h-px bg-white/15" />

          {/* Bottom */}
          <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-white/70 text-sm">
            <p>
              © {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
            </p>

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
