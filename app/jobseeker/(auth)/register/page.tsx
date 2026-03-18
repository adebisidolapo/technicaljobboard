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
    <div className="flex min-h-[calc(100vh-136px)] items-center justify-center bg-[#F3F6FB] px-4 py-12 sm:px-6 md:min-h-[calc(100vh-112px)]">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Create account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Free. Start applying immediately.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-4">

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Full name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Password
              </label>
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
            <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Are you hiring?{" "}
          <Link
            href="/employer/register"
            className="font-semibold text-[var(--brand-purple)] hover:underline"
          >
            Create employer account
          </Link>
        </p>
      </div>
    </div>
  );
}