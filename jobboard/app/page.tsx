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
      <section className="relative py-28 bg-animated-gradient text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="md:flex md:items-center md:justify-between gap-12">

            {/* LEFT */}
            <div className="md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl tracking-tight">
                Find meaningful startup jobs
                <br />
                that <span className="text-[#02000D]">actually grow your career</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl max-w-2xl text-white/90">
                Discover verified USA-based roles from fast-growing startups,
                remote teams, and innovative tech companies hiring now.
              </p>

              <div className="w-full mt-10">
                <div className="flex items-center bg-white rounded-full shadow-xl px-6 py-3 max-w-5xl">
                  <input
                    type="text"
                    placeholder="Search jobs by title, keyword, or company"
                    className="flex-1 px-3 py-3 text-gray-800 bg-transparent focus:outline-none text-base"
                  />
                  <button className="ml-3 px-8 py-3 rounded-full bg-purple-700 text-white font-semibold hover:bg-purple-800 transition">
                    Search
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  document
                    .getElementById("jobs")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 inline-flex items-center gap-2 text-white font-medium px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 transition"
              >
                Jump to Jobs <span className="text-lg">↓</span>
              </button>
            </div>

            {/* RIGHT */}
            <div
              ref={heroImageRef}
              className="md:w-1/2 mt-14 md:mt-0 flex justify-center md:justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6F00FC] via-[#8C33FD] to-[#A866FE] blur-3xl opacity-30 scale-110" />

                <div className="absolute bottom-6 right-6 glass rounded-2xl p-4 shadow-xl text-white text-sm w-44">
                  <p className="font-semibold">Frontend Engineer</p>
                  <p className="text-xs opacity-80">Remote • $120k</p>
                </div>
              </div>
            </div>

          </div>

          {/* JOB ICON STRIP */}
          <div className="w-full mt-20">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-y-8 text-center text-sm text-white/80">
              <span>Frontend</span>
              <span>Backend</span>
              <span>Design</span>
              <span>Remote</span>
              <span>Full-Time</span>
              <span>Contract</span>
              <span>USA Only</span>
              <span>Fast Apply</span>
              <span>Startup</span>
              <span>Senior Roles</span>
              <span>Junior Roles</span>
              <span>High Paying</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FEATURED STARTUP ROLES ================= */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-semibold mb-6 tracking-wide text-gray-900 text-center">
      Featured Startup Roles
    </h2>

    <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory px-2">
      {[
        {
          role: "Senior Frontend Engineer",
          company: "NovaTech",
          salary: "$120k – $150k",
          desc: "Build scalable UIs with React & Next.js.",
          color: "#6F00FC",
        },
        {
          role: "Product Designer",
          company: "Launchify",
          salary: "$90k – $120k",
          desc: "Design intuitive UX.",
          color: "#8C33FD",
        },
        {
          role: "Backend Engineer",
          company: "TechNova",
          salary: "$100k – $140k",
          desc: "Develop high-performance APIs.",
          color: "#A866FE",
        },
      ].map((job, idx) => (
        <div
          key={idx}
          className="flex-none w-96 snap-center bg-white rounded-3xl p-8 shadow-md border-l-4 hover:shadow-xl transition"
          style={{ borderColor: job.color }}
        >
          <p className="text-sm font-medium text-gray-500">{job.company}</p>
          <h3 className="text-xl font-semibold mt-1">{job.role}</h3>
          <p className="text-sm font-medium mt-2" style={{ color: job.color }}>
            {job.salary}
          </p>
          <p className="text-gray-600 mt-3 text-sm">{job.desc}</p>

          <button className="mt-6 w-full bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-xl font-medium transition">
            View Job
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================= BROWSE JOBS ================= */}
<section className="py-28 bg-gray-50">
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
        <div className="bg-white rounded-3xl p-6 shadow-lg">
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