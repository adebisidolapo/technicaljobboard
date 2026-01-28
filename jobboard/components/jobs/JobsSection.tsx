"use client";

import { useEffect, useMemo, useState } from "react";
import type { Job } from "../../types/job";
import { JOBS } from "../../data/jobs";
import JobCard from "./JobCard";

  const [datePosted, setDatePosted] = useState("");

  useEffect(() => {
    const applyFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") ?? "";
      const loc = params.get("loc") ?? "";

      setKeyword(q);
      setLocation(loc);
    };

    applyFromUrl();
    window.addEventListener("popstate", applyFromUrl);
    return () => window.removeEventListener("popstate", applyFromUrl);
  }, []);


// If you already have categories elsewhere, keep them.
// This file will still work even if you remove category UI.
const ALL_CATEGORIES = [
  { slug: "frontend", label: "Frontend" },
  { slug: "backend", label: "Backend" },
  { slug: "devops", label: "DevOps" },
  { slug: "data", label: "Data" },
];

export default function JobsSection() {
  // your existing states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // new states you requested
  const [salaryRange, setSalaryRange] = useState("");
  const [level, setLevel] = useState("");
  const [maxDistanceKm, setMaxDistanceKm] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [datePosted, setDatePosted] = useState("");

  const resetFilters = () => {
    setKeyword("");
    setLocation("");
    setJobType("");
    setExperience("");
    setQuickFilters([]);
    setSelectedCategory("");

    setSalaryRange("");
    setLevel("");
    setMaxDistanceKm("");
    setWorkMode("");
    setDatePosted("");
  };

  const toggleQuick = (tag: string) => {
    setQuickFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const parseSalaryMax = (salary: string) => {
    const cleaned = salary.replace(/[,]/g, "").toLowerCase();
    const matches = cleaned.match(/(\d+)\s*k/g);
    if (!matches) return null;
    const nums = matches.map((m) => Number(m.replace("k", "")) * 1000).filter(Boolean);
    return nums.length ? Math.max(...nums) : null;
  };

  const withinSalaryRange = (salary: string, range: string) => {
    if (!range) return true;
    const max = parseSalaryMax(salary);
    if (max == null) return true;

    if (range === "0-50000") return max <= 50000;
    if (range === "50000-100000") return max > 50000 && max <= 100000;
    if (range === "100000-150000") return max > 100000 && max <= 150000;
    if (range === "150000+") return max > 150000;
    return true;
  };

  const withinDatePosted = (postedAt?: string, rule?: string) => {
    if (!rule) return true;
    if (!postedAt) return true;
    const posted = new Date(postedAt);
    const now = new Date();
    const diffMs = now.getTime() - posted.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffHours / 24;

    if (rule === "24h") return diffHours <= 24;
    if (rule === "7d") return diffDays <= 7;
    if (rule === "30d") return diffDays <= 30;
    return true;
  };

  const filteredJobs = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const maxD = maxDistanceKm.trim() ? Number(maxDistanceKm) : null;

    return JOBS.filter((job) => {
      const matchesKeyword =
        !kw ||
        job.title.toLowerCase().includes(kw) ||
        job.company.toLowerCase().includes(kw) ||
        job.description.toLowerCase().includes(kw) ||
        (job.tags ?? []).some((t) => t.toLowerCase().includes(kw));

      const matchesLocation = !loc || job.location.toLowerCase().includes(loc);

      const matchesJobType = !jobType || (job.jobType ?? "") === jobType;

      // keeping your old Experience dropdown behavior,
      // but mapping it to job.level if present
      const matchesExperience =
        !experience ||
        (job.level ? job.level.toLowerCase() === experience.toLowerCase() : true);

      const matchesSalary = withinSalaryRange(job.salary, salaryRange);

      const matchesLevel =
        !level || (job.level ? job.level.toLowerCase() === level.toLowerCase() : true);

      const matchesDistance =
        maxD == null || (typeof job.distanceKm === "number" ? job.distanceKm <= maxD : true);

      const matchesWorkMode =
        !workMode || (job.workMode ? job.workMode === workMode : job.location.includes(workMode));

      const matchesDatePosted = withinDatePosted(job.postedAt, datePosted);

      const matchesQuick =
        quickFilters.length === 0 ||
        quickFilters.every((q) => {
          const ql = q.toLowerCase();
          return (
            job.title.toLowerCase().includes(ql) ||
            job.company.toLowerCase().includes(ql) ||
            job.location.toLowerCase().includes(ql) ||
            (job.tags ?? []).some((t) => t.toLowerCase().includes(ql)) ||
            (job.workMode ? job.workMode.toLowerCase() === ql : false) ||
            (job.level ? job.level.toLowerCase() === ql : false) ||
            (job.jobType ? job.jobType.toLowerCase() === ql : false)
          );
        });

      const matchesCategory =
        !selectedCategory ||
        (job.tags ?? []).some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesSalary &&
        matchesLevel &&
        matchesDistance &&
        matchesWorkMode &&
        matchesDatePosted &&
        matchesQuick &&
        matchesCategory
      );
    });
  }, [
    keyword,
    location,
    jobType,
    experience,
    quickFilters,
    selectedCategory,
    salaryRange,
    level,
    maxDistanceKm,
    workMode,
    datePosted,
  ]);

  return (
    <section id="jobs" className="py-24 md:py-28 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold tracking-widest text-[var(--brand-purple)]">
              ALL JOBS
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Explore Technical opportunities
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Filter by keyword, location, job type, and experience — then explore what matches.
            </p>
          </div>

          <button
            type="button"
            className="w-full md:w-auto inline-flex items-center justify-center md:justify-end gap-2
                       text-[var(--brand-purple)] font-semibold underline underline-offset-4
                       hover:text-[var(--brand-purple-dark)] transition px-2 py-2"
          >
            Load More Jobs <span aria-hidden>→</span>
          </button>
        </div>

        {selectedCategory && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-600">Selected category:</span>
            <span className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold">
              {ALL_CATEGORIES.find((c) => c.slug === selectedCategory)?.label ?? "Category"}
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
            >
              Clear
            </button>
          </div>
        )}

        <div className="text-gray-600 mb-10">
          Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> roles
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-24 h-fit">
            <div className="rounded-3xl p-6 shadow-lg border border-gray-200 bg-white">
              <div className="flex items-start justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
                  <p className="text-sm text-gray-600 mt-1">Refine your results.</p>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
                >
                  Reset
                </button>
              </div>

              {/* ✅ UPDATED FILTERS (without removing your existing ones) */}
              <label className="block text-sm font-medium text-gray-700 mb-2">Key word</label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="e.g. React, DevOps, SQL, Security"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                           focus:ring-2 focus:ring-[rgba(106,111,242,0.25)] outline-none text-sm bg-white"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
              <select
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5 text-sm bg-white"
              >
                <option value="">Any</option>
                <option value="0-50000">Up to $50k</option>
                <option value="50000-100000">$50k - $100k</option>
                <option value="100000-150000">$100k - $150k</option>
                <option value="150000+">$150k+</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level <span className="text-gray-400">(optional)</span>
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5 text-sm bg-white"
              >
                <option value="">Any</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
                <option>Lead</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-2">Distance from location (km)</label>
              <input
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(e.target.value)}
                inputMode="numeric"
                placeholder="e.g. 10"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                           focus:ring-2 focus:ring-[rgba(106,111,242,0.25)] outline-none text-sm bg-white"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">Remote / Hybrid / Onsite</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5 text-sm bg-white"
              >
                <option value="">Any</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-2">Date posted</label>
              <select
                value={datePosted}
                onChange={(e) => setDatePosted(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5 text-sm bg-white"
              >
                <option value="">Any</option>
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>

              {/* ✅ KEEP EXISTING FILTERS */}
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="e.g. Remote, New York, Austin"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                           focus:ring-2 focus:ring-[rgba(106,111,242,0.25)] outline-none text-sm bg-white"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5 text-sm bg-white"
              >
                <option value="">Any</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-6 text-sm bg-white"
              >
                <option value="">Any</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
              </select>

              <p className="text-sm font-medium text-gray-700 mb-3">Quick Filters</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Remote", "Hybrid", "Onsite", "Full-time", "Senior", "Contract"].map((tag: string) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleQuick(tag)}
                    className={`text-xs px-3 py-2 rounded-full transition ${
                      quickFilters.includes(tag)
                        ? "bg-[var(--brand-purple)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="w-full bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white py-3 rounded-2xl font-semibold transition shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          <div className="lg:w-3/4 w-full space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-gray-200 text-gray-700">
                <p className="font-semibold text-gray-900">No results found.</p>
                <p className="text-sm text-gray-600 mt-2">
                  Try clearing filters or searching a different keyword/location.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white px-5 py-3 rounded-2xl text-sm font-semibold transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job: Job) => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
