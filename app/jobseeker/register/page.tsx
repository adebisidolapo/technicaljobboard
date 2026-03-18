"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";

export const dynamic = "force-dynamic";

const inputCls = "w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple)] focus:bg-white focus:ring-2 focus:ring-[var(--brand-purple)]/10";

export default function JobseekerRegisterPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    setMsg(null);
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          role: "JOBSEEKER",
          full_name: fullName.trim(),
        },
      },
    });
    setBusy(false);
    if (error) return setMsg(error.message);
    router.push("/jobseeker/overview");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F3F6FB] flex flex-col">

      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/">
          <img
            src="/Technicaljoblogo-removebg-preview.png"
            alt="TechnicalJobBoard"
            className="h-12 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Already have an account?</span>
          <Link href="/jobseeker/login" className="font-semibold text-[var(--brand-purple)] hover:underline">
            Sign in
          </Link>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <div className="hidden lg:flex flex-col rounded-3xl bg-gradient-to-br from-[var(--brand-purple)] to-indigo-700 p-10 text-white overflow-hidden relative">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              </div>
              <div className="relative flex flex-col h-full justify-between">
                <div>
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                    Job Seeker Portal
                  </span>
                  <h2 className="mt-6 text-3xl font-extrabold leading-tight">
                    Find your next technical role
                  </h2>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {[
                      { value: "12k+", label: "Active jobs" },
                      { value: "98%", label: "Tech roles" },
                      { value: "Free", label: "To apply" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center">
                        <p className="text-lg font-extrabold text-white">{s.value}</p>
                        <p className="text-[10px] text-white/50">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-5">
                  <p className="text-sm text-white/80 leading-6">
                    "Found my senior engineering role in less than a week."
                  </p>
                  <p className="mt-2 text-xs text-white/40">— Senior Frontend Engineer</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Create account
              </h1>
              <p className="mt-1 text-sm text-slate-400">Free. Start applying immediately.</p>

              <div className="mt-8 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">Full name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type="password"
                    className={inputCls}
                  />
                </div>

                {msg && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                    {msg}
                  </div>
                )}

                <button
                  type="button"
                  onClick={submit}
                  disabled={busy || !email.trim() || !password.trim()}
                  className="w-full h-12 rounded-xl bg-[var(--brand-purple)] text-sm font-extrabold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {busy ? "Creating account..." : "Create free account"}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 border-t border-slate-100" />
                  <span className="text-xs text-slate-300">or</span>
                  <div className="flex-1 border-t border-slate-100" />
                </div>

                <Link
                  href="/jobseeker/login"
                  className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Sign in instead
                </Link>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                By continuing you agree to our{" "}
                <Link href="/terms" className="underline">Terms</Link> and{" "}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
              </p>

              <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-400">
                Are you hiring?{" "}
                <Link href="/employer/register" className="font-semibold text-[var(--brand-purple)] hover:underline">
                  Create employer account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}