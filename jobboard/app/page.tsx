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
    background: "linear-gradient(90deg, #BED6FA 0%, #D3E3FA 60%, #F5F8FD 100%)",
  }}
>
  <div className="max-w-7xl mx-auto px-6 py-28">

    <div className="max-w-3xl">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Find your next Technical Job
      </h1>

      <p className="text-xl text-gray-700 mb-12">
        Discover curated technical roles from companies building
        the future of engineering and technology.
      </p>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Keyword */}
        <div className="flex items-center border border-gray-300 rounded-xl px-4">
          <span className="text-gray-400 mr-3">🔍</span>
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full py-4 focus:outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex items-center border border-gray-300 rounded-xl px-4">
          <span className="text-gray-400 mr-3">📍</span>
          <input
            type="text"
            placeholder="Location"
            className="w-full py-4 focus:outline-none"
          />
        </div>

        {/* Job Type */}
        <select className="border border-gray-300 rounded-xl px-4 py-4 text-gray-600 focus:outline-none">
          <option>Job Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>

        {/* Button */}
        <button className="bg-[#5633be] text-white rounded-xl px-6 py-4 font-medium hover:bg-[#4526a6]">
          Search Jobs
        </button>
      </div>
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
      ].map((job, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-1">
            {job.title}
          </h4>

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
