"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Company = { id: string; name: string; type: "COMPANY" | "AGENCY" };

export const dynamic = "force-dynamic";

export default function EmployerOnboardingPage() {
  const router = useRouter();

  // You MUST set these from your current Supabase session in your app.
  // If you already have a way you expose them, replace these two lines.
  const [userId, setUserId] = useState(""); // supabase user.id
  const [email, setEmail] = useState(""); // supabase user.email

  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState<"COMPANY" | "AGENCY">("COMPANY");

  const [fullName, setFullName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // OPTIONAL: If you already have a companies endpoint, use it.
    // If not, skip — onboarding still works by creating companyName.
    (async () => {
      try {
        const res = await fetch("/api/public/companies", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data?.ok) setCompanies(data.items || []);
      } catch {}
    })();
  }, []);

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
      const res = await fetch("/api/employer/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email,
          fullName,
          roleTitle,
          companyId: companyId || undefined,
          companyName: companyId ? undefined : companyName,
          companyType,
        }),
      });

      const data = await res.json();
      if (!res.ok || data?.ok === false) throw new Error(data?.error || "Failed");

      router.push("/employer/overview");
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
              Employer profile setup
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Create or select your company/agency to continue.
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-extrabold text-slate-600">Your name</label>
              <input className={input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-600">Role (optional)</label>
              <input className={input} value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} placeholder="Recruiter, HR, Talent lead…" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-extrabold text-slate-600">Account type</label>
                <select className={input} value={companyType} onChange={(e) => setCompanyType(e.target.value as any)}>
                  <option value="COMPANY">Company</option>
                  <option value="AGENCY">Agency</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-600">Select existing (optional)</label>
                <select className={input} value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
                  <option value="">— Create new —</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!companyId && (
              <div>
                <label className="text-xs font-extrabold text-slate-600">Company / Agency name</label>
                <input
                  className={input}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Northwind Labs"
                />
              </div>
            )}

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