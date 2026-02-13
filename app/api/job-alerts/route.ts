import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/job-alerts?userId=...
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { ok: false, message: "userId is required" },
      { status: 400 }
    );
  }

  const alerts = await prisma.jobAlert.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ ok: true, alerts });
}

// POST /api/job-alerts
export async function POST(req: Request) {
  const body = await req.json();

  const {
    userId,
    query,
    location,
    remoteOnly,
    jobType,
    level,
    salaryMin,
    salaryMax,
    frequency,
    isActive,
  } = body ?? {};

  if (!userId) {
    return NextResponse.json(
      { ok: false, message: "userId is required" },
      { status: 400 }
    );
  }

  const alert = await prisma.jobAlert.create({
    data: {
      userId,
      query: query ?? null,
      location: location ?? null,
      remoteOnly: !!remoteOnly,
      jobType: jobType ?? null,
      level: level ?? null,
      salaryMin: Number.isFinite(salaryMin) ? salaryMin : null,
      salaryMax: Number.isFinite(salaryMax) ? salaryMax : null,
      frequency: frequency ?? "DAILY",
      isActive: typeof isActive === "boolean" ? isActive : true,
    },
  });

  return NextResponse.json({ ok: true, alert }, { status: 201 });
}
