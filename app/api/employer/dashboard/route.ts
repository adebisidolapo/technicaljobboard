import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/employer/dashboard?companyId=...
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json(
        { ok: false, message: "companyId is required" },
        { status: 400 }
      );
    }

    // Basic job counts
    const [totalJobs, activeJobs] = await Promise.all([
      prisma.job.count({ where: { companyId } }),
      prisma.job.count({ where: { companyId, status: "PUBLISHED" } }),
    ]);

    // Total applications across all jobs for this company
    const totalApplications = await prisma.application.count({
      where: { job: { companyId } },
    });

    // Applications by status (grouped)
    const grouped = await prisma.application.groupBy({
      by: ["status"],
      where: { job: { companyId } },
      _count: { _all: true },
    });

    const applicationsByStatus = grouped.reduce<Record<string, number>>(
      (acc, row) => {
        acc[row.status] = row._count._all;
        return acc;
      },
      {}
    );

    // Top jobs by applications
    const topJobs = await prisma.job.findMany({
      where: { companyId },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 20,
      select: {
        id: true,
        title: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        _count: { select: { applications: true } },
      },
    });

    const topJobsByApplications = topJobs
      .map((j) => ({
        id: j.id,
        title: j.title,
        status: j.status,
        publishedAt: j.publishedAt,
        createdAt: j.createdAt,
        applications: j._count.applications,
      }))
      .sort((a, b) => b.applications - a.applications)
      .slice(0, 5);

    // Recent applications (latest 10)
    const recentApplications = await prisma.application.findMany({
      where: { job: { companyId } },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        status: true,
        createdAt: true,
        job: { select: { id: true, title: true } },
        user: {
          select: {
            id: true,
            email: true,
            jobseekerProfile: {
              select: { fullName: true, headline: true, location: true },
            },
          },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      companyId,
      metrics: {
        totalJobs,
        activeJobs,
        totalApplications,
        applicationsByStatus,
        topJobsByApplications,
        recentApplications,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
