"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      <div className="relative bg-gradient-to-b from-[#1A2040] via-[#141A2F] to-[#0F1426]">
        {/* Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#3017D3]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#6F00FC]/18 blur-3xl" />

        {/* tighter container padding */}
        <div className="relative mx-auto max-w-7xl px-6 pt-4 pb-8">
          {/* LOGO + TEXT (CROPPED tighter) */}
          <div className="flex flex-col items-center text-center">
            {/* Logo crop wrapper (removes transparent padding "look") */}
            <div className="overflow-hidden leading-none">
              {/* control height per breakpoint */}
<div className="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden">
                <img
                  src="/logo.png"
                  alt="TechnicalJobboard Logo"
                  className="
                    block mx-auto h-auto w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px]
                    object-contain
-translate-y-4 sm:-translate-y-6 md:-translate-y-8 lg:-translate-y-10
                    drop-shadow-[0_0_40px_rgba(111,0,252,0.35)]
                    select-none
                  "
                />
              </div>
            </div>

            {/* zero-ish gap */}
            <p className="-mt-1 text-white/90 text-sm sm:text-base max-w-2xl">
              Discover verified{" "}
              <span className="font-semibold text-white">Technical jobs</span>{" "}
              and career-defining opportunities.
            </p>
          </div>

          {/* columns pulled up */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-9 text-center">
            {/* Explore */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2">Explore</h3>
              <ul className="space-y-1.5 text-white/80 text-sm">
                <li className="hover:text-white transition cursor-pointer">All Jobs</li>
                <li className="hover:text-white transition cursor-pointer">Categories</li>
                <li className="hover:text-white transition cursor-pointer">Career Resources</li>
                <li className="hover:text-white transition cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2">Get Job Alerts</h3>
              <p className="text-white/80 text-sm mb-2 max-w-sm">
                Weekly updates with new Technical roles — no spam.
              </p>

              <div className="w-full max-w-sm flex gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20
                             text-white placeholder:text-white/55 outline-none
                             focus:ring-2 focus:ring-[#3017D3]/60"
                />
                <button
                  className="
                    px-6 py-3 rounded-2xl font-semibold
                    bg-gradient-to-b from-[#6F00FC] to-[#3017D3]
                    hover:from-[#8C33FD] hover:to-[#2a12c0]
                    shadow-[0_10px_26px_rgba(111,0,252,0.35)]
                    transition
                  "
                >
                  Join
                </button>
              </div>

              <p className="mt-1.5 text-xs text-white/60">Unsubscribe anytime.</p>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-2">Connect</h3>
              <div className="flex gap-4">
                {[FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20
                               flex items-center justify-center hover:bg-white/15 transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* divider closer */}
          <div className="mt-6 h-px bg-white/12" />

          {/* bottom */}
          <div className="mt-3 flex flex-col md:flex-row items-center justify-between gap-4 text-white/65 text-sm">
            <p>© {year} TechnicalJobboard. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-white transition cursor-pointer">Terms</span>
              <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
