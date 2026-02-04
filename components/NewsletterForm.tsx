"use client";

import { useState } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async () => {
    const clean = email.trim();
    if (!isValidEmail(clean)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
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
        setMessage(data.message || "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("You’re in! Check your inbox soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <input
        type="email"
        placeholder="Your email address"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-11 px-4 rounded-xl
                   bg-white/10 border border-white/20
                   text-sm text-white placeholder:text-white/50
                   outline-none focus:ring-2 focus:ring-[rgba(106,111,242,0.5)]"
      />

      <button
        type="button"
        onClick={submit}
        disabled={status === "loading"}
        className="mt-3 w-full h-11 rounded-xl
                   bg-[var(--brand-purple)]
                   hover:bg-[var(--brand-purple-dark)]
                   text-sm font-semibold transition
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Joining..." : "Join newsletter"}
      </button>

      {message && (
        <p
          className={[
            "mt-2 text-xs",
            status === "success" ? "text-emerald-300" : "text-rose-200",
          ].join(" ")}
        >
          {message}
        </p>
      )}
    </div>
  );
}
