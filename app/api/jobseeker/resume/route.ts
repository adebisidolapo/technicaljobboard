import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const userId = body?.userId as string | undefined;
    const resumeUrl = body?.resumeUrl as string | undefined;

    if (!userId || !resumeUrl) {
      return NextResponse.json({ ok: false, error: "Missing userId or resumeUrl" }, { status: 400 });
    }

    // Ensure profile exists; update resumeUrl
    const profile = await prisma.jobseekerProfile.upsert({
      where: { userId },
      update: { resumeUrl },
      create: { userId, resumeUrl },
    });

    return NextResponse.json({ ok: true, profile });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Internal error" },
      { status: 500 }
    );
  }
}