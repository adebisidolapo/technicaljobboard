import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params?: { slug?: string };
}) {
  const slug = params?.slug ?? "category";

  const pretty = slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-gray-600 underline">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-semibold text-gray-900 mt-6">{pretty}</h1>

      <p className="text-gray-600 mt-3 max-w-2xl">
        Explore roles, pay ranges, and opportunities in this Technical category.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href={`/?category=${encodeURIComponent(slug)}#jobs`}
          className="px-6 py-3 rounded-2xl bg-[#6F00FC] text-white font-semibold hover:bg-[#8C33FD] transition text-center"
        >
          View jobs in this category
        </Link>

        <Link
          href="/#jobs"
          className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-900 font-semibold hover:shadow-sm transition text-center"
        >
          Browse all jobs
        </Link>
      </div>
    </main>
  );
}
