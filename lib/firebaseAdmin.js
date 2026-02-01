import admin from "firebase-admin";

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!admin.apps.length && clientEmail && privateKey && projectId) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  } catch (e) {
    console.error("Admin Init Error:", e.message);
  }
}

// Ensure adminDb is only defined if initialization succeeded
export const adminDb = admin.apps.length ? admin.firestore() : null;
export default admin;
