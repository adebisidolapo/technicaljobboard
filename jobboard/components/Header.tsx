"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

const heroImageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleScroll = () => {
    if (!heroImageRef.current) return;
    const offset = window.scrollY * 0.15;
    heroImageRef.current.style.transform = `translateY(${offset}px)`;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <header className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Technical<span className="text-blue-600">Jobboard</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="#">Jobs</Link>
          <Link href="#">Categories</Link>
          <Link href="#">For Employers</Link>
          <Link href="#">Pricing</Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Post a Job
          </button>
        </nav>

        {/* HAMBURGER (MOBILE) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 space-y-4 text-sm text-gray-700">
          <Link href="#" onClick={() => setMenuOpen(false)}>Jobs</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>For Employers</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Post a Job
          </button>
        </div>
      )}
    </header>
  );
}
