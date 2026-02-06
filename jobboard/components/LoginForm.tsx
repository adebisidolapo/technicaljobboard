"use client";

import { useState } from "react";

type LoginFormProps = {
  role: "jobseeker" | "employer";
};

export default function LoginForm({ role }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const title =
    role === "jobseeker"
      ? "Login for Jobseekers"
      : "Login for Employers";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For now, just log to console
    console.log({ email, password, role });

    alert("Login submitted (API will be connected later)");
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
      <h1 className="text-2xl font-bold text-gray-900">
        Sign in to Technicaljobboard.com
      </h1>

      <p className="mt-1 text-sm text-gray-600">{title}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--brand-purple)] py-2.5 text-white font-semibold hover:bg-[var(--brand-purple-dark)] transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
