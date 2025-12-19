export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* Logo */}
    <div className="flex items-center">
      <img
        src="/logo.png"
        alt="Technical Jobboard"
        className="h-10 w-auto"
      />
    </div>

    {/* Job Board Navigation */}
    <nav className="hidden lg:flex items-center space-x-8">
      <a className="text-gray-700 hover:text-blue-600 font-medium" href="#">
        Jobs
      </a>
      <a className="text-gray-700 hover:text-blue-600 font-medium" href="#">
        Companies
      </a>
      <a className="text-gray-700 hover:text-blue-600 font-medium" href="#">
        Categories
      </a>
      <a className="text-gray-700 hover:text-blue-600 font-medium" href="#">
        Job Alerts
      </a>
    </nav>

    {/* Actions */}
    <div className="flex items-center space-x-4">
      <button className="text-gray-700 hover:text-blue-600 font-medium">
        Sign in
      </button>
      <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 font-medium">
        Post a Job
      </button>
    </div>

  </div>
</header>


{/* Hero Section */}
<section className="max-w-7xl mx-auto px-6 py-24 text-center">
  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
    Hire smarter. Get hired faster.
  </h1>

  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
    A focused job platform for technical professionals and companies
    building the future.
  </p>

  {/* Search Bar */}
  <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
    <input
      type="text"
      placeholder="Job title or keyword"
      className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      placeholder="Location"
      className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
      Search Jobs
    </button>
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
