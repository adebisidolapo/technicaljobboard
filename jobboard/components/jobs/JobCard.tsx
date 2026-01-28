import type { Job } from "../../types/job";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div
      className="bg-white rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-lg transition
                 border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-start gap-5 md:gap-6"
    >
      <div className="flex gap-4 min-w-0">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
          {job.company.charAt(0)}
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600">
            {job.company} • {job.location}
          </p>

          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.tags.map((pill) => (
              <span
                key={pill}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="md:text-right shrink-0">
        <p className="text-sm font-semibold text-[var(--brand-purple)]">
          {job.salary}
        </p>
        <button className="mt-4 w-full md:w-auto bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-dark)] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition shadow-sm">
          View
        </button>
        <p className="text-xs text-gray-400 mt-3">
          Posted {job.posted}
        </p>
      </div>
    </div>
  );
}
