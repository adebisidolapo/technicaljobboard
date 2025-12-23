export default function Home() {
  return (
    <main className="font-sans">

      {/* ================= HERO ================= */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundColor: "#F8FAFF",
        }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-white/85" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Where <span className="text-[#3017D3]">Technical</span> Careers Meet Opportunity
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Explore curated roles built for developers, engineers, and modern
            technical professionals.
          </p>

          <div className="mt-10 bg-white border border-gray-300 rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4">
            <input
              placeholder="Job title or keyword"
              className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
            />
            <input
              placeholder="Location"
              className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="px-6 py-3 bg-[#3017D3] text-white rounded-lg">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= JOB SEEKER / EMPLOYER ================= */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6 flex justify-between items-center bg-[#F9FAFF]">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Job seekers</h3>
              <p className="text-sm text-gray-700">
                Browse jobs from the very best companies.
              </p>
            </div>
            <button className="bg-[#3017D3] text-white px-5 py-2 rounded-md">
              Find jobs
            </button>
          </div>

          <div className="border rounded-xl p-6 flex justify-between items-center bg-[#F9FAFF]">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Employers</h3>
              <p className="text-sm text-gray-700">
                Reach job seekers and fill open positions.
              </p>
            </div>
            <button className="bg-[#3017D3] text-white px-5 py-2 rounded-md">
              Post a job
            </button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-[#F1F5FF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Category</h2>
            <span className="text-sm text-[#3017D3]">All jobs →</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "Telecommunications",
              "Networking",
              "Cybersecurity",
              "Data",
              "Cloud Computing",
              "Database",
              "IT Project Management",
              "Systems Analysis",
            ].map((cat) => (
              <div
                key={cat}
                className="bg-white border rounded-lg p-4 text-sm font-medium text-gray-900"
              >
                {cat}
                <p className="text-xs text-gray-500 mt-1">0 Jobs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOB ALERT ================= */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-gray-900">Job alert</h2>
          <p className="text-sm text-gray-700 mt-1">
            Transform your inbox into career launchpad
          </p>

          <div className="mt-6 bg-white border rounded-xl p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <input className="border px-4 py-3 rounded-lg text-gray-900" placeholder="Email address" />
            <select className="border px-4 py-3 rounded-lg text-gray-900">
              <option>Select job type</option>
            </select>
            <select className="border px-4 py-3 rounded-lg text-gray-900">
              <option>Select category</option>
            </select>
            <select className="border px-4 py-3 rounded-lg text-gray-900">
              <option>Select location</option>
            </select>
            <button className="bg-[#3017D3] text-white rounded-lg">
              Create alert
            </button>
          </div>
        </div>
      </section>

      {/* ================= AVAILABLE JOBS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="border rounded-xl p-5 bg-[#F9FAFF]">
            <h3 className="font-semibold mb-4 text-gray-900">Jobs available</h3>
            <input
              className="w-full border px-3 py-2 rounded-lg mb-4 text-gray-900"
              placeholder="Search job title"
            />

            <p className="font-medium text-sm mb-2 text-gray-900">Category</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Administrative</li>
              <li>Application Support</li>
              <li>Architecture</li>
              <li>AI Engineers</li>
            </ul>
          </aside>

          <div className="lg:col-span-3 flex items-center justify-center border rounded-xl py-24">
            <p className="text-gray-700 font-medium">
              No jobs found yet! Keep searching — something great will come up.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
