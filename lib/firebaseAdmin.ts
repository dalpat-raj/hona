import { initializeApp, getApps, cert } from "firebase-admin/app";

const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ?.replace(/\\\\n/g, "\n")
  ?.replace(/\\n/g, "\n")
  ?.trim();


const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey,
};

export const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(firebaseAdminConfig),
      })
    : getApps()[0];

