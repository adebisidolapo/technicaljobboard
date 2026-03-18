import Link from "next/link";

export const dynamic = "force-dynamic";

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

async function getJobs(companyId: string) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/employer/jobs?companyId=${encodeURIComponent(companyId)}`;

  const res = await fetch(url, { cache: "no-store" });

  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `API did not return JSON.\nStatus: ${res.status}\nURL: ${url}\n\nResponse:\n${text.slice(0, 400)}`
    );
  }

  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || `Failed (${res.status})`);
  }

  return data;
}

function StatusPill({ status }: { status: string }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border";

  if (status === "PUBLISHED") {
    return (
      <span className={`${base} bg-green-50 border-green-200 text-green-700`}>
        Active
      </span>
    );
  }
  if (status === "PAUSED") {
    return (
      <span className={`${base} bg-amber-50 border-amber-200 text-amber-700`}>
        Paused
      </span>
    );
  }
  if (status === "CLOSED") {
    return (
      <span className={`${base} bg-slate-100 border-slate-200 text-slate-700`}>
        Closed
      </span>
    );
  }
  return (
    <span className={`${base} bg-slate-50 border-slate-200 text-slate-700`}>
      Draft
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-extrabold text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-extrabold text-slate-900">{value}</div>
    </div>
  );
}

function CandidateCard({
  name,
  title,
  location,
  note,
}: {
  name: string;
  title: string;
  location: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-extrabold text-slate-900 truncate">{name}</div>
          <div className="mt-0.5 text-xs text-slate-600 truncate">
            {title} • {location}
          </div>
        </div>

        <button
          className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-xs font-semibold"
          type="button"
        >
          Review
        </button>
      </div>

      {note ? (
        <div className="mt-3 text-xs text-slate-600">
          <span className="font-semibold text-slate-700">Note:</span> {note}
        </div>
      ) : null}
    </div>
  );
}

export default async function JobCandidatesPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  // ✅ Next.js 15: params is a Promise
  const { jobId } = await params;

  // Later: derive from logged-in employer
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const data = await getJobs(companyId);
  const jobs = data?.jobs ?? [];
  const job = jobs.find((j: any) => j.id === jobId);

  if (!job) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">Job not found</div>
          <p className="mt-2 text-sm text-slate-600">
            We couldn’t find this job in your employer account.
          </p>
          <Link
            href="/employer/jobs"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-slate-900 text-sm font-semibold hover:bg-slate-50 transition"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const loc =
    job.locations?.length
      ? job.locations
          .map((l: any) => l.label || l.city || l.state || l.country)
          .filter(Boolean)
          .join(", ")
      : "United States";

  const appsCount = job._count?.applications ?? 0;

  // Placeholder candidates (wire to real applications later)
  const pipeline = {
    new: [
      { name: "Jordan M.", title: "Frontend Engineer", location: "Remote", note: "Strong React + TypeScript." },
      { name: "Sam K.", title: "Backend Engineer", location: "Austin, TX", note: "Great API experience." },
    ],
    reviewed: [{ name: "Taylor R.", title: "DevOps Engineer", location: "NYC", note: "Terraform + AWS." }],
    interview: [{ name: "Avery L.", title: "Product Designer", location: "Remote" }],
    offer: [] as Array<any>,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 truncate">
                  {job.title}
                </h1>
                <StatusPill status={job.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {job.remote ? "Remote" : "On-site"} • {loc} •{" "}
                <span className="font-semibold text-slate-700">{appsCount}</span>{" "}
                applicant{appsCount === 1 ? "" : "s"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/employer/jobs"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-slate-900 text-sm font-semibold hover:bg-slate-50 transition"
              >
                Back to Jobs
              </Link>

              <Link
                href={`/employer/jobs/${job.id}/edit`}
                className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[#0B1222] text-white hover:bg-slate-900 transition text-sm font-semibold"
              >
                Edit job
              </Link>
            </div>
          </div>

          {/* Search/Filters placeholder */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="h-11 rounded-2xl border border-slate-200 bg-white px-4 flex items-center gap-2">
                <span className="text-slate-400">⌕</span>
                <span className="text-sm text-slate-500">Search candidates…</span>
              </div>
            </div>

            <button
              type="button"
              className="h-11 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold text-slate-900"
            >
              Filter
            </button>

            <button
              type="button"
              className="h-11 px-4 rounded-2xl bg-[color:var(--brand-purple)/0.10] text-[var(--brand-purple)] border border-[color:var(--brand-purple)/0.20] hover:bg-[color:var(--brand-purple)/0.14] transition text-sm font-extrabold"
            >
              Pipeline settings
            </button>
          </div>
        </div>
      </section>

      {/* Pipeline stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="New" value={pipeline.new.length} />
        <Stat label="Reviewed" value={pipeline.reviewed.length} />
        <Stat label="Interview" value={pipeline.interview.length} />
        <Stat label="Offer" value={pipeline.offer.length} />
      </div>

      {/* Columns */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {[
          { key: "new", title: "New", items: pipeline.new, tint: "bg-[color:var(--brand-purple)/0.06] border-[color:var(--brand-purple)/0.14]" },
          { key: "reviewed", title: "Reviewed", items: pipeline.reviewed, tint: "bg-[#F4F6FB] border-slate-200" },
          { key: "interview", title: "Interview", items: pipeline.interview, tint: "bg-[color:var(--brand-accent)/0.06] border-[color:var(--brand-accent)/0.14]" },
          { key: "offer", title: "Offer", items: pipeline.offer, tint: "bg-[#F4F6FB] border-slate-200" },
        ].map((col) => (
          <div key={col.key} className="lg:col-span-3">
            <div className={`rounded-3xl border ${col.tint} p-4`}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-slate-900">{col.title}</div>
                <div className="text-xs font-bold text-slate-600">{col.items.length}</div>
              </div>

              <div className="mt-3 space-y-3">
                {col.items.length ? (
                  col.items.map((c: any) => (
                    <CandidateCard
                      key={c.name}
                      name={c.name}
                      title={c.title}
                      location={c.location}
                      note={c.note}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                    <div className="text-sm font-extrabold text-slate-900">Empty</div>
                    <div className="mt-1 text-xs text-slate-600">
                      Candidates will appear here.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}