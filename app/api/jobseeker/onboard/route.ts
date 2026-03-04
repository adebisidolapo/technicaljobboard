import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = String(body.userId || "").trim();
    const email = (body.email ? String(body.email) : null) as string | null;

    if (!userId) {
      return NextResponse.json({ ok: false, error: "Missing userId" }, { status: 400 });
    }

    const fullName = (body.fullName ? String(body.fullName) : null) as string | null;
    const headline = (body.headline ? String(body.headline) : null) as string | null;
    const location = (body.location ? String(body.location) : null) as string | null;

    await prisma.jobseekerProfile.upsert({
      where: { userId },
      create: { userId, email, fullName, headline, location },
      update: { email, fullName, headline, location },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}