"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";

export const dynamic = "force-dynamic";

const inputCls = "w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple)] focus:bg-white focus:ring-2 focus:ring-[var(--brand-purple)]/10";

export default function EmployerRegisterPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
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
          role: "EMPLOYER",
          full_name: fullName.trim(),
          company_name: companyName.trim(),
        },
      },
    });
    setBusy(false);
    if (error) return setMsg(error.message);
    router.push("/employer/overview");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-136px)] items-center justify-center bg-[#F3F6FB] px-4 py-10 sm:px-6 md:min-h-[calc(100vh-112px)]">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">

          {/* Left card — desktop only */}
          <div className="hidden lg:flex flex-col justify-between rounded-3xl bg-[#0C1120] p-10 text-white overflow-hidden relative min-h-[520px]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[var(--brand-purple)]/20 blur-3xl" />
              <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />
            </div>
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
                Employer Portal
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight">
                Start hiring technical talent
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/50">
                Post your first job and start receiving qualified applications.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { value: "500+", label: "Companies" },
                  { value: "12k+", label: "Candidates" },
                  { value: "24h", label: "Avg. response" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                    <p className="text-lg font-extrabold text-white">{s.value}</p>
                    <p className="text-[10px] text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/70 leading-6">
                "Hired 3 engineers in under 2 weeks."
              </p>
              <p className="mt-2 text-xs text-white/30">— Engineering Manager, NovaTech</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Create employer account
            </h1>
            <p className="mt-1 text-sm text-slate-400">Free to start. Post your first job in minutes.</p>

            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">Company</label>
                  <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Corp"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Work email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
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
                {busy ? "Creating account..." : "Create account"}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-slate-100" />
                <span className="text-xs text-slate-300">or</span>
                <div className="flex-1 border-t border-slate-100" />
              </div>

              <Link
                href="/employer/login"
                className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Sign in instead
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              By continuing you agree to our{" "}
              <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-400">
              Looking for jobs?{" "}
              <Link href="/jobseeker/register" className="font-semibold text-[var(--brand-purple)] hover:underline">
                Create jobseeker account
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}