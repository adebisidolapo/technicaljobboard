export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  posted: string;
  tags: string[];

  jobType?: "Full-time" | "Part-time" | "Contract" | "Internship";
  level?: "Junior" | "Mid" | "Senior" | "Lead";
  workMode?: "Remote" | "Hybrid" | "Onsite";
  distanceKm?: number;
  postedAt?: string; // e.g. "2026-01-27"
};
