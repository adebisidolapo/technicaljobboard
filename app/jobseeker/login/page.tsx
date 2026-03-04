"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    await supabase.auth.signInWithPassword({ email, password });
    router.push("/jobseeker/overview");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F4F6FB]">
      {/* Left Branding */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-white border-r border-slate-200">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Find technical jobs faster
        </h1>

        <p className="mt-4 text-slate-600">
          Track applications, upload your resume and connect with
          employers looking for your skills.
        </p>
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Sign in
          </h2>

          <div className="mt-6 space-y-3">
            <input
              className="w-full h-11 border border-slate-200 rounded-xl px-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full h-11 border border-slate-200 rounded-xl px-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={login}
              className="w-full h-11 bg-[var(--brand-purple)] text-white rounded-xl font-semibold"
            >
              Sign In
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            New here?{" "}
            <Link
              href="/jobseeker/register"
              className="text-[var(--brand-purple)] font-semibold"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}