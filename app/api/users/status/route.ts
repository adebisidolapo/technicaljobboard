import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { userId, status } = body ?? {};

    if (!userId || !status) {
      return NextResponse.json(
        { ok: false, message: "userId and status are required" },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { status },
      select: { id: true, email: true, status: true },
    });

    return NextResponse.json({ ok: true, user: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}
