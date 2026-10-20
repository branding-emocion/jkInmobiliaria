import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

// ✅ Corrección: maneja correctamente las nuevas líneas en PRIVATE_KEY de Vercel
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const storageBucket = process.env.FIREBASE_ADMIN_STORAGE_BUCKET || "jkinmobiliaria-576c2.appspot.com";

// ⚙️ Inicialización diferida (lazy):
// Durante el build (p. ej. en Vercel) las variables de entorno de Firebase
// pueden no estar presentes; en ese caso NO se rompe la compilación.
// El error solo aparecerá si en runtime se intenta usar el SDK sin credenciales.
const tieneCredenciales = Boolean(projectId && clientEmail && privateKey);

// 🔒 Proxy que da un mensaje claro si se usa Firebase sin credenciales
const proxySinCredenciales = () =>
  new Proxy(
    {},
    {
      get() {
        throw new Error(
          "⚠️ Firebase Admin no está configurado: define FIREBASE_ADMIN_PROJECT_ID, " +
            "FIREBASE_ADMIN_CLIENT_EMAIL y FIREBASE_ADMIN_PRIVATE_KEY en tu entorno (o en Vercel → Settings → Environment Variables)."
        );
      },
    }
  );

export let adminDb;
export let adminAuth;
export let adminStorage;

if (tieneCredenciales) {
  const app =
    getApps().length === 0
      ? initializeApp({
          credential: cert({ projectId, clientEmail, privateKey }),
          storageBucket,
        })
      : getApps()[0];

  adminDb = getFirestore(app);
  adminAuth = getAuth(app);
  adminStorage = getStorage(app);
} else {
  console.warn(
    "⚠️ FIREBASE_ADMIN_* sin definir: Firebase Admin queda inactivo (afecta solo a las APIs; el build sigue funcionando)."
  );
  adminDb = proxySinCredenciales();
  adminAuth = proxySinCredenciales();
  adminStorage = proxySinCredenciales();
}
