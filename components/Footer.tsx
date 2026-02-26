import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1426] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          {/* BRAND */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png.png"
                alt="TechnicalJobBoard"
                className="h-12 md:h-14 w-auto object-contain"
              />
              <span className="text-lg md:text-xl font-extrabold tracking-tight">
                TechnicalJobBoard
              </span>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm text-center md:text-left">
              Curated technical roles from trusted teams. Clean listings, fast apply,
              and careers that last.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-4 tracking-wide text-white/90">
              Explore
            </h3>

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
                <Link href="/jobseeker" className="hover:text-white transition">
                  Jobseeker
                </Link>
              </li>
              <li>
                <Link href="/employer" className="hover:text-white transition">
                  Employer
                </Link>
              </li>
              <li>
                <Link href="/employer/jobs/new" className="hover:text-white transition">
                  Post Job
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-4 tracking-wide text-white/90">
              Stay connected
            </h3>

            <div className="w-full max-w-sm">
              <NewsletterForm />
            </div>

            <div className="mt-6 flex gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-white/10" />

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} TechnicalJobBoard. All rights reserved.</p>

          <div className="flex items-center gap-5">
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