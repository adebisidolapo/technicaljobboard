"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ResumeUploader() {
  const supabase = supabaseBrowser();

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function upload(file: File) {
    setMsg(null);
    setBusy(true);

    const { data: u } = await supabase.auth.getUser();
    const user = u.user;

    if (!user) {
      setBusy(false);
      setMsg("You must be signed in.");
      return;
    }

    const ext = file.name.split(".").pop() || "pdf";
    const path = `resumes/${user.id}/${Date.now()}.${ext}`;

    const up = await supabase.storage.from("resumes").upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (up.error) {
      setBusy(false);
      setMsg(up.error.message);
      return;
    }

    // Save storage path to DB
    const res = await fetch("/api/jobseeker/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumePath: path }),
    });

    const data = await res.json();
    setBusy(false);

    if (!res.ok || data?.ok === false) {
      setMsg(data?.error || "Failed to save resume.");
      return;
    }

    setMsg("Resume uploaded and saved.");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-extrabold text-slate-900">Resume</div>
      <p className="mt-1 text-sm text-slate-600">
        Upload a PDF/DOC resume. Employers will be able to search resumes later.
      </p>

      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
          }}
          className="block w-full text-sm"
        />

        <div className="text-xs text-slate-500">
          {busy ? "Uploading..." : "Max 10MB recommended"}
        </div>
      </div>

      {msg && (
        <div className="mt-3 text-sm text-slate-700">{msg}</div>
      )}
    </div>
  );
}