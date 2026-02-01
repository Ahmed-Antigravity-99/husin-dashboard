import { adminDb } from "@/lib/firebaseAdmin";
import ProductTable from "@/components/ProductTable";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }) {
  await searchParams;

  // Fetch real data from your husin-network Firestore
  const snapshot = await adminDb.collection("products").get();
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-500">Review and action agent-found opportunities.</p>
      </div>
      
      <ProductTable products={products} />
    </div>
  );
}
