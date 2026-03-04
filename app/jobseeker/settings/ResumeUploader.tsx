"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ResumeUploader() {
  const supabase = supabaseBrowser();
  const [msg, setMsg] = useState("");

  async function upload(file: File) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const path = `resumes/${user.id}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("resumes")
      .upload(path, file, { upsert: true });

    if (error) {
      setMsg(error.message);
      return;
    }

    await fetch("/api/jobseeker/resume", {
      method: "POST",
      body: JSON.stringify({ resumePath: path }),
      headers: { "Content-Type": "application/json" },
    });

    setMsg("Resume uploaded");
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h3 className="font-extrabold text-slate-900">
        Upload Resume
      </h3>

      <input
        type="file"
        className="mt-4"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
        }}
      />

      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  );
}