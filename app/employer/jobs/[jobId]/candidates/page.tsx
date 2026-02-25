import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ jobId: string }>;
};

export default async function CandidatesPage({ params }: Props) {
  const { jobId } = await params;

  if (!jobId) return notFound();

  return (
    <main className="min-h-screen bg-[#F4F6FB]">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Candidates
              </h1>
              <p className="mt-2 text-slate-600">
                Job: <span className="font-semibold">{jobId}</span>
              </p>
            </div>

            <Link
              href="/employer/jobs"
              className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
            >
              Back to Jobs
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          Candidates pipeline goes here.
        </div>
      </div>
    </main>
  );
}