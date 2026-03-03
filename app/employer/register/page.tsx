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
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#F4F6FB]">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Create employer account
        </h1>
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

          <div className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/employer/login" className="font-semibold text-[var(--brand-purple)] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}