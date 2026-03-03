import AllJobsClient from "./AllJobsClient";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string {
  if (!v) return "";
  return Array.isArray(v) ? (v[0] ?? "") : v;
}

export default async function AllJobsPage(props: { searchParams?: any }) {
  // Next may pass searchParams as a Promise in some builds
  const sp: SearchParams = await Promise.resolve(props.searchParams ?? {});

  const initial = {
    q: first(sp.q),
    loc: first(sp.loc) || first(sp.location), // support both keys
    cat: first(sp.cat),
    jobType: first(sp.jobType),
    remote: first(sp.remote),
    salaryMin: first(sp.salaryMin),
    salaryMax: first(sp.salaryMax),
    posted: first(sp.posted),
    sort: first(sp.sort),
  }; 

  return <AllJobsClient initial={initial} />;
}