// app/products/page.js
import ProductTable from "@/components/ProductTable";

export default async function ProductsPage({ searchParams }) {
  // Always unwrap searchParams in Next.js 15 to avoid build warnings
  await searchParams;

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <p className="text-sm text-gray-500">Monitor and approve agent findings below.</p>
      </div>
      
      <ProductTable />
    </main>
  );
}
