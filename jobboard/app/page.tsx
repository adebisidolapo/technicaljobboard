export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-[#FAFAFF] overflow-hidden">
        
        {/* subtle background lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 border border-indigo-100 rotate-12" />
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] border border-indigo-100 -rotate-12" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Find your{" "}
            <span className="text-[#3017D3]">dream job</span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Find your next career at companies like HubSpot, Nike, and Dropbox
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-2 flex flex-col md:flex-row items-center gap-3">
            
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full md:flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full md:flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3017D3]"
            />

            <button className="w-full md:w-auto px-6 py-3 text-sm font-medium bg-[#3017D3] text-white rounded-lg hover:opacity-90 transition">
              Search
            </button>
          </div>

          {/* Popular roles */}
          <p className="mt-6 text-sm text-gray-400">
            Popular: UI Designer, UX Researcher, Android, Admin
          </p>
        </div>
      </section>
    </main>
  );
}