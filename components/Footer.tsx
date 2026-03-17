import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

const FOOTER_LINKS = {
  Explore: [
    { href: "/all-jobs", label: "All Jobs" },
    { href: "/#categories", label: "Categories" },
    { href: "/jobseeker/login", label: "Jobseeker Login" },
    { href: "/jobseeker/register", label: "Create Account" },
  ],
  Employers: [
    { href: "/employer", label: "Dashboard" },
    { href: "/employer/jobs", label: "Manage Jobs" },
    { href: "/employer/jobs/new", label: "Post a Job" },
    { href: "/employer/candidates", label: "Candidates" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/support", label: "Support" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ],
};

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition hover:border-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1120] text-white">

      {/* CTA Banner */}
      <div className="border-b border-white/8 bg-[#111827]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div>
            <p className="text-base font-bold text-white">
              Ready to hire technical talent?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Post your first job and reach thousands of qualified engineers.
            </p>
          </div>
          <Link
            href="/employer/jobs/new"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-purple)] px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Post a Job
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* Brand col */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <img
                src="/logo.png.png"
                alt="TechnicalJobBoard"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
              Curated technical roles from trusted teams. Built for engineers,
              by people who understand technical hiring.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              <SocialLink href="#" label="Twitter / X">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.918l4.259 5.63 4.817-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialLink>
              <SocialLink href="#" label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialLink>
              <SocialLink href="#" label="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Links cols */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                <div key={section}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    {section}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/60 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter col */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Stay in the loop
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/55">
              Get weekly curated technical jobs and hiring insights delivered to
              your inbox.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <p>{"© " + year + " TechnicalJobBoard. All rights reserved."}</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="transition hover:text-white/70">Terms</Link>
            <Link href="/privacy" className="transition hover:text-white/70">Privacy</Link>
            <Link href="/support" className="transition hover:text-white/70">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}