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
    return { src: "/Devops.png", alt: "Devops" };
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
        relative flex min-h-[158px] w-[240px] flex-none snap-start flex-col
        rounded-2xl border border-slate-200 bg-white p-4
        shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition duration-300
        hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]
        sm:w-[250px] lg:w-[270px]
      "
    >
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

        <div className="min-w-0">
          <button
            type="button"
            onClick={() => onOpen(job)}
            className="text-left"
          >
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-[#0B1222]">
              {job.title}
            </h3>
          </button>

          <p className="mt-1 truncate text-sm text-slate-500">{job.location}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{job.pay}</p>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={() => onOpen(job)}
          className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--brand-purple)] px-4 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Apply
        </button>
      </div>
    </article>
  );
}

export default function FeaturedJobsSection() {
  const [items, setItems] = useState<FeaturedCardJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<FeaturedCardJob | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const railRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const stop = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const start = () => {
      stop();

      intervalRef.current = window.setInterval(() => {
        if (!rail || isHoveringRef.current) return;

        const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
        const next = rail.scrollLeft + 1;

        if (next >= maxScrollLeft) {
          rail.scrollLeft = 0;
        } else {
          rail.scrollLeft = next;
        }
      }, 28);
    };

    start();
    window.addEventListener("resize", start);

    return () => {
      stop();
      window.removeEventListener("resize", start);
    };
  }, [displayJobs]);

  const openDetails = (job: FeaturedCardJob) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
  };

  const scrollRail = (amount: number) => {
    railRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      <section className="relative">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0B1222]">Featured Jobs</h2>
            <p className="mt-1 text-sm text-slate-500">
              Roles worth exploring right now
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => scrollRail(-320)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollRail(320)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#F2F4F8] via-[#F2F4F8]/90 to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#F2F4F8] via-[#F2F4F8]/90 to-transparent sm:w-14" />

          <div
            ref={railRef}
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
            className="
              no-scrollbar flex gap-5 overflow-x-auto px-4 pb-4 pt-1 pr-4
              scroll-smooth snap-x snap-mandatory
              sm:px-6
              lg:grid lg:grid-flow-col lg:grid-rows-2 lg:gap-x-6 lg:gap-y-6 lg:px-0 lg:pr-0
            "
          >
            {displayJobs.map((job) => (
              <JobCard key={job.id} job={job} onOpen={openDetails} />
            ))}
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