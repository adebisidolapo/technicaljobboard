"use client";

import { useEffect, useMemo, useState } from "react";

type Experience = "Entry" | "Mid" | "Senior";
type JobType = "Full-time" | "Contract" | "Part-time";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  category:
    | "Architecture"
    | "Construction"
    | "Healthcare"
    | "CAD / BIM"
    | "Manufacturing"
    | "Field Service"
    | "Project Management"
    | "Quality / Compliance"
    | "Maintenance / Reliability"
    | "Engineering (Non-Software)"
    | "Aerospace / Defense";
  type: JobType;
  experience: Experience;
  pay: string;
  posted: string;
  tags: string[];
};

const JOBS: Job[] = [
  { id: "1", title: "Architectural Designer (Revit)", company: "Stonebridge Studio", location: "Denver, CO", category: "Architecture", type: "Full-time", experience: "Mid", pay: "$75k – $95k", posted: "2d", tags: ["Revit", "CD Sets", "Permitting"] },
  { id: "2", title: "Project Architect", company: "Northline Architects", location: "Chicago, IL", category: "Architecture", type: "Full-time", experience: "Senior", pay: "$95k – $125k", posted: "4d", tags: ["CA", "Revit", "Docs"] },

  { id: "3", title: "CAD Drafter (AutoCAD)", company: "Precision Drafting Co.", location: "Phoenix, AZ", category: "CAD / BIM", type: "Full-time", experience: "Entry", pay: "$55k – $75k", posted: "3d", tags: ["AutoCAD", "Shop Drawings", "As-builts"] },
  { id: "4", title: "BIM Coordinator (MEP)", company: "MEPWorks", location: "Dallas, TX", category: "CAD / BIM", type: "Full-time", experience: "Mid", pay: "$85k – $115k", posted: "1w", tags: ["Navisworks", "Revit", "Clash"] },

  { id: "5", title: "Construction Project Engineer", company: "Summit Build Group", location: "Austin, TX", category: "Construction", type: "Full-time", experience: "Mid", pay: "$70k – $95k", posted: "5d", tags: ["RFI", "Submittals", "Schedule"] },
  { id: "6", title: "Estimator (Commercial)", company: "Bluebeam Estimating", location: "Orlando, FL", category: "Construction", type: "Full-time", experience: "Mid", pay: "$80k – $110k", posted: "3d", tags: ["Bluebeam", "Takeoffs", "Bids"] },

  { id: "7", title: "Healthcare IT Analyst (EHR)", company: "CareStack Systems", location: "Remote", category: "Healthcare", type: "Full-time", experience: "Mid", pay: "$85k – $115k", posted: "2d", tags: ["EHR", "HIPAA", "Support"] },
  { id: "8", title: "Clinical Systems Specialist", company: "MedOps", location: "Boston, MA", category: "Healthcare", type: "Full-time", experience: "Senior", pay: "$90k – $120k", posted: "1w", tags: ["Clinical", "Training", "EHR"] },

  { id: "9", title: "Manufacturing Engineer", company: "Titan Manufacturing", location: "Detroit, MI", category: "Manufacturing", type: "Full-time", experience: "Senior", pay: "$95k – $130k", posted: "4d", tags: ["Lean", "Process", "RCA"] },
  { id: "10", title: "Field Service Engineer (Electrical)", company: "ServiceGrid", location: "Houston, TX", category: "Field Service", type: "Full-time", experience: "Mid", pay: "$80k – $115k", posted: "3d", tags: ["Commissioning", "Troubleshooting", "Travel"] },

  { id: "11", title: "Project Manager (Facilities)", company: "FacilityPro", location: "Seattle, WA", category: "Project Management", type: "Full-time", experience: "Senior", pay: "$100k – $140k", posted: "1w", tags: ["Budget", "Vendors", "Stakeholders"] },
  { id: "12", title: "Quality Engineer", company: "QC Dynamics", location: "San Diego, CA", category: "Quality / Compliance", type: "Full-time", experience: "Mid", pay: "$90k – $125k", posted: "4d", tags: ["ISO", "Audits", "CAPA"] },

  { id: "13", title: "Reliability Engineer", company: "PlantWorks", location: "Nashville, TN", category: "Maintenance / Reliability", type: "Full-time", experience: "Senior", pay: "$95k – $135k", posted: "6d", tags: ["CMMS", "RCM", "PM"] },
  { id: "14", title: "Mechanical Engineer (HVAC)", company: "ThermoDesign", location: "Charlotte, NC", category: "Engineering (Non-Software)", type: "Full-time", experience: "Mid", pay: "$90k – $125k", posted: "2d", tags: ["HVAC", "MEP", "Loads"] },
  { id: "15", title: "Systems Engineer (Defense)", company: "AeroShield", location: "Arlington, VA", category: "Aerospace / Defense", type: "Full-time", experience: "Senior", pay: "$120k – $170k", posted: "1w", tags: ["Requirements", "Docs", "Systems"] },
];

const JOB_TYPES: Array<JobType | "Any"> = ["Any", "Full-time", "Part-time", "Contract"];
const EXPERIENCES: Array<Experience | "Any"> = ["Any", "Entry", "Mid", "Senior"];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function JobsSection() {
  // Draft filters
  const [draftQ, setDraftQ] = useState("");
  const [draftLoc, setDraftLoc] = useState("");
  const [draftType, setDraftType] = useState<(typeof JOB_TYPES)[number]>("Any");
  const [draftExp, setDraftExp] = useState<(typeof EXPERIENCES)[number]>("Any");

  // Applied filters
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState<(typeof JOB_TYPES)[number]>("Any");
  const [exp, setExp] = useState<(typeof EXPERIENCES)[number]>("Any");

  const INITIAL_COUNT = 8;
  const STEP = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!filtersOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qp = params.get("q") ?? "";
    const lp = params.get("loc") ?? "";
    const tp = params.get("type") ?? "Any";
    const ex = params.get("exp") ?? "Any";

    setDraftQ(qp);
    setDraftLoc(lp);
    setDraftType((JOB_TYPES.includes(tp as any) ? tp : "Any") as any);
    setDraftExp((EXPERIENCES.includes(ex as any) ? ex : "Any") as any);

    setQ(qp);
    setLoc(lp);
    setType((JOB_TYPES.includes(tp as any) ? tp : "Any") as any);
    setExp((EXPERIENCES.includes(ex as any) ? ex : "Any") as any);
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    const locationText = loc.trim().toLowerCase();

    return JOBS.filter((job) => {
      const matchQ =
        !text ||
        job.title.toLowerCase().includes(text) ||
        job.company.toLowerCase().includes(text) ||
        job.tags.join(" ").toLowerCase().includes(text) ||
        job.category.toLowerCase().includes(text);

      const matchLoc = !locationText || job.location.toLowerCase().includes(locationText);
      const matchType = type === "Any" || job.type === type;
      const matchExp = exp === "Any" || job.experience === exp;

      return matchQ && matchLoc && matchType && matchExp;
    });
  }, [q, loc, type, exp]);

  const visibleJobs = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  const applyFilters = () => {
    setQ(draftQ);
    setLoc(draftLoc);
    setType(draftType);
    setExp(draftExp);

    const params = new URLSearchParams();
    if (draftQ.trim()) params.set("q", draftQ.trim());
    if (draftLoc.trim()) params.set("loc", draftLoc.trim());
    if (draftType !== "Any") params.set("type", draftType);
    if (draftExp !== "Any") params.set("exp", draftExp);

    const qs = params.toString();
    window.history.pushState({}, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);

    setVisibleCount(INITIAL_COUNT);
    setFiltersOpen(false);
  };

  const resetFilters = () => {
    setDraftQ("");
    setDraftLoc("");
    setDraftType("Any");
    setDraftExp("Any");

    setQ("");
    setLoc("");
    setType("Any");
    setExp("Any");

    window.history.pushState({}, "", window.location.pathname);
    setVisibleCount(INITIAL_COUNT);
  };

  const loadMore = () => setVisibleCount((v) => Math.min(v + STEP, filtered.length));

  const FilterPanel = (
    <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Filters</h3>
          <p className="text-xs text-slate-500 mt-1">Refine your search.</p>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-900">Title / Keyword</label>
          <input
            value={draftQ}
            onChange={(e) => setDraftQ(e.target.value)}
            placeholder="e.g. Revit, HVAC, Quality"
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
                       focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-900">Location</label>
          <input
            value={draftLoc}
            onChange={(e) => setDraftLoc(e.target.value)}
            placeholder="e.g. Remote, New York, Austin"
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
                       focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm font-semibold text-slate-900">Job Type</label>
            <select
              value={draftType}
              onChange={(e) => setDraftType(e.target.value as any)}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
                         focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-900">Experience</label>
            <select
              value={draftExp}
              onChange={(e) => setDraftExp(e.target.value as any)}
              className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
                         focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
            >
              {EXPERIENCES.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={applyFilters}
          className="w-full h-11 rounded-2xl text-sm font-semibold text-white
                     bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                     shadow-[0_10px_26px_rgba(106,111,242,0.20)] transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative">
      {/* classy background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FA] via-[#F7F8FC] to-[#F2F4FF]" />
        <div className="absolute -top-44 left-[-120px] h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.10)] blur-3xl" />
        <div className="absolute -bottom-44 right-[-140px] h-[560px] w-[560px] rounded-full bg-slate-900/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* top row: title + load more on right (like before) */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Latest jobs</h2>
            <p className="mt-1 text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span> results
            </p>
          </div>

          {canLoadMore ? (
            <button
              type="button"
              onClick={loadMore}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl px-4 py-2
                         bg-white/90 border border-slate-200 shadow-sm hover:shadow-md transition
                         text-sm font-semibold text-slate-900"
            >
              Load more <span aria-hidden>→</span>
            </button>
          ) : null}

          {/* mobile filter button */}
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="sm:hidden inline-flex items-center gap-2 rounded-xl px-4 py-2
                       bg-white/90 border border-slate-200 shadow-sm hover:bg-slate-50 transition
                       text-sm font-semibold text-slate-900"
          >
            Filters
          </button>
        </div>

        <div className="grid gap-7 lg:grid-cols-[290px_1fr]">
          {/* left filter */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">{FilterPanel}</div>
          </aside>

          {/* LIST like your screenshot */}
          <div className="space-y-3">
            {visibleJobs.map((job, index) => (
              <div
                key={job.id}
                className={cx(
                  "relative flex items-center justify-between gap-4",
                  "rounded-2xl border bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition",
                  "px-4 sm:px-5 py-4",
                  index === 0
                    ? "border-[rgba(106,111,242,0.30)] bg-[rgba(106,111,242,0.06)]"
                    : "border-slate-200"
                )}
              >
                {/* left icon + info */}
                <div className="flex items-start gap-4 min-w-0">
                  {/* icon circle */}
                  <div
                    className={cx(
                      "h-11 w-11 rounded-xl flex items-center justify-center font-extrabold text-white shrink-0",
                      index === 0 ? "bg-[var(--brand-purple)]" : "bg-slate-900"
                    )}
                    aria-hidden
                  >
                    {job.company.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[15px] sm:text-[16px] font-semibold text-slate-900 truncate">
                      {job.title}
                    </p>

                    <p className="mt-1 text-xs sm:text-sm text-slate-600 truncate">
                      {job.company} • {job.location}
                    </p>

                    {/* small meta pills */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {job.type}
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {job.experience}
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {job.pay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* right side: posted + apply */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline text-xs text-slate-400">{job.posted}</span>

                  <button
                    type="button"
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-white
                               bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] transition"
                  >
                    Apply now
                  </button>
                </div>
              </div>
            ))}

            {/* bottom controls */}
            <div className="pt-4 flex items-center justify-center sm:justify-end">
              {filtered.length === 0 ? (
                <div className="text-sm text-slate-600">No jobs match your filters.</div>
              ) : canLoadMore ? (
                <button
                  type="button"
                  onClick={loadMore}
                  className="sm:hidden w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5
                             bg-white/90 border border-slate-200 shadow-sm hover:shadow-md transition
                             text-sm font-semibold text-slate-900"
                >
                  Load more <span aria-hidden>→</span>
                </button>
              ) : (
                <div className="text-sm text-slate-500">You have reached the end.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {filtersOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          />

          <div className="fixed z-50 top-0 left-0 h-full w-[86%] max-w-[360px] bg-white border-r border-slate-200 shadow-2xl">
            <div className="h-full overflow-auto p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-900">Filters</p>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Close
                </button>
              </div>

              {FilterPanel}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}