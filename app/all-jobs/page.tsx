import AllJobsClient from "./AllJobsClient";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function AllJobsPage(props: { searchParams?: any }) {
  // Next can pass searchParams as Promise in some versions
  const sp: SearchParams = await Promise.resolve(props.searchParams ?? {});
  return <AllJobsClient searchParams={sp} />;
}