import admin from "firebase-admin";

// We wrap this in a function or a check so it doesn't crash the Vercel build
const initializeAdmin = () => {
  if (admin.apps.length > 0) return admin.apps[0];

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  // If we are missing keys during build, don't crash, just log a warning
  if (!clientEmail || !privateKey || !projectId) {
    console.warn("Firebase Admin credentials missing. Initialization skipped.");
    return null;
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    }),
  });
};

const app = initializeAdmin();
const adminDb = app ? app.firestore() : null;

export { adminDb };
export default admin;
