export default function Home() {
  return (
    <main className="font-sans bg-gray-100">

      {/* ================= HERO ================= */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Take the next <br />
            <span className="text-blue-600">career step</span> in your life
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of opportunities, curated to help you find the right fit faster.
          </p>

          <div className="mt-12 bg-white border border-gray-200 rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Job title or keyword"
              className="border border-gray-300 px-4 py-3 rounded-lg"
            />
            <input
              placeholder="Location"
              className="border border-gray-300 px-4 py-3 rounded-lg"
            />
            <button className="bg-blue-600 text-white rounded-lg font-medium py-3">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= USER TYPES ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10 text-center">
            Who Is This For?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-2xl p-8 bg-white flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-xl text-gray-900">Job Seekers</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Browse thousands of verified technical roles.
                </p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                Find Job
              </button>
            </div>

            <div className="border rounded-2xl p-8 bg-white flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-xl text-gray-900">For Employers</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Hire qualified professionals faster.
                </p>
              </div>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10 text-center">
            Browse by Category
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
                className="h-32 bg-white border rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <span className="font-medium text-gray-900">{cat}</span>
                <span className="text-xs text-gray-500">0 Jobs</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOB LISTINGS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10 text-center">
            Available Jobs
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* FILTERS */}
            <aside className="bg-white border rounded-2xl p-6 h-fit">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              <input
                placeholder="Job title or keyword"
                className="w-full border px-4 py-2 rounded-lg mb-3"
              />
              <input
                placeholder="Location"
                className="w-full border px-4 py-2 rounded-lg"
              />
            </aside>

            {/* JOB CARDS */}
            <div className="lg:col-span-3 space-y-6">
              {[
                "Product Manager",
                "Data Analyst",
                "UX Designer",
              ].map((title, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl p-6 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-gray-500">Company • USA</p>
                    <h3 className="font-semibold text-lg text-gray-900 mt-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      $5,000 – $10,000 / Month
                    </p>
                  </div>

                  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= PLATFORM STATS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10 text-center">
            Platform Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
              <p className="text-sm text-gray-600 mt-2">Job matches</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">3K+</h3>
              <p className="text-sm text-gray-600 mt-2">Verified employers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">95%</h3>
              <p className="text-sm text-gray-600 mt-2">Satisfaction rate</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
              <p className="text-sm text-gray-600 mt-2">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t py-12">
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
        </div>
      </footer>

    </main>
  );
}