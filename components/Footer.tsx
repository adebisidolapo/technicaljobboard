import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1426] text-white">
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Brand */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png.png"
                  alt="TechnicalJobBoard"
                  className="h-14 w-auto object-contain"
                />
              </div>

              <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-md">
                Curated technical roles from trusted teams — clean listings, fast apply,
                and careers that last.
              </p>

              {/* Small trust line */}
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/60">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Curated roles
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Fast apply
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  No spam
                </span>
              </div>

              {/* One CTA (not "Post Job" everywhere) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/all-jobs"
                  className="h-11 px-5 inline-flex items-center justify-center rounded-xl bg-white text-[#0F1426] font-semibold text-sm hover:bg-white/90 transition"
                >
                  Browse jobs
                </Link>
                <Link
                  href="/employer"
                  className="h-11 px-5 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition"
                >
                  Employer dashboard
                </Link>
              </div>
            </div>

            {/* Links grid */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-white/90">
                  Explore
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
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
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide text-white/90">
                  Employers
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  <li>
                    <Link href="/employer" className="hover:text-white transition">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/employer/jobs" className="hover:text-white transition">
                      Manage jobs
                    </Link>
                  </li>
                  {/* No "Post Job" link here to avoid CTA repetition */}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide text-white/90">
                  Company
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  <li>
                    <Link href="/about" className="hover:text-white transition">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="hover:text-white transition">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide text-white/90">
                  Stay connected
                </h3>

                <div className="mt-4">
                  <div className="text-xs text-white/60 mb-3">
                    Weekly roles + product updates. No spam.
                  </div>
                  <div className="max-w-sm">
                    <NewsletterForm />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/70">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 hover:text-white transition"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 hover:text-white transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* subtle glow accent */}
          <div className="pointer-events-none mt-10 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-purple)/0.35] to-transparent" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} TechnicalJobBoard. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-white transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}