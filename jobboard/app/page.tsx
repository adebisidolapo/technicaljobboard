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

          <div className="mt-12 bg-white border rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-md">
            <input className="border px-4 py-3 rounded-lg" placeholder="Job title or keyword" />
            <input className="border px-4 py-3 rounded-lg" placeholder="Location" />
            <button className="bg-blue-600 text-white rounded-lg font-medium py-3">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= JOB SEEKER / EMPLOYER ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border rounded-2xl p-8 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Job Seekers</h3>
              <p className="text-sm text-gray-600 mt-1">
                Browse thousands of job opportunities from top companies.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Find Job
            </button>
          </div>

          <div className="bg-white border rounded-2xl p-8 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">For Employers</h3>
              <p className="text-sm text-gray-600 mt-1">
                Connect with qualified candidates faster.
              </p>
            </div>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Browse by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              "Software Engineering",
              "Data Science",
              "Product Management",
              "UX/UI Design",
              "DevOps & Cloud",
              "Cybersecurity",
              "Networking",
              "Database",
            ].map((cat) => (
              <div
                key={cat}
                className="bg-white border rounded-xl p-5 h-32 flex flex-col justify-between hover:shadow-md transition"
              >
                <span className="font-medium">{cat}</span>
                <span className="text-xs text-gray-500">0 Jobs</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BROWSE JOBS (KEY ADDITION) ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center">
            Browse Jobs
          </h2>
          <p className="text-center text-gray-600 mt-2 mb-12">
            Explore opportunities that match your skills and aspirations
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* FILTER SIDEBAR */}
            <aside className="bg-white border rounded-2xl p-6 h-fit">
              <h3 className="font-semibold mb-4">Filters</h3>

              <div className="space-y-6 text-sm">
                <div>
                  <p className="font-medium mb-2">Employment Type</p>
                  <div className="space-y-2">
                    <label className="flex gap-2"><input type="checkbox" /> Full Time</label>
                    <label className="flex gap-2"><input type="checkbox" /> Contract</label>
                    <label className="flex gap-2"><input type="checkbox" /> Internship</label>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Work Preference</p>
                  <div className="space-y-2">
                    <label className="flex gap-2"><input type="checkbox" /> Remote</label>
                    <label className="flex gap-2"><input type="checkbox" /> Hybrid</label>
                    <label className="flex gap-2"><input type="checkbox" /> On-site</label>
                  </div>
                </div>
              </div>
            </aside>

            {/* JOB RESULTS */}
            <div className="lg:col-span-3 space-y-6">
              {[
                {
                  company: "Microsoft",
                  title: "Product Manager",
                  salary: "$6,500 – $10,000 / Month",
                },
                {
                  company: "Amazon",
                  title: "Data Analyst",
                  salary: "$4,500 – $7,500 / Month",
                },
              ].map((job, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl p-6 hover:shadow-md transition"
                >
                  <p className="text-sm text-gray-500">{job.company} • USA</p>
                  <h3 className="font-semibold text-lg mt-1">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{job.salary}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">2 days ago</span>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10K", "Job matches"],
            ["3K", "Verified employers"],
            ["95%", "Satisfaction rate"],
            ["24/7", "Support"],
          ].map(([num, label]) => (
            <div key={label}>
              <h3 className="text-3xl font-bold">{num}</h3>
              <p className="text-sm text-gray-600 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Join Us Today
          </h2>
          <p className="text-gray-600 mt-4">
            We’ve built a trusted ecosystem that supports job seekers and recruiters globally.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t py-12">
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Technical Job Board. All rights reserved.
        </div>
      </footer>

    </main>
  );
}