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

// ✅ Always keep a full “technical” fallback so UI never looks empty
const FALLBACK_FEATURED_JOBS: FeaturedCardJob[] = [
  {
    id: "fallback-1",
    title: "Senior Frontend Engineer (Next.js)",
    company: "Vermot",
    location: "Remote • United States",
    description: "React, Next.js, TypeScript • performance-first UI",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "Recently",
    href: "/all-jobs?q=Frontend&remote=true",
  },
  {
    id: "fallback-2",
    title: "Backend Engineer (Node / Postgres)",
    company: "Redtail",
    location: "Austin, TX",
    description: "Node.js, Postgres, Prisma • scalable APIs",
    type: "Full-time",
    pay: "$130k – $175k",
    posted: "Recently",
    href: "/all-jobs?q=Backend",
  },
  {
    id: "fallback-3",
    title: "DevOps / Platform Engineer",
    company: "Devops",
    location: "Remote • United States",
    description: "AWS, Docker, Kubernetes, CI/CD • reliability & automation",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "Recently",
    href: "/all-jobs?q=DevOps&remote=true",
  },
  {
    id: "fallback-4",
    title: "Security Engineer (AppSec)",
    company: "Hired Engineer",
    location: "Remote • United States",
    description: "AppSec, cloud controls, secure-by-default SDLC",
    type: "Full-time",
    pay: "$145k – $200k",
    posted: "Recently",
    href: "/all-jobs?q=Security&remote=true",
  },
  {
    id: "fallback-5",
    title: "Data Engineer",
    company: "Architects",
    location: "New York, NY",
    description: "Pipelines, data quality, analytics foundations",
    type: "Full-time",
    pay: "$125k – $175k",
    posted: "Recently",
    href: "/all-jobs?q=Data",
  },
  {
    id: "fallback-6",
    title: "Site Reliability Engineer (SRE)",
    company: "NovaTech",
    location: "Remote • United States",
    description: "Observability, incident response, SLAs, tooling",
    type: "Full-time",
    pay: "$135k – $185k",
    posted: "Recently",
    href: "/all-jobs?q=SRE&remote=true",
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

  if (min && max) return `$${Number(min).toLocaleString()} – $${Number(max).toLocaleString()}`;
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

  // ✅ If API returns nothing or fails, keep full fallback list
  const displayJobs = useMemo(() => {
    return items.length ? items : FALLBACK_FEATURED_JOBS;
  }, [items]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch("/api/jobs/search?take=12&skip=0", { cache: "no-store" });
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok || data?.ok === false) throw new Error(data?.error || "Failed to load");

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
    document.getElementById("featured-carousel")?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section id="featured" className="relative overflow-hidden py-16 bg-[#F2F4F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1222]">
              Featured Jobs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {loading ? "Loading live jobs…" : "A curated selection of standout technical roles."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-520)}
              className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(520)}
              className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative mt-10">
          <div
            id="featured-carousel"
            className="no-scrollbar flex gap-7 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory w-full pr-6"
          >
            {displayJobs.map((job) => (
              <article
                key={job.id}
                className="snap-start flex-none w-[320px] sm:w-[360px] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--brand-purple)]" />

                <div className="p-5 pl-8">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      Featured
                    </span>

                    <button
                      type="button"
                      aria-label="Save job"
                      className="text-slate-300 hover:text-slate-600 transition"
                    >
                      ★
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#0B1222] text-white flex items-center justify-center font-extrabold shadow-sm">
                      {job.company.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-[#0B1222] truncate">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-500 truncate">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 truncate">{job.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                      {job.type}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                      {job.pay}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={job.href}
                      className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md inline-flex"
                    >
                      View
                    </Link>

                    <span className="text-xs text-slate-400">Posted {job.posted}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ✅ This line makes it clear it’s demo data (only when fallback is being used) */}
        {!loading && items.length === 0 && (
          <div className="mt-4 text-xs text-slate-500">
            Showing demo featured jobs (publish jobs to replace with live data).
          </div>
        )}
      </div>
    </section>
  );
}