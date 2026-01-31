import { db } from "@/lib/firebaseAdmin";

export async function POST(req) {
  const { ids } = await req.json();

  const batch = db.batch();

  ids.forEach((id) => {
    const ref = db
      .collection("artifacts")
      .doc("husin-network")
      .collection("public")
      .doc("data")
      .collection("products")
      .doc(id);

    batch.update(ref, {
      status: "rejected",
      published: false,
    });
  });

  await batch.commit();

  return new Response("OK");
}
