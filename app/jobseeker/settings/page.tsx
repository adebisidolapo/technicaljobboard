import ResumeUploader from "./ResumeUploader";

export const dynamic = "force-dynamic";

export default function JobseekerSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage your profile and resume.
        </p>
      </div>

      <ResumeUploader />
    </div>
  );
}