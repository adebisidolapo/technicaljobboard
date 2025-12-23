export default function Home() {
  return (
    <main>
      {/* HERO */}
<section className="relative bg-[#FAFAFF] py-24 overflow-hidden">  
  {/* Background rings */}
<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
  <div className="w-[700px] h-[700px] rounded-full border border-blue-100" />
  <div className="absolute w-[900px] h-[900px] rounded-full border border-blue-50" />
</div>

{/* Floating avatars (decorative) */}
<div className="pointer-events-none absolute inset-0">
  <div className="absolute top-24 left-20 w-10 h-10 rounded-full bg-blue-200" />
  <div className="absolute top-32 right-24 w-12 h-12 rounded-full bg-indigo-200" />
  <div className="absolute bottom-24 left-32 w-9 h-9 rounded-full bg-sky-200" />
  <div className="absolute bottom-28 right-40 w-11 h-11 rounded-full bg-blue-300" />
</div>

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
  );
}

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
