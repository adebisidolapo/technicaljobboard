export default function Home() {
  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">

      {/* ================= HERO ================= */}
      <section className="py-28 bg-gradient-to-r from-[#6F00FC] via-[#8C33FD] to-[#A866FE] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Discover startup jobs<br />
            that <span className="text-[#02000D]">move your career forward</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-2xl">
            Explore thousands of roles from fast-growing startups and tech companies.
          </p>

          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto md:mx-0">
            <input className="border px-4 py-3 rounded-lg" placeholder="Role or keyword" />
            <input className="border px-4 py-3 rounded-lg" placeholder="Location or remote" />
            <button className="bg-[#6F00FC] hover:bg-[#8C33FD] transition text-white rounded-lg font-medium">
              Search jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Curated Startup Roles",
                desc: "We handpick high-quality jobs to help you grow faster.",
                color: "#6F00FC",
              },
              {
                title: "Verified Companies",
                desc: "Work only with trusted companies and recruiters.",
                color: "#8C33FD",
              },
              {
                title: "Built for Growth",
                desc: "Tools and insights designed to accelerate your career.",
                color: "#A866FE",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-10 shadow-2xl transform hover:-translate-y-3 transition"
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
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
          <div>
            <h2 className="text-2xl font-bold mb-4">TechnicalJobboard</h2>
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
  );
}
