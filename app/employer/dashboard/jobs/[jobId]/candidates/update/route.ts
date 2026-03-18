import { NextResponse } from "next/server";

type Ctx = {
  params: Promise<{ jobId: string }>;
};

export async function POST(req: Request, ctx: Ctx) {
  const { jobId } = await ctx.params;

  if (!jobId) {
    return NextResponse.json(
      { ok: false, error: "Missing jobId" },
      { status: 400 }
    );
  }

  // Read body safely
  const body = await req.json().catch(() => null);

  // TODO: plug in your update logic here.
  // Example expected payload: { applicationId, status, note }
  // - update Application status
  // - write ApplicationEvent
  // - write AuditLog
  // using jobId for scoping/validation

  return NextResponse.json({
    ok: true,
    jobId,
    received: body,
  });
}