import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  hint: string;
  tone?: "purple" | "green" | "blue" | "neutral";
}) {
  const borderColor =
    tone === "purple"
      ? "border-t-[var(--brand-purple)]"
      : tone === "green"
      ? "border-t-emerald-500"
      : tone === "blue"
      ? "border-t-sky-500"
      : "border-t-slate-200";

  const valueColor =
    tone === "purple"
      ? "text-[var(--brand-purple)]"
      : tone === "green"
      ? "text-emerald-600"
      : tone === "blue"
      ? "text-sky-600"
      : "text-slate-900";

  return (
    <div
      className={
        "rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm " +
        borderColor
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className={"mt-2 text-3xl font-extrabold tracking-tight " + valueColor}>
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </div>
  );
}

function MiniBar({
  label,
  value,
  max,
  color = "bg-[var(--brand-purple)]",
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="w-10 shrink-0 text-right text-xs font-semibold text-slate-500">
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={"h-full rounded-full transition-all " + color}
          style={{ width: pct + "%" }}
        />
      </div>
      <span className="w-6 shrink-0 text-xs font-extrabold text-slate-700">
        {value}
      </span>
    </div>
  );
}

export default async function EmployerAnalyticsPage() {
  const [totalEmployers, totalJobseekers, totalAdmins] = await Promise.all([
    prisma.user.count({ where: { role: "EMPLOYER" } }),
    prisma.user.count({ where: { role: "JOBSEEKER" } }),
    prisma.user.count({ where: { role: "ADMIN" } }),
  ]);

  const totalUsers = totalEmployers + totalJobseekers + totalAdmins;

  const totalSessions = await prisma.session.count();

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const recentSessions = await prisma.session.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });

  const newUsersWeek = await prisma.user.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });

  const newEmployersWeek = await prisma.user.count({
    where: { role: "EMPLOYER", createdAt: { gte: sevenDaysAgo } },
  });

  const newJobseekersWeek = await prisma.user.count({
    where: { role: "JOBSEEKER", createdAt: { gte: sevenDaysAgo } },
  });

  const totalApplications = await prisma.application.count();

  const resumeUploads = await prisma.jobseekerProfile.count({
    where: { resumeUrl: { not: null } },
  });

  const resumeProfiles = await prisma.jobseekerProfile.findMany({
    where: { resumeUrl: { not: null } },
    take: 10,
    orderBy: { updatedAt: "desc" },
    include: {
      user: {
        select: { email: true, createdAt: true },
      },
    },
  });

  const dailySessions: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const from = new Date();
    from.setDate(from.getDate() - i);
    from.setHours(0, 0, 0, 0);

    const to = new Date(from);
    to.setHours(23, 59, 59, 999);

    const count = await prisma.session.count({
      where: { createdAt: { gte: from, lte: to } },
    });

    dailySessions.push({
      day: from.toLocaleDateString("en-US", { weekday: "short" }),
      count,
    });
  }

  const maxDailyCount = Math.max(...dailySessions.map((d) => d.count), 1);

  const recentEmployers = await prisma.user.findMany({
    where: { role: "EMPLOYER" },
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      createdAt: true,
      status: true,
      employerProfile: {
        select: { fullName: true, roleTitle: true },
      },
    },
  });

  const recentJobseekers = await prisma.user.findMany({
    where: { role: "JOBSEEKER" },
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      createdAt: true,
      status: true,
      jobseekerProfile: {
        select: { fullName: true, headline: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Platform activity, logins, and resume data.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total users"
          value={totalUsers}
          hint="All registered accounts"
          tone="neutral"
        />
        <StatCard
          label="Employers"
          value={totalEmployers}
          hint={"+" + newEmployersWeek + " this week"}
          tone="purple"
        />
        <StatCard
          label="Jobseekers"
          value={totalJobseekers}
          hint={"+" + newJobseekersWeek + " this week"}
          tone="green"
        />
        <StatCard
          label="Logins (7d)"
          value={recentSessions}
          hint="Sessions this week"
          tone="blue"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total logins"
          value={totalSessions}
          hint="All time sessions"
          tone="neutral"
        />
        <StatCard
          label="New users (7d)"
          value={newUsersWeek}
          hint="Registered this week"
          tone="neutral"
        />
        <StatCard
          label="Applications"
          value={totalApplications}
          hint="All time total"
          tone="purple"
        />
        <StatCard
          label="Resumes uploaded"
          value={resumeUploads}
          hint="Jobseekers with resume"
          tone="green"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Login activity — last 7 days
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Sessions created per day
              </p>
            </div>
            <div className="p-5">
              <div className="flex h-28 items-end justify-between gap-2">
                {dailySessions.map((d) => {
                  const heightPct =
                    maxDailyCount > 0
                      ? Math.max((d.count / maxDailyCount) * 100, 4)
                      : 4;

                  return (
                    <div
                      key={d.day}
                      className="flex flex-1 flex-col items-center gap-1.5"
                    >
                      <span className="text-[10px] font-extrabold text-slate-700">
                        {d.count > 0 ? d.count : ""}
                      </span>
                      <div
                        className="w-full rounded-t-lg border border-[var(--brand-purple)]/30 bg-[var(--brand-purple)]/20 transition-all"
                        style={{ height: heightPct + "%" }}
                      />
                      <span className="text-[10px] font-semibold text-slate-400">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                User breakdown
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Distribution of account types
              </p>
            </div>
            <div className="space-y-3 p-5">
              <MiniBar
                label="Jobs."
                value={totalJobseekers}
                max={totalUsers}
                color="bg-emerald-500"
              />
              <MiniBar
                label="Emp."
                value={totalEmployers}
                max={totalUsers}
                color="bg-[var(--brand-purple)]"
              />
              <MiniBar
                label="Admin"
                value={totalAdmins}
                max={totalUsers}
                color="bg-slate-400"
              />
              <div className="mt-2 flex flex-wrap gap-4 border-t border-slate-100 pt-2">
                {[
                  {
                    label: "Jobseekers",
                    value: totalJobseekers,
                    color: "bg-emerald-500",
                  },
                  {
                    label: "Employers",
                    value: totalEmployers,
                    color: "bg-[var(--brand-purple)]",
                  },
                  {
                    label: "Admins",
                    value: totalAdmins,
                    color: "bg-slate-400",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5 text-xs text-slate-500"
                  >
                    <span
                      className={"h-2.5 w-2.5 shrink-0 rounded-full " + item.color}
                    />
                    {item.label}:{" "}
                    <span className="font-extrabold text-slate-800">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Recent employer registrations
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Latest recruiter accounts created
              </p>
            </div>
            <div className="p-5">
              {recentEmployers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Name / Email
                        </th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Role
                        </th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Joined
                        </th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {recentEmployers.map((u) => {
                        const name = u.employerProfile?.fullName || u.email;
                        const role = u.employerProfile?.roleTitle || "Employer";
                        const joined = new Date(u.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        );

                        return (
                          <tr
                            key={u.id}
                            className="transition-colors hover:bg-slate-50"
                          >
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-extrabold text-[var(--brand-purple)]">
                                  {name.charAt(0).toUpperCase()}
                                </div>
                                <span className="max-w-[140px] truncate text-xs font-semibold text-slate-900">
                                  {name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-xs text-slate-500">
                              {role}
                            </td>
                            <td className="whitespace-nowrap py-3 pr-4 text-xs text-slate-400">
                              {joined}
                            </td>
                            <td className="py-3">
                              <span
                                className={
                                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold " +
                                  (u.status === "ACTIVE"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-slate-200 bg-slate-50 text-slate-500")
                                }
                              >
                                {u.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  No employer accounts yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Recent jobseeker registrations
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Latest candidate accounts created
              </p>
            </div>
            <div className="p-5">
              {recentJobseekers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Name / Email
                        </th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Headline
                        </th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Joined
                        </th>
                        <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {recentJobseekers.map((u) => {
                        const name = u.jobseekerProfile?.fullName || u.email;
                        const headline =
                          u.jobseekerProfile?.headline || "Job Seeker";
                        const joined = new Date(u.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        );

                        return (
                          <tr
                            key={u.id}
                            className="transition-colors hover:bg-slate-50"
                          >
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-extrabold text-emerald-600">
                                  {name.charAt(0).toUpperCase()}
                                </div>
                                <span className="max-w-[140px] truncate text-xs font-semibold text-slate-900">
                                  {name}
                                </span>
                              </div>
                            </td>
                            <td className="max-w-[120px] truncate py-3 pr-4 text-xs text-slate-500">
                              {headline}
                            </td>
                            <td className="whitespace-nowrap py-3 pr-4 text-xs text-slate-400">
                              {joined}
                            </td>
                            <td className="py-3">
                              <span
                                className={
                                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold " +
                                  (u.status === "ACTIVE"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-slate-200 bg-slate-50 text-slate-500")
                                }
                              >
                                {u.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  No jobseeker accounts yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">This week</h3>
            <div className="mt-3 space-y-3">
              {[
                {
                  label: "New logins",
                  value: recentSessions,
                  color: "text-[var(--brand-purple)]",
                },
                {
                  label: "New employers",
                  value: newEmployersWeek,
                  color: "text-[var(--brand-purple)]",
                },
                {
                  label: "New jobseekers",
                  value: newJobseekersWeek,
                  color: "text-emerald-600",
                },
                {
                  label: "New users total",
                  value: newUsersWeek,
                  color: "text-slate-900",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
                >
                  <span className="text-xs font-semibold text-slate-600">
                    {item.label}
                  </span>
                  <span className={"text-sm font-extrabold " + item.color}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">
              Resume uploads
            </h3>
            <p className="mb-3 mt-0.5 text-xs text-slate-400">
              Jobseekers who have uploaded a resume
            </p>
            <div className="space-y-2">
              {resumeProfiles.length > 0 ? (
                resumeProfiles.map((profile) => {
                  const name = profile.user?.email || "Unknown";
                  const uploaded = profile.updatedAt
                    ? new Date(profile.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "—";

                  return (
                    <div
                      key={profile.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
                    >
                      <div className="min-w-0 flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-extrabold text-emerald-600">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        <span className="max-w-[110px] truncate text-xs font-semibold text-slate-700">
                          {name}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-[10px] text-slate-400">
                          {uploaded}
                        </span>
                        {profile.resumeUrl ? (
                          <a
                            href={profile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 transition hover:border-[var(--brand-purple)] hover:text-[var(--brand-purple)]"
                          >
                            View
                          </a>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400">
                  No resumes uploaded yet.
                </p>
              )}
            </div>

            <div className="mt-3 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Total uploaded</span>
                <span className="text-sm font-extrabold text-emerald-600">
                  {resumeUploads}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">
              Quick links
            </h3>
            <div className="mt-3 space-y-2">
              {[
                { href: "/employer/candidates", label: "View candidates" },
                { href: "/employer/resumes", label: "Resume database" },
                { href: "/employer/jobs", label: "Manage jobs" },
                { href: "/employer/settings", label: "Settings" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-white"
                >
                  {link.label}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}