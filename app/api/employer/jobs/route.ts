import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const companyId = url.searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json(
        { ok: false, message: "companyId is required" },
        { status: 400 }
      );
    }

    const jobs = await prisma.job.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
      include: {
        skills: true,
        locations: true,
        _count: { select: { applications: true } },
      },
    });

    return NextResponse.json({ ok: true, jobs });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
