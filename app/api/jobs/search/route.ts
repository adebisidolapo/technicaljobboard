import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseBool(v: string | null): boolean | undefined {
  if (v == null) return undefined;
  const s = v.trim().toLowerCase();
  if (["true", "1", "yes", "y"].includes(s)) return true;
  if (["false", "0", "no", "n"].includes(s)) return false;
  return undefined;
}



export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
const location =
  searchParams.get("loc")?.trim() ||
  searchParams.get("location")?.trim() ||
  "";
  const jobType = searchParams.get("jobType")?.trim() || "";
  const level = searchParams.get("level")?.trim() || "";

  const take = Math.min(parseInt(searchParams.get("take") || "20", 10), 50);
  const skip = Math.max(parseInt(searchParams.get("skip") || "0", 10), 0);

  const now = new Date();

  const where: any = {
    // ✅ Public visibility rule (do not show unpublished)
    status: "PUBLISHED",
    publishedAt: { not: null, lte: now },

    ...(typeof remote === "boolean" ? { remote } : {}),
    ...(jobType ? { jobType } : {}),
    ...(level ? { level } : {}),

    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { company: { name: { contains: q, mode: "insensitive" } } },
            { skills: { some: { name: { contains: q, mode: "insensitive" } } } },
          ],
        }
      : {}),

    ...(location
      ? {
          locations: {
            some: {
              OR: [
                { country: { contains: location, mode: "insensitive" } },
                { city: { contains: location, mode: "insensitive" } },
                { label: { contains: location, mode: "insensitive" } },
                // If these columns exist in your schema, they help a lot:
                // { state: { contains: location, mode: "insensitive" } },
                // { name: { contains: location, mode: "insensitive" } },
              ],
            },
          },
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip,
      take,
      include: {
        company: true,
        locations: true,
        skills: true,
      },
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({
    ok: true,
    total,
    take,
    skip,
    items,
  });
}