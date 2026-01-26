"use client"; 
import Link from "next/link"; 
import CompanyLogoCarousel from "@/components/CompanyLogoCarousel";

export default function Page() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Test</h1>
      <div className="mt-8">
        <CompanyLogoCarousel />
      </div>
    </main>
  );
}

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
    function CompanyLogoCarousel() {
    const [active, setActive] = React.useState(0);

    React.useEffect(() => {
      const t = setInterval(() => {
        setActive((i) => (i + 1) % COMPANY_LOGOS.length);
      }, 2600);
      return () => clearInterval(t);
    }, []);

    const logo = COMPANY_LOGOS[active];

    return (
      <div className="mt-10 md:mt-12">
        <div className="flex items-center justify-center">
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain opacity-60 grayscale"
          />
        </div>

        <div className="mt-10 h-px w-full bg-gray-200" />

        <div className="mt-6 flex items-center justify-center gap-2">
          {COMPANY_LOGOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to company ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-gray-400" : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

type FeaturedJob = {
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
};

const FEATURED_JOBS: FeaturedJob[] = [
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
];

type CompanyLogo = { src: string; alt: string };

const COMPANY_LOGOS: CompanyLogo[] = [
  { src: "/Architects.png", alt: "Architects" },
  { src: "/vermot.png", alt: "Vermot" },
  { src: "/Devops.png", alt: "Devops" },
  { src: "/Hiredengineer.png", alt: "HiredEngineer" },
  { src: "/redtail.png", alt: "Redtail" },
];

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


{/* ================= HERO (Clean, premium, NO blue) ================= */}
<section className="relative overflow-hidden bg-[#F7F8FA]">
  {/* Subtle grid + soft wash */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F8FA] to-[#F1F5F3]" />
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(17,24,39,0.08) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>

  {/* Soft glows (emerald + charcoal, reduced noise) */}
  <div className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-500/[0.10] blur-3xl" />
  <div className="pointer-events-none absolute bottom-[-180px] right-[-140px] h-[560px] w-[560px] rounded-full bg-slate-900/[0.06] blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center py-20 md:py-24">
      {/* Badge */}
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
        Curated roles • Remote-friendly • Fast apply
      </div>

      {/* Headline */}
      <h1 className="mt-6 text-[2.1rem] sm:text-[2.7rem] md:text-[3.1rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">
        Find{" "}
        <span className="text-emerald-700">quality roles</span>{" "}
        built for long-term careers
      </h1>

      {/* Subtext */}
      <p className="mx-auto mt-4 max-w-2xl text-[14.5px] md:text-[15.5px] leading-relaxed text-slate-600">
        Browse opportunities across engineering, infrastructure, cloud, security, and data —
        including remote options. Simple, clean, and focused on serious hiring.
      </p>

      {/* Search Bar (single card, consistent heights) */}
      <div className="mt-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
            <input
              type="text"
              placeholder="Job title, keyword"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none
                         focus:ring-2 focus:ring-emerald-600/25"
            />

            <input
              type="text"
              placeholder="Location (Remote, Lagos, New York)"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none
                         focus:ring-2 focus:ring-emerald-600/25"
            />

            <button
              className="h-12 w-full md:w-auto rounded-xl px-6 text-sm font-semibold text-white
                         bg-slate-900 hover:bg-slate-800
                         shadow-[0_10px_26px_rgba(2,6,23,0.22)]
                         transition"
            >
              Search Jobs
            </button>
          </div>

          {/* Popular tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-500">
            <span>Popular:</span>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-slate-300">
              Frontend
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-slate-300">
              DevOps
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-slate-300">
              Data
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1 hover:border-slate-300">
              Security
            </button>
          </div>
        </div>
      </div>

      {/* Jump */}
      <button
        type="button"
        onClick={() =>
          document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
        }
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
      >
        Jump to Jobs <span aria-hidden>↓</span>
      </button>
    </div>
  </div>
</section>



// components/CompanyLogoCarousel.tsx
import Image from "next/image";

type Logo = {
  name: string;
  src: string; // e.g. "/logos/google.svg"
};

const LOGOS: Logo[] = [
  { name: "Google", src: "/logos/google.svg" },
  { name: "Microsoft", src: "/logos/microsoft.svg" },
  { name: "Amazon", src: "/logos/amazon.svg" },
  { name: "Meta", src: "/logos/meta.svg" },
  { name: "Netflix", src: "/logos/netflix.svg" },
  { name: "Stripe", src: "/logos/stripe.svg" },
  { name: "Shopify", src: "/logos/shopify.svg" },
  { name: "Adobe", src: "/logos/adobe.svg" },
];

function LogoRow({ reverse = false }: { reverse?: boolean }) {
  // Duplicate logos for seamless looping
  const items = [...LOGOS, ...LOGOS];

  return (
    <div
      className={[
        "flex w-max items-center gap-10 md:gap-14 py-3",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      ].join(" ")}
    >
      {items.map((logo, idx) => (
        <div
          key={`${logo.name}-${idx}`}
          className="flex items-center justify-center"
        >
          <div
            className="group flex items-center justify-center h-12 md:h-14 px-4 md:px-6"
            aria-label={logo.name}
            title={logo.name}
          >
            {/* Greyed-out by default, crisp on hover */}
            <Image
              src={logo.src}
              alt={logo.name}
              width={140}
              height={56}
              className="h-7 md:h-8 w-auto object-contain opacity-60 grayscale
                         transition duration-300
                         group-hover:opacity-100 group-hover:grayscale-0"
              priority={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CompanyLogoCarousel() {
  return (
    <div className="relative">
      {/* Soft edges fade (gives that premium “carousel” look) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />

      {/* Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* One row is usually enough; second row adds richness */}
        <div className="px-6 py-6">
          <LogoRow />
          <div className="mt-2 opacity-70">
            <LogoRow reverse />
          </div>
        </div>
      </div>
    </div>
  );
}



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
<section className="relative py-24 border-y border-gray-200 overflow-hidden bg-[#F7F8FC]">
  <div className="pointer-events-none absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-[#1A2040]/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-[#0F1426]/10 blur-3xl" />

  <div className="relative w-full">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-[#0F1426]">
          Featured Jobs
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl">
          A curated selection of standout roles from trusted teams.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            document.getElementById("featured-carousel")?.scrollBy({ left: -420, behavior: "smooth" })
          }
          className="px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition"
          aria-label="Scroll left"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() =>
            document.getElementById("featured-carousel")?.scrollBy({ left: 420, behavior: "smooth" })
          }
          className="px-4 py-3 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>

    <div className="relative w-full">
      <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[#F7F8FC] to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#F7F8FC] to-transparent z-10" />

      <div
        id="featured-carousel"
        className="no-scrollbar flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory px-6 md:px-12"
      >
        {FEATURED_JOBS.map((job, idx) => (
          <div
            key={idx}
            className="snap-start flex-none w-[320px] sm:w-[360px] md:w-[400px]
                       bg-white rounded-2xl shadow-sm hover:shadow-lg transition
                       border border-gray-200 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#5F6BF2]" />

            <div className="p-6 pl-8">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full
                             bg-[#EEF0FF] text-[#5F6BF2] border border-[#5F6BF2]/25"
                >
                  <span className="h-2 w-2 rounded-full bg-[#5F6BF2]" />
                  Featured
                </span>

                <button aria-label="Save job" className="text-gray-400 hover:text-[#1A2040] transition">
                  ★
                </button>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A2040] text-white flex items-center justify-center font-bold shadow-sm">
                  {job.company.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[#0F1426] truncate">{job.title}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {job.company} • {job.location}
                  </p>
                </div>
              </div>

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

              <div className="mt-6 flex justify-between items-center">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white
                             bg-gradient-to-b from-[#5F6BF2] to-[#4B55D8]
                             hover:from-[#6E78FF] hover:to-[#4B55D8]
                             shadow-[0_6px_18px_rgba(95,107,242,0.35)]
                             transition"
                >
                  View
                </button>

                <span className="text-xs text-gray-400">Posted {job.posted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>



{/* ================= ALL JOBS ================= */}
<section id="jobs" className="py-24 md:py-28 bg-white border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#5F6BF2]">
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
                   text-[#5F6BF2] font-semibold underline underline-offset-4
                   hover:text-[#4B55D8] transition px-2 py-2"
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
      <span className="font-semibold text-gray-900">{filteredJobs.length}</span>{" "}
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
                       focus:ring-2 focus:ring-[#5F6BF2] outline-none text-sm bg-white"
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
                       focus:ring-2 focus:ring-[#5F6BF2] outline-none text-sm bg-white"
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
          <p className="text-sm font-medium text-gray-700 mb-3">Quick Filters</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Remote", "Full-time", "Senior", "Contract"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleQuick(tag)}
                className={`text-xs px-3 py-2 rounded-full transition ${
                  quickFilters.includes(tag)
                    ? "bg-[#5F6BF2] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="w-full bg-[#5F6BF2] hover:bg-[#4B55D8] text-white py-3 rounded-2xl font-semibold transition shadow-sm"
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
              className="mt-4 bg-[#5F6BF2] hover:bg-[#4B55D8] text-white px-5 py-3 rounded-2xl text-sm font-semibold transition"
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
                <p className="text-sm font-semibold text-[#5F6BF2]">
                  {job.salary}
                </p>
                <button className="mt-4 w-full md:w-auto bg-[#5F6BF2] hover:bg-[#4B55D8] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition shadow-sm">
                  View
                </button>
                <p className="text-xs text-gray-400 mt-3">Posted {job.posted}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
</section>



{/* ============ EMPOWERING JOB SEEKERS (Hero-style background) ================= */}
<section
  id="empowering"
  className="relative py-28 overflow-hidden bg-[#F6F7FB]"
>
  {/* Base soft wash (same family as hero) */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#F6F7FB] to-[#F2F4FF]" />

  {/* Geometric lavender shapes */}
  <div
    className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px]
               rotate-45 rounded-[72px] bg-[#5F6BF2]/[0.07]"
  />
  <div
    className="pointer-events-none absolute -bottom-52 -right-52 h-[620px] w-[620px]
               rotate-45 rounded-[84px] bg-[#5F6BF2]/[0.05]"
  />

  {/* Cool legacy blue glows */}
  <div className="pointer-events-none absolute top-16 right-24 h-[360px] w-[360px] rounded-full bg-[#3017D3]/[0.06] blur-3xl" />
  <div className="pointer-events-none absolute bottom-20 left-20 h-[420px] w-[420px] rounded-full bg-[#5F6BF2]/[0.07] blur-3xl" />

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
        <span className="inline-block mb-4 text-sm font-semibold
                         text-[#5F6BF2] bg-[#EEF0FF]
                         px-4 py-1.5 rounded-full">
          Built for Technical Careers
        </span>

        <h2 className="text-[1.9rem] md:text-[2.3rem]
                       font-semibold mb-6 tracking-tight text-gray-900">
          Empowering Job Seekers
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed max-w-xl">
          Discover vetted Technical roles, transparent salary ranges,
          and trusted employers — all in one place designed to support
          long-term career growth.
        </p>

        <ul className="space-y-3 mb-8 text-gray-700">
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#5F6BF2]" />
            Verified Technical opportunities only
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#5F6BF2]" />
            Clear expectations & salary visibility
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#5F6BF2]" />
            Roles built for growth, not churn
          </li>
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={() =>
            document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
          }
          className="inline-flex items-center gap-3
                     bg-[#5F6BF2] hover:bg-[#4B55D8]
                     text-white px-7 py-3 rounded-2xl
                     font-semibold transition shadow-lg"
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


