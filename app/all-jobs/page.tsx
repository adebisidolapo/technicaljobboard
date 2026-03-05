import AllJobsClient from "./AllJobsClient";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function pick(sp: SearchParams, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] ?? "" : v ?? "";
}

export default async function AllJobsPage(props: { searchParams?: SearchParams }) {
  const sp = await Promise.resolve(props.searchParams ?? {});

  const initial = {
    q: pick(sp, "q"),
    loc: pick(sp, "loc"),
    cat: pick(sp, "cat"),
    jobType: pick(sp, "jobType"),
    remote: pick(sp, "remote"),
    level: pick(sp, "level"),
    salaryMin: pick(sp, "salaryMin"),
    salaryMax: pick(sp, "salaryMax"),
    posted: pick(sp, "posted"),
    sort: pick(sp, "sort"),
  };

  return <AllJobsClient initial={initial} />;
}