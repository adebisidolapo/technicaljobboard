import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1426] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* BRAND */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center">
              <img
                src="/Technicaljoblogo-removebg-preview.png"
                alt="TechnicalJobboard"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              Curated technical roles from trusted teams.
              <br />
              Clean listings, fast apply, and careers that last.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/all-jobs" className="hover:text-white transition">
                  All Jobs
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/jobseeker/login" className="hover:text-white transition">
                  Jobseeker
                </Link>
              </li>
              <li>
                <Link href="/employer/login" className="hover:text-white transition">
                  Employer
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-4">Stay connected</h3>

            <NewsletterForm />

            <div className="mt-6 flex gap-6 text-sm text-white/70">
              <a href="#" aria-label="Twitter" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition">
                LinkedIn
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-white transition">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-white/10" />

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center">
          <p>© {year} TechnicalJobboard. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}