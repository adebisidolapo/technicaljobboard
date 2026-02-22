import { NextResponse } from "next/server";

export async function POST(req: Request, ctx: { params: { jobId: string } }) {
  const { jobId } = ctx.params;

  const form = await req.formData();
  const applicationId = String(form.get("applicationId") ?? "");
  const status = String(form.get("status") ?? "");
  const note = String(form.get("note") ?? "");

  if (!applicationId || !status) {
    return NextResponse.redirect(
      new URL(`/employer/jobs/${jobId}/candidates`, req.url),
      302
    );
  }

  // Call your existing API route that updates status + creates ApplicationEvent + logs
  await fetch("http://localhost:3000/api/applications/status", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      applicationId,
      status,
      note: note || undefined,
    }),
  });

  return NextResponse.redirect(
    new URL(`/employer/jobs/${jobId}/candidates`, req.url),
    302
  );
}
