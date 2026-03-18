import Link from "next/link";

export const dynamic = "force-dynamic";

type SearchParams = { q?: string };

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

async function getResumes(companyId: string, q: string) {
  const base = getBaseUrl();
  const url =
    `${base}/api/employer/resumes?companyId=${encodeURIComponent(companyId)}` +
    (q ? `&q=${encodeURIComponent(q)}` : "");

  const res = await fetch(url, { cache: "no-store" });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || "Failed to load resumes");
  }

  return data as { ok: true; items: any[] };
}

export default async function EmployerResumesPage(props: {
  // ✅ Next 16 types sometimes treat searchParams as Promise
  searchParams?: Promise<SearchParams>;
}) {
  const sp: SearchParams = await Promise.resolve(props.searchParams ?? {});
  const q = (sp.q ?? "").toString().trim();

  // Later: derive from logged-in employer
  const companyId = "cmlkxmg130000tnn0av04lkpg";

  const data = await getResumes(companyId, q);
  const items = data.items ?? [];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Resume database
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Candidates who applied to your jobs and have a resume uploaded.
            </p>
          </div>

          <form className="w-full sm:w-[360px]">
            <div className="flex items-stretch w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <input
                name="q"
                defaultValue={q}
                placeholder="Search name, headline, location, email…"
                className="h-11 px-4 w-full text-sm outline-none"
              />
              <button
                type="submit"
                className="h-11 px-4 bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white font-extrabold text-sm transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="text-sm font-extrabold text-slate-900">
            {items.length} result{items.length === 1 ? "" : "s"}
          </div>
          <div className="text-xs text-slate-500">Tip: open resume to review quickly.</div>
        </div>

        {items.length ? (
          <div className="divide-y divide-slate-200">
            {items.map((x) => (
              <div key={x.userId} className="px-6 py-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-extrabold text-slate-900 truncate">
                      {x.fullName || x.email || "Candidate"}
                    </div>
                    <div className="mt-1 text-sm text-slate-600 truncate">
                      {x.headline || "—"}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 truncate">
                      {x.location || "United States"}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    <a
                      href={x.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[#0B1222] text-white hover:bg-slate-900 transition text-sm font-extrabold"
                    >
                      Open resume
                    </a>

                    <Link
                      href="/employer/candidates"
                      className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-extrabold text-slate-900"
                    >
                      Candidates
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="text-lg font-extrabold text-slate-900">No resumes found</div>
            <p className="mt-2 text-sm text-slate-600">
              Once applicants upload resumes, they’ll show here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}