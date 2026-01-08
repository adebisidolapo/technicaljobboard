export default function Home() {
  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="py-28 bg-gradient-to-r from-[#6F00FC] via-[#8C33FD] to-[#A866FE] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl tracking-wide">
            Discover startup jobs<br />
            that <span className="text-[#02000D]">move your career forward</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-2xl tracking-tight font-medium">
            Explore thousands of roles from fast-growing startups and tech companies.
          </p>

          {/* FIXED JOB SEARCH BAR */}
          <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto md:mx-0">
            <input
              className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F00FC]"
              placeholder="Job title or keyword"
              value="Frontend Engineer"
            />
            <input
              className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C33FD]"
              placeholder="Location or Remote"
              value="Lagos"
            />
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white rounded-lg font-medium">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED STARTUP ROLES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6 tracking-wide text-gray-900 text-center">
            Featured Startup Roles
          </h2>

          <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory px-2">
            {[
              { role: "Senior Frontend Engineer", company: "NovaTech", salary: "$120k – $150k", desc: "Build scalable UIs with React & Next.js.", color: "#6F00FC" },
              { role: "Product Designer", company: "Launchify", salary: "$90k – $120k", desc: "Design intuitive UX.", color: "#8C33FD" },
              { role: "Backend Engineer", company: "TechNova", salary: "$100k – $140k", desc: "Develop high-performance APIs.", color: "#A866FE" },
              { role: "Marketing Specialist", company: "GrowthLab", salary: "$60k – $80k", desc: "Plan campaigns and drive engagement.", color: "#6F00FC" },
              { role: "Data Analyst", company: "Insightify", salary: "$80k – $110k", desc: "Analyze metrics to drive decisions.", color: "#8C33FD" },
              { role: "DevOps Engineer", company: "CloudWorks", salary: "$110k – $140k", desc: "Maintain CI/CD pipelines.", color: "#A866FE" },
            ].map((job, idx) => (
              <div
                key={idx}
                className="flex-none w-96 snap-center bg-white rounded-3xl p-8 shadow-md border-l-4 hover:shadow-xl transition"
                style={{ borderColor: job.color }}
              >
                <p className="text-sm font-medium text-gray-500">{job.company}</p>
                <h3 className="text-xl font-semibold mt-1">{job.role}</h3>
                <p className="text-sm font-medium mt-2" style={{ color: job.color }}>{job.salary}</p>
                <p className="text-gray-600 mt-3 text-sm">{job.desc}</p>
                <button className="mt-6 w-full bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-xl font-medium transition">
                  View Job
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BROWSE JOBS ================= */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold tracking-wide text-gray-900">Browse Jobs</h2>
            <span className="text-[#6F00FC] font-medium underline cursor-pointer hover:bg-gray-100 px-2 rounded transition">
              Load More Jobs
            </span>
          </div>
          <p className="text-gray-600 mb-8">Showing 200 available roles</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Filters */}
            <aside className="bg-white rounded-3xl p-6 h-fit shadow-lg">
              <h3 className="font-semibold mb-4 tracking-wide text-gray-900">Filter Jobs</h3>
              <input className="w-full border rounded-lg px-4 py-2 mb-3" placeholder="Keyword" />
              <input className="w-full border rounded-lg px-4 py-2 mb-3" placeholder="Location" />
              <select className="w-full border rounded-lg px-4 py-2 mb-3">
                <option>Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
              <select className="w-full border rounded-lg px-4 py-2 mb-3">
                <option>Experience Level</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
              </select>
            </aside>

            {/* Job Feed */}
            <div className="lg:col-span-3 space-y-6">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex justify-between items-start"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#A866FE] text-white flex items-center justify-center font-bold">
                      C
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Frontend Engineer</h3>
                      <p className="text-sm text-gray-600">
                        NovaTech • Remote (US)
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Build scalable front-end applications with React & Next.js, collaborate with product teams, and contribute to cutting-edge projects.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100">Remote</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100">Full-time</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100">Senior</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-[#6F00FC]">$90k – $130k</p>
                    <button className="mt-4 bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-lg text-sm">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMPOWERING JOB SEEKERS ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          
          {/* Left Image (fictional) */}
          <div className="md:w-1/2">
            <img
              src="/objects-placeholder.png"
              alt="Empowering Job Seekers"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Text */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-6 tracking-tight">Empowering Job Seekers</h2>
            <p className="text-gray-700 mb-6">
              We provide startup opportunities, verified companies, and career tools designed to help you grow faster and succeed in your dream role.
            </p>
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-6 py-3 rounded-xl font-medium transition">
              Get Started
            </button>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-12 tracking-tight text-gray-900">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Curated Startup Roles", desc: "Handpicked opportunities tailored for growth.", color: "#6F00FC" },
              { title: "Verified Companies", desc: "Work only with trusted companies.", color: "#8C33FD" },
              { title: "Built for Growth", desc: "Tools & insights to accelerate your career.", color: "#A866FE" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-10 shadow-lg transform hover:-translate-y-2 transition"
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#02000D] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo / Info */}
          <div className="flex flex-col items-start">
            <img src="/logo.png" alt="TechnicalJobboard Logo" className="w-32 mb-4" />
            <p className="text-gray-300">
              Connecting ambitious professionals with innovative startups.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#6F00FC] transition">Home</a></li>
              <li><a href="#" className="hover:text-[#8C33FD] transition">Jobs</a></li>
              <li><a href="#" className="hover:text-[#A866FE] transition">About</a></li>
              <li><a href="#" className="hover:text-[#6F00FC] transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">Email: info@technicaljobboard.com</p>
            <p className="text-gray-300 mb-2">Phone: +234 800 000 0000</p>
            <p className="text-gray-300">Location: Lagos, Nigeria</p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TechnicalJobboard. All rights reserved.
        </div>
      </footer>
    </main>
  )
}