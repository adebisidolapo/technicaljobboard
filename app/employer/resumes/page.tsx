import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ResumeDatabase() {
  const profiles = await prisma.jobseekerProfile.findMany({
    where: { resumeUrl: { not: null } },
    include: { user: true },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Resume Database
      </h1>

      <div className="grid gap-4">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200 rounded-2xl p-5"
          >
            <div className="font-bold text-slate-900">
              {p.fullName || p.user.email}
            </div>

            <div className="text-sm text-slate-600">
              {p.location || "Location not set"}
            </div>

            {p.resumeUrl && (
              <a
                href={p.resumeUrl}
                className="mt-2 inline-block text-[var(--brand-purple)] font-semibold"
              >
                Download Resume
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}