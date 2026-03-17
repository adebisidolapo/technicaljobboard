import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import JobDetailClient from "./JobDetailClient";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: { company: true },
  });

  if (!job) return { title: "Job Not Found — TechnicalJobBoard" };

  return {
    title: `${job.title} at ${job.company?.name ?? "Company"} — TechnicalJobBoard`,
    description: job.description?.slice(0, 160) ?? "",
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      company: true,
      locations: true,
      skills: true,
    },
  });

  if (!job || job.status !== "PUBLISHED") {
    notFound();
  }

  return <JobDetailClient job={job} />;
}