export default function Home() {
  return (
    <>

  export default function Home() {
  return (
    <main>
      <section className="relative bg-white py-24 overflow-hidden">
        
        {/* subtle background lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-0 w-72 h-72 border border-gray-200 rotate-12" />
          <div className="absolute bottom-10 right-0 w-96 h-96 border border-gray-200 -rotate-12" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Find your{" "}
            <span className="text-[#2F5BEA]">dream job</span>
          </h1>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Find your next career at companies like HubSpot, Nike, and Dropbox
          </p>

          {/* Search */}
          <div className="mt-10 bg-white rounded-xl shadow-md border border-gray-200 p-2 flex flex-col md:flex-row items-center gap-3">
            
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full md:flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5BEA]"
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full md:flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5BEA]"
            />

            <button className="w-full md:w-auto px-6 py-3 text-sm font-medium bg-[#2F5BEA] text-white rounded-lg hover:opacity-90 transition">
              Search
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
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
