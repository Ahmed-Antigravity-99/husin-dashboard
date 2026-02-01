import admin from "firebase-admin";

const initializeAdmin = () => {
  if (admin.apps.length > 0) return admin.apps[0];

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  // 1. DIAGNOSTIC LOG (You will see this in the Vercel Build Log)
  console.log("--- Firebase Build-Time Check ---");
  console.log("Project ID found:", !!projectId);
  console.log("Client Email found:", !!clientEmail);
  console.log("Private Key found:", !!privateKey);
  console.log("---------------------------------");

  // 2. SAFETY GATE: If any are missing, STOP here and don't crash the build
  if (!clientEmail || !privateKey || !projectId) {
    console.warn("⚠️ Firebase Admin: Missing keys. Initialization deferred to runtime.");
    return null;
  }

  try {
    // 3. Format the private key safely
    const formattedKey = privateKey.replace(/\\n/g, '\n').replace(/"/g, '');

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: formattedKey,
      }),
    });
  } catch (error) {
    console.error("❌ Firebase Admin Init Error:", error.message);
    return null;
  }
};

const app = initializeAdmin();
export const adminDb = app ? app.firestore() : null;
export default admin;
