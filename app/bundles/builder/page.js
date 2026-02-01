export const dynamic = "force-dynamic";
import { productsRef } from "@/lib/firestore";

export default async function BundleBuilderPage() {
  const snapshot = await productsRef
    .where("status", "==", "approved")
    .where("published", "==", true)
    .get();

  const products = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Bundle Builder</h1>
      <p className="mb-4 text-sm text-gray-600">
        Select approved products and create bundles.
      </p>

      <pre>{JSON.stringify(products, null, 2)}</pre>
      {/* يمكن لاحقاً تحويلها لواجهة اختيارية مع checkboxes */}
    </div>
  );
}

