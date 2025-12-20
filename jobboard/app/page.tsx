export default function Home() {
  return (
    <>

    <header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

    {/* Logo */}
    <img
      src="/logo(2).png"
      alt="Technical Job Board"
      className="h-14 w-auto"
    />

    {/* Right-side Navigation */}
    <nav className="flex items-center space-x-8">
      <a href="#" className="text-gray-700 hover:text-[#3017D3] font-medium">
        All Jobs
      </a>
      <a href="#" className="text-gray-700 hover:text-[#3017D3] font-medium">
        Jobseeker
      </a>
      <a href="#" className="text-gray-700 hover:text-[#3017D3] font-medium">
        Employer
      </a>

      <button className="bg-[#3017D3] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#2410b8] transition">
        Post Job
      </button>
    </nav>

  </div>
</header>

{/* Hero Section */}
<section
  className="w-full"
  style={{
    background: `
      linear-gradient(
        135deg,
        #3b2ff5 0%,
        #5b3df5 35%,
        #7b5df7 65%,
        #f5f7ff 100%
      )
    `,
  }}
>
  <div className="max-w-7xl mx-auto px-6 py-32 text-center">

    {/* Headline */}
    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
      Where{" "}
      <span className="text-[#3017D3]">
        Technical
      </span>{" "}
      Careers Meet Opportunity
    </h1>

    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-14">
      Explore curated roles built for developers, engineers,
      and modern technical professionals.
    </p>

    {/* Search Bar */}
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">

      <input
        type="text"
        placeholder="Job title or keyword"
        className="flex-1 border border-gray-300 rounded-lg px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
      />

      <input
        type="text"
        placeholder="Location"
        className="flex-1 border border-gray-300 rounded-lg px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
      />

      <select className="flex-1 border border-gray-300 rounded-lg px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3017D3]">
        <option>Job Type</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
        <option>Remote</option>
      </select>

      <button className="bg-[#3017D3] text-white px-10 py-4 rounded-lg font-medium hover:bg-[#2410b8] transition">
        Search Jobs
      </button>
    </div>

  </div>
</section>


<section className="bg-white">
  <div className="max-w-7xl mx-auto px-6 py-24">

    <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
      Browse by Category
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {[
        "Engineering",
        "Software",
        "DevOps",
        "Data",
        "Cybersecurity",
        "IT Support",
      ].map((category) => (
        <div
          key={category}
          className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer"
        >
          <p className="font-medium text-gray-800">
            {category}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>


     {/* Latest Jobs Section */}
<section className="bg-white">
  <div className="max-w-7xl mx-auto px-6 py-24">

    <h2 className="text-3xl font-semibold text-gray-900 mb-12">
      Latest Jobs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Frontend Engineer",
          company: "Innovatech",
          location: "Remote",
          type: "Full-time",
        },
        {
          title: "Backend Developer",
          company: "CloudWorks",
          location: "New York, USA",
          type: "Hybrid",
        },
        {
          title: "DevOps Engineer",
          company: "ScaleOps",
          location: "London, UK",
          type: "Full-time",
        },
        {
          title: "Mobile App Developer",
          company: "Apply",
          location: "Remote",
          type: "Full-time",
        },
        {
          title: "Data Engineer",
          company: "DataNest",
          location: "Berlin, Germany",
          type: "On-site",
        },
        {
          title: "QA Automation Engineer",
          company: "TestLab",
          location: "Toronto, Canada",
          type: "Full-time",
        },
      ].map((job, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {job.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3">
            {job.company}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>{job.location}</span>
            <span className="text-[#5633be] font-medium">
              {job.type}
            </span>
          </div>

          <button className="text-[#5633be] font-medium hover:underline">
            View job →
          </button>
        </div>
      ))}
    </div>

  </div>
</section>

        </>
  );
}
