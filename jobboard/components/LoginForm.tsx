"use client";

import { useState } from "react";
import Link from "next/link";

type LoginFormProps = {
  role: "jobseeker" | "employer";
};

export default function LoginForm({ role }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isJobseeker = role === "jobseeker";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, role });
    alert("Login submitted (API will be connected later)");
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="px-6 pt-6 pb-5 border-b border-slate-100">
              {/* Brand */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold tracking-tight text-[#0B1222]">
                  Technical<span className="text-[var(--brand-purple)]">jobboard</span>.com
                </p>

                {/* Role badge */}
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    isJobseeker
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}
                >
                  {isJobseeker ? "Jobseeker" : "Employer"}
                </span>
              </div>

              {/* Headings */}
              <h1 className="mt-4 text-2xl font-extrabold text-[#0B1222]">
                Sign in
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                {isJobseeker
                  ? "Access job listings and track your applications"
                  : "Manage job postings and review candidates"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40 focus:border-[var(--brand-purple)]"
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
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40 focus:border-[var(--brand-purple)]"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between text-sm">
                <Link
                  href="#"
                  className="text-slate-600 hover:text-[var(--brand-purple)] transition"
                >
                  Forgot password?
                </Link>

                <Link
                  href={isJobseeker ? "/jobseeker/signup" : "/employer/signup"}
                  className="font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-purple-dark)] transition"
                >
                  Create account
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[var(--brand-purple)] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-purple-dark)] transition active:scale-[0.99]"
              >
                Sign in
              </button>
            </form>
          </div>

          {/* Switch role */}
          <p className="mt-6 text-center text-xs text-slate-500">
            {isJobseeker ? (
              <>
                Hiring talent?{" "}
                <Link
                  href="/employer/login"
                  className="font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-purple-dark)] transition"
                >
                  Employer sign in
                </Link>
              </>
            ) : (
              <>
                Looking for a job?{" "}
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
