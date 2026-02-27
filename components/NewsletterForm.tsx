"use client";

import { useState } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const submit = async () => {
    const clean = email.trim();

    if (!isValidEmail(clean)) {
      setStatus("error");
      setMessage("Enter a valid email.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean }),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("Subscribed.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  };

  return (
    <div className="w-full">
      {/* Compact row */}
      <div className="flex items-center gap-2">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="flex-1 h-10 px-3 rounded-xl
                     bg-white/10 border border-white/15
                     text-sm text-white placeholder:text-white/50
                     outline-none focus:ring-2 focus:ring-[rgba(106,111,242,0.45)]"
        />

        <button
          type="button"
          onClick={submit}
          disabled={status === "loading"}
          className="h-10 px-4 rounded-xl
                     bg-[var(--brand-purple)]
                     hover:bg-[var(--brand-purple-dark)]
                     text-sm font-semibold transition
                     whitespace-nowrap
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Joining..." : "Join"}
        </button>
      </div>

      {/* Small feedback text (doesn't blow up layout) */}
      {message && (
        <p
          className={[
            "mt-2 text-[11px]",
            status === "success" ? "text-emerald-300" : "text-rose-200",
          ].join(" ")}
        >
          {message}
        </p>
      )}
    </div>
  );
}