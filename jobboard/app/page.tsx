export default function Home() {
  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find Your Next <br />
            <span className="text-[#6F00FC]">Technical Role</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover curated opportunities built for engineers, developers, and IT professionals.
          </p>

          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Job title or keyword"
              className="border px-4 py-3 rounded-lg"
            />
            <input
              placeholder="Location"
              className="border px-4 py-3 rounded-lg"
            />
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white rounded-lg font-medium">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= USER TYPES ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-12">
            Who Is This Platform For?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Job Seekers</h3>
                <p className="text-gray-600 mt-1">
                  Access verified roles from trusted employers.
                </p>
              </div>
              <button className="bg-[#6F00FC] text-white px-6 py-3 rounded-lg">
                Browse Jobs
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Employers</h3>
                <p className="text-gray-600 mt-1">
                  Hire top technical talent faster.
                </p>
              </div>
              <button className="border border-[#6F00FC] text-[#6F00FC] px-6 py-3 rounded-lg">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-12">
            Browse Jobs by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <span className="font-medium">{cat}</span>
                <p className="text-sm text-gray-500 mt-2">0 Open Roles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BROWSE JOBS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-12">
            Browse Available Jobs
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Filters */}
            <aside className="bg-white rounded-2xl p-6 shadow-md h-fit">
              <h3 className="font-semibold mb-4">Filter Jobs</h3>
              <input className="w-full border rounded-lg px-4 py-2 mb-3" placeholder="Keyword" />
              <input className="w-full border rounded-lg px-4 py-2" placeholder="Location" />
            </aside>

            {/* Job Cards */}
            <div className="lg:col-span-3 space-y-6">
              {["Frontend Developer", "Cloud Engineer", "Cybersecurity Analyst"].map(
                (job, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-md flex justify-between items-center"
                  >
                    <div>
                      <span className="text-xs bg-[#A866FE] text-white px-3 py-1 rounded-full">
                        Full-time
                      </span>
                      <h3 className="mt-3 text-lg font-semibold">{job}</h3>
                      <p className="text-sm text-gray-600">Remote • USA</p>
                    </div>

                    <button className="bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white px-5 py-2 rounded-lg">
                      Apply
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Curated Technical Roles",
              "Verified Employers",
              "Career Growth Focused",
            ].map((item) => (
              <div
                key={item}
                className="p-8 rounded-2xl bg-gray-100 text-center shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#6F00FC]">
                  {item}
                </h3>
                <p className="text-sm text-gray-600 mt-3">
                  Built to support professionals at every career stage.
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