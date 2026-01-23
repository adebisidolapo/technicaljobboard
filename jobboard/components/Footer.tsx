"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      <div className="relative bg-gradient-to-b from-[#1A2040] via-[#141A2F] to-[#0F1426]">

        {/* subtle glow */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-[#5F6BF2]/18 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#5F6BF2]/12 blur-3xl" />

        {/* CONTAINER — NO TOP FAT */}
        <div className="relative mx-auto max-w-7xl px-6 pt-0 pb-6">

          {/* LOGO + TAGLINE — ULTRA TIGHT */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="TechnicalJobboard Logo"
              className="
                w-[180px] sm:w-[200px] md:w-[220px]
                h-auto object-contain
              "
            />

            {/* GAP ≈ 2 */}
            <p className="mt-1 text-white/90 text-sm sm:text-base max-w-xl">
              Discover verified{" "}
              <span className="font-semibold text-white">Technical jobs</span>{" "}
              and career-defining opportunities.
            </p>
          </div>

          {/* COLUMNS — FORCED UP */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

            {/* Explore */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-base mb-1">Explore</h3>
              <ul className="space-y-1 text-white/80 text-sm">
                <li className="hover:text-white cursor-pointer">All Jobs</li>
                <li className="hover:text-white cursor-pointer">Categories</li>
                <li className="hover:text-white cursor-pointer">Career Resources</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Job Alerts — NO DESCRIPTION */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-base mb-2">Get Job Alerts</h3>

              <div className="w-full max-w-sm flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20
                             text-white placeholder:text-white/55 outline-none
                             focus:ring-2 focus:ring-[#5F6BF2]/55"
                />

                <button
                  className="
                    px-5 py-2 rounded-xl font-semibold text-white
                    bg-[#5F6BF2] hover:bg-[#4B55D8]
                    transition
                  "
                >
                  Join
                </button>
              </div>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-base mb-2">Connect</h3>
              <div className="flex gap-3">
                {[FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="h-9 w-9 rounded-xl bg-white/10 border border-white/20
                                 flex items-center justify-center hover:bg-white/15 transition"
                      aria-label="Social link"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-4 h-px bg-white/10" />

          {/* Bottom */}
          <div className="mt-2 flex flex-col md:flex-row items-center justify-between gap-2 text-white/65 text-xs sm:text-sm">
            <p>© {year} TechnicalJobboard. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Support</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}