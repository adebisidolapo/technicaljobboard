"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      {/* SOLID background (no gradient) */}
      <div className="relative bg-[#0F1426]">
        {/* Glows (keep subtle) */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#5F6BF2]/18 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-[460px] w-[460px] rounded-full bg-[#5F6BF2]/12 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-8">
          {/* ===== TOP GRID ===== */}
          {/* Logo back in the middle. Explore sits under the logo (middle column). Connect stays right but centered. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
            {/* LEFT — (empty spacer on desktop for balance) */}
            <div className="hidden md:block" />

            {/* MIDDLE — LOGO + EXPLORE */}
            <div className="flex flex-col items-center text-center">
              {/* Logo centered */}
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

              {/* Explore moved to “where the logo is” (same middle column, directly under) */}
              <div className="mt-6">
                <h3 className="font-semibold text-base mb-3">Explore</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="hover:text-white cursor-pointer">All Jobs</li>
                  <li className="hover:text-white cursor-pointer">Categories</li>
                  <li className="hover:text-white cursor-pointer">Career Resources</li>
                  <li className="hover:text-white cursor-pointer">Contact</li>
                </ul>
              </div>
            </div>

            {/* RIGHT — CONNECT (center it, keep it on the right column) */}
            <div className="flex flex-col items-center md:items-center text-center">
              <h3 className="font-semibold text-base mb-3">Connect</h3>

              <div className="flex gap-3 mb-4">
                {[FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-10 w-10 rounded-xl bg-white/10 border border-white/20
                               flex items-center justify-center hover:bg-white/15 transition"
                    aria-label="Social link"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              {/* Form under icons */}
              <div className="w-full max-w-[360px] flex gap-2 justify-center">
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
                             shadow-[0_6px_18px_rgba(95,107,242,0.28)]
                             transition"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 h-px bg-white/12" />

          {/* Bottom */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-white/65 text-xs sm:text-sm">
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
