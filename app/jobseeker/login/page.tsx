"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function JobseekerLoginPage() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErr(error.message);
        return;
      }
      router.push("/jobseeker/overview");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Brand panel */}
          <div className="hidden lg:block">
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-10 shadow-sm overflow-hidden relative">
              <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[color:var(--brand-purple)/0.18] blur-3xl" />
              <div className="absolute -bottom-32 right-[-140px] h-[520px] w-[520px] rounded-full bg-[color:var(--brand-accent)/0.14] blur-3xl" />

              <div className="relative">
                <img
                  src="/Technicaljoblogo-removebg-preview.png"
                  alt="TechnicalJobBoard"
                  className="h-16 w-auto object-contain"
                />

                <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-slate-900">
                  Sign in to manage your job search
                </h1>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Save roles, track applications, and upload your resume for employers.
                </p>

                <ul className="mt-8 space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                    Save jobs & apply faster
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                    Track applications in one place
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                    Keep your resume up to date
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex">
            <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-slate-900">Jobseeker sign in</h2>
                <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                  Home
                </Link>
              </div>

              <p className="mt-2 text-sm text-slate-600">
                Use the email and password you registered with.
              </p>

              <div className="mt-7 space-y-4">
                <div>
                  <label className="text-xs font-extrabold text-slate-600">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.18]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-600">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.18]"
                    placeholder="••••••••"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSubmit();
                    }}
                  />
                </div>

                {err ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {err}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading}
                  className="w-full h-11 rounded-2xl bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white text-sm font-semibold transition disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <div className="text-sm text-slate-600">
                  Don’t have an account?{" "}
                  <Link href="/jobseeker/register" className="font-semibold text-[var(--brand-purple)] hover:underline">
                    Create one
                  </Link>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
                  By continuing, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-slate-700">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-slate-700">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}