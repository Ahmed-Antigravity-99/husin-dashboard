import { bundlesRef } from "@/lib/firestore";

// Ensure searchParams is accepted as a promise
export default async function BundlesPage({ searchParams }) {
  // We await searchParams even if not used, to satisfy the Next.js 15 compiler
  const params = await searchParams;

  const snapshot = await bundlesRef.get();

  const bundles = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Bundles</h1>

      {/* Scannable display of your data */}
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
        {JSON.stringify(bundles, null, 2)}
      </pre>
    </div>
  );
}
