import Link from "next/link";

export default function CategoriesIndexPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-gray-900">Categories</h1>
      <p className="text-gray-600 mt-2">
        Browse Technical job categories and explore roles by specialty.
      </p>

      <div className="mt-8">
        <Link className="text-[#6F00FC] underline" href="/#jobs">
          Browse all jobs
        </Link>
      </div>
    </main>
  );
}
