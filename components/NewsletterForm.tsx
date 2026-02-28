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

  const isLoading = status === "loading";

  return (
    <div className="w-full">
      {/* One clean pill */}
      <div className="group flex w-full items-stretch overflow-hidden rounded-2xl border border-white/12 bg-white/5 transition focus-within:border-white/20 focus-within:bg-white/7">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none"
        />

        <button
          type="button"
          onClick={submit}
          disabled={isLoading}
          className={[
            "shrink-0 px-4 sm:px-5",
            "text-sm font-semibold text-white",
            "bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)]",
            "transition",
            "disabled:opacity-60 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          {isLoading ? "Joining..." : "Join"}
        </button>
      </div>

      {message && (
        <p
          className={[
            "mt-2 text-[11px] leading-relaxed",
            status === "success" ? "text-emerald-300" : "text-rose-200",
          ].join(" ")}
        >
          {message}
        </p>
      )}
    </div>
  );
}