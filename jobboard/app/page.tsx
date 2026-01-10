"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";



import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";


export default function Home() {
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

{/* ================= HERO ================= */}
<section className="relative py-28 bg-animated-gradient text-white overflow-hidden">

  {/* Decorative Shapes */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

  <div className="max-w-6xl mx-auto px-6 relative z-10 md:flex md:items-center md:justify-between">

    {/* Left Text */}
    <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl tracking-wide">
        Discover startup jobs<br />
        that <span className="text-[#02000D]">move your career forward</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl max-w-2xl tracking-tight font-medium">
        Explore thousands of USA-based roles from fast-growing startups and tech companies.
      </p>

      {/* HERO SEARCH BAR */}
      <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto md:mx-0">
        <input
          type="text"
          className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F00FC] text-gray-900"
          placeholder="Keyword or Job Title"
        />
        <input
          type="text"
          className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C33FD] text-gray-900"
          placeholder="Location"
        />
        <button className="bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white rounded-lg font-medium">
          Search Jobs
        </button>
      </div>
    </div>

{/* Right Illustration – FULL PREMIUM HERO */}
<div
  ref={heroImageRef}
  className="md:w-1/2 mt-14 md:mt-0 flex justify-center md:justify-end perspective-1000 parallax"
>
  <div className="relative float-3d animate-fade-in-up">

    {/* Glow */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6F00FC] via-[#8C33FD] to-[#A866FE] blur-3xl opacity-30 scale-110"></div>

    {/* Floating Icons */}
    <div className="absolute -top-6 -left-6 glass px-4 py-2 rounded-xl text-white text-sm shadow-lg">
      💼 Remote Jobs
    </div>

    <div className="absolute top-10 -right-10 glass px-4 py-2 rounded-xl text-white text-sm shadow-lg">
      📍 USA Only
    </div>

    <div className="absolute -bottom-6 left-10 glass px-4 py-2 rounded-xl text-white text-sm shadow-lg">
      ⚡ Fast Apply
    </div>

    {/* Glass Card */}
    <div className="absolute bottom-6 right-6 glass rounded-2xl p-4 shadow-xl text-white text-sm w-44">
      <p className="font-semibold">Frontend Engineer</p>
      <p className="text-xs opacity-80">Remote • $120k</p>
    </div>

    {/* Main Image */}
    <Image
      src="/bg.png"
      alt="Startup Jobs Platform"
      width={520}
      height={420}
      priority
      className="relative z-10 rounded-3xl shadow-2xl"
    />

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
              { role: "Senior Frontend Engineer", company: "NovaTech", salary: "$120k – $150k", desc: "Build scalable UIs with React & Next.js.", color: "#6F00FC" },
              { role: "Product Designer", company: "Launchify", salary: "$90k – $120k", desc: "Design intuitive UX.", color: "#8C33FD" },
              { role: "Backend Engineer", company: "TechNova", salary: "$100k – $140k", desc: "Develop high-performance APIs.", color: "#A866FE" },
              { role: "Marketing Specialist", company: "GrowthLab", salary: "$60k – $80k", desc: "Plan campaigns and drive engagement.", color: "#6F00FC" },
              { role: "Data Analyst", company: "Insightify", salary: "$80k – $110k", desc: "Analyze metrics to drive decisions.", color: "#8C33FD" },
              { role: "DevOps Engineer", company: "CloudWorks", salary: "$110k – $140k", desc: "Maintain CI/CD pipelines.", color: "#A866FE" },
            ].map((job, idx) => (
              <div
                key={idx}
                className="flex-none w-96 snap-center bg-white rounded-3xl p-8 shadow-md border-l-4 hover:shadow-xl transition"
                style={{ borderColor: job.color }}
              >
                <p className="text-sm font-medium text-gray-500">{job.company}</p>
                <h3 className="text-xl font-semibold mt-1">{job.role}</h3>
                <p className="text-sm font-medium mt-2" style={{ color: job.color }}>{job.salary}</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Filters */}
<aside className="bg-white rounded-3xl p-8 h-fit shadow-xl border border-gray-100 sticky top-24">
  <h3 className="font-semibold mb-6 tracking-wide text-gray-900 text-lg">
    Refine Your Search
  </h3>

  {/* Keyword */}
  <div className="mb-5">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Job title or keyword
    </label>
    <input
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6F00FC] outline-none"
      placeholder="e.g. Frontend Engineer"
    />
  </div>

  {/* Location */}
  <div className="mb-5">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Location
    </label>
    <input
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#8C33FD] outline-none"
      placeholder="Remote or USA"
    />
  </div>

  {/* Job Type */}
  <div className="mb-5">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Job Type
    </label>
    <select className="w-full border rounded-xl px-4 py-3">
      <option>All Types</option>
      <option>Full-time</option>
      <option>Part-time</option>
      <option>Contract</option>
      <option>Internship</option>
    </select>
  </div>

  {/* Experience */}
  <div className="mb-6">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      Experience Level
    </label>
    <select className="w-full border rounded-xl px-4 py-3">
      <option>Any level</option>
      <option>Junior</option>
      <option>Mid-level</option>
      <option>Senior</option>
    </select>
  </div>

  {/* Salary hint */}
  <div className="mb-6 bg-gray-50 rounded-2xl p-4">
    <p className="text-sm font-medium text-gray-700 mb-1">
      Estimated Salary
    </p>
    <p className="text-xs text-gray-500">
      $60k – $180k+ based on role & experience
    </p>
  </div>

  {/* Popular tags */}
  <div className="mb-6">
    <p className="text-sm font-medium text-gray-700 mb-3">
      Popular filters
    </p>
    <div className="flex flex-wrap gap-2">
      {["Remote", "Startup", "React", "Next.js", "Senior"].map(tag => (
        <span
          key={tag}
          className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-[#6F00FC] hover:text-white cursor-pointer transition"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>

  {/* CTA */}
  <button className="w-full bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white py-3 rounded-xl font-medium">
    Apply Filters
  </button>
</aside>


            {/* Job Feed */}
            <div className="lg:col-span-3 space-y-6">
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
                    <button className="mt-4 bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-5 py-2 rounded-xl text-sm font-medium">
  View Details →
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
    
    {/* Left Image (Laptop/Platform illustration) */}
    <div className="md:w-1/2">
     <img
  src="/empower-platform.png"
  alt="Job platform dashboard illustration"
  className="rounded-3xl shadow-xl bg-gray-50 p-4"
/>
    </div>

    {/* Right Text */}
    <div className="md:w-1/2">
      <h2 className="text-3xl font-semibold mb-6 tracking-tight">Empowering Job Seekers</h2>
      <p className="text-gray-700 mb-6">
        We provide USA-based startup opportunities, verified companies, and career tools designed to help you grow faster and succeed in your dream role.
      </p>
      <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-6 py-3 rounded-xl font-medium transition">
        Get Started
      </button>
    </div>

  </div>
</section>


      {/* ================= FOOTER ================= */}
      <footer className="">

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
              <h3 className="font-semibold mb-4 text-gray-900">
                Explore
              </h3>
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
              <h3 className="font-semibold mb-4 text-gray-900">
                Get Job Alerts
              </h3>
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

        {/* ===== SECTION 2: SOCIAL ICONS + COPYRIGHT (Black Background) ===== */}
        <div className="bg-[#02000D] py-10">
          <div className="max-w-6xl mx-auto px-6 flex justify-center gap-6">

            {/* Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="w-11 h-11 rounded-full bg-white text-[#1DA1F2] shadow flex items-center justify-center text-lg font-medium hover:bg-[#1DA1F2] hover:text-white transition"
            >
              <FaTwitter />
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-11 h-11 rounded-full bg-white text-[#0077B5] shadow flex items-center justify-center text-lg font-medium hover:bg-[#0077B5] hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-11 h-11 rounded-full bg-white text-[#1877F2] shadow flex items-center justify-center text-lg font-medium hover:bg-[#1877F2] hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            {/* GitHub */}
            <a
              href="#"
              aria-label="GitHub"
              className="w-11 h-11 rounded-full bg-white text-black shadow flex items-center justify-center text-lg font-medium hover:bg-black hover:text-white transition"
            >
              <FaGithub />
            </a>

          </div>

          <p className="mt-6 text-center text-white text-sm">
            &copy; {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
          </p>
        </div>

      </footer>
    </main>
  )
}
