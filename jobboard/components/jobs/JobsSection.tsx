"use client";

import { useEffect, useMemo, useState } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string; // US only / Remote (US)
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
  type: "Full-time" | "Contract" | "Part-time";
  pay: string;
  posted: string;
  tags: string[];
};

const JOBS: Job[] = [
  // Architecture
  {
    id: "1",
    title: "Architectural Designer (Revit)",
    company: "Stonebridge Studio",
    location: "Denver, CO",
    category: "Architecture",
    type: "Full-time",
    pay: "$75k – $95k",
    posted: "2 days ago",
    tags: ["Revit", "CD Sets", "Permitting"],
  },
  {
    id: "2",
    title: "Project Architect",
    company: "Northline Architects",
    location: "Chicago, IL",
    category: "Architecture",
    type: "Full-time",
    pay: "$95k – $125k",
    posted: "4 days ago",
    tags: ["Design Development", "CA", "Revit"],
  },

  // CAD / BIM
  {
    id: "3",
    title: "CAD Drafter (AutoCAD)",
    company: "Precision Drafting Co.",
    location: "Phoenix, AZ",
    category: "CAD / BIM",
    type: "Full-time",
    pay: "$55k – $75k",
    posted: "3 days ago",
    tags: ["AutoCAD", "Shop Drawings", "As-builts"],
  },
  {
    id: "4",
    title: "BIM Coordinator",
    company: "MEPWorks",
    location: "Dallas, TX",
    category: "CAD / BIM",
    type: "Full-time",
    pay: "$85k – $115k",
    posted: "1 week ago",
    tags: ["Revit", "Navisworks", "Clash Detection"],
  },

  // Construction
  {
    id: "5",
    title: "Construction Project Engineer",
    company: "Summit Build Group",
    location: "Austin, TX",
    category: "Construction",
    type: "Full-time",
    pay: "$70k – $95k",
    posted: "5 days ago",
    tags: ["RFI", "Submittals", "Scheduling"],
  },
  {
    id: "6",
    title: "MEP Coordinator",
    company: "PrimeConstruct",
    location: "Atlanta, GA",
    category: "Construction",
    type: "Full-time",
    pay: "$90k – $120k",
    posted: "6 days ago",
    tags: ["MEP", "Coordination", "Field"],
  },
  {
    id: "7",
    title: "Estimator (Commercial)",
    company: "Bluebeam Estimating",
    location: "Orlando, FL",
    category: "Construction",
    type: "Full-time",
    pay: "$80k – $110k",
    posted: "3 days ago",
    tags: ["Bluebeam", "Takeoffs", "Bid Packages"],
  },

  // Healthcare / Medical
  {
    id: "8",
    title: "Healthcare IT Analyst",
    company: "CareStack Systems",
    location: "Remote (US)",
    category: "Healthcare",
    type: "Full-time",
    pay: "$85k – $115k",
    posted: "2 days ago",
    tags: ["EHR", "HIPAA", "Support"],
  },
  {
    id: "9",
    title: "Clinical Systems Specialist",
    company: "MedOps",
    location: "Boston, MA",
    category: "Healthcare",
    type: "Full-time",
    pay: "$90k – $120k",
    posted: "1 week ago",
    tags: ["Clinical Workflows", "Training", "EHR"],
  },

  // Manufacturing
  {
    id: "10",
    title: "Manufacturing Engineer",
    company: "Titan Manufacturing",
    location: "Detroit, MI",
    category: "Manufacturing",
    type: "Full-time",
    pay: "$95k – $130k",
    posted: "4 days ago",
    tags: ["Lean", "Process Improvement", "Root Cause"],
  },
  {
    id: "11",
    title: "Production Supervisor",
    company: "ForgeLine",
    location: "Columbus, OH",
    category: "Manufacturing",
    type: "Full-time",
    pay: "$70k – $95k",
    posted: "6 days ago",
    tags: ["Shift Lead", "Safety", "KPIs"],
  },

  // Field Service
  {
    id: "12",
    title: "Field Service Engineer (Electrical)",
    company: "ServiceGrid",
    location: "Houston, TX",
    category: "Field Service",
    type: "Full-time",
    pay: "$80k – $115k",
    posted: "3 days ago",
    tags: ["Commissioning", "Troubleshooting", "Travel"],
  },
  {
    id: "13",
    title: "Commissioning Technician",
    company: "StartUp Labs",
    location: "Remote (US)",
    category: "Field Service",
    type: "Contract",
    pay: "$45 – $65/hr",
    posted: "5 days ago",
    tags: ["Startup", "Controls", "Travel"],
  },

  // Project Management
  {
    id: "14",
    title: "Project Manager (Facilities)",
    company: "FacilityPro",
    location: "Seattle, WA",
    category: "Project Management",
    type: "Full-time",
    pay: "$100k – $140k",
    posted: "1 week ago",
    tags: ["Stakeholders", "Budget", "Vendors"],
  },

  // Quality / Compliance
  {
    id: "15",
    title: "Quality Engineer",
    company: "QC Dynamics",
    location: "San Diego, CA",
    category: "Quality / Compliance",
    type: "Full-time",
    pay: "$90k – $125k",
    posted: "4 days ago",
    tags: ["ISO", "Audits", "CAPA"],
  },

  // Maintenance / Reliability
  {
    id: "16",
    title: "Reliability Engineer",
    company: "PlantWorks",
    location: "Nashville, TN",
    category: "Maintenance / Reliability",
    type: "Full-time",
    pay: "$95k – $135k",
    posted: "6 days ago",
    tags: ["CMMS", "RCM", "Preventive Maintenance"],
  },

  // Engineering (Non-Software)
  {
    id: "17",
    title: "Mechanical Engineer (HVAC)",
    company: "ThermoDesign",
    location: "Charlotte, NC",
    category: "Engineering (Non-Software)",
    type: "Full-time",
    pay: "$90k – $125k",
    posted: "2 days ago",
    tags: ["HVAC", "MEP", "Load Calculations"],
  },

  // Aerospace / Defense
  {
    id: "18",
    title: "Systems Engineer (Defense)",
    company: "AeroShield",
    location: "Arlington, VA",
    category: "Aerospace / Defense",
    type: "Full-time",
    pay: "$120k – $170k",
    posted: "1 week ago",
    tags: ["Requirements", "Systems", "Documentation"],
  },
];

const CATEGORY_OPTIONS: Array<Job["category"] | "All Categories"> = [
  "All Categories",
  "Architecture",
  "Construction",
  "Healthcare",
  "CAD / BIM",
  "Manufacturing",
  "Field Service",
  "Project Management",
  "Quality / Compliance",
  "Maintenance / Reliability",
  "Engineering (Non-Software)",
  "Aerospace / Defense",
];

const TYPE_OPTIONS: Array<Job["type"] | "All Types"> = [
  "All Types",
  "Full-time",
  "Contract",
  "Part-time",
];

export default function JobsSection() {
  // top filter bar
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORY_OPTIONS)[number]>("All Categories");
  const [type, setType] = useState<(typeof TYPE_OPTIONS)[number]>("All Types");

  // load more
  const INITIAL_COUNT = 8; // ✅ 6–8 on site (we use 8)
  const STEP = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // read query params from URL (so Hero search works)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qp = params.get("q") ?? "";
    const lp = params.get("loc") ?? "";
    const cp = params.get("cat") ?? "";
    const tp = params.get("type") ?? "";

    setQ(qp);
    setLoc(lp);

    if (CATEGORY_OPTIONS.includes(cp as any)) setCat(cp as any);
    else setCat("All Categories");

    if (TYPE_OPTIONS.includes(tp as any)) setType(tp as any);
    else setType("All Types");
  }, []);

  // filter
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

      const matchLoc =
        !locationText || job.location.toLowerCase().includes(locationText);

      const matchCat = cat === "All Categories" || job.category === cat;
      const matchType = type === "All Types" || job.type === type;

      return matchQ && matchLoc && matchCat && matchType;
    });
  }, [q, loc, cat, type]);

  // keep URL in sync when searching/filtering
  const applyFiltersToUrl = () => {
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (loc.trim()) params.set("loc", loc.trim());
    if (cat !== "All Categories") params.set("cat", cat);
    if (type !== "All Types") params.set("type", type);

    const qs = params.toString();
    const nextUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.pushState({}, "", nextUrl);

    setVisibleCount(INITIAL_COUNT);
  };

  const clearFilters = () => {
    setQ("");
    setLoc("");
    setCat("All Categories");
    setType("All Types");
    window.history.pushState({}, "", window.location.pathname);
    setVisibleCount(INITIAL_COUNT);
  };

  const visibleJobs = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP FILTER BAR (replaces side filters) */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-4 md:p-5">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, company, category…"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
              />

              <input
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="Location (Remote, Austin, New York)"
                className="h-12 w-full md:w-[320px] rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as any)}
                className="h-12 w-full md:w-[320px] rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="h-12 w-full md:w-[220px] rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[rgba(106,111,242,0.25)]"
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <div className="flex gap-3 md:ml-auto">
                <button
                  type="button"
                  onClick={applyFiltersToUrl}
                  className="h-12 px-6 rounded-2xl text-sm font-semibold text-white bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] transition shadow-sm w-full md:w-auto"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-12 px-5 rounded-2xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition w-full md:w-auto"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{filtered.length}</span> jobs (United States only).
            </div>
          </div>
        </div>

        {/* JOB LIST */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleJobs.map((job) => (
            <article
              key={job.id}
              className="bg-white rounded-2xl border border-[rgba(106,111,242,0.18)] shadow-sm hover:shadow-md transition p-5"
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
                  {job.pay}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  Posted {job.posted}
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
                <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition">
                  Save ★
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="mt-10 flex justify-center">
          {filtered.length === 0 ? (
            <div className="text-sm text-slate-600">
              No jobs match your filters.
            </div>
          ) : canLoadMore ? (
            <button
              type="button"
              onClick={() => setVisibleCount((v) => Math.min(v + STEP, filtered.length))}
              className="px-6 py-3 rounded-2xl text-sm font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm"
            >
              Load more
            </button>
          ) : (
            <div className="text-sm text-slate-500">You’ve reached the end.</div>
          )}
        </div>
      </div>
    </section>
  );
}
