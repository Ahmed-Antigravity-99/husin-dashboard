// app/bundles/page.js
import { adminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic"; // Ensures fresh data on every visit

export default async function BundlesPage({ searchParams }) {
  // Next.js 15: searchParams is a Promise
  await searchParams;

  // Fetching data via Admin SDK
  const snapshot = await adminDb.collection("bundles").get();
  
  const bundles = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bundles</h1>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
          {bundles.length} Active Bundles
        </span>
      </div>

      <div className="grid gap-4">
        {bundles.map((bundle) => (
          <div key={bundle.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
            <h2 className="font-semibold text-xl">{bundle.name || "Unnamed Bundle"}</h2>
            <p className="text-gray-500 text-sm italic">ID: {bundle.id}</p>
            <div className="mt-2 text-xs font-mono bg-gray-50 p-2 rounded">
              {JSON.stringify(bundle, null, 2)}
            </div>
          </div>
        ))}
      </div>

      {bundles.length === 0 && (
        <p className="text-gray-500 text-center py-20">No bundles found in Firestore.</p>
      )}
    </div>
  );
}
