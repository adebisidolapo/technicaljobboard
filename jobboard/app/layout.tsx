import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-50 font-sans antialiased">
        {/* STICKY HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/85 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between">
            {/* LOGO (far left + bigger) */}
            <Link href="/" className="flex items-center">
              <img
                src="/Technicaljoblogo.png"
                alt="TechnicalJobboard"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP MENU (far right) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-900">
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
                className="px-4 py-2 rounded-xl bg-[#3017D3] text-white hover:opacity-95 transition shadow-sm"
              >
                Post Job
              </Link>
            </nav>

            {/* MOBILE MENU (dropdown using <details>) */}
            <details className="md:hidden relative">
              <summary className="list-none cursor-pointer inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm">
                ☰
              </summary>

              {/* Overlay click area */}
              <div className="fixed inset-0 z-40 bg-black/30" />

              {/* Dropdown panel */}
              <div className="absolute right-0 mt-3 z-50 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl p-2">
                <Link
                  href="#jobs"
                  className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium"
                >
                  All Jobs
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium"
                >
                  Jobseeker
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium"
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
        </header>

        {/* Push page content down so the sticky header doesn't cover it */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
