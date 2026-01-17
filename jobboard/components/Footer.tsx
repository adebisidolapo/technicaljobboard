"use client";

import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer className="relative overflow-hidden">
        {/* Top gradient background */}
        <div className="relative bg-gradient-to-br from-[#02000D] via-[#140047] to-[#6F00FC] text-white">
          {/* Soft glow accents */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-16">
            {/* Logo + tagline */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/Technicaljoblogo-removebg-preview.png"
                alt="TechnicalJobboard Logo"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
              <p className="mt-4 text-white/90 text-sm sm:text-base max-w-xl">
                Discover verified{" "}
                <span className="font-semibold">Technical jobs</span> and
                career-defining opportunities.
              </p>
            </div>

            {/* Grid */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              {/* Explore */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-5">Explore</h3>
                <ul className="space-y-3 text-white/85 text-sm">
                  <li className="hover:text-white cursor-pointer">All Jobs</li>
                  <li className="hover:text-white cursor-pointer">Categories</li>
                  <li className="hover:text-white cursor-pointer">
                    Career Resources
                  </li>
                  <li className="hover:text-white cursor-pointer">Contact</li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-5">Get Job Alerts</h3>
                <p className="text-white/85 text-sm mb-4">
                  Weekly updates with new Technical roles — no spam.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20
                               text-white placeholder:text-white/60 outline-none
                               focus:ring-2 focus:ring-white/40"
                  />
                  <button className="bg-white text-[#02000D] px-6 py-3 rounded-2xl font-semibold hover:bg-white/90 transition">
                    Join
                  </button>
                </div>
              </div>

              {/* Social */}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-5">Connect</h3>
                <div className="flex justify-center md:justify-start gap-4">
                  {[FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub].map(
                    (Icon, i) => (
                      <span
                        key={i}
                        className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20
                                   flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
                      >
                        <Icon />
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-14 h-px bg-white/15" />

            {/* Bottom */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/70 text-sm">
              <p>
                © {new Date().getFullYear()} TechnicalJobboard. All rights
                reserved.
              </p>
              <div className="flex gap-5">
                <span className="hover:text-white cursor-pointer">Privacy</span>
                <span className="hover:text-white cursor-pointer">Terms</span>
                <span className="hover:text-white cursor-pointer">Support</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
