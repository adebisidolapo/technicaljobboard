import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, jobId, resumeUrl, coverLetter } = body ?? {};

    if (!userId || !jobId) {
      return NextResponse.json(
        { ok: false, message: "userId and jobId are required" },
        { status: 400 }
      );
    }

    // Check user status (hibernate protection)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, status: true },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { ok: false, message: "Account is not active" },
        { status: 403 }
      );
    }

    const application = await prisma.application.create({
      data: {
        userId,
        jobId,
        resumeUrl: resumeUrl ?? null,
        coverLetter: coverLetter ?? null,
        status: "APPLIED",
        events: {
          create: {
            status: "APPLIED",
            note: "Application submitted",
          },
        },
      },
      include: {
        events: true,
      },
    });

    return NextResponse.json({ ok: true, application });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json(
        { ok: false, message: "You already applied to this job" },
        { status: 409 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
