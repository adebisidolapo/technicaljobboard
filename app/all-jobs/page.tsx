// app/all-jobs/page.tsx
import AllJobsClient from "./AllJobsClient";

export const dynamic = "force-dynamic";

type InitialFilters = {
  q: string;
  loc: string;
  cat: string;
  jobType: string;
  remote: string;
  level: string;
  salaryMin: string;
  salaryMax: string;
  posted: string;
  sort: string;
};

function pick(sp: any, key: string): string {
  const v = sp?.[key];
  if (Array.isArray(v)) return String(v[0] ?? "");
  if (v == null) return "";
  return String(v);
}

export default async function AllJobsPage({
  searchParams,
}: {
  // Next 16 build typing can expect searchParams as a Promise in some setups
  searchParams?: Promise<any>;
}) {
  const sp = (await searchParams) ?? {};

  const initial: InitialFilters = {
    q: pick(sp, "q"),
    // support both loc and location
    loc: pick(sp, "loc") || pick(sp, "location"),
    cat: pick(sp, "cat"),
    jobType: pick(sp, "jobType"),
    remote: pick(sp, "remote"),
    level: pick(sp, "level"),
    salaryMin: pick(sp, "salaryMin"),
    salaryMax: pick(sp, "salaryMax"),
    posted: pick(sp, "posted"),
    sort: pick(sp, "sort") || "new",
  };

  return <AllJobsClient initial={initial} />;
}