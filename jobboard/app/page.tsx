"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type CategoryItem = {
  label: string;
  slug: string;
  icon: string;
};

type CategoryGroup = {
  title: string;
  items: CategoryItem[];
};

export default function Home() {
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();

  // ================= CATEGORY GROUPS =================
  const CATEGORY_GROUPS: CategoryGroup[] = [
    {
      title: "Industrial & Field",
      items: [
        { label: "Skilled Trades & Field Technicians", slug: "skilled-trades", icon: "🧰" },
        { label: "Maintenance & Reliability", slug: "maintenance-reliability", icon: "🛠️" },
        { label: "Field Service & Commissioning", slug: "field-service", icon: "🚚" },
        { label: "Manufacturing & Production Operations", slug: "manufacturing-production", icon: "🏭" },
      ],
    },
    {
      title: "Engineering & Built World",
      items: [
        { label: "Engineering (Non-Software)", slug: "engineering-non-software", icon: "📐" },
        { label: "Automation & Controls (PLC / Robotics)", slug: "automation-controls", icon: "🤖" },
        { label: "Construction & Building Systems (MEP)", slug: "construction-mep", icon: "🏗️" },
        { label: "Architecture & Design Systems", slug: "architecture", icon: "🏛️" },
      ],
    },
    {
      title: "Compliance & Operations",
      items: [
        { label: "Quality, Inspection & Compliance", slug: "quality-compliance", icon: "✅" },
        { label: "Safety (EHS) & Industrial Compliance", slug: "safety-ehs", icon: "🦺" },
        { label: "Lab, Testing & Calibration", slug: "lab-testing", icon: "🧪" },
        { label: "Supply Chain & Technical Logistics", slug: "supply-chain", icon: "📦" },
      ],
    },
    {
      title: "Specialized Sectors",
      items: [
        { label: "Healthcare Technical Roles", slug: "healthcare-technical", icon: "🏥" },
        { label: "Aerospace & Defense", slug: "aerospace-defense", icon: "🛰️" },
        { label: "Energy, Utilities & Environmental", slug: "energy-utilities", icon: "⚡" },
        { label: "Project & Technical Management", slug: "project-management", icon: "📋" },
      ],
    },
  ];

  const ALL_CATEGORIES = useMemo(
    () => CATEGORY_GROUPS.flatMap((g) => g.items),
    [CATEGORY_GROUPS]
  );

  // ================= SHARED FILTER STATE =================
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  // Read from URL: /?category=aerospace-defense
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const resetFilters = () => {
    setSelectedCategory("");
    setKeyword("");
    setLocation("");
    setJobType("");
    setExperience("");
    setQuickFilters([]);
  };

  const toggleQuick = (tag: string) => {
    setQuickFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // ================= SAMPLE JOB DATA =================
  // Later you will replace this with backend data.
  const jobs = [
    {
      title: "Maintenance Technician",
      company: "PlantWorks",
      location: "Houston, TX",
      type: "Full-time",
      experience: "Mid",
      salary: "$28–$38/hr",
      category: "maintenance-reliability",
      tags: ["Full-time", "On-site"],
      posted: "2 days ago",
      description:
        "Preventive maintenance, troubleshooting, and equipment reliability support.",
    },
    {
      title: "Electrical Engineer",
      company: "GridLine",
      location: "Remote",
      type: "Full-time",
      experience: "Senior",
      salary: "$120k–$160k",
      category: "engineering-non-software",
      tags: ["Remote", "Full-time", "Senior"],
      posted: "4 days ago",
      description:
        "Power systems design, documentation, testing, and field coordination.",
    },
    {
      title: "Automation & Controls Engineer (PLC)",
      company: "AutoForge",
      location: "Chicago, IL",
      type: "Full-time",
      experience: "Senior",
      salary: "$130k–$175k",
      category: "automation-controls",
      tags: ["Full-time", "Senior"],
      posted: "1 week ago",
      description:
        "PLC programming, commissioning support, and process improvement.",
    },
    {
      title: "Quality Inspector",
      company: "PrecisionCo",
      location: "Austin, TX",
      type: "Contract",
      experience: "Junior",
      salary: "$22–$28/hr",
      category: "quality-compliance",
      tags: ["Contract"],
      posted: "3 days ago",
      description:
        "Inspection, reporting, and compliance checks with documented standards.",
    },
    {
      title: "Healthcare Technical Project Coordinator",
      company: "CareOps",
      location: "New York, NY",
      type: "Full-time",
      experience: "Mid",
      salary: "$85k–$110k",
      category: "healthcare-technical",
      tags: ["Full-time"],
      posted: "5 days ago",
      description:
        "Coordinate technical projects across operations, vendors, and stakeholders.",
    },
    {
      title: "Aerospace Quality Engineer",
      company: "AeroShield",
      location: "On-site",
      type: "Full-time",
      experience: "Senior",
      salary: "$140k–$190k",
      category: "aerospace-defense",
      tags: ["Full-time", "Senior"],
      posted: "6 days ago",
      description:
        "Quality systems, audits, supplier validation, and compliance documentation.",
    },
    {
      title: "Architectural Technician",
      company: "BuildStudio",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "Mid",
      salary: "$75k–$95k",
      category: "architecture",
      tags: ["Full-time"],
      posted: "2 days ago",
      description:
        "Drafting, coordination, and documentation for building design systems.",
    },
    {
      title: "Field Service Technician",
      company: "InstallPro",
      location: "Remote",
      type: "Contract",
      experience: "Mid",
      salary: "$35–$55/hr",
      category: "field-service",
      tags: ["Remote", "Contract"],
      posted: "1 week ago",
      description:
        "Installation, troubleshooting, and commissioning support for client sites.",
    },
    {
      title: "Project Manager (Technical)",
      company: "BuildOps",
      location: "Dallas, TX",
      type: "Full-time",
      experience: "Senior",
      salary: "$110k–$145k",
      category: "project-management",
      tags: ["Full-time", "Senior"],
      posted: "3 days ago",
      description:
        "Lead cross-functional technical projects, schedules, budgets, and delivery.",
    },
  ];

  // ================= FILTER LOGIC =================
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCategory =
        selectedCategory === "" || job.category === selectedCategory;

      const matchesKeyword =
        keyword.trim() === "" ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase());

      const matchesLocation =
        location.trim() === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const matchesType = jobType === "" || job.type === jobType;

      const matchesExperience =
        experience === "" || job.experience === experience;

      const matchesQuick =
        quickFilters.length === 0 ||
        quickFilters.every((f) => job.tags.includes(f));

      return (
        matchesCategory &&
        matchesKeyword &&
        matchesLocation &&
        matchesType &&
        matchesExperience &&
        matchesQuick
      );
    });
  }, [jobs, selectedCategory, keyword, location, jobType, experience, quickFilters]);

  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="relative py-24 md:py-28 bg-animated-gradient text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="md:flex md:items-center md:justify-between gap-12">

            {/* LEFT */}
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Discover verified <span className="text-[#02000D]">Technical jobs</span>
                <br />
                built for long-term careers
              </h1>

              <p className="mt-5 text-base md:text-lg max-w-xl text-white/90">
                Browse roles across Engineering, Industrial Operations, Healthcare, Aerospace, and the Built World — including remote options.
              </p>

              <div className="w-full mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
                  <input
                    type="text"
                    placeholder="Title / keyword"
                    className="w-full px-5 py-4 rounded-2xl bg-white text-gray-900 shadow-xl outline-none focus:ring-2 focus:ring-[#A866FE]"
                  />

                  <input
                    type="text"
                    placeholder="Location (e.g. Remote, New York)"
                    className="w-full px-5 py-4 rounded-2xl bg-white text-gray-900 shadow-xl outline-none focus:ring-2 focus:ring-[#A866FE]"
                  />

                  <button className="w-full px-5 py-4 rounded-2xl bg-[#02000D] text-white font-semibold shadow-xl hover:bg-black transition">
                    Search Jobs
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 inline-flex items-center justify-center gap-2 bg-white text-[#02000D] font-semibold px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-[1px] transition border border-white/40"
              >
                Jump to Jobs <span className="text-lg">↓</span>
              </button>
            </div>

            {/* RIGHT */}
            <div
              ref={heroImageRef}
              className="md:w-1/2 mt-14 md:mt-0 flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6F00FC] via-[#8C33FD] to-[#A866FE] blur-3xl opacity-30 scale-110" />

                <div className="relative z-10 rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-7 shadow-2xl overflow-hidden">
                  <div className="text-white/90">
                    <p className="text-sm font-semibold">Verified Technical roles</p>
                    <p className="text-xs opacity-90 mt-1">
                      Clear salary ranges • Remote options • Fast response teams
                    </p>
                  </div>

                  {/* Floating cards (desktop only) */}
                  <div className="hidden md:block">
                    <div className="absolute -bottom-5 -right-4 glass float-1 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-44 border border-white/20">
                      <p className="font-semibold leading-snug">Systems Engineer</p>
                      <p className="opacity-85">Remote • $145k</p>
                    </div>

                    <div className="absolute -top-6 -left-4 glass float-2 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-48 border border-white/20">
                      <p className="font-semibold leading-snug">Quality Inspector</p>
                      <p className="opacity-85">On-site • $28/hr</p>
                    </div>

                    <div className="absolute top-16 -right-6 glass float-3 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-48 border border-white/20">
                      <p className="font-semibold leading-snug">Electrical Engineer</p>
                      <p className="opacity-85">Remote • $160k</p>
                    </div>

                    <div className="absolute bottom-20 -left-6 glass float-4 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-56 border border-white/20">
                      <p className="font-semibold leading-snug">Project Manager (Technical)</p>
                      <p className="opacity-85">Hybrid • $145k</p>
                    </div>
                  </div>

                  {/* Mobile-friendly single card */}
                  <div className="md:hidden mt-6 glass rounded-2xl px-4 py-3 shadow-xl text-white text-sm border border-white/20">
                    <p className="font-semibold">Electrical Engineer</p>
                    <p className="text-xs opacity-85 mt-1">Remote • $160k</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Technical Job Categories
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Explore Technical careers across engineering, industrial operations, healthcare, aerospace, and the built world.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 bg-[#6F00FC] text-white font-semibold px-6 py-3 rounded-2xl shadow-sm hover:bg-[#8C33FD] transition"
            >
              Browse Jobs <span className="text-lg">→</span>
            </button>
          </div>

          {selectedCategory && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-600">Selected:</span>
              <span className="px-3 py-1.5 rounded-full bg-[#F6F2FF] border border-[#6F00FC]/20 text-[#6F00FC] text-sm font-semibold">
                {ALL_CATEGORIES.find((c) => c.slug === selectedCategory)?.label ?? "Category"}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory("")}
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
              >
                Clear
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CATEGORY_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {group.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {group.items.map((cat) => {
                    const isActive = selectedCategory === cat.slug;
                    return (
                      <div key={cat.slug} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            document
                              .getElementById("jobs")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`px-4 py-2 rounded-full border text-sm transition flex items-center gap-2
                            ${
                              isActive
                                ? "bg-[#6F00FC] text-white border-[#6F00FC]"
                                : "bg-gray-50 text-gray-800 border-gray-200 hover:border-[#6F00FC] hover:bg-[#F6F2FF]"
                            }`}
                        >
                          <span aria-hidden>{cat.icon}</span>
                          {cat.label}
                        </button>

                        <Link
                          href={`/categories/${cat.slug}`}
                          className="text-xs text-gray-500 hover:text-[#6F00FC] underline underline-offset-4"
                        >
                          View page
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BROWSE JOBS ================= */}
      <section id="jobs" className="py-28 relative jobs-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                Browse Jobs
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Use filters to narrow results. Categories above also filter this list.
              </p>
            </div>

            <button className="w-full md:w-auto text-[#6F00FC] font-semibold px-5 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
              Load More Jobs
            </button>
          </div>

          <div className="text-gray-600 mb-10">
            Showing{" "}
            <span className="font-semibold text-gray-900">{filteredJobs.length}</span>{" "}
            available roles
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* FILTERS */}
            <aside className="lg:w-1/4 w-full lg:sticky lg:top-28 h-fit">
              <div className="rounded-3xl p-6 shadow-lg border border-gray-200 bg-white/90 backdrop-blur">
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

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title / Keyword
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  placeholder="e.g. Technician, Engineer, Inspector"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                             focus:ring-2 focus:ring-[#6F00FC] outline-none text-sm bg-white"
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="e.g. Remote, Houston, NY"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                             focus:ring-2 focus:ring-[#8C33FD] outline-none text-sm bg-white"
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
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

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
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
                  {["Remote", "Full-time", "Senior", "Contract", "On-site"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleQuick(tag)}
                      className={`text-xs px-3 py-2 rounded-full transition ${
                        quickFilters.includes(tag)
                          ? "bg-[#6F00FC] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="w-full bg-[#6F00FC] hover:bg-[#8C33FD] text-white py-3 rounded-2xl font-semibold transition shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* JOB FEED */}
            <div className="lg:w-3/4 w-full space-y-6">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border border-gray-200 text-gray-700">
                  <p className="font-semibold text-gray-900">No results found.</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Try clearing filters or using a different keyword/location.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-5 py-3 rounded-2xl text-sm font-semibold transition"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition
                               border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-start gap-6"
                  >
                    <div className="flex gap-4 min-w-0">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#A866FE] text-white flex items-center justify-center font-bold shadow-sm">
                        {job.company.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.company} • {job.location}
                        </p>

                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.tags.map((pill) => (
                            <span
                              key={pill}
                              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:text-right shrink-0">
                      <p className="text-sm font-semibold text-[#6F00FC]">
                        {job.salary}
                      </p>
                      <button className="mt-4 w-full md:w-auto bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition shadow-sm">
                        View
                      </button>
                      <p className="text-xs text-gray-400 mt-3">
                        Posted {job.posted}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NOTE: keep your other sections below if you want (Trusted Teams, Featured Jobs, Footer, etc.) */}
    </main>
  );
}
