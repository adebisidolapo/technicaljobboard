import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // very lightweight sanity check (avoids queryRaw)
    await prisma.user.count();

    return NextResponse.json({
      ok: true,
      db: "up",
      ts: new Date().toISOString(),
    });
  } catch (e: any) {
    // never crash server — just report db down
    return NextResponse.json(
      {
        ok: true,
        db: "down",
        error: e?.message || "DB connection failed",
        ts: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}