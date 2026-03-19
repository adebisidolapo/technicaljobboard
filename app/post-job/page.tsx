"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Plan = "free" | "featured" | "premium";
type PayType = "annual" | "hourly" | "daily" | "monthly";
type Screen = "form" | "preview" | "auth" | "checkout";

type FormData = {
  title: string;
  category: string;
  jobType: string;
  level: string;
  remote: string;
  payType: PayType;
  salaryMin: string;
  salaryMax: string;
  skills: string[];
  description: string;
  responsibilities: string;
  requirements: string;
  companyName: string;
  companyWebsite: string;
  companySize: string;
  companyIndustry: string;
  companyLocation: string;
  companyDescription: string;
  plan: Plan;
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const LEVELS = ["Entry", "Junior", "Mid-level", "Senior", "Lead", "Executive"];
const REMOTE_OPTIONS = ["Remote", "Hybrid", "On-site"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
const PAY_TYPES: { value: PayType; label: string; suffix: string }[] = [
  { value: "annual", label: "Annual", suffix: "/yr" },
  { value: "hourly", label: "Hourly", suffix: "/hr" },
  { value: "daily", label: "Daily", suffix: "/day" },
  { value: "monthly", label: "Monthly", suffix: "/mo" },
];
const CATEGORIES = [
  "Engineering",
  "Information Technology",
  "Data, AI & Cybersecurity",
  "Cloud & DevOps",
  "Architecture & Design",
  "Construction & Field Engineering",
  "Manufacturing & Industrial",
  "Energy & Utilities",
  "Telecom & Network Infrastructure",
  "Healthcare & Medical Technology",
  "Skilled Trades & Technical Services",
  "Science & Research",
  "Technical Project & Operations Management",
  "Product & Technical Support",
  "QA & Compliance",
];
const INDUSTRIES = [
  "Software & Technology",
  "Fintech",
  "Healthcare & Biotech",
  "Cybersecurity",
  "Cloud & Infrastructure",
  "Data & AI",
  "E-commerce",
  "Enterprise Software",
  "Agency",
  "Other",
];
const SUGGESTED_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "GraphQL",
  "Tailwind CSS",
  "Go",
  "Java",
  "Terraform",
  "C++",
];
const PLANS: {
  id: Plan;
  name: string;
  price: string;
  sub: string;
  features: string[];
  badge?: string;
}[] = [
  {
    id: "free",
    name: "Basic",
    price: "Free",
    sub: "No card needed",
    features: ["1 active listing", "Standard placement", "30-day duration", "Candidate applications"],
  },
  {
    id: "featured",
    name: "Featured",
    price: "$99",
    sub: "per listing",
    badge: "Most Popular",
    features: [
      "Featured badge on listing",
      "Priority search placement",
      "3x more visibility",
      "60-day duration",
      "Analytics dashboard",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$199",
    sub: "per listing",
    badge: "Best Value",
    features: [
      "Everything in Featured",
      "Homepage spotlight",
      "Email blast to matched candidates",
      "90-day duration",
      "Bulk CSV upload",
      "Dedicated support",
    ],
  },
];

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple)] focus:ring-2 focus:ring-[var(--brand-purple)]/10";
const textareaCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple)] focus:ring-2 focus:ring-[var(--brand-purple)]/10 resize-none";

function FL({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="mb-2 text-sm font-semibold text-slate-800">
      {children}
      {required && <span className="ml-0.5 text-red-400">*</span>}
    </p>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </section>
  );
}

function StepBar({ current }: { current: Screen }) {
  const steps: { id: Screen; label: string }[] = [
    { id: "form", label: "Details" },
    { id: "preview", label: "Preview" },
    { id: "auth", label: "Account" },
    { id: "checkout", label: "Payment" },
  ];
  const currentIdx = steps.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center gap-0">
      {steps.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;

        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={
                  "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-extrabold transition " +
                  (done
                    ? "bg-[var(--brand-purple)] text-white"
                    : active
                    ? "border-2 border-[var(--brand-purple)] bg-white text-[var(--brand-purple)]"
                    : "border-2 border-slate-200 bg-white text-slate-300")
                }
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={
                  "hidden text-[10px] font-semibold sm:block " +
                  (active ? "text-[var(--brand-purple)]" : done ? "text-slate-400" : "text-slate-300")
                }
              >
                {s.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={
                  "mx-1.5 mb-4 h-px w-8 sm:w-14 " +
                  (i < currentIdx ? "bg-[var(--brand-purple)]" : "bg-slate-200")
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function useScore(data: FormData) {
  return useMemo(() => {
    let s = 0;
    if (data.title.trim()) s += 20;
    if (data.category) s += 5;
    if (data.salaryMin && data.salaryMax) s += 15;
    if (data.skills.length >= 3) s += 15;
    if (data.description.trim().length > 80) s += 20;
    if (data.requirements.trim().length > 40) s += 10;
    if (data.companyName.trim()) s += 10;
    if (data.companyDescription.trim()) s += 5;
    return Math.min(s, 100);
  }, [data]);
}

function formatSalary(data: FormData) {
  const payType = PAY_TYPES.find((p) => p.value === data.payType) || PAY_TYPES[0];
  if (!data.salaryMin || !data.salaryMax) return null;
  return `$${Number(data.salaryMin).toLocaleString()} – $${Number(data.salaryMax).toLocaleString()}${payType.suffix}`;
}

function LivePreviewCard({ data }: { data: FormData }) {
  const salaryText = formatSalary(data);

  const responsibilityList = data.responsibilities
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 3);

  const requirementList = data.requirements
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-lg font-extrabold text-slate-900">Live Preview</h3>
        </div>

        <div className="bg-[linear-gradient(135deg,rgba(79,70,229,0.95),rgba(59,130,246,0.82))] px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Candidate view
          </p>
        </div>

        <div className="p-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {data.title || "Senior Frontend Engineer"}
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              {data.remote || "Remote"} • {data.jobType || "Full-Time"} • {data.level || "Mid-Level"}
            </p>

            <div className="my-4 border-t border-slate-100" />

            <p className="text-2xl font-extrabold text-slate-900">{salaryText || "$120k – $160k"}</p>

            <div className="my-4 border-t border-slate-100" />

            <p className="text-sm font-extrabold text-slate-900">Tech Stack:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(data.skills.length ? data.skills : ["React", "TypeScript", "Next.js", "AWS"]).slice(0, 5).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-[var(--brand-purple)]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="my-4 border-t border-slate-100" />

            <p className="text-sm leading-6 text-slate-500">
              {data.description.trim()
                ? data.description.trim().slice(0, 120) + (data.description.trim().length > 120 ? "..." : "")
                : "Key responsibilities and role summary will show here as you type."}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <h3 className="text-lg font-extrabold text-slate-900">Job Description</h3>

        <div className="mt-4 space-y-5">
          <div>
            <p className="text-sm font-extrabold text-slate-900">Overview</p>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              {data.description.trim()
                ? data.description.trim().slice(0, 220) + (data.description.trim().length > 220 ? "..." : "")
                : "Overview with team, impact, and what success looks like..."}
            </p>
          </div>

          <div>
            <p className="text-sm font-extrabold text-slate-900">Responsibilities</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {(responsibilityList.length
                ? responsibilityList
                : [
                    "Own and deliver key product features",
                    "Collaborate with design and product",
                    "Participate in code reviews",
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-extrabold text-slate-900">Requirements</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {(requirementList.length
                ? requirementList
                : ["3+ years experience", "Strong TypeScript knowledge", "Experience with cloud platforms"]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function PreviewScreen({
  data,
  onBack,
  onContinue,
}: {
  data: FormData;
  onBack: () => void;
  onContinue: () => void;
}) {
  const salaryText = formatSalary(data);

  const paragraphs = data.description
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const responsibilities = data.responsibilities
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const requirements = data.requirements
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Edit
          </button>
          <span className="text-sm font-extrabold text-slate-900">Preview listing</span>
        </div>
        <StepBar current="preview" />
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-purple)] text-[10px] font-extrabold text-white">
            P
          </span>
          <p className="text-xs font-semibold text-[var(--brand-purple)]">
            This is exactly how your job listing will appear to candidates.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-24 bg-[linear-gradient(135deg,rgba(79,70,229,0.98),rgba(37,99,235,0.85))]" />

          <div className="px-6 pb-6">
            <div className="-mt-8 flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white bg-white text-xl font-extrabold text-[var(--brand-purple)] shadow-sm">
                {(data.companyName || "C").charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 pt-8">
                <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {data.title || "Untitled position"}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  {data.companyName || "Your company"}
                  {data.companyLocation ? " • " + data.companyLocation : ""}
                  {data.remote ? " • " + data.remote : ""}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {data.jobType && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {data.jobType}
                </span>
              )}
              {data.level && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {data.level}
                </span>
              )}
              {data.remote && (
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-[var(--brand-purple)]">
                  {data.remote}
                </span>
              )}
              {data.category && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {data.category}
                </span>
              )}
              {salaryText && (
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {salaryText}
                </span>
              )}
            </div>

            {data.skills.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s) => (
                    <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="my-5 border-t border-slate-100" />

            {paragraphs.length > 0 && (
              <div className="mb-5">
                <h2 className="mb-3 text-sm font-extrabold text-slate-900">Job Description</h2>
                <div className="space-y-3">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-7 text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {responsibilities.length > 0 && (
              <div className="mb-5">
                <h2 className="mb-3 text-sm font-extrabold text-slate-900">Responsibilities</h2>
                <ul className="space-y-2">
                  {responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-purple)]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {requirements.length > 0 && (
              <div className="mb-5">
                <h2 className="mb-3 text-sm font-extrabold text-slate-900">Requirements</h2>
                <ul className="space-y-2">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.companyName && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="mb-2 text-sm font-extrabold text-slate-900">About {data.companyName}</h2>
                {data.companyIndustry && (
                  <p className="mb-1 text-xs text-slate-400">
                    {data.companyIndustry}
                    {data.companySize ? " • " + data.companySize + " employees" : ""}
                  </p>
                )}
                {data.companyDescription && (
                  <p className="text-sm leading-6 text-slate-600">{data.companyDescription}</p>
                )}
                {data.companyWebsite && (
                  <p className="mt-2 text-xs font-semibold text-[var(--brand-purple)]">{data.companyWebsite}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-extrabold text-slate-900">Looks good?</p>
            <p className="text-xs text-slate-400">Next you’ll create an employer account or sign in.</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Edit listing
            </button>
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-5 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthScreen({
  data,
  onBack,
  onAuthed,
}: {
  data: FormData;
  onBack: () => void;
  onAuthed: () => void;
}) {
  const [mode, setMode] = useState<"signin" | "register">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  function handleSubmit() {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      onAuthed();
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Back
          </button>
          <span className="text-sm font-extrabold text-slate-900">Account</span>
        </div>
        <StepBar current="auth" />
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#0C1120] p-6 text-white shadow-[0_16px_40px_rgba(15,23,42,0.20)]">
            <h2 className="text-xl font-extrabold leading-tight">Your job is ready to go live</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Create an employer account or sign in to continue to pricing and payment.
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-extrabold text-white">{data.title || "Untitled position"}</p>
              <p className="mt-0.5 text-xs text-white/50">
                {data.companyName || "Your company"} • {data.remote}
              </p>
              {data.salaryMin && data.salaryMax && (
                <p className="mt-2 text-sm font-extrabold text-emerald-400">
                  ${Number(data.salaryMin).toLocaleString()} — ${Number(data.salaryMax).toLocaleString()}
                </p>
              )}
            </div>

            <ul className="mt-5 space-y-2.5">
              {[
                "Create account in under 1 minute",
                "Manage job applications in one place",
                "Edit listings anytime",
                "Continue to secure payment after this step",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[9px] font-extrabold text-emerald-400">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex rounded-xl border border-slate-200 bg-slate-50 p-1">
              {(["register", "signin"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={
                    "flex-1 rounded-lg py-2 text-xs font-extrabold transition " +
                    (mode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600")
                  }
                >
                  {m === "register" ? "Create account" : "Sign in"}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {mode === "register" && (
                <div>
                  <FL>Full name</FL>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
                </div>
              )}

              <div>
                <FL required>Work email</FL>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  type="email"
                  className={inputCls}
                />
              </div>

              <div>
                <FL required>Password</FL>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "register" ? "Min 8 characters" : "Your password"}
                  type="password"
                  className={inputCls}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={busy || !email.trim() || !password.trim()}
                className="w-full rounded-xl bg-[var(--brand-purple)] py-3 text-sm font-extrabold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {busy ? "Please wait..." : mode === "register" ? "Create account and continue" : "Sign in and continue"}
              </button>

              <p className="text-center text-xs text-slate-400">
                By continuing you agree to our{" "}
                <Link href="/terms" className="underline hover:text-slate-700">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-slate-700">
                  Privacy
                </Link>
              </p>

              <p className="text-center text-xs text-slate-400">
                Existing customers can just sign in and continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutScreen({
  data,
  set,
  onBack,
  onPublish,
  submitting,
}: {
  data: FormData;
  set: (d: Partial<FormData>) => void;
  onBack: () => void;
  onPublish: () => void;
  submitting: boolean;
}) {
  const selectedPlan = PLANS.find((p) => p.id === data.plan) || PLANS[1];

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Back
          </button>
          <span className="text-sm font-extrabold text-slate-900">Choose a plan</span>
        </div>
        <StepBar current="checkout" />
      </header>

      <div className="mx-auto max-w-4xl space-y-5 px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Your listing</p>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-extrabold text-[var(--brand-purple)]">
              {(data.companyName || "C").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">{data.title || "Untitled"}</p>
              <p className="text-xs text-slate-400">
                {data.companyName} • {data.remote} • {data.category}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0C1120] p-5 sm:p-6">
          <h2 className="mb-4 text-base font-extrabold text-white">Select your plan</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => set({ plan: p.id })}
                className={
                  "relative flex flex-col rounded-xl p-4 text-left transition-all " +
                  (data.plan === p.id
                    ? "bg-white ring-2 ring-[var(--brand-purple)] shadow-lg"
                    : "border border-white/10 bg-white/10 hover:bg-white/15")
                }
              >
                {p.badge && (
                  <span className="absolute -top-2.5 left-4 rounded-full bg-[var(--brand-purple)] px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                    {p.badge}
                  </span>
                )}

                {data.plan === p.id && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-purple)] text-[10px] text-white">
                    ✓
                  </span>
                )}

                <p
                  className={
                    "mb-1 text-[10px] font-extrabold uppercase tracking-widest " +
                    (data.plan === p.id ? "text-[var(--brand-purple)]" : "text-white/40")
                  }
                >
                  {p.name}
                </p>

                <p className={"mb-0.5 text-xl font-extrabold " + (data.plan === p.id ? "text-slate-900" : "text-white")}>
                  {p.price}
                </p>

                <p className={"mb-3 text-xs " + (data.plan === p.id ? "text-slate-400" : "text-white/40")}>{p.sub}</p>

                <ul className="space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[11px]">
                      <span
                        className={
                          "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] " +
                          (data.plan === p.id
                            ? "bg-[var(--brand-purple)]/10 text-[var(--brand-purple)]"
                            : "bg-white/10 text-white/50")
                        }
                      >
                        ✓
                      </span>
                      <span className={data.plan === p.id ? "text-slate-600" : "text-white/50"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Secure checkout", "Goes live instantly", "Cancel anytime"].map((t) => (
              <p key={t} className="text-xs text-white/40">
                {t}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-sm font-extrabold text-slate-900">Order summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{selectedPlan.name} listing</span>
              <span className="font-semibold">{selectedPlan.price}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 font-extrabold">
              <span>Total due today</span>
              <span className="text-[var(--brand-purple)]">{selectedPlan.price}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onPublish}
          disabled={submitting}
          className="w-full rounded-2xl bg-[var(--brand-purple)] py-4 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Publishing..." : data.plan === "free" ? "Publish for free" : "Continue to payment — " + selectedPlan.price}
        </button>

        <p className="text-center text-xs text-slate-400">
          {data.plan === "free" ? "Your job goes live immediately." : "You’ll be taken to secure payment next."}
        </p>
      </div>
    </div>
  );
}

export default function PublicPostJobPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("form");
  const [skillInput, setSkillInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [data, setDataState] = useState<FormData>({
    title: "",
    category: "",
    jobType: "Full-time",
    level: "Mid-level",
    remote: "Remote",
    payType: "annual",
    salaryMin: "",
    salaryMax: "",
    skills: [],
    description: "",
    responsibilities: "",
    requirements: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    companyIndustry: "",
    companyLocation: "",
    companyDescription: "",
    plan: "featured",
  });

  function set(partial: Partial<FormData>) {
    setDataState((prev) => ({ ...prev, ...partial }));
  }

  function addSkill(s: string) {
    const v = s.trim();
    if (!v || data.skills.includes(v) || data.skills.length >= 10) return;
    set({ skills: [...data.skills, v] });
    setSkillInput("");
  }

  function removeSkill(s: string) {
    set({ skills: data.skills.filter((x) => x !== s) });
  }

  const score = useScore(data);
  const payType = PAY_TYPES.find((p) => p.value === data.payType) || PAY_TYPES[0];

  const canContinue =
    data.title.trim().length > 0 &&
    data.description.trim().length > 50 &&
    data.companyName.trim().length > 0;

  async function handlePublish() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    router.push("/employer/login");
  }

  if (screen === "preview") {
    return <PreviewScreen data={data} onBack={() => setScreen("form")} onContinue={() => setScreen("auth")} />;
  }

  if (screen === "auth") {
    return <AuthScreen data={data} onBack={() => setScreen("preview")} onAuthed={() => setScreen("checkout")} />;
  }

  if (screen === "checkout") {
    return (
      <CheckoutScreen
        data={data}
        set={set}
        onBack={() => setScreen("auth")}
        onPublish={handlePublish}
        submitting={submitting}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] pb-28">
      <div className="bg-[linear-gradient(135deg,rgba(79,70,229,0.98),rgba(37,99,235,0.92))] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                Post your job in 2 minutes
              </h1>
              <p className="mt-1 text-sm text-indigo-100 sm:text-lg">
                Get qualified engineers in 24–48 hours
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-indigo-100">
              <span>✓ 500+ companies hiring</span>
              <span>⚡ Avg. 12 applicants per post</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="flex-1">
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--brand-purple)] transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <p className="shrink-0 text-sm font-extrabold text-[var(--brand-purple)]">{score}% complete</p>
        </div>
      </div>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Home
          </Link>
          <span className="text-sm font-semibold text-slate-400">Post a Job</span>
        </div>
        <StepBar current="form" />
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.95fr)] lg:items-start">
        <div className="space-y-5">
          <Section title="Job Details">
            <div>
              <FL required>Job Title</FL>
              <input
                value={data.title}
                onChange={(e) => set({ title: e.target.value })}
                placeholder="e.g. Senior Frontend Engineer"
                className={inputCls}
              />
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-semibold text-[var(--brand-purple)]">Tip:</span> Specific titles usually attract better applicants.
              </p>
            </div>
          </Section>

          <Section title="Job Basics">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <FL required>Category</FL>
                <select value={data.category} onChange={(e) => set({ category: e.target.value })} className={inputCls}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <FL required>Job Type</FL>
                <select value={data.jobType} onChange={(e) => set({ jobType: e.target.value })} className={inputCls}>
                  {JOB_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <FL required>Level</FL>
                <select value={data.level} onChange={(e) => set({ level: e.target.value })} className={inputCls}>
                  {LEVELS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <FL required>Work Policy</FL>
                <select value={data.remote} onChange={(e) => set({ remote: e.target.value })} className={inputCls}>
                  {REMOTE_OPTIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          <Section title="Compensation">
            <div>
              <FL>Pay structure</FL>
              <div className="flex flex-wrap gap-2">
                {PAY_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => set({ payType: pt.value })}
                    className={
                      "rounded-xl border px-4 py-2 text-sm font-semibold transition " +
                      (data.payType === pt.value
                        ? "border-[var(--brand-purple)] bg-[var(--brand-purple)] text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300")
                    }
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <FL>Salary range</FL>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                  <input
                    type="number"
                    value={data.salaryMin}
                    onChange={(e) => set({ salaryMin: e.target.value })}
                    placeholder="120000"
                    className={inputCls + " pl-7"}
                  />
                </div>
                <span className="text-sm text-slate-400">to</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                  <input
                    type="number"
                    value={data.salaryMax}
                    onChange={(e) => set({ salaryMax: e.target.value })}
                    placeholder="160000"
                    className={inputCls + " pl-7"}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400">{payType.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">Jobs with salary ranges usually perform better.</p>
            </div>
          </Section>

          <Section title="Skills">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-purple)]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[10px] text-slate-400 hover:bg-red-50 hover:text-red-400"
                    >
                      x
                    </button>
                  </span>
                ))}

                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  placeholder={data.skills.length < 10 ? "Add skill, press Enter" : "Max 10"}
                  disabled={data.skills.length >= 10}
                  className="min-w-[140px] flex-1 rounded-full border border-dashed border-slate-300 bg-white px-3 py-2 text-xs outline-none placeholder:text-slate-400 focus:border-[var(--brand-purple)] disabled:opacity-50"
                />
              </div>

              {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s)).length > 0 && (
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Suggested</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s))
                      .slice(0, 8)
                      .map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => addSkill(s)}
                          className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 transition hover:border-[var(--brand-purple)] hover:text-[var(--brand-purple)]"
                        >
                          + {s}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          <Section title="Job Description">
            <div>
              <FL required>Overview</FL>
              <textarea
                value={data.description}
                onChange={(e) => set({ description: e.target.value })}
                rows={5}
                placeholder="Describe the role, team, impact, and what success looks like..."
                className={textareaCls}
              />
            </div>

            <div>
              <FL>Responsibilities</FL>
              <textarea
                value={data.responsibilities}
                onChange={(e) => set({ responsibilities: e.target.value })}
                rows={4}
                placeholder={"Own and deliver key features\nCollaborate with design and product\nParticipate in code reviews"}
                className={textareaCls}
              />
            </div>

            <div>
              <FL>Requirements</FL>
              <textarea
                value={data.requirements}
                onChange={(e) => set({ requirements: e.target.value })}
                rows={4}
                placeholder={"3+ years of relevant experience\nStrong TypeScript knowledge\nCloud platform experience"}
                className={textareaCls}
              />
            </div>
          </Section>

          <Section title="Company">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FL required>Company name</FL>
                <input
                  value={data.companyName}
                  onChange={(e) => set({ companyName: e.target.value })}
                  placeholder="Acme Corp"
                  className={inputCls}
                />
              </div>
              <div>
                <FL>Website</FL>
                <input
                  value={data.companyWebsite}
                  onChange={(e) => set({ companyWebsite: e.target.value })}
                  placeholder="https://acme.com"
                  type="url"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FL>Industry</FL>
                <select value={data.companyIndustry} onChange={(e) => set({ companyIndustry: e.target.value })} className={inputCls}>
                  <option value="">Select industry</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div>
                <FL>Company size</FL>
                <select value={data.companySize} onChange={(e) => set({ companySize: e.target.value })} className={inputCls}>
                  <option value="">Select size</option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s}>{s} employees</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <FL>Location</FL>
              <input
                value={data.companyLocation}
                onChange={(e) => set({ companyLocation: e.target.value })}
                placeholder="Austin, TX or Remote"
                className={inputCls}
              />
            </div>

            <div>
              <FL>About the company</FL>
              <textarea
                value={data.companyDescription}
                onChange={(e) => set({ companyDescription: e.target.value })}
                rows={3}
                placeholder="What does your company do and why is it a great place to work?"
                className={textareaCls}
              />
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-[88px]">
          <LivePreviewCard data={data} />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-sm sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-extrabold text-slate-900">
              {canContinue ? "Ready to preview your listing?" : "Fill in required fields to continue"}
            </p>
            <p className="text-xs text-slate-400">
              Step 1 of 4 • {score}% complete
              {!canContinue && " — title, description, and company name required"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setScreen("preview")}
            disabled={!canContinue}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand-purple)] px-6 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}