import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { applicationId, status, note } = body ?? {};

    if (!applicationId || !status) {
      return NextResponse.json(
        { ok: false, message: "applicationId and status are required" },
        { status: 400 }
      );
    }

    // Update status + create event
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
