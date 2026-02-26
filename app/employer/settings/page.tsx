export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-600">
          Company profile, team access, and notifications.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">Coming next</div>
        <p className="mt-1 text-sm text-slate-600">
          Add company details, logo upload, and recruiter permissions.
        </p>
      </div>
    </div>
  );
}