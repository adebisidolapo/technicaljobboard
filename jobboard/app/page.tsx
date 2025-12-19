export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Technical Job Board
          </h1>
          <nav className="space-x-4">
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Jobs
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Employers
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Find your next tech job
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Search thousands of jobs from top companies
        </p>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
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
    </main>
  );
}
