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

  useEffect(() => {
  const els = Array.from(document.querySelectorAll(".reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));

  return () => io.disconnect();
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
<section className="py-28 hero-bg border-y border-gray-200 relative overflow-hidden">
  {/* Soft decorative highlights */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6F00FC]/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#A866FE]/10 rounded-full blur-3xl" />

<div className="relative w-full">
    {/* Header */}
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
          Featured Jobs
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          A curated selection of standout roles from trusted teams.
        </p>
      </div>

      {/* Carousel controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("featured-carousel");
            el?.scrollBy({ left: -420, behavior: "smooth" });
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
            el?.scrollBy({ left: 420, behavior: "smooth" });
          }}
          className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>

{/* Carousel (TRUE FULL WIDTH) */}
<div className="relative -mx-6 md:-mx-12">
  {/* Soft edge fades */}
  <div className="pointer-events-none absolute top-0 left-0 h-full w-10 md:w-16 bg-gradient-to-r from-white/90 to-transparent z-10" />
  <div className="pointer-events-none absolute top-0 right-0 h-full w-10 md:w-16 bg-gradient-to-l from-white/90 to-transparent z-10" />

  <div
    id="featured-carousel"
    className="no-scrollbar featured-autoscroll flex gap-6 overflow-x-auto pb-6 px-6 md:px-12 scroll-smooth snap-x snap-mandatory"
  >
        {[
          {
            title: "Senior Frontend Engineer",
            company: "NovaTech",
            location: "Remote",
            type: "Full-time",
            pay: "$120k – $160k",
            posted: "2 days ago",
            verified: true,
          },
          {
            title: "Backend Engineer (Node/Go)",
            company: "TechNova",
            location: "Austin, TX",
            type: "Full-time",
            pay: "$130k – $175k",
            posted: "3 days ago",
            verified: true,
          },
          {
            title: "DevOps / Platform Engineer",
            company: "CloudSprint",
            location: "Remote",
            type: "Full-time",
            pay: "$140k – $190k",
            posted: "5 days ago",
            verified: false,
          },
          {
            title: "Product Designer",
            company: "Launchify",
            location: "San Francisco, CA",
            type: "Contract",
            pay: "$8,000 / month",
            posted: "4 days ago",
            verified: true,
          },
          {
            title: "Data Engineer",
            company: "SignalWorks",
            location: "New York, NY",
            type: "Full-time",
            pay: "$125k – $165k",
            posted: "1 week ago",
            verified: false,
          },
        ].map((job, idx) => (
          <div
            key={idx}
            className="snap-start flex-none w-[320px] sm:w-[360px] md:w-[400px]
                       bg-white rounded-2xl shadow-sm hover:shadow-lg transition
                       border border-gray-200 relative overflow-hidden"
          >
            {/* Purple accent bar */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#6F00FC]" />

            <div className="p-6 pl-8">
              {/* Top row: badge + save */}
              <div className="flex items-center justify-between mb-4">
                {job.verified ? (
                  <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#F6F2FF] text-[#6F00FC] border border-[#6F00FC]/20">
                    <span className="h-2 w-2 rounded-full bg-[#6F00FC]" />
                    Verified
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">Featured</span>
                )}

                <button
                  aria-label="Save job"
                  className="text-gray-400 hover:text-[#6F00FC] transition"
                >
                  ★
                </button>
              </div>

              {/* Header */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6F00FC] text-white flex items-center justify-center font-bold shadow-sm">
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
                Fast hiring teams, clear expectations, and modern workflows.
              </p>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center">
                <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-lg text-sm font-medium transition">
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
  </div>
</section>


{/* ================= COMPANIES / TRUSTED TEAMS (FULL WIDTH + PURPLE GLOW) ================= */}
<section className="relative py-20 md:py-24 overflow-hidden">
  {/* Full-bleed purple background (site shade) */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#140047] via-[#3017D3] to-[#6F00FC]" />

  {/* Soft blur glows */}
  <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
  <div className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

  {/* Full-bleed wrapper */}
  <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <p className="text-sm font-semibold tracking-[0.22em] text-white/80 uppercase">
          Trusted by teams
        </p>
        <h3 className="mt-3 text-2xl md:text-4xl font-extrabold text-white tracking-tight">
          Companies we’ve worked with
        </h3>
        <p className="mt-3 text-white/85 text-sm md:text-base max-w-2xl mx-auto">
          A quick look at some teams that trust TechnicalJobboard.
        </p>
      </div>

      {(() => {
        const logos = [
          { src: "/Architects.png", alt: "Architects" },
          { src: "/vermot.png", alt: "Vermot" },
          { src: "/Devops.png", alt: "Devops" },
          { src: "/Hiredengineer.png", alt: "HiredEngineer" },
          { src: "/redtail.png", alt: "Redtail" },
        ];

        const [active, setActive] = React.useState(0);

        const next = () => setActive((i) => (i + 1) % logos.length);
        const prev = () => setActive((i) => (i - 1 + logos.length) % logos.length);

        React.useEffect(() => {
          const t = setInterval(() => {
            setActive((i) => (i + 1) % logos.length);
          }, 3200);
          return () => clearInterval(t);
        }, [logos.length]);

        return (
          <div className="relative">
            {/* Card */}
            <div className="relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* extra subtle sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

              <div className="relative px-4 sm:px-8 py-10 sm:py-12">
                {/* Arrows */}
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous company"
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2
                             h-11 w-11 rounded-2xl border border-white/20 bg-white/15
                             text-white shadow-sm hover:bg-white/25 transition
                             flex items-center justify-center"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next company"
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2
                             h-11 w-11 rounded-2xl border border-white/20 bg-white/15
                             text-white shadow-sm hover:bg-white/25 transition
                             flex items-center justify-center"
                >
                  →
                </button>

                {/* Logo (BIGGER) */}
                <div className="mx-auto w-full max-w-5xl">
                  <div className="h-28 sm:h-32 md:h-40 flex items-center justify-center">
                    <img
                      key={logos[active].src}
                      src={logos[active].src}
                      alt={logos[active].alt}
                      className="max-h-20 sm:max-h-24 md:max-h-28 lg:max-h-32
                                 w-auto object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)]
                                 opacity-95 transition"
                    />
                  </div>
                </div>

                {/* Dots */}
                <div className="mt-7 flex items-center justify-center gap-2">
                  {logos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Go to company ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        i === active
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  </div>
</section>





{/* ================= ALL JOBS ================= */}
<section id="jobs" className="py-24 md:py-28 bg-white border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#3017D3]">
          ALL JOBS
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Explore Technical opportunities
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Filter by keyword, location, job type, and experience — then explore what matches.
        </p>
      </div>

      {/* Text-style button (as you requested) */}
      <button
        type="button"
        className="w-full md:w-auto inline-flex items-center justify-center md:justify-end gap-2
                   text-[#3017D3] font-semibold underline underline-offset-4
                   hover:text-[#2a12c0] transition px-2 py-2"
      >
        Load More Jobs <span aria-hidden>→</span>
      </button>
    </div>

    {/* Selected category (optional, only shows when selected) */}
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

    {/* Count */}
    <div className="text-gray-600 mb-10">
      Showing{" "}
      <span className="font-semibold text-gray-900">
        {filteredJobs.length}
      </span>{" "}
      roles
    </div>

    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

      {/* Filters */}
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

          {/* Keyword */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title / Keyword
          </label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="e.g. Maintenance, PLC, Quality"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                       focus:ring-2 focus:ring-[#3017D3] outline-none text-sm bg-white"
          />

          {/* Location */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="e.g. Remote, New York, Austin"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 mb-5
                       focus:ring-2 focus:ring-[#3017D3] outline-none text-sm bg-white"
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
            {["Remote", "Full-time", "Senior", "Contract"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleQuick(tag)}
                className={`text-xs px-3 py-2 rounded-full transition ${
                  quickFilters.includes(tag)
                    ? "bg-[#3017D3] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="w-full bg-[#3017D3] hover:bg-[#2a12c0] text-white py-3 rounded-2xl font-semibold transition shadow-sm"
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Job Feed */}
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
              className="mt-4 bg-[#3017D3] hover:bg-[#2a12c0] text-white px-5 py-3 rounded-2xl text-sm font-semibold transition"
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
                {/* Company mark (kept green as you want) */}
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
                <p className="text-sm font-semibold text-[#3017D3]">
                  {job.salary}
                </p>
                <button className="mt-4 w-full md:w-auto bg-[#3017D3] hover:bg-[#2a12c0] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition shadow-sm">
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



{/* ============ EMPOWERING JOB SEEKERS ================= */}
<section
  id="empowering"
  className="relative py-28 overflow-hidden bg-gradient-to-br from-[#F6F2FF] via-white to-[#F9F7FF]"
>
  {/* Decorative background accents */}
  <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#6F00FC]/10 blur-3xl" />
  <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#8C33FD]/10 blur-3xl" />

  <div className="relative max-w-6xl mx-auto px-6">
    <div className="reveal flex flex-col md:flex-row items-center gap-14">
      {/* Image */}
      <div className="md:w-1/2 w-full">
        <div className="relative rounded-3xl bg-white p-4 shadow-xl">
          <img
            src="/empower-platform.png"
            alt="Job platform dashboard illustration"
            className="rounded-2xl w-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="md:w-1/2 w-full">
        <span className="inline-block mb-4 text-sm font-semibold text-[#6F00FC] bg-[#F0EBFF] px-4 py-1.5 rounded-full">
          Built for Technical Careers
        </span>

        <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight text-gray-900">
          Empowering Job Seekers
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed max-w-xl">
          Discover verified Technical roles, transparent salary ranges, and trusted employers —
          all in one place designed to support long-term career growth.
        </p>

        <ul className="space-y-3 mb-8 text-gray-700">
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#6F00FC]" />
            Verified Technical opportunities only
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#6F00FC]" />
            Clear expectations & salary visibility
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#6F00FC]" />
            Roles built for growth, not churn
          </li>
        </ul>

        {/* Scroll to All Jobs */}
        <button
          type="button"
          onClick={() => document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-3 bg-[#6F00FC] hover:bg-[#8C33FD]
                     text-white px-7 py-3 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
        >
          Get Started
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            →
          </span>
        </button>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}


