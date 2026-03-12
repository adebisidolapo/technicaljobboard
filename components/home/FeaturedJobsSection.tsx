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
        relative flex min-h-[160px] w-[320px] flex-none snap-start flex-col
        overflow-hidden rounded-[22px] border border-slate-200
        bg-white/85 backdrop-blur-sm
        shadow-[0_6px_20px_rgba(15,23,42,0.08)]
        transition duration-300
        hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)]
      "
    >
      {/* purple side bars */}
      <div className="absolute left-0 top-4 h-12 w-1.5 rounded-r-full bg-[var(--brand-purple)]" />
      <div className="absolute right-0 top-4 h-12 w-1.5 rounded-l-full bg-[var(--brand-purple)]" />

      <div className="flex h-full flex-col p-3">
        {/* badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Featured
          </span>
        </div>

        {/* title row */}
        <div className="mt-2 flex items-start gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
            {logo ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={36}
                height={36}
                className="h-6 w-6 object-contain"
              />
            ) : (
              <span className="text-xs font-bold text-[var(--brand-purple)]">
                {job.company.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <button onClick={() => onOpen(job)} className="text-left">
              <h3 className="line-clamp-2 text-[14px] font-semibold leading-5 text-[#0B1222]">
                {job.title}
              </h3>
            </button>

            <p className="mt-0.5 truncate text-xs text-slate-500">
              {job.company} • {job.location}
            </p>
          </div>
        </div>

        {/* description */}
        <p className="mt-1 line-clamp-1 text-xs text-slate-600">
          {job.description}
        </p>

        {/* tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
            {job.type}
          </span>

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
            {job.pay}
          </span>
        </div>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <button
            onClick={() => onOpen(job)}
            className="
              inline-flex h-8 items-center justify-center rounded-full
              bg-[var(--brand-purple)] px-3 text-xs font-semibold text-white
              shadow-[0_6px_16px_rgba(106,111,242,0.25)]
              transition hover:opacity-95
            "
          >
            Apply
          </button>

          <span className="text-[10px] text-slate-400">
            Posted {job.posted}
          </span>
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
      <section className="relative w-full">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
           <h2 className="text-2xl font-bold text-[#0B1222]">
  Roles Worth Exploring
</h2>
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

        <div className="w-full">
          <div
            ref={railRef}
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
            className="
              no-scrollbar flex gap-5 overflow-x-auto pb-4 pt-1
              scroll-smooth snap-x snap-mandatory
              lg:grid lg:grid-flow-col lg:grid-rows-2 lg:gap-x-6 lg:gap-y-6
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