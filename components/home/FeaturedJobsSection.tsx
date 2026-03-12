"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import JobDetailsSheet, {
  FeaturedCardJob,
} from "@/components/jobs/JobDetailsSheet";

const FALLBACK_FEATURED_JOBS: FeaturedCardJob[] = [
  {
    id: "fallback-1",
    title: "Senior Frontend Engineer",
    company: "Vermot",
    location: "Remote • United States",
    description: "",
    type: "",
    pay: "$120k – $160k",
    posted: "Recently",
    href: "/jobs/1",
  },
  {
    id: "fallback-2",
    title: "Backend Engineer",
    company: "Redtail",
    location: "Austin, TX",
    description: "",
    type: "",
    pay: "$130k – $175k",
    posted: "Recently",
    href: "/jobs/2",
  },
  {
    id: "fallback-3",
    title: "DevOps Engineer",
    company: "Devops",
    location: "Remote • United States",
    description: "",
    type: "",
    pay: "$140k – $190k",
    posted: "Recently",
    href: "/jobs/3",
  },
  {
    id: "fallback-4",
    title: "Security Engineer",
    company: "Hired Engineer",
    location: "Remote • United States",
    description: "",
    type: "",
    pay: "$145k – $200k",
    posted: "Recently",
    href: "/jobs/4",
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
    description: "",
    type: "",
    pay: payText(j),
    posted: "Recently",
    href: `/jobs/${j.id}`,
  };
}

function getCompanyLogo(company: string) {
  const key = company.toLowerCase().trim();

  if (key.includes("architect")) return { src: "/Architects.png", alt: "Architects" };
  if (key.includes("vermot")) return { src: "/vermot.png", alt: "Vermot" };
  if (key.includes("devops")) return { src: "/Devops.png", alt: "Devops" };
  if (key.includes("hired")) return { src: "/Hiredengineer.png", alt: "Hired Engineer" };
  if (key.includes("redtail")) return { src: "/redtail.png", alt: "Redtail" };

  return null;
}

function JobCard({
  job,
  logo,
  onOpen,
}: {
  job: FeaturedCardJob;
  logo: ReturnType<typeof getCompanyLogo>;
  onOpen: (job: FeaturedCardJob) => void;
}) {
  return (
    <article
      className="
        relative flex w-[240px] flex-none flex-col rounded-2xl
        border border-slate-200 bg-white p-4
        shadow-sm transition hover:-translate-y-1 hover:shadow-md
        lg:w-[270px]
      "
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
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
              {job.company.charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <button onClick={() => onOpen(job)} className="text-left">
            <h3 className="text-[15px] font-semibold text-[#0B1222] line-clamp-2">
              {job.title}
            </h3>
          </button>

          <p className="text-sm text-slate-500">{job.location}</p>

          <p className="mt-1 text-sm font-medium text-slate-700">{job.pay}</p>
        </div>
      </div>

      <button
        onClick={() => onOpen(job)}
        className="
          mt-4 h-9 rounded-full bg-[var(--brand-purple)]
          text-sm font-semibold text-white
        "
      >
        View details
      </button>
    </article>
  );
}

export default function FeaturedJobsSection() {
  const [items, setItems] = useState<FeaturedCardJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<FeaturedCardJob | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const railRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  const displayJobs = useMemo(() => {
    if (!items.length) return FALLBACK_FEATURED_JOBS;
    return items.slice(0, 12);
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

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    intervalRef.current = window.setInterval(() => {
      if (hoveringRef.current) return;

      const max = rail.scrollWidth - rail.clientWidth;
      const next = rail.scrollLeft + 1;

      if (next >= max) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        rail.scrollLeft = next;
      }
    }, 22);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [displayJobs]);

  const openDetails = (job: FeaturedCardJob) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const closeDetails = () => setDetailsOpen(false);

  return (
    <>
      <div className="relative">
        <div className="relative -mx-4 sm:-mx-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#F2F4F8] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#F2F4F8] to-transparent" />

          <div
            ref={railRef}
            onMouseEnter={() => (hoveringRef.current = true)}
            onMouseLeave={() => (hoveringRef.current = false)}
            className="
              no-scrollbar flex gap-6 overflow-x-auto
              px-4 pb-6 pt-1 scroll-smooth
              lg:grid lg:grid-rows-2 lg:grid-flow-col lg:gap-7
            "
          >
            {displayJobs.map((job) => {
              const logo = getCompanyLogo(job.company);

              return (
                <JobCard
                  key={job.id}
                  job={job}
                  logo={logo}
                  onOpen={openDetails}
                />
              );
            })}
          </div>
        </div>
      </div>

      <JobDetailsSheet
        job={selectedJob}
        open={detailsOpen}
        onClose={closeDetails}
        logo={selectedJob ? getCompanyLogo(selectedJob.company) : null}
      />
    </>
  );
}