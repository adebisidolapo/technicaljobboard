export default function Home() {
  return (
    <main>
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Where{" "}
            <span className="text-[#3017D3]">Technical</span>{" "}
            Careers Meet Opportunity
          </h1>

          <p className="mt-4 text-gray-600">
            Explore curated roles for developers, engineers, and modern
            technical professionals.
          </p>
        </div>
      </section>
    </main>
  );
}




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
</section>
        </>
  );
}
