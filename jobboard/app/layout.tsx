import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technical Job Board",
  description: "Where technical careers meet opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        {/* HEADER (NOT sticky) */}
       <header className="w-full bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-4">
<div className="h-20 md:h-22 lg:h-24 flex items-center justify-between overflow-visible">
      {/* LOGO (KEEP BIG) */}
      <Link href="/" className="flex items-center">
        <img
          src="/Technicaljoblogo-removebg-preview.png"
          alt="TechnicalJobboard"
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain"
        />
      </Link>

      {/* DESKTOP MENU (smaller) */}
      <nav className="hidden md:flex items-center gap-8 text-sm lg:text-base font-semibold text-gray-900">
        <Link href="#jobs" className="hover:text-[#3017D3] transition">
          All Jobs
        </Link>
        <Link href="#" className="hover:text-[#3017D3] transition">
          Jobseeker
        </Link>
        <Link href="#" className="hover:text-[#3017D3] transition">
          Employer
        </Link>
        <Link
          href="#"
          className="px-4 py-2 bg-[#3017D3] text-white rounded-xl shadow-sm hover:bg-[#2a12c0] transition"
        >
          Post Job
        </Link>
      </nav>

      {/* MOBILE MENU */}
      <details className="md:hidden relative">
        <summary className="list-none cursor-pointer px-3 py-2 rounded-xl border border-gray-200 text-gray-900 font-semibold">
          ☰
        </summary>

        <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl p-2 z-50">
          <Link
            href="#jobs"
            className="block px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold text-gray-900"
          >
            All Jobs
          </Link>
          <Link
            href="#"
            className="block px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold text-gray-900"
          >
            Jobseeker
          </Link>
          <Link
            href="#"
            className="block px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold text-gray-900"
          >
            Employer
          </Link>
          <Link
            href="#"
            className="mt-2 block text-center px-4 py-3 rounded-xl bg-[#3017D3] text-white font-semibold"
          >
            Post Job
          </Link>
        </div>
      </details>
    </div>
  </div>
</header>


        {children}
      </body>
    </html>
  );
}


import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Technical Job Board",
  description: "Where technical careers meet opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <SiteHeader />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
