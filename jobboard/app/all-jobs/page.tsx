import JobsSection from "@/components/jobs/JobsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Technical Jobs | Technical Job Board",
  description:
    "Browse verified technical jobs for software engineers, DevOps, data, cloud, and security roles.",
  openGraph: {
    title: "Technical Jobs – Browse Roles",
    description: "Search and filter technical jobs by role, location, salary, and type.",
    type: "website",
  },
};

export default function AllJobsPage() {
  return <JobsSection />;
}
