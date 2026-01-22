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

        <div className="relative mx-auto max-w-7xl px-6 py-16">
         
         {/* TOP: Logo + writeup */}
<div className="flex flex-col items-center text-center">
  <img
    src="/logo.png"
    alt="TechnicalJobboard Logo"
    className="
      w-[220px]
      sm:w-[260px]
      md:w-[320px]
      lg:w-[380px]
      xl:w-[420px]
      h-auto
      object-contain
      drop-shadow-[0_0_40px_rgba(111,0,252,0.35)]
    "
  />

  <p className="mt-6 text-white/90 text-sm sm:text-base max-w-2xl">
    Discover verified{" "}
    <span className="font-semibold text-white">Technical jobs</span>{" "}
    and career-defining opportunities.
  </p>
</div>


          {/* 3 columns (NO boxes) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
            {/* Explore */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-5">Explore</h3>
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
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-lg mb-5">Get Job Alerts</h3>
              <p className="text-white/80 text-sm mb-5 max-w-sm">
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
                <button className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold transition
                                   bg-[#3017D3] hover:bg-[#2a12c0] text-white shadow-sm">
                  Join
                </button>
              </div>

              <p className="mt-4 text-xs text-white/65">Unsubscribe anytime.</p>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center">
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
                               flex items-center justify-center hover:bg-white/15 transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <p className="mt-5 text-xs text-white/65">
                Follow us for new roles & updates.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-14 h-px bg-white/12" />

          {/* Bottom */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/65 text-sm">
            <p>© {year} TechnicalJobboard. All rights reserved.</p>

            <div className="flex gap-6">
              <span className="hover:text-white transition cursor-pointer">
                Terms
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Privacy Policy
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
