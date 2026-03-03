import Link from "next/link";

export const dynamic = "force-dynamic";

export default function JobseekerRegisterPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Create jobseeker account
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Placeholder page. We’ll connect signup + Supabase next.
        </p>

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            className="h-11 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold hover:bg-[var(--brand-purple-dark)] transition shadow-sm"
          >
            Create account
          </button>

          <Link
            href="/jobseeker/login"
            className="h-11 rounded-2xl border border-slate-200 bg-white text-slate-900 font-semibold inline-flex items-center justify-center hover:bg-slate-50 transition"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}