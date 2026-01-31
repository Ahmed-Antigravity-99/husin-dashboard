import { db } from "@/lib/firestore";
import { v4 as uuid } from "uuid";

export async function POST(request) {
  try {
    const body = await request.json();
    const id = uuid();

    await db.collection("bundles").doc(id).set({
      id,
      name: body.name,
      products: body.products || [],
      createdAt: Date.now(),
      status: "pending"
    });

    return Response.json({ success: true, id });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
