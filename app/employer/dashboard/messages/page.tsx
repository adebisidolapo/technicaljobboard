import Link from "next/link";

export const dynamic = "force-dynamic";

function ThreadRow({
  name,
  role,
  lastMessage,
  time,
  unread,
}: {
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
}) {
  return (
    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50 transition">
      <div className="min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="font-extrabold text-slate-900 truncate">{name}</div>
          {unread ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-extrabold border bg-[color:var(--brand-purple)/0.10] border-[color:var(--brand-purple)/0.22] text-[var(--brand-purple-dark)]">
              New
            </span>
          ) : null}
        </div>
        <div className="mt-1 text-sm text-slate-600 truncate">
          {role} • <span className="text-slate-500">{lastMessage}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:justify-end">
        <div className="text-xs text-slate-500 whitespace-nowrap">{time}</div>
        <button className="h-9 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold text-xs hover:bg-slate-100 transition">
          Open
        </button>
      </div>
    </div>
  );
}

export default function EmployerMessagesPage() {
  // Placeholder UI (connect real messages later)
  const threads = [
    {
      name: "Jordan M.",
      role: "Frontend Engineer",
      lastMessage: "Hi, I’m available this week for an interview.",
      time: "Today",
      unread: true,
    },
    {
      name: "Taylor R.",
      role: "DevOps Engineer",
      lastMessage: "Thanks — I’ve shared my updated resume.",
      time: "Yesterday",
      unread: false,
    },
    {
      name: "Sam K.",
      role: "Backend Engineer",
      lastMessage: "What’s the timeline for the next stage?",
      time: "2d ago",
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Messages
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Communicate with candidates and keep hiring moving.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/employer/candidates"
            className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-sm font-semibold"
          >
            Candidates
          </Link>

          <button className="h-10 px-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple-dark)] transition text-sm font-semibold shadow-sm">
            New message
          </button>
        </div>
      </div>

      {/* Search + filters */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex-1">
            <input
              placeholder="Search messages (candidate name, role)…"
              className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-purple)]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="h-10 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition">
              All
            </button>
            <button className="h-10 px-4 rounded-2xl border border-[color:var(--brand-purple)/0.25] bg-[color:var(--brand-purple)/0.10] text-sm font-extrabold text-slate-900">
              Unread
            </button>
            <button className="h-10 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition">
              Archived
            </button>
          </div>
        </div>
      </section>

      {/* Inbox */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="text-sm font-extrabold text-slate-900">Inbox</div>
          <div className="text-xs text-slate-500">
            Messaging connects next (this is UI-ready).
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {threads.map((t) => (
            <ThreadRow key={t.name} {...t} />
          ))}
        </div>
      </section>
    </div>
  );
}