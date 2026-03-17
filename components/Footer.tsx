import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-slate-900"
            >
              Technical Job Board
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
              Discover technical jobs, connect with strong companies, and build
              your next career move with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
              Jobs
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/all-jobs" className="hover:text-slate-900 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-slate-900 transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/remote-jobs" className="hover:text-slate-900 transition">
                  Remote Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
              Employers
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/employer/jobs/new" className="hover:text-slate-900 transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/employer/dashboard" className="hover:text-slate-900 transition">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-slate-900 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-slate-900 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Technical Job Board. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}