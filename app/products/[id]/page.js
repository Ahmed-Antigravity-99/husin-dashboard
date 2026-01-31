import { db } from "@/lib/firebaseAdmin";

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const doc = await db
    .collection("artifacts")
    .doc("husin-network")
    .collection("public")
    .doc("data")
    .collection("products")
    .doc(params.id)
    .get();

  if (!doc.exists) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      </div>
    );
  }

  const p = { id: doc.id, ...doc.data() };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{p.title}</h1>

      <div className="flex gap-8">
        <div>
          {p.images?.[0] && (
            <img
              src={p.images[0]}
              alt=""
              className="w-80 h-80 object-cover rounded mb-4"
            />
          )}
          <div className="text-sm text-gray-600">
            <div>Price: {p.price_sar} SAR</div>
            <div>Cost: {p.cost_sar} SAR</div>
            <div>Profit: {p.profit_sar} SAR</div>
            <div>Brand: {p.brand}</div>
            <div>Category: {p.category}</div>
            <div>Status: {p.status}</div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="mb-4 whitespace-pre-wrap">{p.description}</p>

          {p.source_url && (
            <a
              href={p.source_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              Source URL
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
