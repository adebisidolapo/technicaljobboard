export const dynamic = "force-dynamic";

export default function JobseekerSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Profile Settings</h1>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <div className="text-sm font-extrabold">Full name</div>
          <input className="mt-2 w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm" />
        </div>

        <div>
          <div className="text-sm font-extrabold">Location</div>
          <input className="mt-2 w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm" />
        </div>

        <div>
          <div className="text-sm font-extrabold">Resume URL</div>
          <input className="mt-2 w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm" />
        </div>

        <button className="h-11 px-6 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm hover:bg-[var(--brand-purple-dark)] transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}