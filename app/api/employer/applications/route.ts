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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, status: true },
    });

    if (!user) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { ok: false, message: "Account is not active" },
        { status: 403 }
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
