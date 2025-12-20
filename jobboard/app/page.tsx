export default function Home() {
  return (
    <>

    <header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

    {/* Logo */}
    <img
      src="/logo.png"
      alt="Technical Job Board"
      className="h-16 w-auto"
    />

    {/* Navigation */}
    <nav className="hidden lg:flex items-center space-x-10">
      {["Home", "Jobs", "Categories", "Employers", "About Us"].map((item) => (
        <a
          key={item}
          href="#"
          className="text-gray-700 hover:text-[#5633be] font-medium"
        >
          {item}
        </a>
      ))}
    </nav>

    {/* Actions */}
    <div className="flex items-center space-x-4">
      <button className="text-gray-700 hover:text-[#5633be] font-medium">
        Login
      </button>
      <button className="bg-[#5633be] text-white px-6 py-3 rounded-lg hover:bg-[#4526a6] font-medium">
        Post a Job
      </button>
    </div>

  </div>
</header>

{/* Hero Section */}
<section
  className="w-full"
  style={{
    background:
      "linear-gradient(90deg, #BED6FA 0%, #D3E3FA 60%, #F5F8FD 100%)",
  }}
>
  <div className="max-w-7xl mx-auto px-6 py-28 text-center">

    {/* Headline */}
    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
      Find your next Technical Job
    </h1>

    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-14">
      The curated job board for developers, engineers, and technical professionals
    </p>

    {/* Search Box */}
<div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col md:flex-row items-stretch gap-4 max-w-5xl mx-auto">

  {/* Keyword */}
  <div className="flex items-center flex-1 border border-gray-300 rounded-xl px-4">
    <svg
      className="w-5 h-5 text-gray-400 mr-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z"
      />
    </svg>

    <input
      type="text"
      placeholder="Search by title or keyword"
      className="w-full py-4 focus:outline-none text-gray-700"
    />
  </div>

  {/* Location */}
  <div className="flex items-center flex-1 border border-gray-300 rounded-xl px-4">
    <svg
      className="w-5 h-5 text-gray-400 mr-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 11c0 7.5-7.5 10.5-7.5 10.5S4.5 18.5 4.5 11a7.5 7.5 0 1115 0z"
      />
    </svg>

    <input
      type="text"
      placeholder="Location"
      className="w-full py-4 focus:outline-none text-gray-700"
    />
  </div>

  {/* Job Type */}
  <div className="flex items-center border border-gray-300 rounded-xl px-4">
    <svg
      className="w-5 h-5 text-gray-400 mr-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 7V6a3 3 0 013-3h6a3 3 0 013 3v1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
      />
    </svg>

    <select className="py-4 bg-transparent focus:outline-none text-gray-700 w-full">
      <option>Job Type</option>
      <option>Full-time</option>
      <option>Part-time</option>
      <option>Contract</option>
      <option>Remote</option>
    </select>
  </div>

  {/* Button */}
  <button className="bg-[#5633be] text-white px-10 py-4 rounded-xl font-medium hover:bg-[#4526a6] transition">
    Search Jobs
  </button>

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
