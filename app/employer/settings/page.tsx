import Link from "next/link";

export const dynamic = "force-dynamic";

function Field({
  label,
  hint,
  placeholder,
}: {
  label: string;
  hint: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="text-sm font-extrabold text-slate-900">{label}</div>
        <div className="text-xs text-slate-600">{hint}</div>
      </div>
      <input
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
      />
    </div>
  );
}

export default function EmployerSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Company Settings
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage your company or agency profile, branding, and hiring preferences.
          </p>
        </div>

        <Link
          href="/employer/overview"
          className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
        >
          Back to overview
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <section className="xl:col-span-8 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="text-sm font-extrabold text-slate-900">Company profile</div>
            <div className="mt-1 text-xs text-slate-600">
              This appears on your jobs and employer-facing pages.
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Company / Agency name"
                hint="Shown publicly on job posts."
                placeholder="e.g. NovaTech"
              />
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">Account type</div>
                  <div className="text-xs text-slate-600">
                    Choose the type that matches your hiring model.
                  </div>
                </div>
                <select className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]">
                  <option>Company</option>
                  <option>Agency</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Website"
                hint="Optional but recommended."
                placeholder="https://example.com"
              />
              <Field
                label="Industry"
                hint="What sector do you hire in?"
                placeholder="Software, Healthcare, Fintech..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Headquarters"
                hint="City / State (U.S.)."
                placeholder="San Francisco, CA"
              />
              <Field
                label="Company size"
                hint="Approximate team size."
                placeholder="11–50 employees"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-extrabold text-slate-900">About</div>
              <div className="text-xs text-slate-600">
                Keep it short, clear, and hiring-focused.
              </div>
              <textarea
                placeholder="Tell candidates what you build, why it matters, and what your team values."
                className="w-full min-h-[120px] p-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="h-11 px-6 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm hover:bg-[var(--brand-purple-dark)] transition shadow-sm">
                Save changes
              </button>
              <button className="h-11 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </section>

        <div className="xl:col-span-4 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <div className="text-sm font-extrabold text-slate-900">Hiring preferences</div>
              <div className="mt-1 text-xs text-slate-600">
                Helps candidates understand your process.
              </div>
            </div>

            <div className="p-6 space-y-4">
              {[
                { title: "Response time", note: "Aim for 48 hours for top candidates." },
                { title: "Salary transparency", note: "U.S. market strongly prefers salary ranges." },
                { title: "Remote policy", note: "Remote / hybrid / on-site — keep it consistent." },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-slate-200 bg-[#F4F6FB] p-4">
                  <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{x.note}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <div className="text-sm font-extrabold text-slate-900">Security</div>
              <div className="mt-1 text-xs text-slate-600">Account actions</div>
            </div>

            <div className="p-6 space-y-2">
              <button className="h-11 w-full rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition">
                Change password
              </button>
              <button className="h-11 w-full rounded-2xl bg-white border border-red-200 text-red-700 font-semibold text-sm hover:bg-red-50 transition">
                Sign out
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}