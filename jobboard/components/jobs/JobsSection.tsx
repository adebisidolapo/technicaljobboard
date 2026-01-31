"use client";

import { useEffect, useMemo, useState } from "react";

type Experience = "Entry" | "Mid" | "Senior";
type JobType = "Full-time" | "Contract" | "Part-time";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string; // US only
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
  { id: "1", title: "Architectural Designer (Revit)", company: "Stonebridge Studio", location: "Denver, CO", category: "Architecture", type: "Full-time", experience: "Mid", pay: "$75k – $95k", posted: "2 days ago", tags: ["Revit", "CD Sets", "Permitting"] },
  { id: "2", title: "Project Architect", company: "Northline Architects", location: "Chicago, IL", category: "Architecture", type: "Full-time", experience: "Senior", pay: "$95k – $125k", posted: "4 days ago", tags: ["Design Dev", "CA", "Revit"] },

  { id: "3", title: "CAD Drafter (AutoCAD)", company: "Precision Drafting Co.", location: "Phoenix, AZ", category: "CAD / BIM", type: "Full-time", experience: "Entry", pay: "$55k – $75k", posted: "3 days ago", tags: ["AutoCAD", "Shop Drawings", "As-builts"] },
  { id: "4", title: "BIM Coordinator", company: "MEPWorks", location: "Dallas, TX", category: "CAD / BIM", type: "Full-time", experience: "Mid", pay: "$85k – $115k", posted: "1 week ago", tags: ["Revit", "Navisworks", "Clash Detection"] },

  { id: "5", title: "Construction Project Engineer", company: "Summit Build Group", location: "Austin, TX", category: "Construction", type: "Full-time", experience: "Mid", pay: "$70k – $95k", posted: "5 days ago", tags: ["RFI", "Submittals", "Scheduling"] },
  { id: "6", title: "MEP Coordinator", company: "PrimeConstruct", location: "Atlanta, GA", category: "Construction", type: "Full-time", experience: "Senior", pay: "$90k – $120k", posted: "6 days ago", tags: ["MEP", "Coordination", "Field"] },
  { id: "7", title: "Estimator (Commercial)", company: "Bluebeam Estimating", location: "Orlando, FL", category: "Construction", type: "Full-time", experience: "Mid", pay: "$80k – $110k", posted: "3 days ago", tags: ["Bluebeam", "Takeoffs", "Bid Packages"] },

  { id: "8", title: "Healthcare IT Analyst", company: "CareStack Systems", location: "Remote (US)", category: "Healthcare", type: "Full-time", experience: "Mid", pay: "$85k – $115k", posted: "2 days ago", tags: ["EHR", "HIPAA", "Support"] },
  { id: "9", title: "Clinical Systems Specialist", company: "MedOps", location: "Boston, MA", category: "Healthcare", type: "Full-time", experience: "Senior", pay: "$90k – $120k", posted: "1 week ago", tags: ["Clinical", "Training", "EHR"] },

  { id: "10", title: "Manufacturing Engineer", company: "Titan Manufacturing", location: "Detroit, MI", category: "Manufacturing", type: "Full-time", experience: "Senior", pay: "$95k – $130k", posted: "4 days ago", tags: ["Lean", "Process", "Root Cause"] },
  { id: "11", title: "Production Supervisor", company: "ForgeLine", location: "Columbus, OH", category: "Manufacturing", type: "Full-time", experience: "Mid", pay: "$70k – $95k", posted: "6 days ago", tags: ["Safety", "KPIs", "Shift"] },

  { id: "12", title: "Field Service Engineer (Electrical)", company: "ServiceGrid", location: "Houston, TX", category: "Field Service", type: "Full-time", experience: "Mid", pay: "$80k – $115k", posted: "3 days ago", tags: ["Commissioning", "Troubleshooting", "Travel"] },
  { id: "13", title: "Commissioning Technician", company: "StartUp Labs", location: "Remote (US)", category: "Field Service", type: "Contract", experience: "Mid", pay: "$45 – $65/hr", posted: "5 days ago", tags: ["Controls", "Startup", "Travel"] },

  { id: "14", title: "Project Manager (Facilities)", company: "FacilityPro", location: "Seattle, WA", category: "Project Management", type: "Full-time", experience: "Senior", pay: "$100k – $140k", posted: "1 week ago", tags: ["Budget", "Vendors", "Stakeholders"] },
  { id: "15", title: "Quality Engineer", company: "QC Dynamics", location: "San Diego, CA", category: "Quality / Compliance", type: "Full-time", experience: "Mid", pay: "$90k – $125k", posted: "4 days ago", tags: ["ISO", "Audits", "CAPA"] },
  { id: "16", title: "Reliability Engineer", company: "PlantWorks", location: "Nashville, TN", category: "Maintenance / Reliability", type: "Full-time", experience: "Senior", pay: "$95k – $135k", posted: "6 days ago", tags: ["CMMS", "RCM", "PM"] },
  { id: "17", title: "Mechanical Engineer (HVAC)", company: "ThermoDesign", location: "Charlotte, NC", category: "Engineering (Non-Software)", type: "Full-time", experience: "Mid", pay: "$90k – $125k", posted: "2 days ago", tags: ["HVAC", "MEP", "Loads"] },
  { id: "18", title: "Systems Engineer (Defense)", company: "AeroShield", location: "Arlington, VA", category: "Aerospace / Defense", type: "Full-time", experience: "Senior", pay: "$120k – $170k", posted: "1 week ago", tags: ["Systems", "Requirements", "Docs"] },
];

const JOB_TYPES: Array<JobType | "Any"> = ["Any", "Full-time", "Part-time", "Contract"];
const EXPERIENCES: Array<Experience | "Any"> = ["Any", "Entry", "Mid", "Senior"];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function JobsSection() {
  // draft inputs
  const [draftQ, setDraftQ] = useState("");
  const [draftLoc, setDraftLoc] = useState("");
  const [draftType, setDraftType] = useState<(typeof JOB_TYPES)[number]>("Any");
  const [draftExp, setDraftExp] = useState<(typeof EXPERIENCES)[number]>("Any");

  const [quickRemote, setQuickRemote] = useState(false);
  const [quickFullTime, setQuickFullTime] = useState(false);
  const [quickSenior, setQuickSenior] = useState(false);
  const [quickContract, setQuickContract] = useState(false);

  // applied filters
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState<(typeof JOB_TYPES)[number]>("Any");
  const [exp, setExp] = useState<(typeof EXPERIENCES)[number]>("Any");

  const [apRemote, setApRemote] = useState(false);
  const [apFullTime, setApFullTime] = useState(false);
  const [apSenior, setApSenior] = useState(false);
  const [apContract, setApContract] = useState(false);

  // load more
  const INITIAL_COUNT = 8;
  const STEP = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // mobile drawer
  const [filtersOpen, setFiltersOpen] = useState(false);

  // prevent body scroll when drawer open (fixes overlay issues)
  useEffect(() => {
    if (!filtersOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  // load from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const qp = params.get("q") ?? "";
    const lp = params.get("loc") ?? "";
    const tp = params.get("type") ?? "Any";
    const ex = params.get("exp") ?? "Any";
    const remote = params.get("remote") === "1";
    const ft = params.get("ft") === "1";
    const senior = params.get("senior") === "1";
    const contract = params.get("contract") === "1";

    setDraftQ(qp);
    setDraftLoc(lp);
    setDraftType((JOB_TYPES.includes(tp as any) ? tp : "Any") as any);
    setDraftExp((EXPERIENCES.includes(ex as any) ? ex : "Any") as any);
    setQuickRemote(remote);
    setQuickFullTime(ft);
    setQuickSenior(senior);
    setQuickContract(contract);

    setQ(qp);
    setLoc(lp);
    setType((JOB_TYPES.includes(tp as any) ? tp : "Any") as any);
    setExp((EXPERIENCES.includes(ex as any) ? ex : "Any") as any);
    setApRemote(remote);
    setApFullTime(ft);
    setApSenior(senior);
    setApContract(contract);
  }, []);

  const applyFilters = () => {
    setQ(draftQ);
    setLoc(draftLoc);
    setType(draftType);
    setExp(draftExp);

    setApRemote(quickRemote);
    setApFullTime(quickFullTime);
    setApSenior(quickSenior);
    setApContract(quickContract);

    const params = new URLSearchParams();
    if (draftQ.trim()) params.set("q", draftQ.trim());
    if (draftLoc.trim()) params.set("loc", draftLoc.trim());
    if (draftType !== "Any") params.set("type", draftType);
    if (draftExp !== "Any") params.set("exp", draftExp);

    if (quickRemote) params.set("remote", "1");
    if (quickFullTime) params.set("ft", "1");
    if (quickSenior) params.set("senior", "1");
    if (quickContract) params.set("contract", "1");

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
    setQuickRemote(false);
    setQuickFullTime(false);
    setQuickSenior(false);
    setQuickContract(false);

    setQ("");
    setLoc("");
    setType("Any");
    setExp("Any");
    setApRemote(false);
    setApFullTime(false);
    setApSenior(false);
    setApContract(false);

    window.history.pushState({}, "", window.location.pathname);
    setVisibleCount(INITIAL_COUNT);
  };

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

      const matchRemote = !apRemote || job.location.toLowerCase().includes("remote");
      const matchFT = !apFullTime || job.type === "Full-time";
      const matchSenior = !apSenior || job.experience === "Senior";
      const matchContract = !apContract || job.type === "Contract";

      return matchQ && matchLoc && matchType && matchExp && matchRemote && matchFT && matchSenior && matchContract;
    });
  }, [q, loc, type, exp, apRemote, apFullTime, apSenior, apContract]);

  const visibleJobs = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  const loadMoreTop = () => {
    setVisibleCount((v) => Math.min(v + STEP, filtered.length));
  };

  const FilterPanel = (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Filters</h3>
          <p className="text-sm text-slate-500 mt-1">Refine your results.</p>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-semibold text-[var(--brand-purple)] hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-semibold text-slate-900">Title / Keyword</label>
          <input
            value={draftQ}
            onChange={(e) => setDraftQ(e.target.value)}
            placeholder="e.g. Maintenance, PLC, Quality"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
                       focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-900">Location</label>
          <input
            value={draftLoc}
            onChange={(e) => setDraftLoc(e.target.value)}
            placeholder="e.g. Remote, New York, Austin"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
                       focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-900">Job Type</label>
          <select
            value={draftType}
            onChange={(e) => setDraftType(e.target.value as any)}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
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
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none
                       focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
          >
            {EXPERIENCES.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Quick Filters</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: "Remote", active: quickRemote, toggle: () => setQuickRemote((v) => !v) },
              { label: "Full-time", active: quickFullTime, toggle: () => setQuickFullTime((v) => !v) },
              { label: "Senior", active: quickSenior, toggle: () => setQuickSenior((v) => !v) },
              { label: "Contract", active: quickContract, toggle: () => setQuickContract((v) => !v) },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={chip.toggle}
                className={cx(
                  "px-4 py-2 rounded-full text-sm border transition",
                  chip.active
                    ? "bg-[rgba(106,111,242,0.12)] border-[rgba(106,111,242,0.25)] text-[var(--brand-purple)]"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={applyFilters}
          className="w-full h-12 rounded-2xl text-base font-semibold text-white
                     bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                     shadow-[0_10px_28px_rgba(106,111,242,0.20)] transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile top row */}
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> jobs
          </p>

          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition"
          >
            Filters
          </button>
        </div>

        {/* Desktop header row (Load more on top right) */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> jobs (US only)
          </p>

          <div className="flex items-center gap-3">
            {canLoadMore && (
              <button
                type="button"
                onClick={loadMoreTop}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm"
              >
                Load more
              </button>
            )}
          </div>
        </div>

        {/* Layout */}
        <div className="grid gap-7 lg:grid-cols-[360px_1fr]">
          {/* LEFT FILTERS (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">{FilterPanel}</div>
          </aside>

          {/* JOBS */}
          <div>
            {/* modern grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {visibleJobs.map((job) => (
                <article
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 truncate">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">
                        {job.company} • {job.location}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-[rgba(106,111,242,0.10)] text-[var(--brand-purple)] border border-[rgba(106,111,242,0.20)]">
                      {job.category}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {job.type}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {job.experience}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {job.pay}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 text-slate-600 bg-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <button
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white
                                 bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] transition"
                    >
                      View
                    </button>

                    <span className="text-xs text-slate-400">Posted {job.posted}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile: load more stays below list (clean) */}
            <div className="mt-8 flex justify-center lg:hidden">
              {filtered.length === 0 ? (
                <div className="text-sm text-slate-600">No jobs match your filters.</div>
              ) : canLoadMore ? (
                <button
                  type="button"
                  onClick={loadMoreTop}
                  className="px-6 py-3 rounded-2xl text-sm font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm"
                >
                  Load more
                </button>
              ) : (
                <div className="text-sm text-slate-500">You’ve reached the end.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE FILTER DRAWER (LEFT slide-over, does NOT cover jobs area scroll) */}
      {filtersOpen && (
        <div className="lg:hidden">
          {/* backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          />

          {/* drawer */}
          <div className="fixed z-50 top-0 left-0 h-full w-[86%] max-w-[380px] bg-white border-r border-slate-200 shadow-2xl">
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
