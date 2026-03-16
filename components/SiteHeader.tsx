"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">

          {/* TOP ROW */}
          <div className="flex items-center justify-between h-14">

            {/* LOGO */}
            <Link href="/" className="font-bold text-lg">
              TJB
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/jobs">Jobs</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/companies">Companies</Link>

              <Link
                href="/post-job"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Post Job
              </Link>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* MOBILE CATEGORY ROW */}
          <div className="md:hidden flex items-center gap-1 text-[10px] py-2 overflow-x-auto whitespace-nowrap">

            <span className="px-1.5 py-0.5 bg-gray-100 rounded">
              Engineering
            </span>

            <span className="px-1.5 py-0.5 bg-gray-100 rounded">
              Cloud
            </span>

            <span className="px-1.5 py-0.5 bg-gray-100 rounded">
              Remote
            </span>

            <Link
              href="/post-job"
              className="px-1.5 py-0.5 bg-green-600 text-white rounded font-medium"
            >
              Post Job
            </Link>

          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="flex flex-col p-4 gap-4 text-sm">

              <Link href="/jobs" onClick={() => setOpen(false)}>
                Jobs
              </Link>

              <Link href="/categories" onClick={() => setOpen(false)}>
                Categories
              </Link>

              <Link href="/companies" onClick={() => setOpen(false)}>
                Companies
              </Link>

            </div>
          </div>
        )}
      </header>

      {/* HEADER SPACER */}
      <div className="h-[96px] md:h-14" />
    </>
  );
}