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
    description: "Application security, cloud controls, secure SDLC",
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
    description: "Data pipelines, analytics infrastructure",
    type: "Full-time",
    pay: "$125k – $175k",
    posted: "Recently",
    href: "/all-jobs?q=Data",
  },
  {
    id: "fallback-6",
    title: "Site Reliability Engineer",
    company: "NovaTech",
    location: "Remote • United States",
    description: "Observability, reliability, incident response",
    type: "Full-time",
    pay: "$135k – $185k",
    posted: "Recently",
    href: "/all-jobs?q=SRE&remote=true",
  },
  {
    id: "fallback-7",
    title: "Cloud Infrastructure Engineer",
    company: "Atlas Systems",
    location: "Seattle, WA",
    description: "AWS infrastructure, Terraform, cloud architecture",
    type: "Full-time",
    pay: "$140k – $180k",
    posted: "Recently",
    href: "/all-jobs?q=Cloud",
  },
  {
    id: "fallback-8",
    title: "Full Stack Engineer",
    company: "BlueWave",
    location: "Remote • United States",
    description: "React, Node.js, GraphQL • modern SaaS platform",
    type: "Full-time",
    pay: "$120k – $165k",
    posted: "Recently",
    href: "/all-jobs?q=Fullstack",
  },
  {
    id: "fallback-9",
    title: "Machine Learning Engineer",
    company: "DeepVision",
    location: "San Francisco, CA",
    description: "ML pipelines, model deployment, data platforms",
    type: "Full-time",
    pay: "$150k – $210k",
    posted: "Recently",
    href: "/all-jobs?q=Machine+Learning",
  },
  {
    id: "fallback-10",
    title: "Platform Engineer",
    company: "GridWorks",
    location: "Remote • United States",
    description: "Internal developer platforms and tooling",
    type: "Full-time",
    pay: "$135k – $175k",
    posted: "Recently",
    href: "/all-jobs?q=Platform",
  },
  {
    id: "fallback-11",
    title: "Mobile Engineer (React Native)",
    company: "Pulse Apps",
    location: "Boston, MA",
    description: "React Native apps with strong product UX",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "Recently",
    href: "/all-jobs?q=Mobile",
  },
  {
    id: "fallback-12",
    title: "Security Operations Engineer",
    company: "ShieldTech",
    location: "Remote • United States",
    description: "Threat detection, SIEM, incident response",
    type: "Full-time",
    pay: "$130k – $180k",
    posted: "Recently",
    href: "/all-jobs?q=Security",
  },
];

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

  if (min && max) {
    return `$${Number(min).toLocaleString()} – $${Number(max).toLocaleString()}`;
  }
  if (min) return `From $${Number(min).toLocaleString()}`;
  if (max) return `Up to $${Number(max).toLocaleString()}`;
  return "Compensation not listed";
}

function toCardJob(j: ApiJob): FeaturedCardJob {
  const company = j.company?.name ?? "Company";
  const location = j.remote ? "Remote" : pickLocation(j);
  const type = j.jobType ?? "Full-time";
  const pay = payText(j);
  const posted = j.publishedAt ? "Recently" : "Recently";

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

function companyInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "C";
}

export default function FeaturedJobsSection() {
  const [items, setItems] = useState<FeaturedCardJob[]>([]);
  const [loading, setLoading] = useState(true);

  const displayJobs = useMemo(() => {
    return items.length ? items : FALLBACK_FEATURED_JOBS;
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

        if (!res.ok || data?.ok === false) {
          throw new Error(data?.error || "Failed to load");
        }

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

  const scrollByAmount = (dx: number) => {
    document
      .getElementById("featured-carousel")
      ?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-2">
      <div className="flex items-start justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Featured roles
          </p>
          <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-tight text-[#0F172A]">
            Opportunities worth a closer look
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
            {loading
              ? "Loading live roles..."
              : "A focused selection of technical roles from employers actively hiring."}
          </p>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scrollByAmount(-420)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(420)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#F6F8FC] to-transparent sm:w-10 lg:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#F6F8FC] to-transparent sm:w-10 lg:w-16" />

        <div
          id="featured-carousel"
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 pr-4 scroll-smooth sm:gap-6 sm:px-6 lg:gap-7 lg:px-8"
        >
          {displayJobs.map((job) => (
            <article
              key={job.id}
              className="snap-start flex min-h-[320px] w-[320px] flex-none flex-col rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:w-[360px] lg:w-[390px]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border border-[rgba(106,111,242,0.14)] bg-[rgba(106,111,242,0.08)] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--brand-purple)]">
                  Featured
                </span>

                <span className="text-xs font-medium text-slate-400">
                  {job.posted}
                </span>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#0F172A] text-sm font-bold text-white shadow-sm">
                  {companyInitial(job.company)}
                </div>

                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-[1.05rem] font-bold leading-6 text-[#0F172A]">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {job.company} • {job.location}
                  </p>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                {job.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {job.type}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {job.pay}
                </span>
              </div>

              <div className="mt-auto pt-6">
                <Link
                  href={job.href}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(2,6,23,0.18)] transition hover:bg-slate-800"
                >
                  View role
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}