import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function CategoryPage({ params }: Props) {
  const slug = params?.slug;

  if (!slug) return notFound();

  const pretty = slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/categories"
        className="text-sm text-slate-600 underline underline-offset-4"
      >
        ← Back to Categories
      </Link>

      <h1 className="text-3xl font-extrabold text-slate-900 mt-6">{pretty}</h1>

      <p className="text-slate-600 mt-3 max-w-2xl">
        Explore roles, pay ranges, and opportunities in this Technical category.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href={`/all-jobs?cat=${encodeURIComponent(pretty)}`}
          className="px-6 py-3 rounded-2xl bg-[var(--brand-purple)] text-white font-semibold hover:bg-[var(--brand-purple-dark)] transition text-center"
        >
          View jobs in this category
        </Link>

        <Link
          href="/all-jobs"
          className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold hover:shadow-sm transition text-center"
        >
          Browse all jobs
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-600">
          Tip: This page is a category landing page. Your actual listings are on{" "}
          <span className="font-semibold">/all-jobs</span>.
        </p>
      </div>
    </div>
  );
}