import "./globals.css";

export const metadata = {
  title: "Technical Job Board",
  description: "Where technical careers meet opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        {/* HEADER */}
        <header className="w-full bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

{/* TechnicalJob Logo */}
<div className="flex items-center">
  <img
    src="/Technicaljoblogo.png"
    alt="TechnicalJobboard"
    className="h-28 md:h-32 lg:h-36 w-auto object-contain"
  />
</div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
              <a href="#" className="hover:text-[#3017D3]">All Jobs</a>
              <a href="#" className="hover:text-[#3017D3]">Jobseeker</a>
              <a href="#" className="hover:text-[#3017D3]">Employer</a>
              <a
                href="#"
                className="px-4 py-2 bg-[#3017D3] text-white rounded-md"
              >
                Post Job
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button className="md:hidden text-gray-800">
              ☰
            </button>

          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
