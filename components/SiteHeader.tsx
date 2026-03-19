"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
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
      className={[
        "rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-[rgba(106,111,242,0.12)] text-[var(--brand-purple)]"
          : "text-slate-900 hover:bg-slate-50 hover:text-[var(--brand-purple)]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function MobileStripLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "mobile-strip-link shrink-0 whitespace-nowrap text-[13px] font-semibold",
        active ? "active text-[var(--brand-purple)]" : "",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const stopTimer = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      if (delta > 0 && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => {
        setHidden(false);
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
    };
  }, [open]);

  function handlePostJob() {
    router.push("/post-job");
  }

  return (
    <>
      <header
        className={[
          "fixed left-0 right-0 top-0 z-50 w-full transition-transform duration-200 ease-out",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto hidden h-24 max-w-7xl items-center justify-between px-4 sm:px-6 md:flex md:h-28 lg:px-8">
            <Link href="/" className="flex items-center">
              <img
                src="/Technicaljoblogo-removebg-preview.png"
                alt="TechnicalJobboard"
                className="h-20 w-auto object-contain sm:h-24 md:h-28"
              />
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/all-jobs">All Jobs</NavLink>
              <Link
                href="/#categories"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 hover:text-[var(--brand-purple)]"
              >
                Categories
              </Link>
              <NavLink href="/jobseeker/login">Jobseeker</NavLink>
              <NavLink href="/employer/login">Employer</NavLink>
              <button
                type="button"
                onClick={handlePostJob}
                className="ml-2 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-purple-dark)]"
              >
                Post Job
              </button>
            </nav>
          </div>

          <div className="md:hidden">
            <div className="mx-auto flex h-24 items-center justify-between px-4">
              <Link href="/" className="flex items-center">
                <img
                  src="/Technicaljoblogo-removebg-preview.png"
                  alt="TechnicalJobboard"
                  className="h-20 w-auto object-contain"
                />
              </Link>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Search"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-950 transition hover:bg-slate-100"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Toggle menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-950 transition hover:bg-slate-100"
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 px-4 py-3">
              <div className="no-scrollbar flex items-center gap-2 overflow-x-auto text-[13px]">
                <MobileStripLink href="/#categories" active>Tech</MobileStripLink>
                <span className="shrink-0 text-slate-300">•</span>
                <MobileStripLink href="/#categories">Engineering</MobileStripLink>
                <span className="shrink-0 text-slate-300">•</span>
                <MobileStripLink href="/#categories">Cloud</MobileStripLink>
                <span className="shrink-0 text-slate-300">•</span>
                <MobileStripLink href="/#categories">Energy</MobileStripLink>

                <button
                  type="button"
                  onClick={handlePostJob}
                  className="ml-auto shrink-0 rounded-full bg-[var(--brand-purple)] px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[var(--brand-purple-dark)]"
                >
                  Post a Job
                </button>
              </div>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden">
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/30"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-50 border-t border-slate-200 bg-white">
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
                <NavLink href="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink href="/all-jobs" onClick={() => setOpen(false)}>All Jobs</NavLink>
                <Link
                  href="/#categories"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 hover:text-[var(--brand-purple)]"
                >
                  Categories
                </Link>
                <NavLink href="/jobseeker/login" onClick={() => setOpen(false)}>Jobseeker</NavLink>
                <NavLink href="/employer/login" onClick={() => setOpen(false)}>Employer Login</NavLink>

                <div className="border-t border-slate-100 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handlePostJob();
                    }}
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--brand-purple)] text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-purple-dark)]"
                  >
                    Post a Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="h-[136px] md:h-28" />
    </>
  );
}