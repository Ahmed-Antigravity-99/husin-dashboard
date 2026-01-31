import { db } from "@/lib/firestore";

export async function POST(request) {
  try {
    const { id } = await request.json();
    if (!id) return Response.json({ success: false, message: "Missing id" }, { status: 400 });

    await db.collection("products").doc(id).update({
      status: "approved",
      approvedAt: Date.now()
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
