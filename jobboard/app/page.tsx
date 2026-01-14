"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";

export default function Home() {
  const heroImageRef = useRef<HTMLDivElement | null>(null);

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
          Find your next <span className="text-[#02000D]">technical role</span>
          <br />
          at startups hiring in the U.S.
        </h1>

        <p className="mt-5 text-base md:text-lg max-w-xl text-white/90">
          Browse verified roles across engineering, product, data, and DevOps — including remote options.
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
              placeholder="Location (e.g. Remote, NY)"
              className="w-full px-5 py-4 rounded-2xl bg-white text-gray-900 shadow-xl outline-none focus:ring-2 focus:ring-[#A866FE]"
            />

            <button className="w-full px-5 py-4 rounded-2xl bg-[#02000D] text-white font-semibold shadow-xl hover:bg-black transition">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Jump to Jobs (more visible) */}
        <button
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

          {/* Small duplicate "technical job" chips */}
          <div className="relative z-10 rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-6 shadow-2xl">
            <p className="text-white/90 font-semibold mb-4">
              Popular technical roles hiring now
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Frontend Engineer",
                "Backend Engineer",
                "Fullstack Engineer",
                "DevOps Engineer",
                "Data Engineer",
                "ML Engineer",
                "Mobile Engineer",
                "Security Engineer",
                "QA Engineer",
                "Cloud Engineer",
                "Software Engineer",
                "Site Reliability (SRE)",
              ].map((role, i) => (
                <span
                  key={i}
                  className="glass text-xs px-3 py-2 rounded-full border border-white/20 text-white/95 shadow-sm"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Tiny floating card (smaller than before) */}
            <div className="absolute -bottom-4 -right-3 glass rounded-2xl px-3 py-2 shadow-xl text-white text-xs w-40 border border-white/20">
              <p className="font-semibold leading-snug">Frontend Engineer</p>
              <p className="opacity-85">Remote • $120k</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Removed the old bottom icons strip completely */}
  </div>
</section>

{/* ================= TRUSTED TEAMS ================= */}
<section className="py-28 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <h3 className="text-center text-xl md:text-2xl font-semibold text-gray-800 tracking-tight mb-16">
      Trusted by teams building the future
    </h3>

    {/* Marquee */}
    <div className="relative">
      <div className="flex gap-10 animate-marquee hover:[animation-play-state:paused]">
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
            className="min-w-[220px] h-[120px] flex items-center justify-center
                       rounded-2xl border border-gray-200 bg-white
                       shadow-sm hover:shadow-md
                       transition-all duration-300"
          >
            <img
              src={logo}
              alt="Trusted company logo"
              className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition"
            />
          </div>
        ))}
      </div>

      {/* Soft edge fades */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-28 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-28 bg-gradient-to-l from-white to-transparent" />
    </div>

  </div>
</section>




{/* ================= FEATURED JOBS ================= */}
<section className="py-28 bg-gradient-to-b from-[#F6F2FF] to-white border-y border-gray-200">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-semibold tracking-wide text-gray-900">
        Featured Jobs
      </h2>
    </div>

    {/* Carousel */}
    <div className="flex gap-6 overflow-x-auto pb-6">
      {[
        {
          title: "Senior Frontend Engineer",
          company: "NovaTech",
          location: "Remote (US)",
          type: "Full-time",
          pay: "$60 – $75 / hr",
          posted: "2 days ago",
          color: "#6F00FC",
        },
        {
          title: "Product Designer",
          company: "Launchify",
          location: "San Francisco, CA",
          type: "Contract",
          pay: "$8,000 / month",
          posted: "4 days ago",
          color: "#8C33FD",
        },
        {
          title: "Backend Engineer",
          company: "TechNova",
          location: "Austin, TX",
          type: "Full-time",
          pay: "$110k – $140k",
          posted: "1 week ago",
          color: "#A866FE",
        },
      ].map((job, idx) => (
        <div
          key={idx}
          className="flex-none w-[400px] bg-white rounded-2xl shadow-sm hover:shadow-md transition border relative overflow-hidden"
        >
          {/* Left Accent */}
          <div
            className="absolute left-0 top-0 h-full w-1.5"
            style={{ backgroundColor: job.color }}
          />

          <div className="p-6 pl-8">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-xl text-white flex items-center justify-center font-bold"
                  style={{ backgroundColor: job.color }}
                >
                  {job.company.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {job.company} • {job.location}
                  </p>
                </div>
              </div>

              {/* Save */}
              <button
                aria-label="Save job"
                className="text-gray-400 hover:text-[#6F00FC] transition"
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
              <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                {job.type}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                {job.pay}
              </span>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-lg text-sm">
                Apply
              </button>
              <span className="text-xs text-gray-400">
                Posted {job.posted}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Load more */}
    <div className="mt-12 flex justify-center">
      <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-8 py-3 rounded-xl font-medium transition shadow-sm">
        Load More Jobs
      </button>
    </div>

  </div>
</section>



{/* ================= BROWSE JOBS ================= */}
<section id="jobs" className="py-28 relative bg-dots-bg">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-semibold tracking-wide text-gray-900">Browse Jobs</h2>
      <span className="text-[#6F00FC] font-medium underline cursor-pointer hover:bg-gray-100 px-2 rounded transition">
        Load More Jobs
      </span>
    </div>
    <p className="text-gray-600 mb-8">Showing 200 available roles</p>

    <div className="flex flex-col lg:flex-row gap-10">

      {/* ================= FILTERS ================= */}
      <aside className="lg:w-1/4 w-full lg:sticky lg:top-28 h-fit">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Refine Your Research</h3>

          {/* Keyword */}
          <input
            type="text"
            placeholder="Keyword or Job Title"
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-[#6F00FC] outline-none text-sm"
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-[#8C33FD] outline-none text-sm"
          />

          {/* Company Filter */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Company</p>
            <div className="flex flex-wrap gap-2">
              {[
                "/Architects.png",
                "/vermot.png",
                "/Devops.png",
                "/Hiredengineer.png",
                "/redtail.png",
              ].map((logo, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 rounded-lg overflow-hidden border cursor-pointer hover:border-[#6F00FC] transition"
                >
                  <img src={logo} alt={`Company ${idx}`} className="w-full h-full object-contain bg-white p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <select className="w-full border rounded-lg px-4 py-2 mb-4 text-sm">
            <option>Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>

          {/* Experience Level */}
          <select className="w-full border rounded-lg px-4 py-2 mb-4 text-sm">
            <option>Experience Level</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>

          {/* Estimated Salary */}
          <select className="w-full border rounded-lg px-4 py-2 mb-4 text-sm">
            <option>Estimated Salary</option>
            <option>$40k – $60k</option>
            <option>$60k – $80k</option>
            <option>$80k – $100k</option>
            <option>$100k – $150k</option>
          </select>

          {/* Popular Filters */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Popular Filters</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-gray-100 cursor-pointer hover:bg-[#6F00FC] hover:text-white transition">Remote</span>
              <span className="text-xs px-3 py-1 rounded-full bg-gray-100 cursor-pointer hover:bg-[#8C33FD] hover:text-white transition">Full-time</span>
              <span className="text-xs px-3 py-1 rounded-full bg-gray-100 cursor-pointer hover:bg-[#A866FE] hover:text-white transition">Senior</span>
              <span className="text-xs px-3 py-1 rounded-full bg-gray-100 cursor-pointer hover:bg-[#6F00FC] hover:text-white transition">Contract</span>
            </div>
          </div>

          <button className="w-full bg-[#6F00FC] hover:bg-[#8C33FD] text-white py-2 rounded-xl font-medium transition">
            Apply Filters
          </button>
        </div>
      </aside>

      {/* ================= JOB FEED ================= */}
      <div className="lg:w-3/4 w-full space-y-6">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex justify-between items-start"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#A866FE] text-white flex items-center justify-center font-bold">
                C
              </div>

              <div>
                <h3 className="text-lg font-semibold">Frontend Engineer</h3>
                <p className="text-sm text-gray-600">
                  NovaTech • Remote (US)
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Build scalable front-end applications with React & Next.js, collaborate with product teams, and contribute to cutting-edge projects.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100">Remote</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100">Full-time</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100">Senior</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-[#6F00FC]">$90k – $130k</p>
              <button className="mt-4 bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-lg text-sm">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
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
        Verified USA startup jobs, trusted companies, and career tools built
        to help you grow faster.
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
    Discover verified startup jobs and career-defining opportunities.
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