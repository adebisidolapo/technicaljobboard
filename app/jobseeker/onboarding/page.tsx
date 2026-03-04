"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function JobseekerOnboardingPage() {
  const router = useRouter();

  // Replace these with your Supabase session user values
  const [userId, setUserId] = useState(""); // supabase user.id
  const [email, setEmail] = useState(""); // supabase user.email

  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const input =
    "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200";

  async function submit() {
    if (!userId) {
      setStatus("error");
      setMessage("Missing user session. Please login again.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/jobseeker/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, fullName, headline, location }),
      });

      const data = await res.json();
      if (!res.ok || data?.ok === false) throw new Error(data?.error || "Failed");

      router.push("/jobseeker/overview");
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.message || "Something went wrong.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F4F6FB]">
      <div className="max-w-xl mx-auto px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-b from-[color:var(--brand-purple)/0.10] to-white">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Jobseeker profile setup
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Set your basics — you can edit anytime.
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-extrabold text-slate-600">Full name</label>
              <input className={input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-600">Headline</label>
              <input className={input} value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Frontend Engineer • React/Next.js" />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-600">Location</label>
              <input className={input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Remote • United States" />
            </div>

            {message && (
              <div className="text-sm font-semibold text-rose-600">{message}</div>
            )}

            <button
              type="button"
              onClick={submit}
              disabled={status === "loading"}
              className="h-11 w-full rounded-2xl bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white font-extrabold text-sm transition disabled:opacity-60"
            >
              {status === "loading" ? "Saving…" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}