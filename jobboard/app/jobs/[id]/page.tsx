export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Job Details</h1>
      <p className="mt-2 text-slate-600">
        Job ID: {params.id}
      </p>

      <p className="mt-6 text-sm text-slate-500">
        This page will show full job info later.
      </p>
    </main>
  );
}
