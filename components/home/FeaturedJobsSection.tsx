"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import JobDetailsSheet, {
  FeaturedCardJob,
} from "@/components/jobs/JobDetailsSheet";

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
  company?: { name?: string | null } | null;
  locations?: Array<{
    label?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
  }>;
};

function pickLocation(j: ApiJob) {
  if (j.remote) return "Remote";
  const l0 = j.locations?.[0];
  return (
    l0?.label ||
    [l0?.city, l0?.state].filter(Boolean).join(", ") ||
    l0?.country ||
    "United States"
  );
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
  return {
    id: j.id,
    title: j.title,
    company: j.company?.name ?? "Company",
    location: j.remote ? "Remote" : pickLocation(j),
    description: j.description,
    type: j.jobType ?? "Full-time",
    pay: payText(j),
    posted: "Recently",
    href: `/jobs/${j.id}`,
  };
}

function getCompanyLogo(company: string) {
  const key = company.toLowerCase().trim();

  if (key.includes("architect")) {
    return { src: "/Architects.png", alt: "Architects" };
  }
  if (key.includes("vermot")) {
    return { src: "/vermot.png", alt: "Vermot" };
  }
  if (key.includes("devops")) {
    return { src: "/Devops.png", alt: "DevOps" };
  }
  if (key.includes("hired")) {
    return { src: "/Hiredengineer.png", alt: "Hired Engineer" };
  }
  if (key.includes("redtail")) {
    return { src: "/redtail.png", alt: "Redtail" };
  }

  return null;
}

function JobCard({
  job,
  onOpen,
}: {
  job: FeaturedCardJob;
  onOpen: (job: FeaturedCardJob) => void;
}) {
  const logo = getCompanyLogo(job.company);

  return (
    <article
      className="
        group relative flex min-h-[156px] w-[88vw] max-w-[372px] flex-none snap-center flex-col
        overflow-hidden rounded-[20px] border border-slate-200
        bg-white
        shadow-[0_4px_14px_rgba(15,23,42,0.035)]
        transition duration-200
        hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]
        sm:w-[360px] lg:w-full lg:max-w-none
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[var(--brand-purple)]/18 blur-2xl sm:h-20 sm:w-20 sm:bg-[var(--brand-purple)]/12" />
      </div>

      <div className="absolute left-0 top-5 h-10 w-1.5 rounded-r-full bg-[var(--brand-purple)]" />
      <div className="absolute right-0 top-5 h-10 w-1 rounded-l-full bg-[var(--brand-purple)]/45" />

      <div className="relative flex h-full flex-col p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
            {logo ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={40}
                height={40}
                className="h-7 w-7 object-contain"
              />
            ) : (
              <span className="text-sm font-bold text-[var(--brand-purple)]">
                {job.company.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <button onClick={() => onOpen(job)} className="min-w-0 text-left">
                <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-[#0B1222] transition-colors group-hover:text-[var(--brand-purple)]">
                  {job.title}
                </h3>
              </button>

              <span className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                {job.pay}
              </span>
            </div>

            <p className="mt-1 truncate text-xs text-slate-500">
              {job.company} • {job.location}
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-slate-600">
          {job.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700">
            {job.type}
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700">
            Posted {job.posted}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <button
            onClick={() => onOpen(job)}
            className="
              inline-flex h-8 items-center justify-center rounded-full
              bg-[#0B1222] px-4 text-xs font-semibold text-white
              transition duration-200 hover:bg-[#111827]
            "
          >
            Apply
          </button>

          <button
            onClick={() => onOpen(job)}
            className="text-xs font-semibold text-[var(--brand-purple)] transition hover:opacity-80"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedJobsSection() {
  const [items, setItems] = useState<FeaturedCardJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<FeaturedCardJob | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const railRef = useRef<HTMLDivElement | null>(null);

  const displayJobs = useMemo(() => {
    if (!items.length) return FALLBACK_FEATURED_JOBS;

    const existingIds = new Set(items.map((job) => job.id));
    const fillerJobs = FALLBACK_FEATURED_JOBS.filter(
      (job) => !existingIds.has(job.id)
    );

    return [...items, ...fillerJobs].slice(0, 12);
  }, [items]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
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
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const openDetails = (job: FeaturedCardJob) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
  };

  const scrollRail = (amount: number) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        id="featured-jobs"
        className="relative overflow-hidden rounded-[28px] bg-[#F8FAFC] px-4 py-6 sm:px-5 sm:py-7"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[var(--brand-purple)]/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(106,111,242,0.04),transparent_28%,transparent_72%,rgba(99,102,241,0.03))]" />
        </div>

        <div className="relative">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0B1222] sm:text-[2rem]">
                Roles Worth Exploring
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                A curated selection of technical roles with clearer expectations,
                trusted employers, and salary visibility.
              </p>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => scrollRail(-280)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:bg-white"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollRail(280)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:bg-white"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <div
              ref={railRef}
              className="
                no-scrollbar -mx-2 flex gap-4 overflow-x-auto px-2 pb-2 pt-1
                scroll-smooth snap-x snap-mandatory
                [scrollbar-width:none] [-ms-overflow-style:none]
                lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0
              "
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {displayJobs.map((job) => (
                <JobCard key={job.id} job={job} onOpen={openDetails} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <JobDetailsSheet
        job={selectedJob}
        open={detailsOpen}
        onClose={closeDetails}
        logo={selectedJob ? getCompanyLogo(selectedJob.company) : null}
      />
    </>
  );
}