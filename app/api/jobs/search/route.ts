import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.trim() || "";
  const location = searchParams.get("location")?.trim() || "";
  const remote = searchParams.get("remote") === "true";
  const jobType = searchParams.get("jobType")?.trim() || "";
  const level = searchParams.get("level")?.trim() || "";

  const take = Math.min(parseInt(searchParams.get("take") || "20", 10), 50);
  const skip = Math.max(parseInt(searchParams.get("skip") || "0", 10), 0);

  // Basic “ZipRecruiter-style” matching:
  // - q matches title OR description OR company name OR skills
  // - location matches JobLocation fields OR label
  const where: any = {
    status: "PUBLISHED",
    ...(remote ? { remote: true } : {}),
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
