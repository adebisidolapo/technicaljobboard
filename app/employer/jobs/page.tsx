"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const LEVELS = ["Entry", "Junior", "Mid-level", "Senior", "Lead"];
const REMOTE_OPTIONS = ["Remote", "Hybrid", "On-site"];
const SUGGESTED_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "AWS",
  "PostgreSQL",
  "GraphQL",
];

export default function EmployerPostJobPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("Austin, TX");
  const [jobType, setJobType] = useState("Full-time");
  const [level, setLevel] = useState("Entry");
  const [remotePolicy, setRemotePolicy] = useState("Remote");
  const [salaryMin, setSalaryMin] = useState("100000");
  const [salaryMax, setSalaryMax] = useState("160000");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const progress = useMemo(() => {
    let score = 0;
    if (jobTitle.trim()) score += 20;
    if (location.trim()) score += 15;
    if (jobType.trim()) score += 10;
    if (level.trim()) score += 10;
    if (remotePolicy.trim()) score += 10;
    if (salaryMin.trim() && salaryMax.trim()) score += 15;
    if (skills.length >= 3) score += 10;
    if (description.trim().length > 60) score += 10;
    return Math.min(score, 100);
  }, [jobTitle, location, jobType, level, remotePolicy, salaryMin, salaryMax, skills, description]);

  function addSkill(skill: string) {
    const value = skill.trim();
    if (!value) return;
    if (skills.includes(value)) return;
    if (skills.length >= 8) return;
    setSkills((prev) => [...prev, value]);
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((item) => item !== skill));
  }

  function handleSkillKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background,#f5f7fb)] text-slate-900">
      <TopBar />

      <section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(135deg,rgba(106,111,242,0.10),rgba(124,114,255,0.06),rgba(255,255,255,0.95))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(106,111,242,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(124,114,255,0.10),transparent_30%)]" />
        <div className="relative mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-purple,#6a6ff2)]">
                Employer hiring
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl">
                Post a job that attracts serious technical candidates
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Create a polished, high-converting listing with the clarity top engineers expect.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Back to jobs
              </Link>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--brand-purple,#6a6ff2)] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(106,111,242,0.30)] transition hover:translate-y-[-1px] hover:opacity-95"
              >
                Save draft
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr] xl:max-w-5xl">
            <div className="rounded-[28px] border border-white/80 bg-white/88 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--brand-purple,#6a6ff2)]">Step 1 of 3</p>
                  <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Job Details</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Clear, structured listings usually attract better applicants.
                  </p>
                </div>

                <div className="min-w-[180px]">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <span>Completion</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200">
                    <div
                      className="h-2.5 rounded-full bg-[var(--brand-purple,#6a6ff2)] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[rgba(106,111,242,0.15)] bg-[rgba(106,111,242,0.06)] p-5 shadow-[0_14px_40px_rgba(106,111,242,0.08)] sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-lg shadow-sm">
                  ✨
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950">Professional listing score</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Add salary, focused skills, and a strong description to make your post feel credible and complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
              <SectionHeader
                title="Role basics"
                description="Give candidates the most important details first."
              />

              <div className="mt-6 grid grid-cols-1 gap-5">
                <Field label="Job title" hint="Use a clear and standard role title.">
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Location" hint="City / state or remote hiring market.">
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Austin, TX"
                    />
                  </Field>

                  <Field label="Job type" hint="Pick the engagement type.">
                    <Select value={jobType} onChange={(e) => setJobType(e.target.value)} options={JOB_TYPES} />
                  </Field>

                  <Field label="Level" hint="Seniority for the role.">
                    <Select value={level} onChange={(e) => setLevel(e.target.value)} options={LEVELS} />
                  </Field>

                  <Field label="Remote policy" hint="How candidates will work.">
                    <Select
                      value={remotePolicy}
                      onChange={(e) => setRemotePolicy(e.target.value)}
                      options={REMOTE_OPTIONS}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
              <SectionHeader
                title="Compensation"
                description="Listings with salary ranges often build more trust and get more qualified clicks."
              />

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Salary minimum" hint="Recommended for U.S. candidates.">
                  <Input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="100000"
                  />
                </Field>

                <Field label="Salary maximum" hint="Give a realistic upper range.">
                  <Input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="160000"
                  />
                </Field>
              </div>

              <div className="mt-5 rounded-[24px] border border-[rgba(106,111,242,0.12)] bg-[rgba(106,111,242,0.05)] p-4">
                <p className="text-sm font-medium text-slate-700">
                  🔥 Transparent salary ranges help candidates self-qualify faster and improve listing quality.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
              <SectionHeader
                title="Skills"
                description="Keep this focused. Five to eight strong skills is usually enough."
              />

              <div className="mt-6">
                <Field label="Core skills" hint="Add skills candidates must already have.">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap gap-2.5">
                      {skills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="inline-flex items-center rounded-full border border-[rgba(106,111,242,0.12)] bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[var(--brand-purple,#6a6ff2)] hover:text-[var(--brand-purple,#6a6ff2)]"
                        >
                          {skill}
                          <span className="ml-2 text-slate-400">×</span>
                        </button>
                      ))}

                      <input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillKeyDown}
                        placeholder="Add skill"
                        className="min-w-[160px] flex-1 rounded-full border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple,#6a6ff2)]"
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {SUGGESTED_SKILLS.filter((item) => !skills.includes(item)).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => addSkill(item)}
                          className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-[var(--brand-purple,#6a6ff2)] hover:text-[var(--brand-purple,#6a6ff2)]"
                        >
                          + {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </Field>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
              <SectionHeader
                title="Description"
                description="Describe the impact, team context, responsibilities, and what success looks like."
              />

              <div className="mt-6">
                <Field label="Job description" hint="Write for real people, not internal HR language.">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={10}
                    placeholder="Describe the role, responsibilities, team context, tools, and the kind of engineer you want to attract..."
                    className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple,#6a6ff2)] focus:ring-4 focus:ring-[rgba(106,111,242,0.10)]"
                  />
                </Field>
              </div>
            </div>

            <div className="sticky bottom-4 z-20">
              <div className="rounded-[28px] border border-white/80 bg-white/95 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Ready to publish?</p>
                    <p className="text-sm text-slate-600">
                      Your listing looks more credible when title, salary, skills, and description are all complete.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      Save draft
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--brand-purple,#6a6ff2)] px-6 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(106,111,242,0.32)] transition hover:translate-y-[-1px] hover:opacity-95"
                    >
                      Post Job · Get Candidates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <SidebarCard
              title="Posting tips"
              items={[
                {
                  title: "Use salary ranges",
                  text: "This improves trust and helps better candidates self-select.",
                },
                {
                  title: "Keep the title standard",
                  text: "Avoid vague internal names that candidates will not search for.",
                },
                {
                  title: "Be clear about remote",
                  text: "Candidates filter strongly by remote flexibility.",
                },
              ]}
            />

            <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
              <h3 className="text-lg font-bold text-slate-950">Preview checklist</h3>
              <div className="mt-5 space-y-3">
                <ChecklistItem done={!!jobTitle.trim()} text="Clear job title" />
                <ChecklistItem done={!!location.trim()} text="Location provided" />
                <ChecklistItem done={!!salaryMin.trim() && !!salaryMax.trim()} text="Salary range added" />
                <ChecklistItem done={skills.length >= 3} text="At least 3 skills added" />
                <ChecklistItem done={description.trim().length > 60} text="Strong description written" />
              </div>
            </div>

            <div className="rounded-[32px] border border-[rgba(106,111,242,0.16)] bg-[linear-gradient(180deg,rgba(106,111,242,0.08),rgba(106,111,242,0.03))] p-6 shadow-[0_16px_50px_rgba(106,111,242,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-purple,#6a6ff2)]">
                Hiring quality
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">Better structure, better applicants</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Serious candidates respond to listings that look intentional, transparent, and easy to understand.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function TopBar() {
  return (
    <header className="border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xl font-extrabold tracking-tight text-slate-950">Employer</p>
          <p className="text-sm text-slate-500">Hiring dashboard</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Home
          </Link>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--brand-purple,#6a6ff2)] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(106,111,242,0.28)]"
          >
            Post a job
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2">
        <span className="block text-sm font-bold tracking-wide text-slate-900 sm:text-[15px]">{label}</span>
        {hint ? <span className="mt-1 block text-sm text-slate-500">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-purple,#6a6ff2)] focus:ring-4 focus:ring-[rgba(106,111,242,0.10)] ${className}`}
    />
  );
}

function Select({
  options,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
}) {
  return (
    <select
      {...props}
      className={`w-full rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[var(--brand-purple,#6a6ff2)] focus:ring-4 focus:ring-[rgba(106,111,242,0.10)] ${className}`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function SidebarCard({
  title,
  items,
}: {
  title: string;
  items: { title: string; text: string }[];
}) {
  return (
    <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-[rgba(106,111,242,0.20)] hover:bg-white"
          >
            <p className="text-sm font-bold text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChecklistItem({ done, text }: { done: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          done
            ? "bg-[var(--brand-purple,#6a6ff2)] text-white"
            : "bg-white text-slate-400 ring-1 ring-slate-300"
        }`}
      >
        {done ? "✓" : ""}
      </div>
      <span className="text-sm font-medium text-slate-700">{text}</span>
    </div>
  );
}