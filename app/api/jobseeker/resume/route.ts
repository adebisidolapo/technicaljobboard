import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await supabaseServer();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { resumePath: string };
  if (!body?.resumePath) {
    return NextResponse.json({ ok: false, error: "Missing resumePath" }, { status: 400 });
  }

  const resumeUrl = body.resumePath;

  const updated = await prisma.jobseekerProfile.upsert({
    where: { userId: user.id },
    update: { resumeUrl },
    create: { userId: user.id, resumeUrl },
  });

  return NextResponse.json({ ok: true, profile: updated });
}