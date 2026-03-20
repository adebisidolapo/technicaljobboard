import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0F1426] text-white">
      {/* Subtle glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--brand-purple)]/10 blur-3xl" />
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* CTA Banner */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                Ready to hire technical talent?
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Post a job and reach thousands of qualified engineers today.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/employer/jobs/new"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Post a Job
              </Link>
              <Link
                href="/all-jobs"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">

            {/* Brand */}
            <div className="lg:col-span-4">
              <img
                src="/logo.png.png"
                alt="TechnicalJobBoard"
                className="h-10 w-auto object-contain"
              />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
                Curated technical roles from trusted teams.
              </p>

              {/* Social icons */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577..." />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Explore
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                    <li><Link href="/all-jobs">All Jobs</Link></li>
                    <li><Link href="/#categories">Categories</Link></li>
                    <li><Link href="/jobseeker/login">Jobseeker</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Employers
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                    <li><Link href="/employer">Dashboard</Link></li>
                    <li><Link href="/employer/jobs">Manage jobs</Link></li>
                    <li><Link href="/employer/jobs/new">Post a job</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/support">Support</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Newsletter
              </h3>
              <p className="mt-4 text-sm text-white/50">
                Weekly roles + updates.
              </p>
              <NewsletterForm />
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6 flex justify-between text-xs text-white/40">
          <p>© {year} TechnicalJobBoard. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}