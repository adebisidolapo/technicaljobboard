"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background */}
      <div className="relative bg-gradient-to-b from-[#1A2040] via-[#141A2F] to-[#0F1426]">
        {/* Glows (updated to new purple) */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#5F6BF2]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[24rem] w-[24rem] rounded-full bg-[#5F6BF2]/12 blur-3xl" />

        {/* Container (LESS vertical padding) */}
        <div className="relative mx-auto max-w-7xl px-6 pt-4 pb-8">
          {/* LOGO + TAGLINE (TIGHT) */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="TechnicalJobboard Logo"
              className="
                w-[240px]
                sm:w-[280px]
                md:w-[330px]
                lg:w-[380px]
                h-auto object-contain
                drop-shadow-[0_0_28px_rgba(95,107,242,0.28)]
              "
            />

            <p className="mt-2 text-white/90 text-sm sm:text-base max-w-xl">
              Discover verified{" "}
              <span className="font-semibold text-white">Technical jobs</span>{" "}
              and career-defining opportunities.
            </p>
          </div>

          {/* COLUMNS (PULLED UP HARD) */}
          <div className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            {/* Explore */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-base mb-2">Explore</h3>
              <ul className="space-y-1.5 text-white/80 text-sm">
                <li className="hover:text-white cursor-pointer">All Jobs</li>
                <li className="hover:text-white cursor-pointer">Categories</li>
                <li className="hover:text-white cursor-pointer">
                  Career Resources
                </li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-base mb-2">Get Job Alerts</h3>
              <p className="text-white/80 text-sm mb-2 max-w-sm">
                Weekly updates — no spam.
              </p>

              <div className="w-full max-w-sm flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20
                             text-white placeholder:text-white/55 outline-none
                             focus:ring-2 focus:ring-[#5F6BF2]/55"
                />

                <button
                  className="
                    px-5 py-2.5 rounded-xl font-semibold text-white
                    bg-gradient-to-b from-[#5F6BF2] to-[#4B55D8]
                    hover:from-[#6E78FF] hover:to-[#4B55D8]
                    shadow-[0_6px_18px_rgba(95,107,242,0.28)]
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
                      className="h-10 w-10 rounded-xl bg-white/10 border border-white/20
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

          {/* Divider (closer) */}
          <div className="mt-6 h-px bg-white/12" />

          {/* Bottom (tight) */}
          <div className="mt-3 flex flex-col md:flex-row items-center justify-between gap-3 text-white/65 text-xs sm:text-sm">
            <p>© {year} TechnicalJobboard. All rights reserved.</p>
            <div className="flex gap-5">
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
