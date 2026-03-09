"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export const dynamic = "force-dynamic";

function prettyBytes(n: number) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function Field({
  label,
  hint,
  placeholder,
}: {
  label: string;
  hint: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="text-sm font-extrabold text-slate-900">{label}</div>
        <div className="text-xs text-slate-600">{hint}</div>
      </div>
      <input
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
      />
    </div>
  );
}

export default function JobseekerSettingsPage() {
  const supabase = supabaseBrowser();

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving" | "done" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function uploadResume() {
    try {
      setMsg("");

      if (!file) {
        setStatus("error");
        setMsg("Please select a resume file.");
        return;
      }

      const okTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!okTypes.includes(file.type)) {
        setStatus("error");
        setMsg("Upload a PDF, DOC, or DOCX.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setStatus("error");
        setMsg("Max size is 10MB.");
        return;
      }

      setStatus("uploading");

      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData?.user) {
        setStatus("error");
        setMsg("You must be logged in.");
        return;
      }

      const userId = userData.user.id;
      const ext = file.name.split(".").pop() || "pdf";
      const path = `resumes/${userId}/${Date.now()}.${ext}`;

      const up = await supabase.storage.from("resumes").upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (up.error) {
        setStatus("error");
        setMsg(up.error.message);
        return;
      }

      const { data: pub } = supabase.storage.from("resumes").getPublicUrl(path);
      const resumeUrl = pub?.publicUrl;

      if (!resumeUrl) {
        setStatus("error");
        setMsg("Failed to generate resume URL.");
        return;
      }

      setStatus("saving");

      const res = await fetch("/api/jobseeker/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, resumeUrl }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || data?.ok === false) {
        setStatus("error");
        setMsg(data?.error || "Failed to save resume in database.");
        return;
      }

      setStatus("done");
      setMsg("Resume updated successfully.");
      setFile(null);
    } catch (e: any) {
      setStatus("error");
      setMsg(e?.message || "Something went wrong.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Settings & Resume
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage your profile details and keep your resume updated.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <section className="xl:col-span-8 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="text-sm font-extrabold text-slate-900">Profile</div>
            <div className="mt-1 text-xs text-slate-600">
              Keep your public jobseeker information clear and current.
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Full name"
                hint="Your display name for employers."
                placeholder="e.g. Jordan Smith"
              />
              <Field
                label="Location"
                hint="City / State or Remote."
                placeholder="Austin, TX"
              />
            </div>

            <Field
              label="Professional headline"
              hint="Short and role-focused."
              placeholder="Frontend Engineer • React • Next.js"
            />

            <div className="space-y-2">
              <div className="text-sm font-extrabold text-slate-900">About</div>
              <div className="text-xs text-slate-600">
                Add a short introduction about your experience and strengths.
              </div>
              <textarea
                placeholder="Tell employers a little about your background, technical strengths, and what type of role you want."
                className="w-full min-h-[120px] p-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="h-11 px-6 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold text-sm hover:bg-[var(--brand-purple-dark)] transition shadow-sm">
                Save profile
              </button>
              <button className="h-11 px-6 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </section>

        <div className="xl:col-span-4 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <div className="text-sm font-extrabold text-slate-900">Resume upload</div>
              <div className="mt-1 text-xs text-slate-600">
                PDF, DOC, or DOCX • Max 10MB
              </div>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm"
              />

              {file ? (
                <div className="rounded-2xl border border-slate-200 bg-[#F4F6FB] px-4 py-3 text-sm text-slate-700">
                  <div className="font-extrabold text-slate-900 truncate">{file.name}</div>
                  <div className="text-xs text-slate-600">{prettyBytes(file.size)}</div>
                </div>
              ) : null}

              <button
                type="button"
                onClick={uploadResume}
                disabled={status === "uploading" || status === "saving"}
                className="h-11 w-full rounded-2xl bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white font-extrabold text-sm transition disabled:opacity-60"
              >
                {status === "uploading"
                  ? "Uploading..."
                  : status === "saving"
                  ? "Saving..."
                  : "Update resume"}
              </button>

              {msg ? (
                <div
                  className={[
                    "rounded-2xl px-4 py-3 text-sm border",
                    status === "done"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : status === "error"
                      ? "border-rose-200 bg-rose-50 text-rose-700"
                      : "border-slate-200 bg-[#F4F6FB] text-slate-700",
                  ].join(" ")}
                >
                  {msg}
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <div className="text-sm font-extrabold text-slate-900">Account</div>
              <div className="mt-1 text-xs text-slate-600">Security and access</div>
            </div>

            <div className="p-6 space-y-2">
              <button className="h-11 w-full rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold text-sm hover:bg-slate-50 transition">
                Change password
              </button>
              <button className="h-11 w-full rounded-2xl bg-white border border-red-200 text-red-700 font-semibold text-sm hover:bg-red-50 transition">
                Sign out
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}