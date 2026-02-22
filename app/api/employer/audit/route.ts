import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const companyId = url.searchParams.get("companyId");
    const take = Number(url.searchParams.get("take") ?? "50");

    if (!companyId) {
      return NextResponse.json(
        { ok: false, message: "companyId is required" },
        { status: 400 }
      );
    }

    const logs = await prisma.auditLog.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
      take: Number.isFinite(take) ? Math.min(Math.max(take, 1), 200) : 50,
      include: {
        actorUser: { select: { id: true, email: true } },
        company: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ ok: true, logs });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
