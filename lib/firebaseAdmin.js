import admin from "firebase-admin";

// 1. Get the vars
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// 2. Only initialize if WE ARE NOT in the build factory and we have keys
if (!admin.apps.length) {
  if (clientEmail && privateKey && projectId) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    } catch (e) {
      console.error("Firebase Admin init failed:", e.message);
    }
  } else {
    // THIS LINE SAVES THE BUILD
    console.warn("Building without Firebase Admin credentials. App will init at runtime.");
  }
}

// 3. Export a "Safe" DB reference
export const adminDb = admin.apps.length ? admin.firestore() : null;
export default admin;
