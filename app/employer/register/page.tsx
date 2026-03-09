"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";

export const dynamic = "force-dynamic";

export default function EmployerRegisterPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

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
        data: { role: "EMPLOYER" },
      },
    });

    setBusy(false);
    if (error) return setMsg(error.message);

    router.push("/employer/overview");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="hidden lg:block">
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-10 shadow-sm overflow-hidden relative">
              <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[color:var(--brand-purple)/0.16] blur-3xl" />
              <div className="absolute -bottom-32 right-[-140px] h-[520px] w-[520px] rounded-full bg-[color:var(--brand-accent)/0.12] blur-3xl" />

              <div className="relative">
                <img
                  src="/Technicaljoblogo-removebg-preview.png"
                  alt="TechnicalJobBoard"
                  className="h-16 w-auto object-contain"
                />

                <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-slate-900">
                  Create your employer account
                </h1>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Build your company profile, post roles, and manage your hiring workflow.
                </p>

                <div className="mt-8 space-y-3 text-sm text-slate-700">
                  <div>Company or agency dashboard</div>
                  <div>Post and manage roles anytime</div>
                  <div>Review candidates and resumes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Create employer account
                </h1>
                <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                  Home
                </Link>
              </div>

              <p className="mt-2 text-sm text-slate-600">
                Post jobs and search candidates.
              </p>

              <div className="mt-6 grid gap-3">
                <input
                  className="h-11 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="h-11 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)/0.25]"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  disabled={busy}
                  onClick={submit}
                  className="h-11 rounded-2xl bg-[#0B1222] text-white font-semibold hover:bg-slate-900 transition shadow-sm disabled:opacity-60"
                >
                  {busy ? "Creating..." : "Create account"}
                </button>

                {msg && <div className="text-sm text-rose-600">{msg}</div>}

                <div className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link href="/employer/login" className="font-semibold text-[var(--brand-purple)] hover:underline">
                    Sign in
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