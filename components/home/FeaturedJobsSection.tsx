"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

type LogoResult = { src: string; alt: string } | null;

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

function getCompanyLogo(company: string): LogoResult {
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
  const hasPay = job.pay !== "Compensation not listed";

  return (
    <article className="group relative flex min-h-[156px] w-[88vw] max-w-[372px] flex-none snap-start flex-col overflow-hidden rounded-[22px] border border-slate-200/90 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-[2px] hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:w-[360px] lg:w-full lg:max-w-none">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[var(--brand-purple)]/14 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-20 w-20 rounded-full bg-emerald-400/10 blur-2xl" />
      </div>

      <div className="absolute left-0 top-5 h-10 w-1.5 rounded-r-full bg-[var(--brand-purple)]" />
      <div className="absolute right-0 top-5 h-10 w-1 rounded-l-full bg-emerald-400/50" />

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
              <button
                type="button"
                onClick={() => onOpen(job)}
                className="min-w-0 text-left"
              >
                <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-[#0B1222] transition-colors duration-200 group-hover:text-[var(--brand-purple)]">
                  {job.title}
                </h3>
              </button>

              {hasPay && (
                <span className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  {job.pay}
                </span>
              )}
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
            type="button"
            onClick={() => onOpen(job)}
            className="inline-flex h-8 items-center justify-center rounded-full bg-[#0B1222] px-4 text-xs font-semibold text-white transition duration-200 hover:bg-[var(--brand-purple)]"
          >
            Apply
          </button>

          <button
            type="button"
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

  const desktopPageCount = Math.max(1, Math.ceil(allJobs.length / 6));

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

        if (!cancelled) {
          setItems(mapped);
        }
      } catch {
        if (!cancelled) {
          setItems([]);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (desktopPage > desktopPageCount - 1) {
      setDesktopPage(0);
    }
  }, [desktopPage, desktopPageCount]);

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
    const isDesktop =
      typeof window !== "undefined" && window.innerWidth >= 1024;

    if (isDesktop) {
      setDesktopPage((prev) => {
        if (direction === "left") {
          return Math.max(0, prev - 1);
        }
        return Math.min(desktopPageCount - 1, prev + 1);
      });
      return;
    }

    scrollRail(direction);
  };

  return (
    <>
 <section
  id="featured-jobs"
  className="relative overflow-hidden py-16 sm:py-20"
  style={{
    background: "#F7F8FB",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zM28 100L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='rgba(99%2C102%2C241%2C0.07)' stroke-width='0.8'/%3E%3C/svg%3E\")",
    backgroundSize: "56px 100px",
  }}
>
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_15%_-10%,rgba(124,58,237,0.10),transparent),radial-gradient(900px_500px_at_85%_0%,rgba(16,185,129,0.07),transparent)]" />
    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F7F8FB]/80 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F7F8FB]/80 to-transparent" />
  </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-purple)]">
                Featured Jobs
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1222] sm:text-4xl">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition hover:border-slate-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => handleArrow("right")}
                disabled={desktopPage >= desktopPageCount - 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition hover:border-slate-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

          <div className="lg:hidden">
            <div
              ref={railRef}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-1 scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {allJobs.map((job) => (
                <JobCard key={job.id} job={job} onOpen={openDetails} />
              ))}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
            {desktopJobs.map((job) => (
              <JobCard key={job.id} job={job} onOpen={openDetails} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/all-jobs"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white/95 px-8 text-[14px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-slate-300 hover:bg-white"
            >
              View all jobs →
            </Link>
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