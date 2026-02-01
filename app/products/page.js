import ProductTable from "@/components/ProductTable";

// We make the function 'async' to match Next.js 15 standards
export default async function ProductsPage({ searchParams }) {
  // We unwrap searchParams in case you add filtering/searching later
  const params = await searchParams;

  return (
    <div className="p-6">
      <ProductTable />
    </div>
  );
}
