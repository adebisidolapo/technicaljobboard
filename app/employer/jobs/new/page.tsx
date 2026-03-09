import Link from "next/link";

export const dynamic = "force-dynamic";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="text-sm font-extrabold text-slate-900">{label}</div>
        <div className="text-xs text-slate-600">{hint}</div>
      </div>
      {children}
    </div>
  );
}

export default function NewEmployerJobPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Post a Job
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Create a clear, high-quality job post for technical candidates.
          </p>
        </div>

        <Link
          href="/employer/jobs"
          className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
        >
          Back to jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <section className="xl:col-span-8 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="text-sm font-extrabold text-slate-900">Job details</div>
            <div className="mt-1 text-xs text-slate-600">
              Make it specific, useful, and easy to understand.
            </div>
          </div>

          <div className="p-6 space-y-5">
            <Field label="Job title" hint="Use a clear role title.">
              <input
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Location" hint="City / State or Remote.">
                <input
                  placeholder="Austin, TX"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
                />
              </Field>

              <Field label="Job type" hint="Select the engagement type.">
                <select className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Level" hint="Seniority for the role.">
                <select className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]">
                  <option>Entry</option>
                  <option>Mid</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>
              </Field>

              <Field label="Remote policy" hint="Choose how candidates can work.">
                <select className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]">
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Salary min" hint="Recommended for U.S. candidates.">
                <input
                  placeholder="100000"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
                />
              </Field>

              <Field label="Salary max" hint="Give a real range when possible.">
                <input
                  placeholder="160000"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
                />
              </Field>
            </div>

            <Field label="Skills" hint="Comma-separated skills candidates should have.">
              <input
                placeholder="React, Next.js, TypeScript, Tailwind"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
              />
            </Field>

            <Field label="Description" hint="Responsibilities, expectations, and impact.">
              <textarea
                placeholder="Describe the role, responsibilities, team context, and what success looks like."
                className="w-full min-h-[180px] p-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
              />
            </Field>

            <div className="flex flex-wrap gap-2">
              <button className="h-11 px-6 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm hover:bg-[var(--brand-purple-dark)] transition shadow-sm">
                Save draft
              </button>
              <button className="h-11 px-6 rounded-2xl bg-[#0B1222] text-white font-semibold text-sm hover:bg-slate-900 transition shadow-sm">
                Publish job
              </button>
            </div>
          </div>
        </section>

        <div className="xl:col-span-4 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <div className="text-sm font-extrabold text-slate-900">Posting tips</div>
              <div className="mt-1 text-xs text-slate-600">
                Better listings attract better candidates.
              </div>
            </div>

            <div className="p-6 space-y-4">
              {[
                { title: "Use salary ranges", note: "Improves trust and conversion." },
                { title: "Keep titles standard", note: "Avoid vague internal names." },
                { title: "Be clear about remote", note: "Candidates filter by this heavily." },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-slate-200 bg-[#F4F6FB] p-4">
                  <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{x.note}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}