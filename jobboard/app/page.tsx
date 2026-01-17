"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";

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

const CATEGORIES = [
  { label: "Healthcare IT", slug: "healthcare-it" },
  { label: "Aerospace / Defense", slug: "aerospace-defense" },
  { label: "Architecture", slug: "architecture" },
  { label: "Project Management", slug: "project-management" },
  { label: "Construction / Building Systems", slug: "construction-mep" },
  { label: "Manufacturing / Production", slug: "manufacturing-production" },
  { label: "Field Service / Commissioning", slug: "field-service" },
  { label: "Quality / Compliance", slug: "quality-compliance" },
  { label: "Maintenance / Reliability", slug: "maintenance-reliability" },
];


  // Flatten categories for easy lookup
 const ALL_CATEGORIES = CATEGORIES;


  // ===== Filter state shared by Categories + Browse Jobs =====
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  // ✅ Safe URL read (avoids prerender error)
  // Reads /?category=aerospace-defense
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setSelectedCategory(cat);
  }, []);

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

  // ===== Sample jobs (add/edit freely) =====
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
      description: "Preventive maintenance, troubleshooting, and equipment reliability support.",
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
      description: "Power systems design, documentation, testing, and field coordination.",
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
      description: "PLC programming, commissioning support, and process improvement.",
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
      description: "Inspection, reporting, and compliance checks with documented standards.",
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
      description: "Coordinate technical projects across clinical operations and vendor teams.",
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
      description: "Quality systems, audits, supplier validation, and compliance documentation.",
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
      description: "Drafting, coordination, and documentation for building design systems.",
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
      description: "Installation, troubleshooting, and commissioning support for client sites.",
    },
  ];

  // ===== Filtering logic =====
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
          Browse roles across Engineering, Infrastructure, Cloud, Security, and Data — including remote options.
        </p>

        {/* Search Bar (3 equal boxes) */}
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

        {/* Jump to Jobs (very visible + works) */}
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

            {/* Floating verified cards (hidden on mobile to prevent overlap) */}
            <div className="hidden md:block">
             <div className="absolute -bottom-5 -right-4 glass float-1 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-44 border border-white/20">
                <p className="font-semibold leading-snug">Systems Engineer</p>
                <p className="opacity-85">Remote • $145k</p>
              </div>

              <div className="absolute -top-6 -left-4 glass float-2 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-48 border border-white/20">
               <p className="font-semibold leading-snug">DevOps Engineer</p>
                <p className="opacity-85">Hybrid • $155k</p>
              </div>

              <div className="absolute top-16 -right-6 glass float-3 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-48 border border-white/20">
                <p className="font-semibold leading-snug">Data Engineer</p>
                <p className="opacity-85">Remote • $160k</p>
              </div>

              <div className="absolute bottom-20 -left-6 glass float-4 rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-56 border border-white/20">
                <p className="font-semibold leading-snug">Network Security Engineer</p>
                <p className="opacity-85">On-site • $170k</p>
              </div>
            </div>

            {/* Mobile-friendly single card (shows only on small screens) */}
            <div className="md:hidden mt-6 glass rounded-2xl px-4 py-3 shadow-xl text-white text-sm border border-white/20">
              <p className="font-semibold">Network Security Engineer</p>
              <p className="text-xs opacity-85 mt-1">Remote • $170k</p>
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
    <div className="mb-10">
  <h2 className="text-3xl font-semibold text-gray-900">
    Available Categories
  </h2>
  <p className="text-gray-600 mt-2">
    Tap a category to filter jobs below.
  </p>
</div>


    {/* Selected pill */}
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

    {/* Simple pill buttons */}
    <div className="flex flex-wrap gap-3">
      {ALL_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.slug;

        return (
          <button
            key={cat.slug}
            type="button"
            onClick={() => {
              setSelectedCategory(cat.slug);
              document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-4 py-2 rounded-full border text-sm transition
              ${
                isActive
                  ? "bg-[#6F00FC] text-white border-[#6F00FC]"
                  : "border-gray-200 bg-gray-50 text-gray-800 hover:border-[#6F00FC] hover:bg-[#F6F2FF]"
              }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  </div>
</section>



{/* ================= FEATURED JOBS ================= */}
<section className="py-28 hero-bg border-y border-gray-200">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
      <div>
        <h2 className="text-3xl font-semibold tracking-wide text-gray-900">
          Featured Jobs
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          A friendly shortlist of standout roles — scroll sideways or use the arrows.
        </p>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("featured-carousel");
            if (!el) return;
            el.scrollBy({ left: -420, behavior: "smooth" });
          }}
          className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
          aria-label="Scroll left"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("featured-carousel");
            if (!el) return;
            el.scrollBy({ left: 420, behavior: "smooth" });
          }}
          className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>

    {/* Carousel */}
    <div className="relative">
      {/* Soft edge fades */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-10 md:w-16 bg-gradient-to-r from-white/90 to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-10 md:w-16 bg-gradient-to-l from-white/90 to-transparent z-10" />

      <div
        id="featured-carousel"
        className="no-scrollbar flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
      >
        {[
          {
            title: "Senior Frontend Engineer",
            company: "NovaTech",
            location: "Remote",
            type: "Full-time",
            pay: "$120k – $160k",
            posted: "2 days ago",
          },
          {
            title: "Backend Engineer (Node/Go)",
            company: "TechNova",
            location: "Austin, TX",
            type: "Full-time",
            pay: "$130k – $175k",
            posted: "3 days ago",
          },
          {
            title: "DevOps / Platform Engineer",
            company: "CloudSprint",
            location: "Remote",
            type: "Full-time",
            pay: "$140k – $190k",
            posted: "5 days ago",
          },
          {
            title: "Product Designer",
            company: "Launchify",
            location: "San Francisco, CA",
            type: "Contract",
            pay: "$8,000 / month",
            posted: "4 days ago",
          },
          {
            title: "Data Engineer",
            company: "SignalWorks",
            location: "New York, NY",
            type: "Full-time",
            pay: "$125k – $165k",
            posted: "1 week ago",
          },
          {
            title: "Fullstack Engineer",
            company: "PixelForge",
            location: "Remote",
            type: "Full-time",
            pay: "$115k – $155k",
            posted: "6 days ago",
          },
          {
            title: "Mobile Engineer (React Native)",
            company: "BrightApps",
            location: "Remote",
            type: "Full-time",
            pay: "$110k – $145k",
            posted: "1 week ago",
          },
        ].map((job, idx) => (
          <div
            key={idx}
            className="snap-start flex-none w-[320px] sm:w-[360px] md:w-[400px]
                       bg-white rounded-2xl shadow-sm hover:shadow-lg transition
                       border border-gray-200 relative overflow-hidden"
          >
            {/* Left Accent (consistent + not purple-heavy) */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-slate-900 via-slate-700 to-emerald-600" />

            <div className="p-6 pl-8">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex gap-4 min-w-0">
                  {/* Company mark (matches All Jobs) */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                    {job.company.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug truncate">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {job.company} • {job.location}
                    </p>
                  </div>
                </div>

                {/* Save */}
                <button
                  aria-label="Save job"
                  className="text-gray-400 hover:text-slate-900 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
                    />
                  </svg>
                </button>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {job.type}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {job.pay}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Quick hiring process, clear expectations, and a team that supports growth.
              </p>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center">
                <button className="bg-[#02000D] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                  View
                </button>
                <span className="text-xs text-gray-400">
                  Posted {job.posted}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Load more */}
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        className="group inline-flex items-center gap-3 bg-[#02000D] text-white px-8 py-4 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
      >
        Load More Jobs
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition">
          →
        </span>
      </button>
    </div>
  </div>
</section>


{/* ================= TRUSTED TEAMS ================= */}
<section className="py-28 trusted-bg overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-16">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
        Trusted by teams building the future
      </h3>
      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        Startups and technology teams that care about great talent.
      </p>
    </div>

    {/* V-Wave Carousel */}
    <div className="relative">
      <div className="wave-marquee gap-10 hover:[animation-play-state:paused]">
        {[
          "/Architects.png",
          "/vermot.png",
          "/Devops.png",
          "/Hiredengineer.png",
          "/redtail.png",
          "/Architects.png",
          "/vermot.png",
          "/Devops.png",
          "/Hiredengineer.png",
          "/redtail.png",
        ].map((logo, i) => (
          <div
            key={i}
            className="wave-item min-w-[220px] h-[120px]
                       flex items-center justify-center
                       rounded-3xl border border-gray-200
                       bg-white shadow-sm"
          >
            <img
              src={logo}
              alt="Trusted company logo"
              className="h-16 md:h-20 object-contain opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent" />
    </div>

  </div>
</section>

{/* ================= BROWSE JOBS ================= */}
<section id="jobs" className="py-24 md:py-28 relative browse-bg overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
  ALL JOBS
</h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Filter by keyword, location, job type, and experience — then explore what matches.
        </p>
      </div>

      <button
  type="button"
  className="w-full md:w-auto inline-flex items-center justify-center md:justify-end gap-2
             text-[#6F00FC] font-semibold underline underline-offset-4
             hover:text-[#8C33FD] transition px-2 py-2"
>
  Load More Jobs <span aria-hidden>→</span>
</button>
    </div>

    {/* ===== Jobs data + filter logic (keep INSIDE the section so it's easy) ===== */}
    {(() => {
      const jobs = [
        {
          title: "Frontend Engineer",
          company: "NovaTech",
          location: "Remote",
          type: "Full-time",
          experience: "Senior",
          salary: "$90k – $130k",
          tags: ["Remote", "Full-time", "Senior", "Fast Apply"],
          description:
            "Build clean UI with React & Next.js, collaborate with product teams, and ship features users love.",
          posted: "3 days ago",
        },
        {
          title: "Backend Engineer (Node/Go)",
          company: "TechNova",
          location: "Austin, TX",
          type: "Full-time",
          experience: "Mid",
          salary: "$110k – $150k",
          tags: ["Full-time"],
          description:
            "Design and scale APIs, improve performance, and work closely with infrastructure and product.",
          posted: "5 days ago",
        },
        {
          title: "DevOps / Platform Engineer",
          company: "CloudSprint",
          location: "Remote",
          type: "Contract",
          experience: "Senior",
          salary: "$120k – $160k",
          tags: ["Remote", "Contract", "Senior"],
          description:
            "Own CI/CD, cloud infrastructure, monitoring, and reliability across environments.",
          posted: "1 week ago",
        },
        {
          title: "Data Engineer",
          company: "SignalWorks",
          location: "New York, NY",
          type: "Full-time",
          experience: "Mid",
          salary: "$125k – $165k",
          tags: ["Full-time"],
          description:
            "Build pipelines, improve data quality, and enable analytics across the product.",
          posted: "4 days ago",
        },
        {
          title: "QA Engineer",
          company: "PixelForge",
          location: "Remote",
          type: "Full-time",
          experience: "Junior",
          salary: "$70k – $95k",
          tags: ["Remote", "Full-time"],
          description:
            "Write test plans, automate core flows, and help maintain release quality.",
          posted: "2 days ago",
        },
        {
          title: "Security Engineer",
          company: "ShieldStack",
          location: "San Francisco, CA",
          type: "Full-time",
          experience: "Senior",
          salary: "$150k – $200k",
          tags: ["Full-time", "Senior"],
          description:
            "Strengthen security posture, build tooling, and support secure development practices.",
          posted: "6 days ago",
        },
      ];

      // Local state (kept inside for easy copy/paste)
      // NOTE: this requires useState imported at the top: import { useState } from "react";
      // If you already have useRef imported, you can do: import { useRef, useState } from "react";
      const [keyword, setKeyword] = React.useState("");
      const [loc, setLoc] = React.useState("");
      const [jobType, setJobType] = React.useState("");
      const [experience, setExperience] = React.useState("");
      const [quickFilters, setQuickFilters] = React.useState<string[]>([]);

      const filteredJobs = jobs.filter((job) => {
        const matchesKeyword =
          keyword.trim() === "" ||
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.company.toLowerCase().includes(keyword.toLowerCase());

        const matchesLocation =
          loc.trim() === "" ||
          job.location.toLowerCase().includes(loc.toLowerCase());

        const matchesType = jobType === "" || job.type === jobType;

        const matchesExperience =
          experience === "" || job.experience === experience;

        const matchesQuick =
          quickFilters.length === 0 ||
          quickFilters.every((f) => job.tags.includes(f));

        return (
          matchesKeyword &&
          matchesLocation &&
          matchesType &&
          matchesExperience &&
          matchesQuick
        );
      });

      const toggleQuick = (tag: string) => {
        setQuickFilters((prev) =>
          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
      };

      const resetFilters = () => {
        setKeyword("");
        setLoc("");
        setJobType("");
        setExperience("");
        setQuickFilters([]);
      };

      return (
        <>
          <div className="text-gray-600 mb-10">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredJobs.length}
            </span>{" "}
            roles
          </div>

<div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* ================= FILTERS ================= */}
<aside className="lg:w-1/4 w-full lg:sticky lg:top-24 h-fit">
              <div className="rounded-3xl p-6 shadow-lg border border-gray-200 bg-white/90 backdrop-blur">
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Filters
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Refine your results.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
                  >
                    Reset
                  </button>
                </div>

                {/* Keyword */}
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title / Keyword
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  placeholder="e.g. Frontend, React, DevOps"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                             focus:ring-2 focus:ring-[#6F00FC] outline-none text-sm bg-white"
                />

                {/* Location */}
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  type="text"
                  placeholder="e.g. Remote, New York, Austin"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                             focus:ring-2 focus:ring-[#8C33FD] outline-none text-sm bg-white"
                />

                {/* Job Type */}
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

                {/* Experience */}
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

                {/* Quick Filters */}
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Quick Filters
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Remote", "Full-time", "Senior", "Contract", "Fast Apply"].map(
                    (tag) => (
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
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="w-full bg-[#6F00FC] hover:bg-[#8C33FD] text-white py-3 rounded-2xl font-semibold transition shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* ================= JOB FEED ================= */}
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
                    className="mt-4 bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-5 py-3 rounded-2xl text-sm font-semibold transition"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-lg transition
           border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-start gap-5 md:gap-6"

                  >
                    <div className="flex gap-4 min-w-0">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
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
        </>
      );
    })()}
  </div>
</section>




{/* ================= EMPOWERING JOB SEEKERS ================= */}
<section className="py-28 bg-white">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
    <div className="md:w-1/2">
      <img
        src="/empower-platform.png"
        alt="Job platform dashboard illustration"
        className="rounded-3xl shadow-xl bg-gray-50 p-4"
      />
    </div>

    <div className="md:w-1/2">
      <h2 className="text-3xl font-semibold mb-6 tracking-tight">
        Empowering Job Seekers
      </h2>
      <p className="text-gray-700 mb-6">
        Verified Technical roles, trusted companies, and career tools built
      </p>
      <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-6 py-3 rounded-xl font-medium transition">
        Get Started
      </button>
    </div>
  </div>
</section>

{/* ================= FOOTER ================= */}
<footer>
  <div className="bg-gray-100 py-20">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center items-center">

<div className="flex flex-col items-start">
  <img
    src="/Technicaljoblogo-removebg-preview.png"
    alt="TechnicalJobboard Logo"
    className="h-20 md:h-24 lg:h-24 w-auto object-contain mb-4"
  />
  <p className="text-gray-800 text-sm max-w-xs">
Discover verified Technical jobs and career-defining opportunities.
  </p>
</div>

      <div>
        <h3 className="font-semibold mb-4">Explore</h3>
        <ul className="space-y-3 text-sm">
          <li>Browse Jobs</li>
          <li>Companies</li>
          <li>Career Resources</li>
          <li>Contact</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Get Job Alerts</h3>
        <div className="flex gap-2">
          <input
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded-xl border"
          />
          <button className="bg-[#6F00FC] text-white px-4 py-2 rounded-xl">
            Join
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="bg-[#02000D] py-10">
    <div className="flex justify-center gap-6">
      <FaTwitter />
      <FaLinkedinIn />
      <FaFacebookF />
      <FaGithub />
    </div>

    <p className="mt-6 text-center text-white text-sm">
      © {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
    </p>
  </div>
</footer>
    </main>
  );
}