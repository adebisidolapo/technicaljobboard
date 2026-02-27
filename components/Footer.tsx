import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

function SocialIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1426] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* TOP GRID: logo + columns + ONE inline newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start min-w-0">
          {/* Brand */}
          <div className="lg:col-span-4 min-w-0">
            <img
              src="/logo.png.png"
              alt="TechnicalJobBoard"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
              Curated technical roles from trusted teams.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/all-jobs"
                className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-white text-[#0F1426] text-sm font-semibold hover:bg-white/90 transition"
              >
                Browse jobs
              </Link>
              <Link
                href="/employer"
                className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                Employers
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white/90">Explore</h3>
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
                <Link href="/jobseeker/login" className="hover:text-white transition">
                  Jobseeker
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white/90">Employers</h3>
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
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white/90">Company</h3>
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

          {/* Newsletter (ONLY one, inline, with enough width) */}
          <div className="lg:col-span-2 min-w-0">
            <h3 className="text-sm font-semibold text-white/90">Newsletter</h3>
            <p className="mt-4 text-sm text-white/70">Weekly roles + updates.</p>

            {/* Keep it compact: constrain width and prevent overflow */}
            <div className="mt-4 w-full min-w-0 max-w-xs">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} TechnicalJobBoard. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <SocialIconButton href="#" label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.1-.8.5-1.6.8-2.5 1A3.6 3.6 0 0 0 12.7 6c0 .3 0 .6.1.9A10.2 10.2 0 0 1 3.1 4.1a3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.2-.2-1.7-.5v.1c0 1.7 1.2 3.2 2.9 3.5-.6.2-1.2.2-1.8.1.5 1.5 2 2.6 3.7 2.7A7.2 7.2 0 0 1 2 17.2 10.2 10.2 0 0 0 7.5 19c6.6 0 10.2-5.5 10.2-10.2v-.5c.7-.5 1.4-1.2 1.9-2z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SocialIconButton>

              <SocialIconButton href="#" label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9v13M6 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM10 22v-8.2c0-2.1 1.2-3.3 3-3.3 1.7 0 2.7 1.1 2.7 3.2V22M10 12.2V9h3v1.7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SocialIconButton>

              <SocialIconButton href="#" label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 19c-4 1.2-4-2-5-2m10 4v-3.1c0-.9.3-1.6.8-2-2.7-.3-5.6-1.3-5.6-6A4.7 4.7 0 0 1 10.5 6c-.1-.4-.6-1.7.1-3.5 0 0 1-.3 3.4 1.3a11.8 11.8 0 0 1 6.2 0C22.6 2.2 23.6 2.5 23.6 2.5c.7 1.8.2 3.1.1 3.5A4.7 4.7 0 0 1 25 9.8c0 4.7-2.9 5.7-5.6 6 .5.4.8 1.2.8 2V22"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SocialIconButton>
            </div>

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