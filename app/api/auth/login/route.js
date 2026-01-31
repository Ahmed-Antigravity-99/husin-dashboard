import { db } from "@/lib/firestore";
import admin from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    // Example: validate credentials (adjust to your auth logic)
    const { email, password } = body;
    // This is a placeholder. Replace with your real auth check.
    const users = await db.collection("users").where("email", "==", email).get();
    if (users.empty) {
      return Response.json({ success: false, message: "User not found" }, { status: 401 });
    }
    const user = users.docs[0].data();
    // NOTE: do not store plaintext passwords in production
    if (user.password !== password) {
      return Response.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Create a custom token (example)
    const token = await admin.auth().createCustomToken(users.docs[0].id);

    return Response.json({ success: true, token });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
