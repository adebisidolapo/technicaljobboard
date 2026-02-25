import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1426] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png.png"
                alt="TechnicalJobboard"
                width={520}
                height={140}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 text-sm text-white/75 leading-relaxed max-w-md">
              Curated technical roles from trusted teams. Clean listings, fast apply,
              and careers that last.
            </p>
          </div>

          <div className="md:col-span-3 md:pt-2">
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white">
              Explore
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/75">
              <li><Link href="/all-jobs" className="hover:text-white transition">All Jobs</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition">Categories</Link></li>
              <li><Link href="/jobseeker/login" className="hover:text-white transition">Jobseeker</Link></li>
              <li><Link href="/employer/login" className="hover:text-white transition">Employer</Link></li>
              <li><Link href="/employer/jobs/new" className="hover:text-white transition">Post Job</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 md:pt-2">
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white">
              Stay connected
            </h3>

            <div className="mt-6">
              <NewsletterForm />
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px bg-white/10" />

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} TechnicalJobboard. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}