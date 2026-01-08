export default function Home() {
  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Discover startup jobs<br />
            that <span className="text-[#6F00FC]">move your career forward</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Explore thousands of roles from fast-growing startups and tech companies.
          </p>

          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <input className="border px-4 py-3 rounded-lg" placeholder="Role or keyword" />
            <input className="border px-4 py-3 rounded-lg" placeholder="Location or remote" />
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white rounded-lg font-medium">
              Search jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="bg-white border-t border-b">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["12k+", "Jobs posted"], ["3k+", "Hiring companies"], ["95%", "Success rate"], ["24h", "Avg response"]].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold text-[#6F00FC]">{value}</p>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-2">Featured startup roles</h2>
          <p className="text-gray-600 mb-10">
            Actively hiring companies hand-picked for you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ role: "Senior Frontend Engineer", company: "NovaTech", salary: "$120k – $150k" }, { role: "Product Designer", company: "Launchify", salary: "$90k – $120k" }].map((job) => (
              <div key={job.role} className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#6F00FC] hover:shadow-xl transition">
                <p className="text-sm text-gray-500">{job.company}</p>
                <h3 className="text-lg font-semibold mt-1">{job.role}</h3>
                <p className="text-sm text-[#6F00FC] mt-2">{job.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BROWSE JOBS ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-2">Browse jobs</h2>
          <p className="text-gray-600 mb-8">Showing 124 available roles</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Filters */}
            <aside className="bg-gray-100 rounded-2xl p-6 h-fit shadow-lg">
              <h3 className="font-semibold mb-4">Filter jobs</h3>
              <input className="w-full border rounded-lg px-4 py-2 mb-3" placeholder="Keyword" />
              <input className="w-full border rounded-lg px-4 py-2" placeholder="Location" />
            </aside>

            {/* Job Feed */}
            <div className="lg:col-span-3 space-y-6">
              {[{ role: "Frontend Engineer", company: "NovaTech", location: "Remote (US)", salary: "$90k – $130k", tags: ["Remote", "Full-time", "Senior"] }, { role: "Product Designer", company: "Launchify", location: "New York", salary: "$85k – $120k", tags: ["Hybrid", "Full-time"] }].map((job) => (
                <div key={job.role} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#A866FE] text-white flex items-center justify-center font-bold">
                      {job.company[0]}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags.map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-[#6F00FC]">{job.salary}</p>
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

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Curated Startup Roles", desc: "Handpicked jobs to accelerate your career.", color: "#6F00FC" },
              { title: "Verified Companies", desc: "Only trusted and reliable employers.", color: "#8C33FD" },
              { title: "Career Growth Tools", desc: "Resources and insights to grow faster.", color: "#A866FE" }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-10 shadow-2xl transform hover:-translate-y-3 transition" style={{ backgroundColor: item.color, color: "#fff" }}>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURE / SERVICES SPLIT ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img src="https://via.placeholder.com/600x400" alt="Vibrant Section" className="rounded-2xl shadow-lg" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Empowering Job Seekers</h2>
            <p className="text-gray-700 mb-6">
              Our platform provides startup opportunities, verified companies, and tools designed to help you grow and succeed.
            </p>
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] text-white px-6 py-3 rounded-xl font-medium transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#02000D] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">TechnicalJobboard</h2>
            <p className="text-gray-300">Connecting ambitious professionals with innovative startups.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#6F00FC] transition">Home</a></li>
              <li><a href="#" className="hover:text-[#8C33FD] transition">Jobs</a></li>
              <li><a href="#" className="hover:text-[#A866FE] transition">About</a></li>
              <li><a href="#" className="hover:text-[#6F00FC] transition">Contact</a></li>
            </ul>
          </div>
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
  );
}