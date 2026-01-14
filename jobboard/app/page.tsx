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

{/* ================= TRUSTED TEAMS ================= */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <h3 className="text-center text-sm font-medium text-gray-500 tracking-wide uppercase mb-12">
      Teams Building With Us
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 items-center">
      <img
        src="/companies/Architects.png"
        alt="Architects"
        className="h-10 md:h-12 mx-auto object-contain opacity-80 hover:opacity-100 transition"
      />
      <img
        src="/companies/vermot.png"
        alt="Vermot"
        className="h-10 md:h-12 mx-auto object-contain opacity-80 hover:opacity-100 transition"
      />
      <img
        src="/companies/Devops.png"
        alt="Devops"
        className="h-10 md:h-12 mx-auto object-contain opacity-80 hover:opacity-100 transition"
      />
      <img
        src="/companies/Hiredengineer.png"
        alt="Hiredengineer"
        className="h-10 md:h-12 mx-auto object-contain opacity-80 hover:opacity-100 transition"
      />
      <img
        src="/companies/redtail.png"
        alt="Redtail"
        className="h-10 md:h-12 mx-auto object-contain opacity-80 hover:opacity-100 transition"
      />
    </div>

  </div>
</section>


{/* ================= FEATURED STARTUP ROLES ================= */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-semibold mb-8 tracking-wide text-gray-900 text-center">
      Featured Startup Roles
    </h2>

    <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-2">
      {[
        {
          title: "Senior Frontend Engineer",
          company: "NovaTech",
          location: "Remote · US",
          type: "Full-time",
          pay: "$60 – $75 / hr",
          color: "#6F00FC",
        },
        {
          title: "Product Designer",
          company: "Launchify",
          location: "San Francisco, CA",
          type: "Contract",
          pay: "$8,000 / month",
          color: "#8C33FD",
        },
        {
          title: "Backend Engineer",
          company: "TechNova",
          location: "Austin, TX",
          type: "Full-time",
          pay: "$110k – $140k",
          color: "#A866FE",
        },
      ].map((job, idx) => (
        <div
          key={idx}
          className="group flex-none w-[380px] snap-center bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all"
          style={{ borderLeft: `4px solid ${job.color}` }}
        >
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 leading-snug">
              {job.title}
            </h3>

            {/* Favorite Icon */}
            <button className="text-gray-400 hover:text-[#6F00FC] transition">
              ❤
            </button>
          </div>

          {/* Company + Location */}
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium text-gray-800">{job.company}</span>
            <span className="mx-1">•</span>
            {job.location}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {job.type}
            </span>
            <span
              className="px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: job.color }}
            >
              {job.pay}
            </span>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 flex justify-between items-center">
            <button className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-100 hover:bg-[#6F00FC] hover:text-white transition">
              Apply
            </button>

            <span className="text-xs text-gray-400 group-hover:text-gray-600 transition">
              Featured
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


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