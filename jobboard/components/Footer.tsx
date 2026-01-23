"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-white">
      {/* SOLID BACKGROUND */}
      <div className="bg-[#0F1426]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* ===== 3-COLUMN LAYOUT ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            
            {/* LEFT — LOGO */}
            <div className="flex justify-center md:justify-start">
              <img
                src="/logo.png"
                alt="TechnicalJobboard Logo"
                className="
                  w-[240px]
                  sm:w-[280px]
                  md:w-[320px]
                  lg:w-[360px]
                  h-auto object-contain
                "
              />
            </div>

            {/* MIDDLE — EXPLORE */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-semibold text-base mb-4">Explore</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="hover:text-white cursor-pointer">All Jobs</li>
                <li className="hover:text-white cursor-pointer">Categories</li>
                <li className="hover:text-white cursor-pointer">Career Resources</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* RIGHT — CONNECT */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <h3 className="font-semibold text-base mb-4">Connect</h3>

              <div className="flex gap-3 mb-4">
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

              {/* Newsletter */}
              <div className="w-full max-w-[320px] flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20
                             text-white placeholder:text-white/55 outline-none
                             focus:ring-2 focus:ring-[#5F6BF2]/55"
                />
                <button
                  className="px-5 py-2.5 rounded-xl font-semibold text-white
                             bg-[#5F6BF2] hover:bg-[#4B55D8]
                             transition"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mt-10 h-px bg-white/10" />

          {/* BOTTOM BAR */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-white/60 text-xs sm:text-sm">
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
