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

          <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto md:mx-0">
            <input className="border px-4 py-3 rounded-lg" placeholder="Keyword: e.g Frontend, Product Designer" />
            <input className="border px-4 py-3 rounded-lg" placeholder="Location: e.g Lagos, Remote" />
            <select className="border px-4 py-3 rounded-lg">
              <option>Job Type: Full-time, Part-time, Contract</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold tracking-wide">Featured Startup Roles</h2>
          </div>

          {/* Carousel / horizontal scroll */}
          <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory px-2">
            {[
              {
                role: "Senior Frontend Engineer",
                company: "NovaTech",
                salary: "$120k – $150k",
                desc: "Work on cutting-edge frontend technology with React, Next.js, and modern UI frameworks.",
                color: "#6F00FC",
              },
              {
                role: "Product Designer",
                company: "Launchify",
                salary: "$90k – $120k",
                desc: "Design intuitive user experiences and lead product design sprints for innovative solutions.",
                color: "#8C33FD",
              },
              {
                role: "Backend Engineer",
                company: "TechNova",
                salary: "$100k – $140k",
                desc: "Build scalable APIs, manage databases, and optimize backend performance for high-traffic apps.",
                color: "#A866FE",
              },
              {
                role: "Full Stack Developer",
                company: "CodeCraft",
                salary: "$110k – $160k",
                desc: "Own the end-to-end development of web applications using modern stacks.",
                color: "#6F00FC",
              },
              {
                role: "Data Analyst",
                company: "InsightLabs",
                salary: "$80k – $110k",
                desc: "Analyze large datasets, create dashboards, and provide actionable insights to decision-makers.",
                color: "#8C33FD",
              },
            ].map((job, idx) => (
              <div
                key={idx}
                className="flex-none w-96 snap-center bg-white rounded-3xl p-8 shadow-xl border-l-4 hover:shadow-2xl transition"
                style={{ borderColor: job.color }}
              >
                <p className="text-sm font-medium text-gray-500">{job.company}</p>
                <h3 className="text-xl font-bold mt-1">{job.role}</h3>
                <p className="text-sm font-medium mt-2" style={{ color: job.color }}>{job.salary}</p>
                <p className="text-gray-600 mt-3 text-sm">{job.desc}</p>
                <button className="mt-6 w-full bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-xl font-semibold transition">
                  View Job
                </button>
              </div>
            ))}
          </div>

          {/* Centered Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {[0, 1, 2, 3, 4].map((_, i) => (
              <span key={i} className="w-3 h-3 rounded-full bg-gray-400"></span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BROWSE JOBS ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold tracking-wide">Browse Jobs</h2>
            <span className="text-[#6F00FC] font-semibold underline cursor-pointer hover:bg-gray-100 px-2 rounded transition">
              Load More Jobs
            </span>
          </div>
          <p className="text-gray-600 mb-8">Showing 124 available roles</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Filters */}
            <aside className="bg-gray-100 rounded-3xl p-6 h-fit shadow-lg">
              <h3 className="font-bold mb-4 tracking-wide">Filter Jobs</h3>
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
              <select className="w-full border rounded-lg px-4 py-2 mb-3">
                <option>Work Setup</option>
                <option>Remote</option>
                <option>Onsite</option>
                <option>Hybrid</option>
              </select>
              <input className="w-full border rounded-lg px-4 py-2" placeholder="Salary range" />
            </aside>

            {/* Job Feed */}
            <div className="lg:col-span-3 space-y-6">
              {[
                { role: "Frontend Engineer", company: "NovaTech", location: "Remote (US)", salary: "$90k – $130k", desc: "Build scalable, beautiful UI with React & Next.js. Collaborate with cross-functional teams.", tags: ["Remote", "Full-time", "Senior"] },
                { role: "Product Designer", company: "Launchify", location: "New York", salary: "$85k – $120k", desc: "Design intuitive experiences. Lead design sprints and usability testing.", tags: ["Hybrid", "Full-time"] },
                { role: "Backend Developer", company: "TechNova", location: "San Francisco", salary: "$100k – $140k", desc: "Develop APIs, manage databases, optimize backend performance.", tags: ["Full-time", "Mid-level"] },
                { role: "Data Analyst", company: "InsightLabs", location: "Remote", salary: "$80k – $110k", desc: "Analyze large datasets and create actionable dashboards.", tags: ["Remote", "Full-time"] },
                { role: "Full Stack Developer", company: "CodeCraft", location: "Lagos", salary: "$110k – $160k", desc: "Build end-to-end web solutions using modern stacks.", tags: ["Full-time"] },
              ].map((job, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#A866FE] text-white flex items-center justify-center font-bold">{job.company[0]}</div>
                    <div>
                      <h3 className="text-lg font-bold">{job.role}</h3>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      <p className="text-gray-700 mt-2 text-sm">{job.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags.map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#6F00FC]">{job.salary}</p>
                    <button className="mt-4 bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-4 py-2 rounded-lg text-sm font-semibold transition">View</button>
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
          
          {/* Left Image */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
              alt="Empowering Job Seekers"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Text */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-extrabold mb-6 tracking-wide">Empowering Job Seekers</h2>
            <p className="text-gray-700 mb-6">
              We provide startup opportunities, verified companies, and career tools designed to help you grow faster and succeed in your dream role.
            </p>
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-6 py-3 rounded-xl font-semibold transition">
              Get Started
            </button>
          </div>

        </div>
      </section>

    </main>
  )
}