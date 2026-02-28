import { prisma } from "@/lib/prisma";

export async function getEmployerDashboard(companyId: string) {
  const totalJobs = await prisma.job.count({
    where: { companyId },
  });

  const activeJobs = await prisma.job.count({
    where: { companyId, status: "PUBLISHED" },
  });

  const totalApplications = await prisma.application.count({
    where: {
      job: { companyId },
    },
  });

  const recentApplications = await prisma.application.findMany({
    where: {
      job: { companyId },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: { include: { jobseekerProfile: true } },
      job: true,
    },
  });

  const topJobsByApplications = await prisma.job.findMany({
    where: { companyId },
    take: 5,
    include: {
      _count: { select: { applications: true } },
    },
    orderBy: {
      applications: { _count: "desc" },
    },
  });

  return {
    metrics: {
      totalJobs,
      activeJobs,
      totalApplications,
      recentApplications,
      topJobsByApplications: topJobsByApplications.map((j) => ({
        id: j.id,
        title: j.title,
        applications: j._count.applications,
      })),
    },
  };
}