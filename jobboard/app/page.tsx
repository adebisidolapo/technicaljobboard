"use client";

import { useState } from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

/* ================= TYPES ================= */
type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tag: string;
};

/* ================= DATA ================= */
const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Acme Tech",
    location: "Remote (USA)",
    type: "Full-time",
    salary: "$100k – $130k",
    tag: "React",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CloudStack",
    location: "Hybrid (USA)",
    type: "Full-time",
    salary: "$110k – $140k",
    tag: "Node.js",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Pixel Labs",
    location: "Remote (USA)",
    type: "Contract",
    salary: "$80k – $100k",
    tag: "Figma",
  },
];

/* ================= COMPONENTS ================= */
function JobCard({ job }: { job: Job }) {
  return (
    <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>

      <p className="text-sm text-gray-600 mt-1">
        {job.company} • {job.location}
      </p>

      <div className="flex flex-wrap gap-2 mt-4 text-sm">
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
          {job.type}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
          {job.tag}
        </span>
      </div>

      <p className="mt-4 font-semibold text-gray-900">{job.salary}</p>

      <button className="mt-6 w-full py-2 rounded-lg bg-purple-700 text-white font-medium hover:bg-purple-800 transition">
        View Job
      </button>
    </div>
  );
}

/* ================= PAGE ================= */
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="relative py-28 bg-animated-gradient text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="md:flex md:items-center md:justify-between">
            {/* Left */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Find meaningful startup jobs
                <br />
                that <span className="text-[#02000D]">actually grow your career</span>
              </h1>

              <p className="mt-6 text-lg text-white/90">
                Discover verified USA-based roles from fast-growing startups and
                innovative tech companies hiring now.
              </p>

              {/* Search */}
              <div className="mt-10">
                <div className="flex items-center bg-white rounded-full shadow-xl px-6 py-3">
                  <input
                    type="text"
                    placeholder="Search jobs by title, keyword, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-3 text-gray-800 bg-transparent focus:outline-none"
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
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 transition"
              >
                Jump to Jobs ↓
              </button>
            </div>

            {/* Right */}
            <div className="md:w-1/2 mt-14 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6F00FC] via-[#8C33FD] to-[#A866FE] blur-3xl opacity-30" />
                <div className="relative glass rounded-2xl p-4 shadow-xl text-white text-sm w-44">
                  <p className="font-semibold">Frontend Engineer</p>
                  <p className="text-xs opacity-80">Remote • $120k</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Icon Strip */}
          <div className="w-full mt-20 grid grid-cols-3 md:grid-cols-6 gap-y-8 text-center text-sm text-white/80">
            <span>Frontend</span>
            <span>Backend</span>
            <span>Design</span>
            <span>Remote</span>
            <span>Full-Time</span>
            <span>Contract</span>
          </div>

        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-20 bg-white" id="jobs">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Featured Startup Jobs
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Hand-picked roles from fast-growing startups.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
<footer>

  {/* ===== SECTION 1: MAIN BLOCKS (Light Background) ===== */}
  <div className="bg-gray-100 py-20">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center items-center">

      {/* Brand */}
      <div className="flex flex-col items-center">
        <img
          src="/logo-removebg-preview.png"
          alt="TechnicalJobboard Logo"
          className="w-36 object-contain mb-4"
        />
        <p className="text-gray-800 text-sm max-w-xs leading-relaxed">
          Discover verified startup jobs, remote roles, and career-defining
          opportunities across the United States.
        </p>
      </div>

      {/* Explore */}
      <div className="flex flex-col items-center">
        <h3 className="font-semibold mb-4 text-gray-900">Explore</h3>
        <ul className="space-y-3 text-sm">
          <li>
            <a href="#" className="text-gray-800 hover:text-[#6F00FC] transition">
              Browse Jobs
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-[#8C33FD] transition">
              Companies
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-[#A866FE] transition">
              Career Resources
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-[#6F00FC] transition">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Get Job Alerts */}
      <div className="flex flex-col items-center">
        <h3 className="font-semibold mb-4 text-gray-900">Get Job Alerts</h3>
        <p className="text-gray-800 text-sm mb-4 max-w-xs">
          Weekly hand-picked startup jobs delivered to your inbox.
        </p>

        <div className="flex w-full max-w-sm gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#6F00FC] outline-none text-sm"
          />
          <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-xl text-sm font-medium transition">
            Join
          </button>
        </div>
      </div>

    </div>
  </div>

  {/* ===== SECTION 2: SOCIAL ICONS + COPYRIGHT ===== */}
  <div className="bg-[#02000D] py-10">
    <div className="max-w-6xl mx-auto px-6 flex justify-center gap-6">

      <a
        href="#"
        aria-label="Twitter"
        className="w-11 h-11 rounded-full bg-white text-[#1DA1F2] shadow flex items-center justify-center text-lg hover:bg-[#1DA1F2] hover:text-white transition"
      >
        <FaTwitter />
      </a>

      <a
        href="#"
        aria-label="LinkedIn"
        className="w-11 h-11 rounded-full bg-white text-[#0077B5] shadow flex items-center justify-center text-lg hover:bg-[#0077B5] hover:text-white transition"
      >
        <FaLinkedinIn />
      </a>

      <a
        href="#"
        aria-label="Facebook"
        className="w-11 h-11 rounded-full bg-white text-[#1877F2] shadow flex items-center justify-center text-lg hover:bg-[#1877F2] hover:text-white transition"
      >
        <FaFacebookF />
      </a>

      <a
        href="#"
        aria-label="GitHub"
        className="w-11 h-11 rounded-full bg-white text-black shadow flex items-center justify-center text-lg hover:bg-black hover:text-white transition"
      >
        <FaGithub />
      </a>

    </div>

    <p className="mt-6 text-center text-white text-sm">
      &copy; {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
    </p>
  </div>

</footer>
