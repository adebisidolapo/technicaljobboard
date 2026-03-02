import AllJobsClient from "./AllJobsClient";

export const dynamic = "force-dynamic";

export default async function AllJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // normalize params (string only)
  const get = (k: string) => {
    const v = searchParams?.[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const initial = {
    q: get("q") ?? "",
    loc: get("loc") ?? "",
    cat: get("cat") ?? "",
    jobType: get("jobType") ?? "",
    remote: get("remote") ?? "",
    salaryMin: get("salaryMin") ?? "",
    salaryMax: get("salaryMax") ?? "",
    posted: get("posted") ?? "",
    sort: get("sort") ?? "relevance",
  };

  return (
    <main className="bg-[#F3F6FB] text-[#0F172A]">
      <AllJobsClient initial={initial} />
    </main>
  );
}