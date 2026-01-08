export default function Home() {
  return (
    <main className="font-sans bg-gray-100">

      {/* ================= HERO ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Where Technical Professionals <br />
            Meet Opportunity
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover curated roles for engineers, developers, and IT professionals
            across the United States.
          </p>

          {/* Search box */}
          <div className="mt-12 bg-white border border-gray-200 rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Job title or keyword"
              className="border border-gray-300 px-4 py-3 rounded-lg"
            />
            <input
              placeholder="Location"
              className="border border-gray-300 px-4 py-3 rounded-lg"
            />
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium">
              Search Jobs
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
                Find roles from verified US-based employers.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Find Jobs
            </button>
          </div>

          <div className="border rounded-2xl p-8 bg-white shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-xl text-gray-900">Employers</h3>
              <p className="text-sm text-gray-600 mt-1">
                Hire qualified technical professionals faster.
              </p>
            </div>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium">
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-900">
              Explore Categories
            </h2>
            <span className="text-sm text-blue-600 cursor-pointer">
              All jobs →
            </span>
          </div>

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
                className="h-32 bg-white border rounded-xl p-5 text-gray-900 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <span className="font-medium">{cat}</span>
                <span className="text-xs text-gray-500">0 Jobs</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AVAILABLE JOBS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Latest Opportunities
            </h2>
            <p className="text-gray-600 mt-2">
              Hand-picked roles from companies hiring now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((job) => (
              <div
                key={job}
                className="border rounded-2xl p-6 bg-white hover:shadow-md transition"
              >
                <span className="text-xs font-medium text-blue-600">
                  Full-time
                </span>
                <h3 className="mt-3 font-semibold text-lg text-gray-900">
                  Senior Software Engineer
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Remote • Engineering
                </p>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    $80k – $120k
                  </span>
                  <button className="text-sm text-blue-600 font-medium">
                    View job →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">
              Why TechnicalJobboard
            </h2>
            <p className="text-gray-600 mt-3">
              Built specifically for technical careers in the US market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Curated Roles", "Trusted Employers", "Career Growth"].map(
              (item) => (
                <div
                  key={item}
                  className="p-8 bg-white border rounded-2xl text-center shadow-sm"
                >
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item}
                  </h3>
                  <p className="text-sm text-gray-600 mt-3">
                    Designed to support engineers and developers at every
                    stage of their career.
                  </p>
                </div>
              )
            )}
          </div>
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
            <h5 className="font-medium mb-3 text-gray-900">
              Job Seekers
            </h5>
            <ul className="space-y-2 text-sm">
              <li>Browse Jobs</li>
              <li>Categories</li>
              <li>Career Tips</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-gray-900">
              Employers
            </h5>
            <ul className="space-y-2 text-sm">
              <li>Post a Job</li>
              <li>Pricing</li>
              <li>Hiring Solutions</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-gray-900">
              Company
            </h5>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
        </div>
      </footer>
    </main>
  );
}