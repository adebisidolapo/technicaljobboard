"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";

/* ================= CONSTANTS ================= */
const PRIMARY = "#6F00FC";
const SECONDARY = "#8C33FD";
const ACCENT = "#A866FE";

const featuredJobs = [
  {
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote (US)",
    type: "Full-time",
    pay: "$60 – $75 / hr",
    posted: "2 days ago",
    color: PRIMARY,
  },
  {
    title: "Product Designer",
    company: "Launchify",
    location: "San Francisco, CA",
    type: "Contract",
    pay: "$8,000 / month",
    posted: "4 days ago",
    color: SECONDARY,
  },
  {
    title: "Backend Engineer",
    company: "TechNova",
    location: "Austin, TX",
    type: "Full-time",
    pay: "$110k – $140k",
    posted: "1 week ago",
    color: ACCENT,
  },
];

export default function Home() {
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="relative py-28 bg-animated-gradient text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="md:flex md:items-center md:justify-between gap-12">

            {/* LEFT */}
            <div className="md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Find meaningful startup jobs
                <br />
                that <span className="text-[#02000D]">actually grow your career</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl">
                Discover verified USA-based roles from fast-growing startups,
                remote teams, and innovative tech companies hiring now.
              </p>

              <div className="mt-10">
                <div className="flex items-center bg-white rounded-full shadow-xl px-6 py-3">
                  <label htmlFor="job-search" className="sr-only">
                    Search jobs
                  </label>
                  <input
                    id="job-search"
                    type="text"
                    placeholder="Search jobs by title, keyword, or company"
                    className="flex-1 px-3 py-3 text-gray-800 bg-transparent focus:outline-none"
                  />
                  <button className="ml-3 px-8 py-3 rounded-full bg-purple-700 text-white font-semibold hover:bg-purple-800 transition">
                    Search
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 transition"
              >
                Jump to Jobs ↓
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

          {/* JOB TAG STRIP */}
          <div className="mt-20 grid grid-cols-3 md:grid-cols-6 gap-y-8 text-center text-sm text-white/80">
            {[
              "Frontend",
              "Backend",
              "Design",
              "Remote",
              "Full-Time",
              "Contract",
              "USA Only",
              "Fast Apply",
              "Startup",
              "Senior Roles",
              "Junior Roles",
              "High Paying",
            ].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-28 bg-gradient-to-b from-[#F6F2FF] to-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">Featured Jobs</h2>

          <div className="flex gap-6 overflow-x-auto pb-6">
            {featuredJobs.map((job) => (
              <div
                key={job.title}
                className="flex-none w-[400px] bg-white rounded-2xl border shadow-sm hover:shadow-md transition relative"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1.5"
                  style={{ backgroundColor: job.color }}
                />

                <div className="p-6 pl-8">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div
                        className="w-12 h-12 rounded-xl text-white flex items-center justify-center font-bold"
                        style={{ backgroundColor: job.color }}
                      >
                        {job.company.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                      {job.type}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                      {job.pay}
                    </span>
                  </div>

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
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="bg-gray-100 py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-16">
            <div>
              <Image
                src="/Technicaljoblogo-removebg-preview.png"
                alt="TechnicalJobboard Logo"
                width={200}
                height={80}
                className="mb-4"
              />
              <p className="text-sm text-gray-800 max-w-xs">
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

        <div className="bg-[#02000D] py-10 text-center">
          <div className="flex justify-center gap-6 text-white">
            <FaTwitter />
            <FaLinkedinIn />
            <FaFacebookF />
            <FaGithub />
          </div>
          <p className="mt-6 text-white text-sm">
            © {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
