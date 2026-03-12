"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export type FeaturedCardJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  pay: string;
  posted: string;
  href: string;
};

type Props = {
  job: FeaturedCardJob | null;
  open: boolean;
  onClose: () => void;
  logo?: { src: string; alt: string } | null;
};

export default function JobDetailsSheet({
  job,
  open,
  onClose,
  logo,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !job) return null;

  return (
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Close job details"
        onClick={onClose}
        className="absolute inset-0 bg-[#0b1222]/40 backdrop-blur-[2px]"
      />

      <div
        className="
          absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-[28px] bg-white shadow-2xl
          lg:inset-y-6 lg:right-6 lg:left-auto lg:w-[720px] lg:max-h-[calc(100vh-48px)] lg:rounded-[28px]
        "
      >
        <div className="flex h-full flex-col">
          <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={44}
                      height={44}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="text-sm font-extrabold text-[var(--brand-purple)]">
                      {job.company.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--brand-purple)]">
                    Featured Job
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold leading-tight text-[#0B1222] sm:text-2xl">
                    {job.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 sm:text-[15px]">
                    {job.company} • {job.location}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                  {job.type}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                  {job.pay}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                  Posted {job.posted}
                </span>
              </div>

              <section className="rounded-3xl border border-slate-200 bg-[#fafbff] p-5">
                <h3 className="text-base font-bold text-[#0B1222]">
                  Job overview
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {job.description}
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0B1222]">
                  Responsibilities
                </h3>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  <li>Lead and contribute to high-quality product delivery.</li>
                  <li>Work closely with design, product, and engineering teams.</li>
                  <li>Build scalable and maintainable features.</li>
                  <li>Support usability, accessibility, and performance improvements.</li>
                </ul>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0B1222]">
                  Requirements
                </h3>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  <li>Strong relevant experience for this role.</li>
                  <li>Good communication and team collaboration.</li>
                  <li>Comfort working with modern tools and workflows.</li>
                  <li>Ability to take ownership from planning to delivery.</li>
                </ul>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0B1222]">
                  Benefits
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#f5f7fb] px-3 py-1.5 text-xs font-medium text-slate-700">
                    Health cover
                  </span>
                  <span className="rounded-full bg-[#f5f7fb] px-3 py-1.5 text-xs font-medium text-slate-700">
                    Flexible work
                  </span>
                  <span className="rounded-full bg-[#f5f7fb] px-3 py-1.5 text-xs font-medium text-slate-700">
                    Paid time off
                  </span>
                  <span className="rounded-full bg-[#f5f7fb] px-3 py-1.5 text-xs font-medium text-slate-700">
                    Career growth
                  </span>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0B1222]">
                  About {job.company}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {job.company} is hiring for a role designed for candidates who
                  want meaningful work, clear growth opportunities, and a strong
                  professional environment.
                </p>
              </section>
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#0B1222]">
                  {job.title}
                </p>
                <p className="text-xs text-slate-500">
                  {job.company} • {job.location}
                </p>
              </div>

              <Link
                href={job.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand-purple)] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(106,111,242,0.24)] transition hover:opacity-95"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}