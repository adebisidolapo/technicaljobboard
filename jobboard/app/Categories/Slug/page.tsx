import Link from "next/link";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/categories" className="text-sm text-gray-600 underline">
        ← Back to Categories
      </Link>

      <h1 className="text-3xl font-semibold text-gray-900 mt-6">
        Category: {slug.replaceAll("-", " ")}
      </h1>

      <p className="text-gray-600 mt-3">
        This page will show featured roles, salary ranges, and top companies for this category.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href={`/?category=${slug}#jobs`}
          className="px-5 py-3 rounded-2xl bg-[#6F00FC] text-white font-semibold hover:bg-[#8C33FD] transition"
        >
          View jobs in this category
        </Link>

        <Link
          href="/#jobs"
          className="px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-900 font-semibold hover:shadow-sm transition rounded-2xl"
        >
          Browse all jobs
        </Link>
      </div>
    </main>
  );
}
