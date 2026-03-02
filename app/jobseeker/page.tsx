import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function JobseekerRoot() {
  redirect("/jobseeker/overview");
}