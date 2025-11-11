// Firebase Admin SDK Configuration (Backend/API Routes)
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        storageBucket: "jkinmobiliaria-576c2.firebasestorage.app", // ✅ tu bucket correcto
      })
    : getApps()[0];

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);

// ✅ getStorage() ya usa el bucket configurado arriba
export const adminStorage = getStorage(app);
