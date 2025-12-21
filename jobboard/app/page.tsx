export default function Home() {
  return (
    <>

    import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo(2).png"
            alt="Technical Job Board Logo"
            width={140}
            height={36}
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-[#3017D3]">All Jobs</a>
          <a href="#" className="hover:text-[#3017D3]">Jobseeker</a>
          <a href="#" className="hover:text-[#3017D3]">Employer</a>
          <a
            href="#"
            className="px-4 py-2 bg-[#3017D3] text-white rounded-md hover:opacity-90"
          >
            Post Job
          </a>
        </nav>
      </div>
    </header>
  );
}


{/* Hero Section */}
<section className="w-full bg-white py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h1 className="text-5xl font-bold text-gray-900 leading-tight">
      Where{" "}
      <span className="text-[#3017D3]">Technical</span>{" "}
      Careers Meet Opportunity
    </h1>

    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
      Explore curated roles built for developers, engineers, and modern
      technical professionals.
    </p>

    {/* Search Bar */}
    <div className="mt-12 bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="Job title or keyword"
        className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
      />

      <select
        className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
      >
        <option>Job Type</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Remote</option>
      </select>

      <button className="w-full md:w-auto px-6 py-3 bg-[#3017D3] text-white rounded-lg font-medium hover:opacity-90 transition">
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
