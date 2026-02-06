"use client";

import { useState } from "react";
import Link from "next/link";

type LoginFormProps = {
  role: "jobseeker" | "employer";
};

export default function LoginForm({ role }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const heading = "Sign in";
  const subheading =
    role === "jobseeker"
      ? "Login for Jobseekers"
      : "Login for Employers";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hook API later
    console.log({ email, password, role });
    alert("Login submitted (API will be connected later)");
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="mx-auto w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Top */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100">
              <p className="text-xs font-semibold tracking-wide text-slate-500">
                Technicaljobboard.com
              </p>
              <h1 className="mt-2 text-2xl font-bold text-[#0B1222]">
                {heading}
              </h1>
              <p className="mt-1 text-sm text-slate-600">{subheading}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40 focus:border-[var(--brand-purple)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40 focus:border-[var(--brand-purple)]"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  href="#"
                  className="text-slate-600 hover:text-[var(--brand-purple)] transition"
                >
                  Forgot password?
                </Link>

                <span className="text-slate-500">
                  New here?{" "}
                  <Link
                    href={role === "jobseeker" ? "/jobseeker/signup" : "/employer/signup"}
                    className="font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-purple-dark)] transition"
                  >
                    Create account
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[var(--brand-purple)] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-purple-dark)] transition active:scale-[0.99]"
              >
                Sign in
              </button>

              {/* subtle helper line */}
              <p className="pt-1 text-xs text-slate-500">
                By continuing, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </div>

          {/* bottom hint */}
          <p className="mt-6 text-center text-xs text-slate-500">
            {role === "jobseeker" ? (
              <>
                Looking to hire?{" "}
                <Link
                  href="/employer/login"
                  className="font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-purple-dark)] transition"
                >
                  Employer sign in
                </Link>
              </>
            ) : (
              <>
                Looking for jobs?{" "}
                <Link
                  href="/jobseeker/login"
                  className="font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-purple-dark)] transition"
                >
                  Jobseeker sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
