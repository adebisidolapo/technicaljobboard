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

      // Basic validation
      const okTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
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

      // Storage path
      const ext = file.name.split(".").pop() || "pdf";
      const path = `resumes/${userId}/${Date.now()}.${ext}`;

      // IMPORTANT: create this bucket in Supabase Storage: "resumes"
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
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Settings & Resume</h1>
        <p className="mt-1 text-sm text-slate-600">
          Upload a resume so employers can find you in the resume database.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">Resume upload</div>
        <p className="mt-1 text-sm text-slate-600">PDF, DOC, or DOCX • Max 10MB</p>

        <div className="mt-4 grid gap-3">
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
            className="h-11 rounded-2xl bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white font-extrabold text-sm transition disabled:opacity-60"
          >
            {status === "uploading" ? "Uploading..." : status === "saving" ? "Saving..." : "Update resume"}
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
      </div>
    </div>
  );
}