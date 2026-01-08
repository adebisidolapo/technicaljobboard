export default function Home() {
  return (
    <main className="font-sans bg-gray-100">

      {/* HERO */}
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

      {/* JOB SEEKER / EMPLOYER */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-2xl p-8 bg-white flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-xl text-gray-900">Job Seekers</h3>
              <p className="text-sm text-gray-600 mt-1">
                Browse thousands of job opportunities.
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
      </section>

      {/* JOB LISTINGS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

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

          <div className="lg:col-span-3 space-y-6">
            {["Product Manager", "Data Analyst", "UX Designer"].map(
              (title, i) => (
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
              )
            )}
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
            <p className="text-sm text-gray-600 mt-2">Job matches</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">3K+</h3>
            <p className="text-sm text-gray-600 mt-2">Employers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">95%</h3>
            <p className="text-sm text-gray-600 mt-2">Satisfaction</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
            <p className="text-sm text-gray-600 mt-2">Support</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-12">
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
        </div>
      </footer>

    </main>
  );
}