"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          
          {/* BRAND */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="TechnicalJobboard Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              Curated technical roles from trusted teams. Clean listings, fast
              apply, and a focus on long-term careers.
            </p>
          </div>

          {/* EXPLORE */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-white">Explore</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/all-jobs" className="hover:text-white transition">
                  All Jobs
                </Link>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Career Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold text-white">Connect</h3>

            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="h-11 w-11 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaTwitter size={20} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="h-11 w-11 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="h-11 w-11 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="h-11 w-11 rounded-xl bg-white/10 border border-white/20
                           flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-14 h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} TechnicalJobboard. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
