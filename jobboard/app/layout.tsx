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
        <header className="w-full border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={36}
              priority
            />

            <nav className="hidden md:flex gap-6 text-sm text-gray-700">
              <a href="#">All Jobs</a>
              <a href="#">Jobseeker</a>
              <a href="#">Employer</a>
              <a className="px-4 py-2 bg-[#3017D3] text-white rounded-md">
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
