"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type FeaturedCardJob = {
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

// Keep UI alive even if DB has 0 jobs
const FALLBACK_FEATURED_JOBS: FeaturedCardJob[] = [
  {
    id: "fallback-1",
    title: "Frontend Developer",
    company: "Vermot",
    location: "Remote • United States",
    description: "React, Next.js, TypeScript",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "Recently",
    href: "/all-jobs",
  },
  {
    id: "fallback-2",
    title: "DevOps Engineer",
    company: "Architects",
    location: "New York, NY",
    description: "AWS, Docker, Kubernetes, CI/CD",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "Recently",
    href: "/all-jobs",
  },
  {
    id: "fallback-3",
    title: "BIM / CAD Specialist",
    company: "Empower",
    location: "Chicago, IL",
    description: "Revit, AutoCAD, BIM coordination",
    type: "Contract",
    pay: "$70/hr",
    posted: "Recently",
    href: "/all-jobs",
  },
  {
    id: "fallback-4",
    title: "Backend Engineer",
    company: "Devops",
    location: "Remote",
    description: "Node.js, Postgres, Prisma",
    type: "Full-time",
    pay: "$130k – $175k",
    posted: "Recently",
    href: "/all-jobs",
  },
];

// API types (matches your prisma include structure)
type ApiJob = {
  id: string;
  title: string;
  description: string;
  jobType?: string | null;
  remote?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string | null;
  publishedAt?: string | null;
  company?: { name?: string | null } | null;
  locations?: Array<{
    label?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
  }>;
  skills?: Array<{ name: string }>;
};

function pickLocation(j: ApiJob) {
  if (j.remote) return "Remote";
  const l0 = j.locations?.[0];
  const label =
    l0?.label ||
    [l0?.city, l0?.state].filter(Boolean).join(", ") ||
    l0?.country ||
    "United States";
  return label;
}

function payText(j: ApiJob) {
  const min = j.salaryMin ?? null;
  const max = j.salaryMax ?? null;

  if (min && max)
    return `$${Number(min).toLocaleString()} – $${Number(max).toLocaleString()}`;
  if (min) return `From $${Number(min).toLocaleString()}`;
  if (max) return `Up to $${Number(max).toLocaleString()}`;
  return "—";
}

function toCardJob(j: ApiJob): FeaturedCardJob {
  const company = j.company?.name ?? "—";
  const location = j.remote ? "Remote" : pickLocation(j);
  const type = j.jobType ?? "—";
  const pay = payText(j);
  const posted = j.publishedAt ? "Recently" : "—";

  return {
    id: j.id,
    title: j.title,
    company,
    location,
    description: j.description,
    type,
    pay,
    posted,
    href: `/jobs/${j.id}`,
  };
}

export default function FeaturedJobsSection() {
  const [items, setItems] = useState<FeaturedCardJob[]>([]);
  const [loading, setLoading] = useState(true);

  const displayJobs = useMemo(() => {
    if (!items.length) return FALLBACK_FEATURED_JOBS;
    return items;
  }, [items]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch("/api/jobs/search?take=12&skip=0", {
          cache: "no-store",
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok || data?.ok === false)
          throw new Error(data?.error || "Failed to load");

        const apiItems: ApiJob[] = data?.items ?? [];
        const mapped = apiItems.map(toCardJob);

        if (!cancelled) setItems(mapped);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollBy = (dx: number) => {
    document
      .getElementById("featured-carousel")
      ?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-[#F2F4F8] py-14 sm:py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-[#0B1222]">
              Featured Jobs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {loading
                ? "Loading live jobs…"
                : "A curated selection of standout roles from trusted teams."}
            </p>
          </div>

          {/* Controls: stack nicely on mobile */}
          <div className="flex items-center gap-3 sm:mt-1">
            <button
              type="button"
              onClick={() => scrollBy(-520)}
              className="h-12 w-12 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md flex items-center justify-center"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(520)}
              className="h-12 w-12 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md flex items-center justify-center"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            id="featured-carousel"
            className="no-scrollbar flex w-full gap-5 overflow-x-auto pb-6 pr-2 scroll-smooth snap-x snap-mandatory"
          >
            {displayJobs.map((job) => (
              <article
                key={job.id}
                className="snap-start flex-none w-[290px] xs:w-[320px] sm:w-[360px] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--brand-purple)]" />

                <div className="p-5 pl-8">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      Featured
                    </span>

                    <button
                      type="button"
                      aria-label="Save job"
                      className="text-slate-300 transition hover:text-slate-600"
                    >
                      ★
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#0B1222] text-white flex items-center justify-center font-extrabold shadow-sm">
                      {job.company?.charAt(0) || "•"}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-extrabold text-[#0B1222]">
                        {job.title}
                      </h3>
                      <p className="truncate text-sm text-slate-500">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {job.type}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {job.pay}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={job.href}
                      className="btn-primary inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md"
                    >
                      View
                    </Link>

                    <span className="text-xs text-slate-400">
                      Posted {job.posted}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* subtle fade edges */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F2F4F8] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F2F4F8] to-transparent"
            aria-hidden
          />
        </div>

        {!loading && items.length === 0 && (
          <div className="mt-4 text-xs text-slate-500">
            Showing demo featured jobs (publish jobs to replace with live data).
          </div>
        )}
      </div>
    </section>
  );
}