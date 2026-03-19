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

function pickLocation(j: ApiJob): string {
  if (j.remote) return "Remote";
  const l0 = j.locations?.[0];
  return (
    l0?.label ||
    [l0?.city, l0?.state].filter(Boolean).join(", ") ||
    l0?.country ||
    "United States"
  );
}

function payText(j: ApiJob): string {
  const min = j.salaryMin ?? null;
  const max = j.salaryMax ?? null;
  if (min && max)
    return `$${Number(min).toLocaleString()} – $${Number(max).toLocaleString()}`;
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

type LogoResult = { src: string; alt: string } | null;

function getCompanyLogo(company: string): LogoResult {
  const key = company.toLowerCase().trim();
  if (key.includes("architect")) return { src: "/Architects.png", alt: "Architects" };
  if (key.includes("vermot")) return { src: "/vermot.png", alt: "Vermot" };
  if (key.includes("devops")) return { src: "/Devops.png", alt: "DevOps" };
  if (key.includes("hired")) return { src: "/Hiredengineer.png", alt: "Hired Engineer" };
  if (key.includes("redtail")) return { src: "/redtail.png", alt: "Redtail" };
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
  const hasPay = job.pay !== "Compensation not listed";
  const isRemote = job.location.toLowerCase().includes("remote");

  return (
    <article
      onClick={() => onOpen(job)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-[2px] hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] w-[88vw] max-w-[360px] flex-none snap-start lg:w-full lg:max-w-none"
      style={{ boxShadow: "0 2px 12px rgba(15,23,42,0.06)" }}
    >
      {/* Green top accent */}
      <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400" />

      <div className="flex flex-col gap-4 p-5">

        {/* Company row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              {logo ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <span className="text-base font-bold text-[#0b1736]">
                  {job.company.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-slate-700">
                {job.company}
              </p>
              <p className="truncate text-[12px] text-slate-400">
                {job.location}
              </p>
            </div>
          </div>

          {hasPay && (
            <span className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              {job.pay}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-bold leading-snug text-[#0b1736] transition-colors duration-200 group-hover:text-emerald-700">
          {job.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-[13px] leading-6 text-slate-500">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
            {job.type}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
            Posted {job.posted}
          </span>
          {isRemote && (
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              Remote
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onOpen(job); }}
            className="h-9 rounded-xl bg-[#0b1736] px-5 text-[13px] font-semibold text-white transition hover:bg-[#111827]"
            style={{
              boxShadow:
                "0 4px 14px rgba(11,23,54,0.22), 0 2px 10px rgba(16,185,129,0.18)",
            }}
          >
            Apply now
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onOpen(job); }}
            className="text-[13px] font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View details →
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
  const [desktopPage, setDesktopPage] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);

  const allJobs = useMemo(() => {
    if (!items.length) return FALLBACK_FEATURED_JOBS;
    const existingIds = new Set(items.map((j) => j.id));
    const fillerJobs = FALLBACK_FEATURED_JOBS.filter(
      (j) => !existingIds.has(j.id)
    );
    return [...items, ...fillerJobs].slice(0, 12);
  }, [items]);

  const desktopJobs = useMemo(() => {
    const start = desktopPage * 6;
    return allJobs.slice(start, start + 6);
  }, [allJobs, desktopPage]);

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
          throw new Error(data?.error ?? "Failed to load");
        }
        const mapped: FeaturedCardJob[] = (data?.items ?? []).map(toCardJob);
        if (!cancelled) setItems(mapped);
      } catch {
        if (!cancelled) setItems([]);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const openDetails = (job: FeaturedCardJob) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector("article");
    const amount =
      firstCard instanceof HTMLElement ? firstCard.offsetWidth + 16 : 320;
    rail.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleArrow = (direction: "left" | "right") => {
    const lg =
      typeof window !== "undefined" && window.innerWidth >= 1024;
    if (lg) {
      setDesktopPage(direction === "left" ? 0 : 1);
    } else {
      scrollRail(direction);
    }
  };

  return (
    <>
      <section id="featured-jobs" className="w-full bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
                Featured Jobs
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1736] sm:text-4xl">
                Roles Worth Exploring
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-500">
                A curated selection of technical roles with clearer expectations,
                trusted employers, and salary visibility.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => handleArrow("left")}
                disabled={desktopPage === 0}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => handleArrow("right")}
                disabled={desktopPage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

          {/* Mobile / tablet scroll rail */}
          <div className="lg:hidden">
            <div
              ref={railRef}
              className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {allJobs.map((job) => (
                <JobCard key={job.id} job={job} onOpen={openDetails} />
              ))}
            </div>
          </div>

          {/* Desktop 3x2 grid */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
            {desktopJobs.map((job) => (
              <JobCard key={job.id} job={job} onOpen={openDetails} />
            ))}
          </div>

          {/* View all */}
          <div className="mt-10 text-center">
            
              href="/all-jobs"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 text-[14px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              View all jobs →
            </a>
          </div>

        </div>
      </section>

      <JobDetailsSheet
        job={selectedJob}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        logo={selectedJob ? getCompanyLogo(selectedJob.company) : null}
      />
    </>
  );
}