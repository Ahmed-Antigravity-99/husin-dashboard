import admin from "firebase-admin";

const initializeAdmin = () => {
  if (admin.apps.length > 0) return admin.apps[0];

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) {
    return null; // Build-time safety
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n')
      }),
    });
  } catch (e) {
    return null;
  }
};

const app = initializeAdmin();
export const adminDb = app ? app.firestore() : null;
export const db = adminDb;
export default admin;
