export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
<header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

    {/* Logo */}
    <img
      src="/logo.png"
      alt="Technical Job Board"
      className="h-12 w-auto"
    />

    {/* Navigation */}
    <nav className="hidden md:flex items-center space-x-10">
      <a className="text-gray-700 hover:text-[#5633be] font-medium" href="#">
        Jobs
      </a>
      <a className="text-gray-700 hover:text-[#5633be] font-medium" href="#">
        Employers
      </a>
      <a className="text-gray-700 hover:text-[#5633be] font-medium" href="#">
        Categories
      </a>
    </nav>

    {/* Actions */}
    <div className="flex items-center space-x-4">
      <button className="text-gray-700 hover:text-[#5633be] font-medium">
        Login
      </button>
      <button className="bg-[#5633be] text-white px-6 py-2.5 rounded-lg hover:bg-[#4526a6] font-medium">
        Post a Job
      </button>
    </div>

  </div>
</header>

{/* Hero Section */}
<section className="w-full bg-gradient-to-b from-[#5633be]/15 via-[#5633be]/5 to-white">
  <div className="max-w-7xl mx-auto px-6 py-28 text-center">

    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
      Find your next Technical Job
    </h1>

    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-14">
      A curated job platform for engineers, developers, and technical professionals.
    </p>

    {/* Search Bar */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto">
      
      <input
        type="text"
        placeholder="Job title or keyword"
        className="flex-1 px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5633be]"
      />

      <input
        type="text"
        placeholder="Location"
        className="flex-1 px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5633be]"
      />

      <select
        className="px-5 py-4 rounded-xl border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5633be]"
      >
        <option>Job Type</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
        <option>Remote</option>
      </select>

      <button className="bg-[#5633be] text-white px-10 py-4 rounded-xl hover:bg-[#4526a6] font-medium">
        Search Jobs
      </button>
    </div>

  </div>
</section>

<section className="max-w-7xl mx-auto px-6 py-24">
  <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
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
</section>

      {/* Latest Jobs Section */}
<section className="max-w-7xl mx-auto px-6 pb-20">
  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
    Latest Jobs
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        type: "Contract",
      },
      {
        title: "Mobile App Developer",
        company: "Appify",
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
        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-1">
          {job.title}
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          {job.company}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{job.location}</span>
          <span className="text-blue-600 font-medium">
            {job.type}
          </span>
        </div>

        <button className="text-blue-600 font-medium hover:underline">
          View job →
        </button>
      </div>
    ))}
  </div>
</section>

    </main>
  );
}
