"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/all-jobs", label: "All Jobs" },
  { href: "/#categories", label: "Categories" },
  { href: "/jobseeker/login", label: "Jobseeker" },
  { href: "/employer", label: "Employer" },
];

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : href.startsWith("/#")
      ? false
      : pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={
        "relative px-3 py-2 text-sm font-semibold transition-colors rounded-lg " +
        (active
          ? "text-[var(--brand-purple)]"
          : "text-slate-600 hover:text-slate-900")
      }
    >
      {active && (
        <span className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-[var(--brand-purple)]" />
      )}
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (open) return;
      const y = window.scrollY;
      setScrolled(y > 12);
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      if (delta > 0 && y > 80) setHidden(true);
      else setHidden(false);
      lastY.current = y;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setHidden(false), 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [open]);

  async function handlePostJob() {
    const supabase = supabaseBrowser();
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      router.push("/employer/jobs/new");
    } else {
      router.push("/employer/login?next=/employer/jobs/new");
    }
  }

  async function handlePostJobMobile() {
    setOpen(false);
    await handlePostJob();
  }

  return (
    <>
      <header
        className={
          "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-200 " +
          (hidden ? "-translate-y-full" : "translate-y-0") +
          " " +
          (scrolled
            ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-b border-slate-100 bg-white/90 backdrop-blur-sm")
        }
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/Technicaljoblogo-removebg-preview.png"
              alt="TechnicalJobBoard"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/jobseeker/register"
              className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              Sign up
            </Link>
            <button
              type="button"
              onClick={handlePostJob}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--brand-purple)] px-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Post a Job
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={handlePostJob}
              className="inline-flex h-8 items-center justify-center rounded-lg bg-[var(--brand-purple)] px-3 text-xs font-semibold text-white"
            >
              Post Job
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              {open ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden">
            <button
              type="button"
              className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-50 border-t border-slate-100 bg-white px-4 py-4 shadow-lg">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <NavLink
                    key={l.href}
                    href={l.href}
                    label={l.label}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <Link
                  href="/jobseeker/register"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Create account
                </Link>
                <button
                  type="button"
                  onClick={handlePostJobMobile}
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[var(--brand-purple)] text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Post a Job
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}