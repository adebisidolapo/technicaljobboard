"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Plan = "free" | "featured" | "premium";
type PayType = "annual" | "hourly" | "daily" | "monthly";

type FormData = {
  plan: Plan;
  title: string;
  category: string;
  description: string;
  responsibilities: string;
  requirements: string;
  jobType: string;
  level: string;
  remote: string;
  payType: PayType;
  salaryMin: string;
  salaryMax: string;
  skills: string[];
  companyName: string;
  companyWebsite: string;
  companySize: string;
  companyIndustry: string;
  companyLocation: string;
  companyDescription: string;
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const LEVELS = ["Entry", "Junior", "Mid-level", "Senior", "Lead", "Executive"];
const REMOTE_OPTIONS = ["Remote", "Hybrid", "On-site"];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
const PAY_TYPES: { value: PayType; label: string; placeholder: string }[] = [
  { value: "annual", label: "Annual salary", placeholder: "e.g. 120000" },
  { value: "hourly", label: "Hourly rate", placeholder: "e.g. 65" },
  { value: "daily", label: "Daily rate", placeholder: "e.g. 500" },
  { value: "monthly", label: "Monthly", placeholder: "e.g. 8000" },
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
  "Software & Technology", "Fintech", "Healthcare & Biotech",
  "Cybersecurity", "Cloud & Infrastructure", "Data & AI",
  "E-commerce", "Enterprise Software", "Agency", "Other",
];
const SUGGESTED_SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "AWS", "Docker", "Kubernetes", "PostgreSQL", "GraphQL",
  "Tailwind CSS", "Go", "Java", "C++", "Terraform",
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
    features: [
      "1 active listing",
      "Standard visibility",
      "30-day duration",
      "Candidate applications",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    price: "$99",
    sub: "per listing",
    badge: "Most Popular",
    features: [
      "Featured badge",
      "Priority placement",
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
      "Email to matched candidates",
      "90-day duration",
      "Bulk CSV upload",
      "Dedicated support",
    ],
  },
];

const STEPS = [
  { id: 1, label: "Plan" },
  { id: 2, label: "Job" },
  { id: 3, label: "Company" },
  { id: 4, label: "Review" },
];

const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple)] focus:ring-2 focus:ring-[var(--brand-purple)]/10";
const textareaCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple)] focus:ring-2 focus:ring-[var(--brand-purple)]/10 resize-none leading-6";

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="mb-1.5 text-sm font-semibold text-slate-800">
      {children}
      {required && <span className="ml-0.5 text-red-400">*</span>}
    </p>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((s, i) => {
        const done = current > s.id;
        const active = current === s.id;
        return (
          <div key={s.id} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className={
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold transition-all " +
                (done ? "bg-[var(--brand-purple)] text-white" :
                  active ? "border-2 border-[var(--brand-purple)] text-[var(--brand-purple)] bg-white" :
                    "border-2 border-slate-200 text-slate-300 bg-white")
              }>
                {done ? "✓" : s.id}
              </div>
              <span className={
                "text-[10px] font-semibold " +
                (active ? "text-[var(--brand-purple)]" : done ? "text-slate-400" : "text-slate-300")
              }>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={
                "mb-4 h-px w-8 sm:w-12 " +
                (current > s.id ? "bg-[var(--brand-purple)]" : "bg-slate-200")
              } />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Plan ───────────────────────────────────────────────────────────
function StepPlan({ plan, setPlan }: { plan: Plan; setPlan: (p: Plan) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Choose a plan</h2>
        <p className="mt-1 text-sm text-slate-400">Select the listing that fits your needs.</p>
      </div>

      {/* Dark background pricing section */}
      <div className="rounded-2xl bg-[#0C1120] p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p.id)}
              className={
                "relative flex flex-col rounded-xl p-5 text-left transition-all " +
                (plan === p.id
                  ? "bg-white ring-2 ring-[var(--brand-purple)] shadow-lg"
                  : "bg-white/8 border border-white/10 hover:bg-white/12")
              }
            >
              {p.badge && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-[var(--brand-purple)] px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                  {p.badge}
                </span>
              )}

              {plan === p.id && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-purple)] text-[10px] text-white font-extrabold">
                  ✓
                </span>
              )}

              <p className={
                "text-[10px] font-extrabold uppercase tracking-widest mb-2 " +
                (plan === p.id ? "text-[var(--brand-purple)]" : "text-white/40")
              }>
                {p.name}
              </p>

              <p className={
                "text-2xl font-extrabold mb-0.5 " +
                (plan === p.id ? "text-slate-900" : "text-white")
              }>
                {p.price}
              </p>

              <p className={
                "text-xs mb-4 " +
                (plan === p.id ? "text-slate-400" : "text-white/40")
              }>
                {p.sub}
              </p>

              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs">
                    <span className={
                      "h-4 w-4 shrink-0 rounded-full flex items-center justify-center text-[9px] font-extrabold " +
                      (plan === p.id
                        ? "bg-[var(--brand-purple)]/10 text-[var(--brand-purple)]"
                        : "bg-white/10 text-white/60")
                    }>
                      ✓
                    </span>
                    <span className={plan === p.id ? "text-slate-600" : "text-white/60"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {["Secure checkout via Stripe", "Cancel anytime", "Goes live instantly"].map((t) => (
            <p key={t} className="text-xs text-white/40">{t}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Job Details ────────────────────────────────────────────────────
function StepJobDetails({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  const [skillInput, setSkillInput] = useState("");

  const payType = PAY_TYPES.find((p) => p.value === data.payType) || PAY_TYPES[0];

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
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Job details</h2>
        <p className="mt-1 text-sm text-slate-400">Fill in the key information about this role.</p>
      </div>

      {/* Role */}
      <Card title="Role">
        <div>
          <Label required>Job title</Label>
          <input
            value={data.title}
            onChange={(e) => setData({ title: e.target.value })}
            placeholder="e.g. Senior Frontend Engineer"
            className={inputCls}
          />
        </div>

        <div>
          <Label required>Category</Label>
          <select
            value={data.category}
            onChange={(e) => setData({ category: e.target.value })}
            className={inputCls}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
      </Card>

      {/* Compensation */}
      <Card title="Compensation">
        <div>
          <Label>Pay structure</Label>
          <div className="flex flex-wrap gap-2">
            {PAY_TYPES.map((pt) => (
              <button
                key={pt.value}
                type="button"
                onClick={() => setData({ payType: pt.value })}
                className={
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold transition " +
                  (data.payType === pt.value
                    ? "border-[var(--brand-purple)] bg-[var(--brand-purple)]/8 text-[var(--brand-purple)]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300")
                }
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Minimum</Label>
            <input
              type="number"
              value={data.salaryMin}
              onChange={(e) => setData({ salaryMin: e.target.value })}
              placeholder={payType.placeholder}
              className={inputCls}
            />
          </div>
          <div>
            <Label>Maximum</Label>
            <input
              type="number"
              value={data.salaryMax}
              onChange={(e) => setData({ salaryMax: e.target.value })}
              placeholder={payType.placeholder}
              className={inputCls}
            />
          </div>
        </div>

        {data.salaryMin && data.salaryMax && (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2.5">
            <p className="text-xs font-semibold text-[var(--brand-purple)]">
              {payType.label}: {data.payType === "annual" ? "$" : ""}{Number(data.salaryMin).toLocaleString()} — {data.payType === "annual" ? "$" : ""}{Number(data.salaryMax).toLocaleString()}
              {data.payType === "hourly" ? "/hr" : data.payType === "daily" ? "/day" : data.payType === "monthly" ? "/mo" : "/yr"}
            </p>
          </div>
        )}
      </Card>

      {/* Skills */}
      <Card title="Skills and technologies">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
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
                  className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-400 text-[10px]"
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
              placeholder={data.skills.length < 10 ? "Add a skill, press Enter" : "Max 10 skills"}
              disabled={data.skills.length >= 10}
              className="min-w-[160px] flex-1 rounded-full border border-dashed border-slate-300 bg-white px-3 py-1 text-xs outline-none placeholder:text-slate-400 focus:border-[var(--brand-purple)] disabled:opacity-50"
            />
          </div>

          {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s)).length > 0 && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Suggested</p>
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
      </Card>

      {/* Description */}
      <Card title="Job description">
        <div>
          <Label required>Overview</Label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ description: e.target.value })}
            rows={5}
            placeholder="Describe the role, the team, and what success looks like..."
            className={textareaCls}
          />
        </div>

        <div>
          <Label>Responsibilities</Label>
          <textarea
            value={data.responsibilities}
            onChange={(e) => setData({ responsibilities: e.target.value })}
            rows={4}
            placeholder={"Own and deliver key product features\nCollaborate with design and product\nParticipate in code reviews"}
            className={textareaCls}
          />
        </div>

        <div>
          <Label>Requirements</Label>
          <textarea
            value={data.requirements}
            onChange={(e) => setData({ requirements: e.target.value })}
            rows={4}
            placeholder={"3+ years of relevant experience\nStrong knowledge of TypeScript\nExperience with cloud platforms"}
            className={textareaCls}
          />
        </div>
      </Card>
    </div>
  );
}

// ── Step 3: Company ────────────────────────────────────────────────────────
function StepCompany({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Company profile</h2>
        <p className="mt-1 text-sm text-slate-400">Help candidates learn about where they would be working.</p>
      </div>

      <Card title="Company details">
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
            <Label>Website</Label>
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
          <Label>Location</Label>
          <input
            value={data.companyLocation}
            onChange={(e) => setData({ companyLocation: e.target.value })}
            placeholder="Austin, TX or Remote"
            className={inputCls}
          />
        </div>

        <div>
          <Label>About the company</Label>
          <textarea
            value={data.companyDescription}
            onChange={(e) => setData({ companyDescription: e.target.value })}
            rows={3}
            placeholder="What does your company do and why is it a great place to work?"
            className={textareaCls}
          />
        </div>
      </Card>
    </div>
  );
}

// ── Step 4: Review ─────────────────────────────────────────────────────────
function StepReview({ data, onSubmit, submitting }: { data: FormData; onSubmit: () => void; submitting: boolean }) {
  const plan = PLANS.find((p) => p.id === data.plan)!;
  const payType = PAY_TYPES.find((p) => p.value === data.payType) || PAY_TYPES[0];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Review and publish</h2>
        <p className="mt-1 text-sm text-slate-400">Check everything before your job goes live.</p>
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Listing preview</p>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-indigo-50 text-base font-extrabold text-[var(--brand-purple)]">
              {(data.companyName || "C").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-extrabold text-slate-900">
                {data.title || "Untitled position"}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                {data.companyName || "Your Company"} • {data.remote} • {data.category || "Uncategorised"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {data.jobType && <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{data.jobType}</span>}
                {data.level && <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{data.level}</span>}
                {data.salaryMin && data.salaryMax && (
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    {data.salaryMin} — {data.salaryMax}
                    {data.payType === "hourly" ? "/hr" : data.payType === "daily" ? "/day" : data.payType === "monthly" ? "/mo" : "/yr"}
                  </span>
                )}
                {data.plan !== "free" && (
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-[var(--brand-purple)]">Featured</span>
                )}
              </div>
              {data.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {data.skills.map((s) => (
                    <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {data.description && (
            <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-500 line-clamp-3">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {/* Plan + order */}
      <div className="rounded-2xl bg-[#0C1120] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">Selected plan</p>
            <p className="mt-1 text-lg font-extrabold text-white">{plan.name} — {plan.price}</p>
            <p className="text-xs text-white/40">{plan.sub}</p>
          </div>
          <Link
            href="#"
            onClick={(e) => { e.preventDefault(); }}
            className="rounded-lg border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/60 transition hover:bg-white/12"
          >
            Change plan
          </Link>
        </div>

        <div className="mt-4 border-t border-white/8 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">{plan.name} listing</span>
            <span className="font-extrabold text-white">{plan.price}</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="font-extrabold text-white">Total due today</span>
            <span className="font-extrabold text-[var(--brand-purple)]">{plan.price}</span>
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
          ? "Publish job"
          : "Continue to payment — " + plan.price}
      </button>

      <p className="text-center text-xs text-slate-400">
        {data.plan === "free"
          ? "Your job goes live immediately."
          : "You will be taken to Stripe for secure payment."}
      </p>
    </div>
  );
}

// ── Completion score ───────────────────────────────────────────────────────
function useScore(data: FormData) {
  return useMemo(() => {
    let s = 0;
    if (data.title.trim()) s += 20;
    if (data.category) s += 10;
    if (data.salaryMin && data.salaryMax) s += 15;
    if (data.skills.length >= 3) s += 15;
    if (data.description.trim().length > 80) s += 20;
    if (data.requirements.trim().length > 40) s += 10;
    if (data.companyName.trim()) s += 10;
    return Math.min(s, 100);
  }, [data]);
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [data, setDataState] = useState<FormData>({
    plan: "featured",
    title: "",
    category: "",
    description: "",
    responsibilities: "",
    requirements: "",
    jobType: "Full-time",
    level: "Mid-level",
    remote: "Remote",
    payType: "annual",
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

  const score = useScore(data);

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
            Dashboard
          </Link>
          <span className="text-sm font-extrabold text-slate-900">Post a Job</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--brand-purple)] transition-all duration-300"
                style={{ width: score + "%" }}
              />
            </div>
            <span className="text-xs font-extrabold text-[var(--brand-purple)]">{score}%</span>
          </div>
          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Save draft
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <StepDots current={step} />

        <div className="space-y-5">
          {step === 1 && <StepPlan plan={data.plan} setPlan={(p) => setData({ plan: p })} />}
          {step === 2 && <StepJobDetails data={data} setData={setData} />}
          {step === 3 && <StepCompany data={data} setData={setData} />}
          {step === 4 && <StepReview data={data} onSubmit={handleSubmit} submitting={submitting} />}
        </div>

        {/* Nav bar */}
        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            Back
          </button>

          <span className="text-xs text-slate-400">Step {step} of {STEPS.length}</span>

          {step < STEPS.length ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
              disabled={!canProceed()}
              className="inline-flex h-9 items-center rounded-xl bg-[var(--brand-purple)] px-5 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
            >
              Continue
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}