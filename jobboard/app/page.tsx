import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Where{" "}
            <span className="text-[#3017D3]">Technical</span>{" "}
            Careers Meet Opportunity
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore curated roles built for developers, engineers, and modern
            technical professionals.
          </p>

          {/* SEARCH */}
          <div className="mt-10 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex flex-col md:flex-row gap-3 items-center">
            
            {/* Job title */}
            <div className="flex items-center w-full md:flex-1 border border-gray-200 rounded-lg px-3">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full py-3 text-sm focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex items-center w-full md:flex-1 border border-gray-200 rounded-lg px-3">
              <span className="text-gray-400 mr-2">📍</span>
              <input
                type="text"
                placeholder="Location"
                className="w-full py-3 text-sm focus:outline-none"
              />
            </div>

            {/* Job type */}
            <div className="flex items-center w-full md:w-48 border border-gray-200 rounded-lg px-3">
              <span className="text-gray-400 mr-2">💼</span>
              <select className="w-full py-3 text-sm focus:outline-none bg-transparent">
                <option>Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
              </select>
            </div>

            <button className="w-full md:w-auto px-6 py-3 bg-[#3017D3] text-white rounded-lg text-sm font-medium hover:opacity-90">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Popular Categories
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {[
              "Frontend",
              "Backend",
              "DevOps",
              "Mobile",
              "UI/UX",
              "Data",
              "AI / ML",
              "Cybersecurity",
              "Cloud",
            ].map((cat) => (
              <div
                key={cat}
                className="min-w-[180px] bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium text-gray-800">{cat}</p>
                <p className="text-sm text-gray-400 mt-1">120 Jobs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST JOBS */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Latest Jobs
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Frontend Engineer",
              "Backend Developer",
              "DevOps Engineer",
              "Mobile App Developer",
              "UI/UX Designer",
              "Data Scientist",
            ].map((job) => (
              <div
                key={job}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-gray-900">{job}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Remote • Full-time
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Company Name
                  </span>
                  <span className="text-sm font-medium text-[#3017D3]">
                    Apply →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
