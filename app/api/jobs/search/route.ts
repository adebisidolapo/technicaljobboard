import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseBool(v: string | null): boolean | undefined {
  if (v == null) return undefined;
  const s = v.trim().toLowerCase();
  if (["true", "1", "yes", "y"].includes(s)) return true;
  if (["false", "0", "no", "n"].includes(s)) return false;
  return undefined;
}

function parseIntSafe(v: string | null): number | undefined {
  if (!v) return undefined;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.trim() || "";
  const locParam =
    searchParams.get("loc")?.trim() || searchParams.get("location")?.trim() || "";

  const remote = parseBool(searchParams.get("remote"));
  const jobType = searchParams.get("jobType")?.trim() || "";
  const level = searchParams.get("level")?.trim() || "";

  const salaryMin = parseIntSafe(searchParams.get("salaryMin"));
  const salaryMax = parseIntSafe(searchParams.get("salaryMax"));

  const postedDays = parseIntSafe(searchParams.get("posted")); // "1" | "3" | "7" | "14"
  const sort = (searchParams.get("sort") || "new").trim(); // "new" | "relevant" (we'll treat relevant as new for now)

  const take = Math.min(parseInt(searchParams.get("take") || "20", 10), 50);
  const skip = Math.max(parseInt(searchParams.get("skip") || "0", 10), 0);

  const now = new Date();
  const postedFrom =
    postedDays && postedDays > 0
      ? new Date(Date.now() - postedDays * 24 * 60 * 60 * 1000)
      : null;

  const where: any = {
    // Public visibility rule
    status: "PUBLISHED",
    publishedAt: { not: null, lte: now },

    ...(postedFrom ? { publishedAt: { not: null, gte: postedFrom, lte: now } } : {}),

    ...(typeof remote === "boolean" ? { remote } : {}),
    ...(jobType ? { jobType } : {}),
    ...(level ? { level } : {}),

    ...(salaryMin != null || salaryMax != null
      ? {
          AND: [
            ...(salaryMin != null ? [{ salaryMax: { gte: salaryMin } }] : []),
            ...(salaryMax != null ? [{ salaryMin: { lte: salaryMax } }] : []),
          ],
        }
      : {}),

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

    ...(locParam
      ? {
          locations: {
            some: {
              OR: [
                { country: { contains: locParam, mode: "insensitive" } },
                { city: { contains: locParam, mode: "insensitive" } },
                { label: { contains: locParam, mode: "insensitive" } },
                // if you have state column, uncomment:
                // { state: { contains: locParam, mode: "insensitive" } },
              ],
            },
          },
        }
      : {}),
  };

  const orderBy =
    sort === "relevant"
      ? [{ publishedAt: "desc" as const }, { createdAt: "desc" as const }]
      : [{ publishedAt: "desc" as const }, { createdAt: "desc" as const }];

  const [items, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy,
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