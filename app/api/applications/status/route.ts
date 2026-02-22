import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { applicationId, status, note, actorUserId } = body ?? {};

    if (!applicationId || !status) {
      return NextResponse.json(
        { ok: false, message: "applicationId and status are required" },
        { status: 400 }
      );
    }

    // ✅ Get existing (so we can log prevStatus + companyId)
    const existing = await prisma.application.findUnique({
      where: { id: applicationId },
      select: {
        id: true,
        status: true,
        jobId: true,
        userId: true,
        job: { select: { companyId: true } },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { ok: false, message: "Application not found" },
        { status: 404 }
      );
    }

    const prevStatus = existing.status;

    // ✅ Update status + create event
    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        events: {
          create: {
            status,
            note: note ?? null,
          },
        },
      },
      include: {
        events: { orderBy: { createdAt: "desc" } },
      },
    });

    // ✅ Audit log (ATS tracking)
    await prisma.auditLog.create({
      data: {
        companyId: existing.job.companyId,
        actorUserId: actorUserId ?? null,
        action: "APPLICATION_STATUS_CHANGED",
        entity: "Application",
        entityId: existing.id,
        meta: {
          from: prevStatus,
          to: status,
          note: note ?? null,
          jobId: existing.jobId,
          userId: existing.userId,
        },
      },
    });

    return NextResponse.json({ ok: true, application: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
