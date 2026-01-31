import { bundlesRef } from "@/lib/firestore";

export default async function BundlesPage() {
  const snapshot = await bundlesRef.get();

  const bundles = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Bundles</h1>

      <pre>{JSON.stringify(bundles, null, 2)}</pre>
    </div>
  );
}
