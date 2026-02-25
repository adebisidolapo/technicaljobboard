"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ApiJob = {
  id: string;
  title: string;
  description: string;
  jobType?: string | null;
  remote?: boolean;
  publishedAt?: string | null;
  company?: { name?: string | null } | null;
  locations?: Array<{ label?: string | null; city?: string | null; country?: string | null }>;
  skills?: Array<{ name: string }>;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string | null;
};

function pickLocation(job: ApiJob) {
  const l0 = job.locations?.[0];
  const label = l0?.label || [l0?.city, l0?.country].filter(Boolean).join(", ");
  if (label) return label;
  return job.remote ? "Remote" : "United States";
}

function payText(job: ApiJob) {
  const min = job.salaryMin ?? null;
  const max = job.salaryMax ?? null;

  if (min && max) return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
  if (min) return `From $${min.toLocaleString()}`;
  if (max) return `Up to $${max.toLocaleString()}`;
  return "—";
}

export default function FeaturedJobsSection() {
  const [items, setItems] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/jobs/search?take=12&skip=0", {
          cache: "no-store",
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok || data?.ok === false) throw new Error(data?.error || "Failed to load");

        if (!cancelled) setItems(data?.items ?? []);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const scrollBy = (dx: number) => {
    document.getElementById("featured-carousel")?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section id="featured" className="relative overflow-hidden py-16 bg-[#F2F4F8]">
      {/* Header stays in container */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1222]">
              Featured Jobs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Standout roles pulled from your database.
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
      </div>

      {/* Carousel becomes FULL WIDTH */}
      <div className="relative mt-10">
        <div
          id="featured-carousel"
          className="no-scrollbar flex gap-7 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory w-full px-6"
        >
          {loading ? (
            <div className="text-sm text-slate-600 px-2">Loading featured jobs…</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-slate-600 px-2">
              No featured jobs yet. Publish a job and it will show here.
            </div>
          ) : (
            items.map((job) => {
              const company = job.company?.name ?? "—";
              const location = pickLocation(job);
              const type = job.jobType ?? "—";
              const pay = payText(job);
              const posted = job.publishedAt ? "Recently" : "—";

              return (
                <article
                  key={job.id}
                  className="snap-start flex-none w-[340px] sm:w-[360px] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition relative overflow-hidden"
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
                        {company.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-extrabold text-[#0B1222] truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          {company} • {job.remote ? "Remote" : location}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-600 truncate">
                      {job.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                        {type}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                        {pay}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md inline-flex"
                      >
                        View
                      </Link>

                      <span className="text-xs text-slate-400">Posted {posted}</span>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}