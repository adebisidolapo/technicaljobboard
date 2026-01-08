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
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium py-3">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= JOB SEEKER / EMPLOYER ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-2xl p-8 bg-white shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-xl text-gray-900">Job Seekers</h3>
              <p className="text-sm text-gray-600 mt-1">
                Browse thousands of job opportunities from top companies.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Find Job
            </button>
          </div>

          <div className="border rounded-2xl p-8 bg-white shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-xl text-gray-900">For Employers</h3>
              <p className="text-sm text-gray-600 mt-1">
                Connect with qualified candidates faster.
              </p>
            </div>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium">
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* ================= JOB LISTING ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* FILTERS */}
          <aside className="bg-white border rounded-2xl p-6 h-fit">
            <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

            <div className="space-y-4">
              <input
                placeholder="Job title or keyword"
                className="w-full border px-4 py-2 rounded-lg"
              />
              <input
                placeholder="Location"
                className="w-full border px-4 py-2 rounded-lg"
              />

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </h4>
                <div className="space-y-2 text-sm">
                  <label className="flex gap-2">
                    <input type="checkbox" /> Full Time
                  </label>
                  <label className="flex gap-2">
                    <input type="checkbox" /> Contract
                  </label>
                  <label className="flex gap-2">
                    <input type="checkbox" /> Remote
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* JOB CARDS */}
          <div className="lg:col-span-3 space-y-6">
            {[
              {
                company: "Microsoft",
                location: "WA, USA",
                title: "Product Manager",
                salary: "$6,500 – $10,000 / Month",
              },
              {
                company: "Amazon",
                location: "TX, USA",
                title: "Data Analyst",
                salary: "$4,500 – $7,500 / Month",
              },
              {
                company: "Google",
                location: "CA, USA",
                title: "UX Designer",
                salary: "$5,000 – $8,000 / Month",
              },
            ].map((job, i) => (
              <div
                key={i}
                className="bg-white border rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <p className="text-sm text-gray-500">
                    {job.company} • {job.location}
                  </p>
                  <h3 className="font-semibold text-lg text-gray-900 mt-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {job.salary}
                  </p>
                </div>

                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10K+", "Job matches"],
            ["3K+", "Verified employers"],
            ["95%", "Satisfaction rate"],
            ["24/7", "Support"],
          ].map(([num, label]) => (
            <div key={label}>
              <h3 className="text-3xl font-bold text-gray-900">{num}</h3>
              <p className="text-sm text-gray-600 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-600">
          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              TechnicalJobboard
            </h4>
            <p className="text-sm mt-3">
              Where technical careers meet opportunity.
            </p>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-gray-900">Job Seekers</h5>
            <ul className="space-y-2 text-sm">
              <li>Browse Jobs</li>
              <li>Categories</li>
              <li>Career Tips</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-gray-900">Employers</h5>
            <ul className="space-y-2 text-sm">
              <li>Post a Job</li>
              <li>Pricing</li>
              <li>Hiring Solutions</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-gray-900">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center
