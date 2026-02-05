import Link from "next/link";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  posted: string;
  tags: string[];
  description: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--brand-purple)]" />

      <div className="p-6 pl-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-extrabold text-[#0B1222] truncate">
              {job.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 truncate">
              {job.company} • {job.location}
            </p>
          </div>

          <button
            type="button"
            className="text-slate-300 hover:text-slate-600 transition"
            aria-label="Save job"
            title="Save"
          >
            ★
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-600 line-clamp-2">
          {job.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            {job.type}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            {job.pay}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/jobs/${job.id}`}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] shadow-[0_14px_26px_rgba(106,111,242,0.20)] transition"
          >
            View details
          </Link>

          <span className="text-xs text-slate-400">Posted {job.posted}</span>
        </div>
      </div>
    </article>
  );
}
