import admin from "firebase-admin";

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!admin.apps.length) {
  // Only attempt to initialize if we have all credentials
  // This prevents the "invalid-credential" crash during the Vercel build phase
  if (clientEmail && privateKey && projectId) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      console.log("Firebase Admin initialized.");
    } catch (error) {
      console.error("Firebase Admin init error:", error.message);
    }
  } else {
    // During build, Vercel sometimes lacks access to these vars. 
    // We log a warning instead of letting the app crash.
    console.warn("Firebase Admin credentials missing - skipping init during build.");
  }
}

// Export a safe reference to the database
const adminDb = admin.apps.length ? admin.firestore() : null;

export { adminDb };
export default admin;
