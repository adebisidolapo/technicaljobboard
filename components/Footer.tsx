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
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "#0F1426",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34'%3E%3Crect width='34' height='34' fill='none' stroke='rgba(255%2C255%2C255%2C0.04)' stroke-width='0.8'/%3E%3Ccircle cx='17' cy='17' r='1.2' fill='rgba(255%2C255%2C255%2C0.04)'/%3E%3C/svg%3E\")",
        backgroundSize: "34px 34px",
      }}
    >
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--brand-purple)]/10 blur-3xl" />
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-emerald-500/6 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* CTA Banner */}
      <div className="relative border-b border-white/8">
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
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
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
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/all-jobs"
                  className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-[#0F1426] transition hover:bg-white/90"
                >
                  Browse jobs
                </Link>
                <Link
                  href="/employer"
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Employers
                </Link>
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
                    <li>
                      <Link href="/all-jobs" className="transition hover:text-white">
                        All Jobs
                      </Link>
                    </li>
                    <li>
                      <Link href="/#categories" className="transition hover:text-white">
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link href="/jobseeker/login" className="transition hover:text-white">
                        Jobseeker
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Employers
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                    <li>
                      <Link href="/employer" className="transition hover:text-white">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/employer/jobs" className="transition hover:text-white">
                        Manage jobs
                      </Link>
                    </li>
                    <li>
                      <Link href="/employer/jobs/new" className="transition hover:text-white">
                        Post a job
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                    <li>
                      <Link href="/about" className="transition hover:text-white">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="transition hover:text-white">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/support" className="transition hover:text-white">
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Newsletter
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                Weekly roles + updates.
              </p>
              <div className="mt-4 w-full max-w-sm">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/40">
              © {year} TechnicalJobBoard. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-4 text-xs text-white/40">
                <Link href="/terms" className="transition hover:text-white">
                  Terms
                </Link>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy
                </Link>
                <Link href="/support" className="transition hover:text-white">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}