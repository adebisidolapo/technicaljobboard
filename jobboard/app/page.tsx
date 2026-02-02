"use client";

import React, { useEffect, useMemo, useState } from "react";

type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  description: string;
};

const COMPANY_LOGOS = [
  { src: "/Hiredengineer.png", alt: "Hired Engineer" },
  { src: "/Devops.png", alt: "DevOps Team" },
  { src: "/Architects.png", alt: "Architects" },
  { src: "/logo.png", alt: "Technical Job Board" },
  { src: "/logo-removebg-preview.png", alt: "Brand Logo" },
];

const CATEGORIES = [
  "Healthcare IT",
  "Aerospace / Defense",
  "Architecture",
  "Project Management",
  "Construction / Building Systems",
  "Manufacturing / Production",
  "Field Service / Commissioning",
  "Quality / Compliance",
  "Maintenance / Reliability",
];

const FEATURED_JOBS: FeaturedJob[] = [
  {
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "2 days ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
  {
    title: "Backend Engineer (Node/Go)",
    company: "TechNova",
    location: "Austin, TX",
    type: "Full-time",
    pay: "$130k – $175k",
    posted: "3 days ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
  {
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "5 days ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
  {
    title: "Data Engineer",
    company: "ByteForge",
    location: "New York, NY",
    type: "Full-time",
    pay: "$125k – $175k",
    posted: "4 days ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
  {
    title: "Security Engineer",
    company: "SentinelWorks",
    location: "Remote",
    type: "Full-time",
    pay: "$145k – $200k",
    posted: "6 days ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
  {
    title: "Product Designer",
    company: "Lumen",
    location: "San Francisco, CA",
    type: "Contract",
    pay: "$70 – $95/hr",
    posted: "1 week ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
  {
    title: "Site Reliability Engineer",
    company: "Stackline",
    location: "Remote",
    type: "Full-time",
    pay: "$135k – $185k",
    posted: "2 days ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
  {
    title: "QA Automation Engineer",
    company: "VerityLabs",
    location: "Chicago, IL",
    type: "Full-time",
    pay: "$110k – $150k",
    posted: "5 days ago",
    description: "Fast hiring teams, clear expectations, and modern workflows.",
  },
];

export default function Home() {
  const [heroQ, setHeroQ] = useState("");
  const [heroLoc, setHeroLoc] = useState("");

  // Reveal animations (kept from your CSS)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const runHeroSearch = () => {
    const params = new URLSearchParams();
    if (heroQ.trim()) params.set("q", heroQ.trim());
    if (heroLoc.trim()) params.set("loc", heroLoc.trim());
    const qs = params.toString();
    window.location.href = qs ? `/all-jobs?${qs}` : "/all-jobs";
  };

  const duplicatedLogos = useMemo(() => {
    // For marquee to loop smoothly
    return COMPANY_LOGOS.concat(COMPANY_LOGOS).concat(COMPANY_LOGOS);
  }, []);

  return (
    <main className="font-sans text-[#0B1222] bg-[#F3F6FB]">
      {/* ================= HERO (match screenshot) ================= */}
      <section className="relative overflow-hidden bg-[#EEF6F2]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEF6F2] via-[#EEF6F2] to-[#F3F6FB]" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center py-16 sm:py-20 md:py-24">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
              Curated roles • Remote-friendly • Fast apply
            </div>

            <h1 className="mt-8 text-[2.7rem] sm:text-[3.2rem] md:text-[3.7rem] font-extrabold leading-[1.05] tracking-tight text-[#0B1222]">
              Find{" "}
              <span className="text-emerald-700">Technical Jobs</span>{" "}
              built for long-
              <br />
              term careers
            </h1>

            <p className="mt-6 text-sm sm:text-[15px] md:text-[15px] leading-relaxed text-slate-600 max-w-3xl mx-auto">
              Browse opportunities across engineering, infrastructure, cloud, security, and data — including
              remote options. Simple, clean, and focused on serious hiring.
            </p>

            <div className="mt-10">
              <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
                  <input
                    value={heroQ}
                    onChange={(e) => setHeroQ(e.target.value)}
                    type="text"
                    placeholder="Job title, keyword"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  />

                  <input
                    value={heroLoc}
                    onChange={(e) => setHeroLoc(e.target.value)}
                    type="text"
                    placeholder="Location (Remote, Lagos, New York)"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  />

                  <button
                    type="button"
                    onClick={runHeroSearch}
                    className="h-12 w-full md:w-auto rounded-xl px-7 text-sm font-semibold text-white bg-[#0B1222] hover:bg-[#111B33] transition shadow-[0_10px_26px_rgba(2,6,23,0.20)]"
                  >
                    Search Jobs
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                  <span className="mr-1">Popular:</span>
                  {["Frontend", "DevOps", "Data", "Security"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setHeroQ(t);
                        setTimeout(runHeroSearch, 0);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-slate-300"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("featured");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Jump to Jobs <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY TEAMS (2-row marquee like your screenshot) ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.38em] text-slate-400 font-semibold uppercase">
              Trusted by teams
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#0B1222] tracking-tight">
              Popular Companies We Have Worked With
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-500">
              A quick look at teams that trust TechnicalJobboard.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden relative">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="py-12">
              {/* row 1 */}
              <div className="overflow-hidden">
                <div className="flex w-max items-center animate-marquee">
                  {duplicatedLogos.map((logo, idx) => (
                    <div key={`r1-${logo.src}-${idx}`} className="mx-10 flex items-center justify-center">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-8 md:h-9 w-[120px] object-contain grayscale opacity-60"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* row 2 */}
              <div className="overflow-hidden mt-10">
                <div className="flex w-max items-center animate-marquee-reverse">
                  {duplicatedLogos
                    .slice()
                    .reverse()
                    .map((logo, idx) => (
                      <div key={`r2-${logo.src}-${idx}`} className="mx-10 flex items-center justify-center">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-8 md:h-9 w-[120px] object-contain grayscale opacity-55"
                          loading="lazy"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES (simple pills like screenshot) ================= */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-sm font-semibold text-slate-900">Available Categories</h3>
          <p className="mt-1 text-xs text-slate-500">Tap a category to filter jobs below.</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => (window.location.href = `/all-jobs?cat=${encodeURIComponent(c)}`)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 hover:border-slate-300 transition"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS (match screenshot) ================= */}
      <section id="featured" className="relative overflow-hidden py-16 bg-[#EEF0F6]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#E7E9F0] via-[#EEF0F6] to-[#F5F6FB]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1222]">Featured Jobs</h2>
              <p className="mt-2 text-sm text-slate-600">
                A curated selection of standout roles from trusted teams.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("featured-carousel")?.scrollBy({ left: -520, behavior: "smooth" })
                }
                className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
                aria-label="Scroll left"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("featured-carousel")?.scrollBy({ left: 520, behavior: "smooth" })
                }
                className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute top-0 left-0 h-full w-14 bg-gradient-to-r from-[#EEF0F6] to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-14 bg-gradient-to-l from-[#EEF0F6] to-transparent z-10" />

            <div
              id="featured-carousel"
              className="no-scrollbar flex gap-7 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
            >
              {FEATURED_JOBS.map((job, idx) => (
                <article
                  key={idx}
                  className="snap-start flex-none w-[360px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--brand-purple)]" />

                  <div className="p-6 pl-8">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        Featured
                      </span>

                      <button type="button" aria-label="Favorite" className="text-slate-300 hover:text-slate-500 transition">
                        ★
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#0B1222] text-white flex items-center justify-center font-extrabold shadow-sm">
                        {job.company.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-extrabold text-[#0B1222] truncate">{job.title}</h3>
                        <p className="text-sm text-slate-500 truncate">
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">{job.type}</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">{job.pay}</span>
                    </div>

                    <p className="mt-4 text-sm text-slate-600">{job.description}</p>

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => (window.location.href = "/all-jobs")}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                                   bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]
                                   shadow-[0_14px_26px_rgba(106,111,242,0.25)] transition"
                      >
                        View
                      </button>

                      <span className="text-xs text-slate-400">Posted {job.posted}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMPOWERING (match screenshot) ================= */}
      <section id="empowering" className="relative overflow-hidden bg-[#F5F6FF] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-36 h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.14)] blur-3xl" />
          <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[rgba(106,111,242,0.10)] blur-3xl" />
          <div className="absolute left-1/2 -bottom-56 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[rgba(106,111,242,0.10)] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-[28px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] p-4 md:p-5">
                <img
                  src="/empower-platform.png"
                  alt="Job platform dashboard illustration"
                  className="rounded-[22px] w-[520px] max-w-full"
                />
              </div>
            </div>

            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-[rgba(106,111,242,0.12)] text-[var(--brand-purple)] px-4 py-2 text-xs font-semibold">
                Built for Technical Careers
              </span>

              <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-[#0B1222] tracking-tight">
                Empowering Job Seekers
              </h2>

              <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                Discover vetted Technical roles, transparent salary ranges, and trusted employers — all in one place
                designed to support long-term career growth.
              </p>

              <ul className="mt-7 space-y-4 text-sm md:text-base text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Verified Technical opportunities only
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Clear expectations & salary visibility
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                  Roles built for growth, not churn
                </li>
              </ul>

              <button
                type="button"
                onClick={() => (window.location.href = "/all-jobs")}
                className="mt-10 inline-flex items-center justify-between gap-6 rounded-2xl bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white px-8 py-4 font-semibold shadow-[0_16px_30px_rgba(106,111,242,0.30)] transition"
              >
                <span className="text-sm md:text-base">Get Started</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/18">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER (dark like screenshot) ================= */}
      <footer className="bg-[#0B1222] text-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="text-white font-semibold text-lg">TechnicalJobBoard</div>

            <div className="text-sm text-slate-300 space-y-2">
              <div className="font-semibold text-slate-200">Explore</div>
              <div className="space-y-1">
                <div className="hover:text-white cursor-pointer" onClick={() => (window.location.href = "/all-jobs")}>
                  All Jobs
                </div>
                <div className="hover:text-white cursor-pointer">Categories</div>
                <div className="hover:text-white cursor-pointer">Career Resources</div>
                <div className="hover:text-white cursor-pointer">Contact</div>
              </div>
            </div>

            <div className="text-sm text-slate-300">
              <div className="font-semibold text-slate-200 mb-3">Connect</div>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Your email"
                  className="h-10 w-full rounded-xl bg-[#0F1930] border border-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>© {new Date().getFullYear()} TechnicalJobboard. All rights reserved.</div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
