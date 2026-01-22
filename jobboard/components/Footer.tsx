"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background (navy base + subtle brand purple glow) */}
      <div className="relative bg-gradient-to-b from-[#1A2040] via-[#141A2F] to-[#0F1426]">
        {/* Purple brand glow (subtle) */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#3017D3]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#6F00FC]/18 blur-3xl" />
        {/* Soft white haze for depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />

        {/* ↓ Reduced overall height (py-16 → py-10/12) */}
        <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-12">
          {/* TOP: Logo + writeup */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="TechnicalJobboard Logo"
              className="
                w-[240px]
                sm:w-[300px]
                md:w-[360px]
                lg:w-[420px]
                xl:w-[460px]
                h-auto object-contain
                drop-shadow-[0_0_40px_rgba(111,0,252,0.35)]
              "
            />

            {/* ↓ Slightly tighter spacing */}
            <p className="mt-2 text-white/90 text-sm sm:text-base max-w-2xl">
              Discover verified{" "}
              <span className="font-semibold text-white">Technical jobs</span>{" "}
              and career-defining opportunities.
            </p>
          </div>

          {/* ↓ Bring columns MUCH closer to logo (mt-14 → mt-7/8) */}
          <div className="mt-7 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-10 text-center">
            {/* Explore */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-4">Explore</h3>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="hover:text-white transition cursor-pointer">All Jobs</li>
                <li className="hover:text-white transition cursor-pointer">Categories</li>
                <li className="hover:text-white transition cursor-pointer">Career Resources</li>
                <li className="hover:text-white transition cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-4">Get Job Alerts</h3>
              <p className="text-white/80 text-sm mb-4 max-w-sm">
                Weekly updates with new Technical roles — no spam.
              </p>

              <div className="w-full max-w-sm flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20
                             text-white placeholder:text-white/55 outline-none
                             focus:ring-2 focus:ring-[#3017D3]/60"
                />

                {/* ✅ Button color updated to match brand + look premium */}
                <button
                  type="button"
                  className="
                    w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold transition
                    bg-gradient-to-b from-[#3017D3] to-[#2a12c0]
                    hover:from-[#3a22e6] hover:to-[#2a12c0]
                    shadow-[0_10px_30px_rgba(48,23,211,0.25)]
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-white/30
                  "
                >
                  Join
                </button>
              </div>

              <p className="mt-3 text-xs text-white/65">Unsubscribe anytime.</p>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-4">Connect</h3>

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
                               flex items-center justify-center hover:bg-white/15 transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <p className="mt-4 text-xs text-white/65">
                Follow us for new roles & updates.
              </p>
            </div>
          </div>

          {/* Divider (tighter) */}
          <div className="mt-9 md:mt-10 h-px bg-white/12" />

          {/* Bottom (tighter) */}
          <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-white/65 text-sm">
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
