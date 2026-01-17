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
        {/* HEADER (overlay style so it blends into hero) */}
        <header className="fixed top-0 z-50 w-full">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
            <div className="mt-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
              <div className="h-16 md:h-20 flex items-center justify-between px-3 sm:px-4 md:px-6">
                {/* LOGO (bigger + closer to left) */}
                <Link href="/" className="flex items-center">
                  <img
                    src="/Technicaljoblogo-removebg-preview.png"
                    alt="TechnicalJobboard"
                    className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                  />
                </Link>

                {/* DESKTOP MENU (bigger + more visible) */}
                <nav className="hidden md:flex items-center gap-10 text-base font-semibold text-white">
                  <Link href="#jobs" className="hover:text-white/80 transition">
                    All Jobs
                  </Link>
                  <Link href="#" className="hover:text-white/80 transition">
                    Jobseeker
                  </Link>
                  <Link href="#" className="hover:text-white/80 transition">
                    Employer
                  </Link>
                  <Link
                    href="#"
                    className="px-5 py-2.5 rounded-2xl bg-white text-[#02000D] hover:bg-white/90 transition shadow-sm"
                  >
                    Post Job
                  </Link>
                </nav>

                {/* MOBILE MENU (dropdown using <details>) */}
                <details className="md:hidden relative">
                  <summary className="list-none cursor-pointer inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white shadow-sm">
                    ☰
                  </summary>

                  {/* Overlay click area */}
                  <div className="fixed inset-0 z-40 bg-black/30" />

                  {/* Dropdown panel */}
                  <div className="absolute right-0 mt-3 z-50 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl p-2">
                    <Link
                      href="#jobs"
                      className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold"
                    >
                      All Jobs
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold"
                    >
                      Jobseeker
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold"
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
          </div>
        </header>

        {/* IMPORTANT: add top padding so content doesn't hide under fixed header */}
        <main className="pt-24 md:pt-28">{children}</main>
      </body>
    </html>
  );
}
