import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function cleanStr(v: any) {
  const s = v == null ? "" : String(v);
  return s.trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = cleanStr(body.userId);
    const email = cleanStr(body.email) || null;
    const fullName = cleanStr(body.fullName) || null;
    const roleTitle = cleanStr(body.roleTitle) || null;

    if (!userId) {
      return NextResponse.json({ ok: false, error: "Missing userId" }, { status: 400 });
    }

    // Either pick an existing companyId OR create new companyName
    const companyId = cleanStr(body.companyId);
    const companyName = cleanStr(body.companyName);
    const companyType = cleanStr(body.companyType).toUpperCase(); // COMPANY | AGENCY

    let finalCompanyId = companyId;

    if (!finalCompanyId) {
      if (!companyName) {
        return NextResponse.json(
          { ok: false, error: "Provide companyId or companyName" },
          { status: 400 }
        );
      }

      const created = await prisma.company.create({
        data: {
          name: companyName,
          type: companyType === "AGENCY" ? "AGENCY" : "COMPANY",
        },
      });

      finalCompanyId = created.id;
    } else {
      // validate company exists
      const exists = await prisma.company.findUnique({ where: { id: finalCompanyId } });
      if (!exists) {
        return NextResponse.json({ ok: false, error: "Company not found" }, { status: 404 });
      }
    }

    await prisma.employerProfile.upsert({
      where: { userId },
      create: {
        userId,
        email,
        fullName,
        roleTitle,
        companyId: finalCompanyId,
      },
      update: {
        email,
        fullName,
        roleTitle,
        companyId: finalCompanyId,
      },
    });

    return NextResponse.json({ ok: true, companyId: finalCompanyId });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}