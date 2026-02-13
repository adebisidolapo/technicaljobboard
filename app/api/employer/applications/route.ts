import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/employer/applications?jobId=...
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json(
      { ok: false, message: "jobId is required" },
      { status: 400 }
    );
  }

  const applications = await prisma.application.findMany({
    where: { jobId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        include: {
          jobseekerProfile: true,
        },
      },
      events: {
        orderBy: { createdAt: "desc" },
      },
      job: {
        include: { company: true },
      },
    },
  });

  return NextResponse.json({ ok: true, applications });
}
