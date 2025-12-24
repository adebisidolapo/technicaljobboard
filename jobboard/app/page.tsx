export default function Home() {
  return (
    <main className="font-sans bg-white">

      {/* ================= HERO ================= */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: "url('/circuit-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: "#0F1020",
        }}
      >
        {/* soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1020]/90 via-[#1B1D4E]/85 to-[#3017D3]/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Where <span className="text-[#9AA5FF]">Technical Professionals</span><br />
            Engineers & Developers Meet Opportunity
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
            Explore <span className="font-semibold">Curated Roles Built</span> for modern
            technical careers across industries.
          </p>

          <div className="mt-12 bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-lg p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Job title or keyword"
              className="border px-4 py-3 rounded-lg text-gray-900"
            />
            <input
              placeholder="Location"
              className="border px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-[#3017D3] hover:bg-[#2411B5] transition text-white rounded-lg font-medium">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= JOB SEEKER / EMPLOYER ================= */}
      <section className="py-20 bg-gradient-to-r from-[#F8FAFF] to-[#EEF1FF]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-full border rounded-2xl p-8 flex justify-between items-center bg-white shadow-sm">
            <div>
              <h3 className="font-semibold text-xl text-gray-900">Job Seekers</h3>
              <p className="text-sm text-gray-700 mt-1">
                Discover opportunities from top technology-driven companies.
              </p>
            </div>
            <button className="bg-[#3017D3] text-white px-6 py-3 rounded-lg">
              Find Jobs
            </button>
          </div>

          <div className="h-full border rounded-2xl p-8 flex justify-between items-center bg-[#3017D3] text-white shadow-sm">
            <div>
              <h3 className="font-semibold text-xl">Employers</h3>
              <p className="text-sm text-white/90 mt-1">
                Reach qualified engineers and technical professionals.
              </p>
            </div>
            <button className="bg-white text-[#3017D3] px-6 py-3 rounded-lg font-medium">
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24 bg-[#0F1020] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/dots-bg.svg')] opacity-10" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-white">Explore Categories</h2>
            <span className="text-sm text-[#9AA5FF] cursor-pointer">All jobs →</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {["Telecommunications", "Networking", "Cybersecurity", "Data", "Cloud Computing", "Database", "IT Project Management", "Systems Analysis"].map(
              (cat) => (
                <div
                  key={cat}
                  className="h-32 bg-gradient-to-br from-[#1B1D4E] to-[#3017D3] rounded-xl p-5 text-white flex flex-col justify-between"
                >
                  <span className="font-medium">{cat}</span>
                  <span className="text-xs text-white/80">0 Jobs</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= AVAILABLE JOBS ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Latest Opportunities</h2>
            <p className="text-gray-600 mt-2">
              Hand‑picked roles from companies hiring technical professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((job) => (
              <div
                key={job}
                className="border rounded-2xl p-6 bg-[#F9FAFF] hover:shadow-md transition"
              >
                <span className="text-xs font-medium text-[#3017D3]">Full‑time</span>
                <h3 className="mt-3 font-semibold text-lg text-gray-900">
                  Senior Software Engineer
                </h3>
                <p className="text-sm text-gray-600 mt-1">Remote • Engineering</p>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">$80k – $120k</span>
                  <button className="text-sm text-[#3017D3] font-medium">
                    View job →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-24 bg-[#F8FAFF]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Curated Roles", "Trusted Employers", "Career Growth"].map((item) => (
            <div
              key={item}
              className="text-center p-8 bg-white border rounded-2xl"
            >
              <h3 className="font-semibold text-lg text-gray-900">{item}</h3>
              <p className="text-sm text-gray-600 mt-3">
                Built to support engineers, developers, and technical professionals
                at every stage of their career.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0F1020] text-gray-300 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-white font-semibold text-lg">TechJobs</h4>
            <p className="text-sm mt-3 text-gray-400">
              Where technical careers meet opportunity.
            </p>
          </div>

          <div>
            <h5 className="text-white font-medium mb-3">For Job Seekers</h5>
            <ul className="space-y-2 text-sm">
              <li>Browse Jobs</li>
              <li>Categories</li>
              <li>Career Tips</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-medium mb-3">For Employers</h5>
            <ul className="space-y-2 text-sm">
              <li>Post a Job</li>
              <li>Pricing</li>
              <li>Hiring Solutions</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-medium mb-3">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TechJobs. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
