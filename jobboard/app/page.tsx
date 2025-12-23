export default function Home() {
  return (
    <main>
      {/* HERO */}
<section className="relative bg-[#FAFAFF] py-24 overflow-hidden">  
 {/* Background decoration */}
<div className="pointer-events-none absolute inset-0">
  <div className="absolute top-16 left-0 w-64 h-64 border border-indigo-100 rotate-12" />
  <div className="absolute bottom-16 right-0 w-96 h-96 border border-indigo-100 -rotate-12" />
</div>

<div className="max-w-4xl mx-auto px-6 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Where{" "}
            <span className="text-[#3017D3]">Technical</span>{" "}
            Careers Meet Opportunity
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Explore curated roles built for developers, engineers, and modern
            technical professionals.
          </p>
          {/* SEARCH */}
          <div className="mt-10 bg-white border border-gray-300 rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center">
            
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full md:flex-1 px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full md:flex-1 px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
            />

            <select
              className="w-full md:w-48 px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
            >
              <option>Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
            </select>

            <button className="w-full md:w-auto px-6 py-3 bg-[#3017D3] text-white rounded-lg text-sm font-medium hover:opacity-90">
              Search Jobs
            </button>
          </div>
      </section>
    </main>
 

{/* JOB SEEKER / EMPLOYER CARDS */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Job Seekers */}
    <div className="border border-gray-200 rounded-xl p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Job seekers
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Browse jobs from the very best companies.
        </p>
      </div>

      <button className="px-5 py-2 text-sm bg-[#3017D3] text-white rounded-md">
        Find jobs
      </button>
    </div>

    {/* Employers */}
    <div className="border border-gray-200 rounded-xl p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Employers
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Reach job seekers and fill open positions.
        </p>
      </div>

      <button className="px-5 py-2 text-sm bg-[#3017D3] text-white rounded-md">
        Post a job
      </button>
    </div>

  </div>
</section>
