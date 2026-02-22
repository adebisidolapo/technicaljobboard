import Link from "next/link";
import { getBaseUrl } from "@/lib/baseUrl";

export const dynamic = "force-dynamic";

async function getApplications(jobId: string) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/employer/applications?jobId=${jobId}`;

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `API did not return JSON.\nStatus: ${res.status}\nURL: ${url}\n\nResponse:\n${text.slice(
        0,
        400
      )}`
    );
  }

  if (!res.ok) throw new Error(data?.message || `Failed (${res.status})`);
  return data;
}

const STATUSES = ["APPLIED", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"] as const;

function StatusPill({ status }: { status: string }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border";

  switch (status) {
    case "HIRED":
      return <span className={`${base} bg-green-50 border-green-200 text-green-700`}>HIRED</span>;
    case "REJECTED":
      return <span className={`${base} bg-rose-50 border-rose-200 text-rose-700`}>REJECTED</span>;
    case "SHORTLISTED":
      return <span className={`${base} bg-indigo-50 border-indigo-200 text-indigo-700`}>SHORTLISTED</span>;
    case "REVIEWING":
      return <span className={`${base} bg-amber-50 border-amber-200 text-amber-700`}>REVIEWING</span>;
    default:
      return <span className={`${base} bg-slate-50 border-slate-200 text-slate-700`}>APPLIED</span>;
  }
}

export default async function JobCandidatesPage({
  params,
}: {
  params?: { jobId?: string };
}) {
  const jobId = params?.jobId;

  // ✅ Don’t crash — show friendly message
  if (!jobId) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold text-slate-500">ATS / Candidates</div>
          <h1 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Missing Job ID
          </h1>
          <p className="mt-2 text-slate-600">
            This page must be opened from a job row (View Candidates) so the jobId is included.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/employer/dashboard"
              className="h-11 px-5 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-base font-semibold text-slate-800"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/employer/jobs"
              className="h-11 px-6 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-base font-semibold shadow-md"
            >
              Go to Jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const data = await getApplications(jobId);
  const applications = data?.applications ?? [];
  const job = data?.job;

  const counts: Record<string, number> = {};
  for (const s of STATUSES) counts[s] = 0;
  for (const a of applications) counts[a.status] = (counts[a.status] ?? 0) + 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-500">ATS / Candidates</div>
            <h1 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              {job?.title ?? "Job"} — Candidates
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review applicants and move them through stages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/employer/jobs"
              className="h-11 px-5 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-base font-semibold text-slate-800"
            >
              ← Back to Jobs
            </Link>

            <a
              href="#"
              className="h-11 px-6 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-base font-semibold shadow-md"
            >
              Export
            </a>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-slate-900">Pipeline Overview</h2>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {STATUSES.map((s) => (
            <div key={s} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-600">{s}</div>
              <div className="text-3xl font-extrabold mt-2 text-slate-900">
                {counts[s] ?? 0}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Candidate list */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">
            {applications.length} candidate{applications.length === 1 ? "" : "s"}
          </div>
          <div className="text-xs text-slate-500">Tip: move candidates by status.</div>
        </div>

        <div className="divide-y divide-slate-200">
          {applications.length ? (
            applications.map((a: any) => (
              <div key={a.id} className="px-6 py-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="font-extrabold text-slate-900 truncate">
                        {a.user?.jobseekerProfile?.fullName || a.user?.email || "Applicant"}
                      </div>
                      <StatusPill status={a.status} />
                    </div>

                    <div className="mt-1 text-sm text-slate-600">
                      Email: <span className="font-semibold">{a.user?.email ?? "—"}</span>
                    </div>

                    {a.coverLetter ? (
                      <div className="mt-2 text-sm text-slate-600">
                        <span className="font-semibold">Cover:</span> {a.coverLetter}
                      </div>
                    ) : null}

                    {a.resumeUrl ? (
                      <div className="mt-2 text-sm text-slate-600">
                        <span className="font-semibold">Resume:</span>{" "}
                        <span className="underline">{a.resumeUrl}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-10 text-center">
              <div className="text-lg font-extrabold text-slate-900">No candidates yet</div>
              <p className="mt-2 text-sm text-slate-600">
                Once job seekers apply, they will show up here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
