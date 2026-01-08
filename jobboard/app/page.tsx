export default function Home() {
  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Discover startup jobs<br />
            that <span className="text-[#6F00FC]">move your career forward</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Explore thousands of roles from fast-growing startups and tech companies.
          </p>

          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <input className="border px-4 py-3 rounded-lg" placeholder="Role or keyword" />
            <input className="border px-4 py-3 rounded-lg" placeholder="Location or remote" />
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white rounded-lg font-medium">
              Search jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="bg-white border-t border-b">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["12k+", "Jobs posted"],
            ["3k+", "Hiring companies"],
            ["95%", "Success rate"],
            ["24h", "Avg response"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold text-[#6F00FC]">{value}</p>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-2">Featured startup roles</h2>
          <p className="text-gray-600 mb-10">
            Actively hiring companies hand-picked for you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { role: "Senior Frontend Engineer", company: "NovaTech", salary: "$120k – $150k" },
              { role: "Product Designer", company: "Launchify", salary: "$90k – $120k" },
            ].map((job) => (
              <div
                key={job.role}
                className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#6F00FC]"
              >
                <p className="text-sm text-gray-500">{job.company}</p>
                <h3 className="text-lg font-semibold mt-1">{job.role}</h3>
                <p className="text-sm text-[#6F00FC] mt-2">{job.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BROWSE JOBS ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-2">Browse jobs</h2>
          <p className="text-gray-600 mb-8">Showing 124 available roles</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Filters */}
            <aside className="bg-gray-100 rounded-2xl p-6 h-fit">
              <h3 className="font-semibold mb-4">Filter jobs</h3>
              <input className="w-full border rounded-lg px-4 py-2 mb-3" placeholder="Keyword" />
              <input className="w-full border rounded-lg px-4 py-2" placeholder="Location" />
            </aside>

            {/* Job Feed */}
            <div className="lg:col-span-3 space-y-6">
              {[
                {
                  role: "Frontend Engineer",
                  company: "NovaTech",
                  location: "Remote (US)",
                  salary: "$90k – $130k",
                  tags: ["Remote", "Full-time", "Senior"],
                },
                {
                  role: "Product Designer",
                  company: "Launchify",
                  location: "New York",
                  salary: "$85k – $120k",
                  tags: ["Hybrid", "Full-time"],
                },
              ].map((job) => (
                <div
                  key={job.role}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex justify-between items-start"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#A866FE] text-white flex items-center justify-center font-bold">
                      {job.company[0]}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-sm text-gray-600">
                        {job.company} • {job.location}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-gray-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-[#6F00FC]">{job.salary}</p>
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

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-10">Why choose us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Curated startup roles",
              "Verified companies only",
              "Built for career growth",
            ].map((item) => (
              <div key={item} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-[#6F00FC]">{item}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Designed to help you find meaningful work faster.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#02000D] py-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
      </footer>

    </main>
  );
}
