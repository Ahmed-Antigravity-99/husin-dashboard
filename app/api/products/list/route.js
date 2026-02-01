export const dynamic = "force-dynamic";
import { db } from "@/lib/firestore";

export async function GET() {
  const snapshot = await db.collection("products").get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return Response.json(products);
}

