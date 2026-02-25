import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1426] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* BRAND */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="TechnicalJobboard"
                width={220}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 text-sm text-white/70 leading-relaxed max-w-sm">
              Curated technical roles from trusted teams.
              Clean listings, fast apply, and careers that last.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-sm font-semibold mb-6 tracking-wide uppercase">
              Explore
            </h3>

            <ul className="space-y-4 text-sm text-white/70">
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
              <li>
                <Link href="/employer/jobs/new" className="hover:text-white transition">
                  Post Job
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="text-sm font-semibold mb-6 tracking-wide uppercase">
              Stay Connected
            </h3>

            <NewsletterForm />

            <div className="mt-8 flex gap-6 text-sm text-white/70">
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

        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {year} TechnicalJobboard. All rights reserved.</p>

          <div className="flex gap-6">
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