"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background */}
      <div className="relative bg-gradient-to-b from-[#1A2040] via-[#141A2F] to-[#0F1426]">
        {/* Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#3017D3]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#6F00FC]/18 blur-3xl" />

        {/* 🔴 REDUCED TOP/BOTTOM PADDING */}
        <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-10">
          
          {/* LOGO */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="TechnicalJobboard Logo"
              className="
                w-[260px]
                sm:w-[320px]
                md:w-[380px]
                lg:w-[440px]
                h-auto object-contain
                drop-shadow-[0_0_40px_rgba(111,0,252,0.35)]
              "
            />

            {/* 🔴 MUCH CLOSER TEXT */}
            <p className="mt-1 text-white/90 text-sm sm:text-base max-w-2xl">
              Discover verified{" "}
              <span className="font-semibold text-white">Technical jobs</span>{" "}
              and career-defining opportunities.
            </p>
          </div>

          {/* 🔴 COLUMNS PULLED UP HARD */}
          <div className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
            
            {/* Explore */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-3">Explore</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="hover:text-white transition cursor-pointer">All Jobs</li>
                <li className="hover:text-white transition cursor-pointer">Categories</li>
                <li className="hover:text-white transition cursor-pointer">Career Resources</li>
                <li className="hover:text-white transition cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-3">Get Job Alerts</h3>
              <p className="text-white/80 text-sm mb-3 max-w-sm">
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
                    bg-gradient-to-b from-[#3017D3] to-[#2a12c0]
                    hover:from-[#3a22e6] hover:to-[#2a12c0]
                    shadow-[0_8px_24px_rgba(48,23,211,0.35)]
                    transition
                  "
                >
                  Join
                </button>
              </div>

              <p className="mt-2 text-xs text-white/60">Unsubscribe anytime.</p>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-3">Connect</h3>
              <div className="flex gap-4">
                {[FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20
                                 flex items-center justify-center hover:bg-white/15 transition"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-white/12" />

          {/* Bottom */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-white/65 text-sm">
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
