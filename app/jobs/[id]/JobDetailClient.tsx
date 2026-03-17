"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Location = {
  id: string;
  country: string | null;
  city: string | null;
  label: string | null;
};

type Skill = {
  id: string;
  name: string;
};

type Company = {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string | null;
  industry: string | null;
  size: string | null;
  hqLocation: string | null;
  description: string | null;
};

type Job = {
  id: string;
  title: string;
  description: string;
  jobType: string | null;
  level: string | null;
  remote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  publishedAt: Date | null;
  company: Company;
  locations: Location[];
  skills: Skill[];
};

type Props = {
  job: Job;
};

function getCompanyLogo(companyName: string) {
  const key = companyName.toLowerCase().trim();
  if (key.includes("architect")) return { src: "/Architects.png", alt: "Architects" };
  if (key.includes("vermot")) return { src: "/vermot.png", alt: "Vermot" };
  if (key.includes("devops")) return { src: "/Devops.png", alt: "DevOps" };
  if (key.includes("hired")) return { src: "/Hiredengineer.png", alt: "Hired Engineer" };
  if (key.includes("redtail")) return { src: "/redtail.png", alt: "Redtail" };
  return null;
}

function fmtMoney(
  min?: number | null,
  max?: number | null,
  currency?: string | null
) {
  const symbol =
    currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  const a = typeof min === "number" ? min : null;
  const b = typeof max === "number" ? max : null;
  if (a != null && b != null)
    return symbol + a.toLocaleString() + " – " + symbol + b.toLocaleString();
  if (a != null) return "From " + symbol + a.toLocaleString();
  if (b != null) return "Up to " + symbol + b.toLocaleString();
  return "Salary not listed";
}

function pickLocation(job: Job) {
  if (job.remote) return "Remote";
  const l = job.locations?.[0];
  return (
    l?.label ||
    [l?.city, l?.country].filter(Boolean).join(", ") ||
    "United States"
  );
}

function timeAgo(date: Date | null) {
  if (!date) return "Recently";
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
  if (seconds < 604800) return Math.floor(seconds / 86400) + "d ago";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const RESPONSIBILITIES = [
  "Lead and contribute to high-quality product delivery.",
  "Work closely with design, product, and engineering teams.",
  "Build scalable, maintainable, and well-tested features.",
  "Support usability, accessibility, and performance improvements.",
  "Participate in code reviews and engineering discussions.",
  "Take ownership of features from planning through to delivery.",
];

const REQUIREMENTS = [
  "Proven experience in a similar technical role.",
  "Strong communication and team collaboration skills.",
  "Comfortable working with modern tools and workflows.",
  "Ability to take ownership from planning to delivery.",
  "A portfolio or examples of previous work is a plus.",
];

const BENEFITS = [
  { icon: "🏥", label: "Health Insurance" },
  { icon: "🏖️", label: "Paid Time Off" },
  { icon: "🏠", label: "Flexible / Remote Work" },
  { icon: "📈", label: "Career Growth" },
  { icon: "💻", label: "Equipment Stipend" },
  { icon: "🎓", label: "Learning Budget" },
];

export default function JobDetailClient({ job }: Props) {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const logo = getCompanyLogo(job.company?.name ?? "");
  const location = pickLocation(job);
  const salary = fmtMoney(job.salaryMin, job.salaryMax, job.currency);
  const postedAt = timeAgo(job.publishedAt);

  const paragraphs = (job.description ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  function handleCopyLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  function getLinkedInUrl() {
    if (typeof window === "undefined") return "#";
    return (
      "https://www.linkedin.com/sharing/share-offsite/?url=" +
      encodeURIComponent(window.location.href)
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F6FB]">

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition">
            Home
          </Link>
          <span>›</span>
          <Link href="/all-jobs" className="hover:text-slate-800 transition">
            All Jobs
          </Link>
          <span>›</span>
          <span className="text-slate-800 font-semibold truncate max-w-[200px]">
            {job.title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT: Main content ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Job header card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4">

                {/* Company logo */}
                <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={56}
                      height={56}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <span className="text-xl font-extrabold text-[var(--brand-purple)]">
                      {(job.company?.name ?? "C").charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Title + company */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1222] leading-tight">
                        {job.title}
                      </h1>
                      <p className="mt-1 text-base text-slate-600">
                        <span className="font-semibold text-slate-800">
                          {job.company?.name ?? "Company"}
                        </span>
                        {" • "}
                        {location}
                        {job.remote && (
                          <>
                            {" • "}
                            <span className="text-[var(--brand-purple)] font-semibold">
                              Remote
                            </span>
                          </>
                        )}
                      </p>
                    </div>

                    {/* Save button */}
                    <button
                      type="button"
                      onClick={() => setSaved((v) => !v)}
                      className={
                        "flex-none h-10 w-10 rounded-full border flex items-center justify-center transition " +
                        (saved
                          ? "border-[var(--brand-purple)] bg-[var(--brand-purple)] text-white"
                          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300")
                      }
                      aria-label="Save job"
                    >
                      {saved ? "♥" : "♡"}
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.jobType && (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        {job.jobType}
                      </span>
                    )}
                    {job.level && (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        {job.level}
                      </span>
                    )}
                    {job.remote && (
                      <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        Remote
                      </span>
                    )}
                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {salary}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                      Posted {postedAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApplied(true)}
                  disabled={applied}
                  className={
                    "h-12 px-8 rounded-2xl text-sm font-extrabold transition shadow-sm " +
                    (applied
                      ? "bg-emerald-500 text-white cursor-default"
                      : "bg-[var(--brand-purple)] text-white hover:opacity-90")
                  }
                >
                  {applied ? "✓ Application Sent" : "Apply Now"}
                </button>

                <Link
                  href="/all-jobs"
                  className="h-12 px-6 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 inline-flex items-center hover:bg-slate-50 transition"
                >
                  ← Back to jobs
                </Link>
              </div>
            </div>

            {/* Skills */}
            {job.skills?.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-extrabold text-[#0B1222]">
                  Skills &amp; Technologies
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job description */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-extrabold text-[#0B1222]">
                Job Description
              </h2>
              <div className="mt-4 space-y-4">
                {paragraphs.length > 0 ? (
                  paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-[15px] leading-7 text-slate-600"
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No description provided.
                  </p>
                )}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-extrabold text-[#0B1222]">
                Responsibilities
              </h2>
              <ul className="mt-4 space-y-3">
                {RESPONSIBILITIES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-600"
                  >
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[var(--brand-purple)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-extrabold text-[#0B1222]">
                Requirements
              </h2>
              <ul className="mt-4 space-y-3">
                {REQUIREMENTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-600"
                  >
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-extrabold text-[#0B1222]">
                Benefits
              </h2>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BENEFITS.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                  >
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-xs font-semibold text-slate-700">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom apply CTA */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-extrabold text-[#0B1222]">
                Ready to apply?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Submit your application for{" "}
                <span className="font-semibold text-slate-800">
                  {job.title}
                </span>{" "}
                at{" "}
                <span className="font-semibold text-slate-800">
                  {job.company?.name ?? "this company"}
                </span>
                . Make sure your profile and resume are up to date before
                applying.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setApplied(true)}
                  disabled={applied}
                  className={
                    "h-12 px-8 rounded-2xl text-sm font-extrabold transition shadow-sm " +
                    (applied
                      ? "bg-emerald-500 text-white cursor-default"
                      : "bg-[var(--brand-purple)] text-white hover:opacity-90")
                  }
                >
                  {applied ? "✓ Application Sent" : "Apply Now"}
                </button>
                <Link
                  href="/all-jobs"
                  className="h-12 px-6 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 inline-flex items-center hover:bg-slate-50 transition"
                >
                  Browse more jobs
                </Link>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-5">

              {/* Job summary */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold text-[#0B1222]">
                  Job Summary
                </h2>
                <dl className="mt-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <dt className="text-xs font-semibold text-slate-500 shrink-0">
                      Salary
                    </dt>
                    <dd className="text-xs font-extrabold text-emerald-700 text-right">
                      {salary}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <dt className="text-xs font-semibold text-slate-500 shrink-0">
                      Job type
                    </dt>
                    <dd className="text-xs font-semibold text-slate-800 text-right">
                      {job.jobType ?? "—"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <dt className="text-xs font-semibold text-slate-500 shrink-0">
                      Level
                    </dt>
                    <dd className="text-xs font-semibold text-slate-800 text-right">
                      {job.level ?? "—"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <dt className="text-xs font-semibold text-slate-500 shrink-0">
                      Location
                    </dt>
                    <dd className="text-xs font-semibold text-slate-800 text-right">
                      {location}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <dt className="text-xs font-semibold text-slate-500 shrink-0">
                      Remote
                    </dt>
                    <dd className="text-xs font-semibold text-slate-800 text-right">
                      {job.remote ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <dt className="text-xs font-semibold text-slate-500 shrink-0">
                      Posted
                    </dt>
                    <dd className="text-xs font-semibold text-slate-800 text-right">
                      {postedAt}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setApplied(true)}
                  disabled={applied}
                  className={
                    "mt-5 h-11 w-full rounded-2xl text-sm font-extrabold transition shadow-sm " +
                    (applied
                      ? "bg-emerald-500 text-white cursor-default"
                      : "bg-[var(--brand-purple)] text-white hover:opacity-90")
                  }
                >
                  {applied ? "✓ Applied" : "Apply Now"}
                </button>

                <button
                  type="button"
                  onClick={() => setSaved((v) => !v)}
                  className={
                    "mt-2 h-11 w-full rounded-2xl border text-sm font-extrabold transition " +
                    (saved
                      ? "border-[var(--brand-purple)] text-[var(--brand-purple)] bg-indigo-50"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50")
                  }
                >
                  {saved ? "♥ Saved" : "♡ Save Job"}
                </button>
              </div>

              {/* About company */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold text-[#0B1222]">
                  About {job.company?.name ?? "Company"}
                </h2>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    {logo ? (
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={44}
                        height={44}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="text-lg font-extrabold text-[var(--brand-purple)]">
                        {(job.company?.name ?? "C").charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      {job.company?.name}
                    </p>
                    {job.company?.industry && (
                      <p className="text-xs text-slate-500">
                        {job.company.industry}
                      </p>
                    )}
                  </div>
                </div>

                <dl className="mt-4 space-y-2">
                  {job.company?.size && (
                    <div className="flex items-center justify-between">
                      <dt className="text-xs text-slate-500">Company size</dt>
                      <dd className="text-xs font-semibold text-slate-800">
                        {job.company.size} employees
                      </dd>
                    </div>
                  )}
                  {job.company?.hqLocation && (
                    <div className="flex items-center justify-between">
                      <dt className="text-xs text-slate-500">Headquarters</dt>
                      <dd className="text-xs font-semibold text-slate-800">
                        {job.company.hqLocation}
                      </dd>
                    </div>
                  )}
                  {job.company?.website && (
                    <div className="flex items-center justify-between">
                      <dt className="text-xs text-slate-500">Website</dt>
                      <dd className="text-xs font-semibold text-[var(--brand-purple)]">
                        
                          href={job.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Visit site →
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                {job.company?.description && (
                  <p className="mt-4 text-xs leading-6 text-slate-600">
                    {job.company.description}
                  </p>
                )}
              </div>

              {/* Share */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold text-[#0B1222]">
                  Share this job
                </h2>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex-1 h-10 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy link"}
                  </button>
                  
                    href={getLinkedInUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-10 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition inline-flex items-center justify-center"
                  >
                    in Share
                  </a>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}