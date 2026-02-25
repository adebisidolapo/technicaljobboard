import JobsSection from "@/components/jobs/JobsSection";

export const dynamic = "force-dynamic";

export default function AllJobsPage() {
  return (
    <main className="min-h-screen bg-[#F4F6FB] text-[#0B1222]">
      {/* Top bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            All Jobs
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">
            Search roles across Architecture, Healthcare, Construction, CAD/BIM,
            Manufacturing, and more.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <JobsSection />
      </section>
    </main>
  );
}