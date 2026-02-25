import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const jobId = searchParams.get("jobId")?.trim() || "";
    if (!jobId) {
      return NextResponse.json(
        { ok: false, error: "Missing required query param: jobId" },
        { status: 400 }
      );
    }

    const status = searchParams.get("status")?.trim() || "";
    const take = Math.min(parseInt(searchParams.get("take") || "25", 10), 100);
    const skip = Math.max(parseInt(searchParams.get("skip") || "0", 10), 0);

    const where: any = {
      jobId,
      ...(status ? { status } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
        include: {
          job: { select: { id: true, title: true } },
          user: {
            select: {
              id: true,
              email: true,
              jobseekerProfile: {
                select: {
                  fullName: true,
                  headline: true,
                  location: true,
                  resumeUrl: true,
                },
              },
            },
          },
          events: {
            orderBy: { createdAt: "desc" },
            take: 20,
          },
        },
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({
      ok: true,
      total,
      take,
      skip,
      items,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}