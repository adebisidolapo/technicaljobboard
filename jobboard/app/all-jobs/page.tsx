"use client";
import JobsSection from "@/components/jobs/JobsSection";

export default function AllJobsPage() {
  return (
    <main className="font-sans bg-gray-100 text-[#02000D]">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            All Jobs
          </h1>
          <p className="mt-2 text-slate-600">
            Browse roles across Architecture, Healthcare, Construction, CAD/BIM, and more (US only).
          </p>
        </div>
      </section>

      <JobsSection />
    </main>
  );
}
