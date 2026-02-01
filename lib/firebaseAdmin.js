import admin from "firebase-admin";

const initializeAdmin = () => {
  if (admin.apps.length > 0) return admin.apps[0];

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) {
    // Return a "Proxy" object that doesn't crash when .collection() is called
    // but also doesn't do anything.
    return {
      firestore: () => ({
        collection: () => ({
          where: () => ({ get: async () => ({ docs: [] }) }),
          get: async () => ({ docs: [] })
        })
      })
    };
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n').replace(/"/g, ''),
      }),
    });
  } catch (error) {
    return null;
  }
};

const app = initializeAdmin();
export const adminDb = (app && typeof app.firestore === 'function') ? app.firestore() : app; 
export const db = adminDb;
export default admin;
