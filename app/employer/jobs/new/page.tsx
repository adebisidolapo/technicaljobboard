"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────
type Plan = "free" | "featured" | "premium";

type FormData = {
  // Step 1 — Plan
  plan: Plan;

  // Step 2 — Job details
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  jobType: string;
  level: string;
  remote: string;
  salaryMin: string;
  salaryMax: string;
  skills: string[];

  // Step 3 — Company
  companyName: string;
  companyWebsite: string;
  companySize: string;
  companyIndustry: string;
  companyLocation: string;
  companyDescription: string;
};

// ── Constants ──────────────────────────────────────────────────────────────
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const LEVELS = ["Entry", "Junior", "Mid-level", "Senior", "Lead", "Executive"];
const REMOTE_OPTIONS = ["Remote", "Hybrid", "On-site"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
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
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "AWS", "Docker", "Kubernetes", "PostgreSQL", "GraphQL",
  "Tailwind CSS", "Go", "Rust", "Java", "C++",
];

const PLANS: {
  id: Plan;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  highlight: boolean;
  badge?: string;
}[] = [
  {
    id: "free",
    name: "Basic",
    price: "Free",
    priceNote: "No credit card needed",
    description: "Get started and post your first role.",
    highlight: false,
    features: [
      "1 active job listing",
      "Standard visibility",
      "Candidate applications",
      "Basic dashboard access",
      "30-day listing duration",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    price: "$99",
    priceNote: "per job posting",
    description: "Stand out with a highlighted listing.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Featured badge on listing",
      "Priority placement in search",
      "3x more visibility",
      "60-day listing duration",
      "Candidate matching alerts",
      "Analytics dashboard",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$199",
    priceNote: "per job posting",
    description: "Maximum reach for high-priority roles.",
    highlight: false,
    badge: "Best Value",
    features: [
      "Everything in Featured",
      "Homepage spotlight placement",
      "Email blast to matched candidates",
      "90-day listing duration",
      "Dedicated support",
      "Bulk upload (CSV)",
      "Priority candidate review",
    ],
  },
];

const STEPS = [
  { id: 1, label: "Choose Plan" },
  { id: 2, label: "Job Details" },
  { id: 3, label: "Company" },
  { id: 4, label: "Review" },
];

// ── Helper components ──────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold transition-all " +
                  (done
                    ? "bg-[var(--brand-purple)] text-white"
                    : active
                    ? "border-2 border-[var(--brand-purple)] bg-white text-[var(--brand-purple)]"
                    : "border-2 border-slate-200 bg-white text-slate-400")
                }
              >
                {done ? (
                  <svg viewBox="0 0 12 12" className="h-4 w-4" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={
                  "hidden text-[10px] font-semibold sm:block " +
                  (active ? "text-[var(--brand-purple)]" : done ? "text-slate-500" : "text-slate-300")
                }
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={
                  "mx-2 mb-4 h-0.5 w-10 sm:w-16 transition-all " +
                  (current > step.id ? "bg-[var(--brand-purple)]" : "bg-slate-200")
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
      {children}
      {required && <span className="ml-1 text-red-400">*</span>}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-slate-400">{children}</p>;
}

const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple)] focus:ring-2 focus:ring-[var(--brand-purple)]/10";
const textareaCls = inputCls + " resize-none leading-6";

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
        {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
      </div>
      {children}
    </div>
  );
}

// ── Step 1: Plan Selection ─────────────────────────────────────────────────
function StepPlan({ plan, setPlan }: { plan: Plan; setPlan: (p: Plan) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Choose your listing plan</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select the plan that best fits your hiring needs. You can always upgrade later.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PLANS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlan(p.id)}
            className={
              "relative flex flex-col rounded-2xl border-2 p-5 text-left transition-all " +
              (plan === p.id
                ? "border-[var(--brand-purple)] bg-indigo-50/50 shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm")
            }
          >
            {p.badge && (
              <span className="absolute -top-3 left-4 rounded-full bg-[var(--brand-purple)] px-3 py-0.5 text-[10px] font-extrabold text-white">
                {p.badge}
              </span>
            )}

            {plan === p.id && (
              <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-purple)]">
                <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}

            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {p.name}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">
                {p.price}
              </p>
              <p className="text-xs text-slate-400">{p.priceNote}</p>
            </div>

            <p className="mb-4 text-xs text-slate-500">{p.description}</p>

            <ul className="space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-extrabold text-emerald-600">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
        {[
          { icon: "🔒", text: "Secure checkout via Stripe" },
          { icon: "↩️", text: "Cancel anytime" },
          { icon: "⚡", text: "Go live in minutes" },
          { icon: "📊", text: "Real-time analytics" },
        ].map((b) => (
          <div key={b.text} className="flex items-center gap-2 text-xs text-slate-500">
            <span>{b.icon}</span>
            <span>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 2: Job Details ────────────────────────────────────────────────────
function StepJobDetails({
  data,
  setData,
}: {
  data: FormData;
  setData: (d: Partial<FormData>) => void;
}) {
  const [skillInput, setSkillInput] = useState("");

  function addSkill(skill: string) {
    const v = skill.trim();
    if (!v || data.skills.includes(v) || data.skills.length >= 10) return;
    setData({ skills: [...data.skills, v] });
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setData({ skills: data.skills.filter((s) => s !== skill) });
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Job details</h2>
        <p className="mt-1 text-sm text-slate-500">
          Clear, specific details attract better candidates. Be honest about the role.
        </p>
      </div>

      {/* Role basics */}
      <SectionCard title="Role basics" description="The essentials every candidate needs to see first.">
        <div className="space-y-4">
          <div>
            <Label required>Job title</Label>
            <input
              value={data.title}
              onChange={(e) => setData({ title: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
              className={inputCls}
            />
            <Hint>Use a standard, searchable title. Avoid internal jargon.</Hint>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label required>Job type</Label>
              <select value={data.jobType} onChange={(e) => setData({ jobType: e.target.value })} className={inputCls}>
                {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <Label required>Level</Label>
              <select value={data.level} onChange={(e) => setData({ level: e.target.value })} className={inputCls}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <Label required>Work policy</Label>
              <select value={data.remote} onChange={(e) => setData({ remote: e.target.value })} className={inputCls}>
                {REMOTE_OPTIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Compensation */}
      <SectionCard title="Compensation" description="Salary transparency increases application quality by up to 3x.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Minimum salary (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input
                type="number"
                value={data.salaryMin}
                onChange={(e) => setData({ salaryMin: e.target.value })}
                placeholder="100,000"
                className={inputCls + " pl-7"}
              />
            </div>
          </div>
          <div>
            <Label>Maximum salary (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input
                type="number"
                value={data.salaryMax}
                onChange={(e) => setData({ salaryMax: e.target.value })}
                placeholder="160,000"
                className={inputCls + " pl-7"}
              />
            </div>
          </div>
        </div>

        {data.salaryMin && data.salaryMax && (
          <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <p className="text-xs font-semibold text-[var(--brand-purple)]">
              Salary range: ${Number(data.salaryMin).toLocaleString()} — ${Number(data.salaryMax).toLocaleString()} per year
            </p>
          </div>
        )}
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Skills and technologies" description="Add 5–8 skills. These power our candidate matching algorithm.">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-purple)]"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-400"
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
              placeholder={data.skills.length < 10 ? "Type a skill and press Enter" : "Max 10 skills"}
              disabled={data.skills.length >= 10}
              className="min-w-[180px] flex-1 rounded-full border border-dashed border-slate-300 bg-white px-4 py-1.5 text-xs outline-none placeholder:text-slate-400 focus:border-[var(--brand-purple)] disabled:opacity-50"
            />
          </div>

          {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s)).length > 0 && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Suggested
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s)).slice(0, 8).map((s) => (
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
      </SectionCard>

      {/* Description */}
      <SectionCard title="Job description" description="Write a compelling overview of the role, team, and impact.">
        <div className="space-y-4">
          <div>
            <Label required>Overview</Label>
            <textarea
              value={data.description}
              onChange={(e) => setData({ description: e.target.value })}
              rows={5}
              placeholder="Describe the role, the team, and what success looks like in this position..."
              className={textareaCls}
            />
            <div className="mt-1 flex items-center justify-between">
              <Hint>Aim for 150-400 words. Clear and specific wins.</Hint>
              <span className="text-[10px] text-slate-400">
                {data.description.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
          </div>

          <div>
            <Label>Responsibilities</Label>
            <textarea
              value={data.responsibilities}
              onChange={(e) => setData({ responsibilities: e.target.value })}
              rows={5}
              placeholder={"• Own and deliver key product features\n• Collaborate with design and product teams\n• Participate in code reviews and architecture decisions"}
              className={textareaCls}
            />
            <Hint>Use bullet points starting with action verbs.</Hint>
          </div>

          <div>
            <Label>Requirements</Label>
            <textarea
              value={data.requirements}
              onChange={(e) => setData({ requirements: e.target.value })}
              rows={5}
              placeholder={"• 3+ years of relevant experience\n• Strong knowledge of TypeScript and React\n• Experience with cloud platforms (AWS, GCP)"}
              className={textareaCls}
            />
            <Hint>Separate must-haves from nice-to-haves. Keep the list tight.</Hint>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ── Step 3: Company ────────────────────────────────────────────────────────
function StepCompany({
  data,
  setData,
}: {
  data: FormData;
  setData: (d: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Company profile</h2>
        <p className="mt-1 text-sm text-slate-500">
          Candidates research companies before applying. A complete profile builds trust.
        </p>
      </div>

      <SectionCard title="Company details" description="Basic information about your organisation.">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label required>Company name</Label>
              <input
                value={data.companyName}
                onChange={(e) => setData({ companyName: e.target.value })}
                placeholder="Acme Corp"
                className={inputCls}
              />
            </div>
            <div>
              <Label>Company website</Label>
              <input
                value={data.companyWebsite}
                onChange={(e) => setData({ companyWebsite: e.target.value })}
                placeholder="https://acme.com"
                type="url"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Industry</Label>
              <select value={data.companyIndustry} onChange={(e) => setData({ companyIndustry: e.target.value })} className={inputCls}>
                <option value="">Select industry</option>
                {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <Label>Company size</Label>
              <select value={data.companySize} onChange={(e) => setData({ companySize: e.target.value })} className={inputCls}>
                <option value="">Select size</option>
                {COMPANY_SIZES.map((s) => <option key={s}>{s} employees</option>)}
              </select>
            </div>
          </div>

          <div>
            <Label>Headquarters location</Label>
            <input
              value={data.companyLocation}
              onChange={(e) => setData({ companyLocation: e.target.value })}
              placeholder="Austin, TX or Remote"
              className={inputCls}
            />
          </div>

          <div>
            <Label>Company description</Label>
            <textarea
              value={data.companyDescription}
              onChange={(e) => setData({ companyDescription: e.target.value })}
              rows={4}
              placeholder="Tell candidates what your company does, your mission, and why it's a great place to work..."
              className={textareaCls}
            />
            <Hint>2-3 sentences is ideal. Focus on mission and culture.</Hint>
          </div>
        </div>
      </SectionCard>

      {/* Tips */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <p className="text-sm font-extrabold text-[var(--brand-purple)]">
          Why company profiles matter
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { stat: "3x", desc: "more applications with a complete profile" },
            { stat: "72%", desc: "of candidates research companies before applying" },
            { stat: "48h", desc: "faster time-to-hire with full company details" },
          ].map((item) => (
            <div key={item.stat} className="rounded-xl bg-white p-3 text-center shadow-sm">
              <p className="text-lg font-extrabold text-[var(--brand-purple)]">{item.stat}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Review ─────────────────────────────────────────────────────────
function StepReview({
  data,
  onSubmit,
  submitting,
}: {
  data: FormData;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const selectedPlan = PLANS.find((p) => p.id === data.plan)!;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Review and publish</h2>
        <p className="mt-1 text-sm text-slate-500">
          Check everything looks right before your job goes live.
        </p>
      </div>

      {/* Job preview card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Job listing preview
          </p>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-indigo-50 text-lg font-extrabold text-[var(--brand-purple)]">
              {(data.companyName || "C").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-extrabold text-slate-900">
                {data.title || "Untitled Job"}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {data.companyName || "Your Company"} • {data.remote}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.jobType && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                    {data.jobType}
                  </span>
                )}
                {data.level && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                    {data.level}
                  </span>
                )}
                {data.salaryMin && data.salaryMax && (
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    ${Number(data.salaryMin).toLocaleString()} - ${Number(data.salaryMax).toLocaleString()}
                  </span>
                )}
                {data.plan !== "free" && (
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-[var(--brand-purple)]">
                    Featured
                  </span>
                )}
              </div>
              {data.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {data.skills.map((s) => (
                    <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {data.description && (
            <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">
              {data.description.slice(0, 200)}{data.description.length > 200 ? "..." : ""}
            </p>
          )}
        </div>
      </div>

      {/* Plan summary */}
      <div className={
        "rounded-2xl border-2 p-5 " +
        (data.plan !== "free"
          ? "border-[var(--brand-purple)] bg-indigo-50/50"
          : "border-slate-200 bg-white")
      }>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Selected plan
            </p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">
              {selectedPlan.name} — {selectedPlan.price}
            </p>
            <p className="text-xs text-slate-400">{selectedPlan.priceNote}</p>
          </div>
          {data.plan !== "free" && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-purple)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          )}
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {selectedPlan.features.map((f) => (
            <li key={f} className="flex items-start gap-1.5 text-xs text-slate-600">
              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[8px] text-emerald-600">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Order summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-extrabold text-slate-900">Order summary</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">{selectedPlan.name} listing</span>
            <span className="font-semibold text-slate-900">{selectedPlan.price}</span>
          </div>
          {data.plan !== "free" && (
            <div className="flex justify-between text-xs text-slate-400">
              <span>One-time payment</span>
              <span>Via Stripe</span>
            </div>
          )}
          <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-extrabold">
            <span>Total due today</span>
            <span className="text-[var(--brand-purple)]">{selectedPlan.price}</span>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="w-full rounded-2xl bg-[var(--brand-purple)] py-4 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
      >
        {submitting
          ? "Publishing..."
          : data.plan === "free"
          ? "Publish job for free"
          : "Continue to payment — " + selectedPlan.price}
      </button>

      <p className="text-center text-xs text-slate-400">
        {data.plan === "free"
          ? "Your job will go live immediately after publishing."
          : "You will be redirected to Stripe for secure payment. Your job goes live after payment."}
      </p>
    </div>
  );
}

// ── Completion score ───────────────────────────────────────────────────────
function useCompletionScore(data: FormData) {
  return useMemo(() => {
    let score = 0;
    if (data.title.trim()) score += 20;
    if (data.jobType) score += 5;
    if (data.level) score += 5;
    if (data.remote) score += 5;
    if (data.salaryMin && data.salaryMax) score += 15;
    if (data.skills.length >= 3) score += 15;
    if (data.description.trim().length > 100) score += 15;
    if (data.responsibilities.trim().length > 50) score += 10;
    if (data.requirements.trim().length > 50) score += 5;
    if (data.companyName.trim()) score += 5;
    return Math.min(score, 100);
  }, [data]);
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [data, setDataState] = useState<FormData>({
    plan: "featured",
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    jobType: "Full-time",
    level: "Mid-level",
    remote: "Remote",
    salaryMin: "",
    salaryMax: "",
    skills: [],
    companyName: "",
    companyWebsite: "",
    companySize: "",
    companyIndustry: "",
    companyLocation: "",
    companyDescription: "",
  });

  function setData(partial: Partial<FormData>) {
    setDataState((prev) => ({ ...prev, ...partial }));
  }

  const score = useCompletionScore(data);

  function canProceed() {
    if (step === 1) return true;
    if (step === 2) return data.title.trim().length > 0 && data.description.trim().length > 50;
    if (step === 3) return data.companyName.trim().length > 0;
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    router.push("/employer/jobs");
  }

  return (
    <div className="min-h-screen bg-[#F3F6FB]">

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/employer/overview"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <span className="text-sm font-extrabold text-slate-900">Post a Job</span>
        </div>

        {/* Completion score */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-xs font-semibold text-slate-400">Completion</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--brand-purple)] transition-all duration-300"
                style={{ width: score + "%" }}
              />
            </div>
            <span className="text-xs font-extrabold text-[var(--brand-purple)]">
              {score}%
            </span>
          </div>

          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Save draft
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

        {/* Step indicator */}
        <div className="mb-8 flex justify-center">
          <StepIndicator current={step} />
        </div>

        {/* Step content */}
        <div className="space-y-6">
          {step === 1 && (
            <StepPlan
              plan={data.plan}
              setPlan={(p) => setData({ plan: p })}
            />
          )}
          {step === 2 && (
            <StepJobDetails data={data} setData={setData} />
          )}
          {step === 3 && (
            <StepCompany data={data} setData={setData} />
          )}
          {step === 4 && (
            <StepReview
              data={data}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="text-xs text-slate-400">
            Step {step} of {STEPS.length}
          </div>

          {step < STEPS.length ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
              disabled={!canProceed()}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--brand-purple)] px-5 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
            >
              Continue
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}