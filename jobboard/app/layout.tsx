import "./globals.css";
import Image from "next/image";

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
      <body>
        <header className="w-full bg-white border-b border-gray-200">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    
    {/* Logo */}
    <div className="flex items-center">
      <img
  src="/logo.png"
  alt="Logo"
  className="h-15 w-auto object-contain"
/>
    </div>

    {/* Menu */}
    <nav className="flex items-center gap-6 text-sm font-medium text-gray-800">
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

  </div>
</header>


        {children}
      </body>
    </html>
  );
}
