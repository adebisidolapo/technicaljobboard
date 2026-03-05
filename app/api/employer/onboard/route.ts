import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function clean(s: unknown) {
  return typeof s === "string" ? s.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = clean(body.userId);
    const email = clean(body.email);
    const fullName = clean(body.fullName);
    const roleTitle = clean(body.roleTitle);

    // Either they choose an existing company OR create a new one
    const companyId = clean(body.companyId);
    const companyName = clean(body.companyName);

    // Optional: COMPANY / AGENCY
    const companyType = clean(body.companyType).toUpperCase(); // "COMPANY" | "AGENCY"

    if (!userId) {
      return NextResponse.json({ ok: false, error: "Missing userId" }, { status: 400 });
    }

    // 1) Resolve company (existing or create)
    let finalCompanyId = companyId;

    if (!finalCompanyId) {
      if (!companyName) {
        return NextResponse.json(
          { ok: false, error: "Provide companyId or companyName" },
          { status: 400 }
        );
      }

      // Create (or find) company by name (simple approach)
      const existing = await prisma.company.findFirst({
        where: { name: companyName },
        select: { id: true },
      });

      if (existing?.id) {
        finalCompanyId = existing.id;
      } else {
        const created = await prisma.company.create({
          data: {
            name: companyName,
            // only set type if your schema has CompanyType
            ...(companyType === "AGENCY" || companyType === "COMPANY"
              ? { type: companyType as any }
              : {}),
          },
          select: { id: true },
        });

        finalCompanyId = created.id;
      }
    }

    // 2) Upsert employer profile and connect company (NO companyId scalar write)
    const employer = await prisma.employerProfile.upsert({
      where: { userId },
      create: {
        user: { connect: { id: userId } },
        email: email || null,
        fullName: fullName || null,
        roleTitle: roleTitle || null,
        company: { connect: { id: finalCompanyId } },
      },
      update: {
        email: email || null,
        fullName: fullName || null,
        roleTitle: roleTitle || null,
        company: { connect: { id: finalCompanyId } },
      },
      select: { id: true, userId: true },
    });

    // 3) Ensure membership exists (OWNER default)
    // If your CompanyMember uses userId + companyId unique, this is safe.
    await prisma.companyMember.upsert({
      where: {
        companyId_userId: {
          companyId: finalCompanyId,
          userId,
        },
      },
      create: {
        company: { connect: { id: finalCompanyId } },
        user: { connect: { id: userId } },
        employerProfile: { connect: { id: employer.id } },
        role: "OWNER",
      },
      update: {
        employerProfile: { connect: { id: employer.id } },
      },
      select: { id: true },
    });

    return NextResponse.json({
      ok: true,
      companyId: finalCompanyId,
      employerProfileId: employer.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}