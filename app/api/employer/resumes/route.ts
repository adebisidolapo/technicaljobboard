import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId")?.trim() || "";
    const q = searchParams.get("q")?.trim() || "";

    if (!companyId) {
      return NextResponse.json({ ok: false, error: "Missing companyId" }, { status: 400 });
    }

    // Pull applications to jobs owned by this company, where the user has a resumeUrl
    const applications = await prisma.application.findMany({
      where: {
        job: { companyId },
        user: {
          jobseekerProfile: {
            isNot: null,
          },
        },
      },
      select: {
        userId: true,
        user: {
          select: {
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
      },
      take: 500,
    });

    // De-dupe by userId, require resumeUrl
    const map = new Map<string, any>();
    for (const a of applications) {
      const p = a.user?.jobseekerProfile;
      if (!p?.resumeUrl) continue;
      if (!map.has(a.userId)) {
        map.set(a.userId, {
          userId: a.userId,
          email: a.user?.email ?? null,
          fullName: p.fullName ?? null,
          headline: p.headline ?? null,
          location: p.location ?? null,
          resumeUrl: p.resumeUrl,
        });
      }
    }

    let items = Array.from(map.values());

    // Search filter
    if (q) {
      const qq = q.toLowerCase();
      items = items.filter((x) => {
        return (
          String(x.fullName || "").toLowerCase().includes(qq) ||
          String(x.headline || "").toLowerCase().includes(qq) ||
          String(x.location || "").toLowerCase().includes(qq) ||
          String(x.email || "").toLowerCase().includes(qq)
        );
      });
    }

    return NextResponse.json({ ok: true, items });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Internal error" },
      { status: 500 }
    );
  }
}