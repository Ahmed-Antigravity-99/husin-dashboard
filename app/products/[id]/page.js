// app/products/[id]/page.js
import { adminDb } from "@/lib/firebaseAdmin";
import { notFound } from "next/navigation";

// Next.js 15 requires the page function to be async to await params
export default async function ProductPage({ params }) {
  // CRITICAL: Next.js 15 params is a Promise. You MUST await it.
  const { id } = await params;

  // Fetch data from Firestore using the admin SDK
  const docRef = adminDb.collection("products").doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return notFound();
  }

  const product = { id: docSnap.id, ...docSnap.data() };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">ID: {product.id}</p>
      {/* Add your product display logic here */}
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
    </div>
  );
}
