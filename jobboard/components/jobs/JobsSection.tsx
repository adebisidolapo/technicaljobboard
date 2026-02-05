"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  tags: string[];
  description: string;
};

const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "2 days ago",
    tags: ["React", "Next.js", "TypeScript"],
    description: "Build performance-first UI systems with React and Next.js.",
  },
  {
    id: "2",
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "5 days ago",
    tags: ["AWS", "CI/CD", "Terraform"],
    description: "Own infrastructure, CI/CD, and reliability workflows.",
  },
  {
    id: "3",
    title: "Data Engineer",
    company: "ByteForge",
    location: "New York, NY",
    type: "Full-time",
    pay: "$125k – $175k",
    posted: "4 days ago",
    tags: ["SQL", "ETL", "Pipelines"],
    description: "Build robust data pipelines and analytics systems.",
  },
  {
    id: "4",
    title: "Security Engineer",
    company: "SentinelWorks",
    location: "Remote",
    type: "Full-time",
    pay: "$145k – $200k",
    posted: "6 days ago",
    tags: ["AppSec", "Cloud", "IAM"],
    description: "Design and enforce secure-by-default systems.",
  },
];

const JOB_TYPES = ["Full-time", "Contract", "Part-time", "Internship"];
const SALARY_RANGES = [
  { label: "$100k+", min: 100000 },
  { label: "$120k+", min: 120000 },
  { label: "$140k+", min: 140000 },
  { label: "$160k+", min: 160000 },
];

function norm(v: string) {
  return v.toLowerCase().trim();
}
function parseMinPay(pay: string) {
  const m = pay.match(/(\d+)\s*k/i);
  return m ? Number(m[1]) * 1000 : 0;
}
function toggle(arr: string[], v: string) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}
function initials(name: string) {
  const p = name.split(" ");
  return `${p[0]?.[0] ?? "C"}${p[1]?.[0] ?? ""}`.toUpperCase();
}

export default function AllJobsPage() {
  const router = useRouter();

  // filter state
  const [q, setQ] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [location, setLocation] = useState("Anywhere");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const locations = useMemo(
    () => ["Anywhere", ...Array.from(new Set(JOBS.map((j) => j.location)))],
    []
  );

  const filtered = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean);

    return JOBS.filter((job) => {
      const hay = norm(
        [
          job.title,
          job.company,
          job.location,
          job.type,
          job.tags.join(" "),
          job.description,
        ].join(" ")
      );

      if (words.length && !words.every((w) => hay.includes(w))) return false;
      if (types.length && !types.includes(job.type)) return false;
      if (remoteOnly && !norm(job.location).includes("remote")) return false;
      if (salaryMin && parseMinPay(job.pay) < salaryMin) return false;
      if (location !== "Anywhere" && job.location !== location) return false;

      return true;
    });
  }, [q, types, remoteOnly, salaryMin, location]);

  const clearFilters = () => {
    setQ("");
    setTypes([]);
    setRemoteOnly(false);
    setSalaryMin(null);
    setLocation("Anywhere");
  };

  return (
    <main className="bg-[#F6F8FC] text-[#0B1222]">
      {/* HERO */}
      <section className="relative bg-white border-b border-slate-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -top-24 right-[-120px] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Browse technical jobs
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            A focused job board for software engineers, DevOps, data, cloud,
            security, and technical product roles.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* mobile filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white font-semibold"
          >
            Filter jobs
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DESKTOP FILTERS */}
          <aside className="hidden lg:block lg:col-span-4">
            <FilterPanel
              q={q}
              setQ={setQ}
              types={types}
              setTypes={setTypes}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              salaryMin={salaryMin}
              setSalaryMin={setSalaryMin}
              location={location}
              setLocation={setLocation}
              locations={locations}
              clearFilters={clearFilters}
            />
          </aside>

          {/* JOBS */}
          <div className="lg:col-span-8">
            <div className="mb-4 text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filtered.length}
              </span>{" "}
              jobs
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between gap-4 px-5 py-5 border-b last:border-b-0 hover:bg-slate-50"
                >
                  <div className="flex gap-4 min-w-0">
                    <div className="h-11 w-11 rounded-xl bg-[#0B1222] text-white flex items-center justify-center font-bold">
                      {initials(job.company)}
                    </div>

                    <div className="min-w-0">
                      <div className="font-bold truncate">{job.title}</div>
                      <div className="text-sm text-slate-500 truncate">
                        {job.company} • {job.location} • {job.pay}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/jobs/${job.id}`)}
                    className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    Apply
                  </button>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="p-10 text-center">
                  <div className="font-bold text-lg">No results found</div>
                  <button
                    onClick={clearFilters}
                    className="mt-4 h-11 px-6 rounded-xl bg-emerald-600 text-white font-semibold"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="font-extrabold">Filters</div>
              <button onClick={() => setMobileFiltersOpen(false)}>✕</button>
            </div>

            <FilterPanel
              q={q}
              setQ={setQ}
              types={types}
              setTypes={setTypes}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              salaryMin={salaryMin}
              setSalaryMin={setSalaryMin}
              location={location}
              setLocation={setLocation}
              locations={locations}
              clearFilters={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
            />

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 h-11 w-full rounded-xl bg-emerald-600 text-white font-semibold"
            >
              Show jobs
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* FILTER PANEL COMPONENT */
function FilterPanel(props: any) {
  const {
    q,
    setQ,
    types,
    setTypes,
    remoteOnly,
    setRemoteOnly,
    salaryMin,
    setSalaryMin,
    location,
    setLocation,
    locations,
    clearFilters,
  } = props;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex justify-between mb-4">
        <div className="font-extrabold">Filters</div>
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-600 font-semibold"
        >
          Reset
        </button>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search roles, skills, companies"
        className="h-11 w-full rounded-xl border px-4 mb-4"
      />

      <div className="mb-4">
        <div className="text-xs font-semibold mb-2">Job type</div>
        {JOB_TYPES.map((t) => (
          <label key={t} className="flex items-center gap-2 text-sm mb-2">
            <input
              type="checkbox"
              checked={types.includes(t)}
              onChange={() => setTypes((x: string[]) => toggle(x, t))}
            />
            {t}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold mb-2">Remote only</div>
        <button
          onClick={() => setRemoteOnly((v: boolean) => !v)}
          className={`h-10 w-full rounded-xl border ${
            remoteOnly ? "bg-emerald-600 text-white" : ""
          }`}
        >
          {remoteOnly ? "Enabled" : "Disabled"}
        </button>
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold mb-2">Salary</div>
        {SALARY_RANGES.map((r) => (
          <label key={r.label} className="flex items-center gap-2 text-sm mb-2">
            <input
              type="radio"
              checked={salaryMin === r.min}
              onChange={() => setSalaryMin(r.min)}
            />
            {r.label}
          </label>
        ))}
      </div>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="h-11 w-full rounded-xl border px-4"
      >
        {locations.map((l: string) => (
          <option key={l}>{l}</option>
        ))}
      </select>
    </div>
  );
}
