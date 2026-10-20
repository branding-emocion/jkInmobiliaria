// Firebase Client Configuration (Frontend)
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ⚙️ Inicialización diferida (lazy):
// Durante el build/prerender (p. ej. en Vercel) las variables
// NEXT_PUBLIC_FIREBASE_* pueden no estar definidas; en ese caso NO se
// rompe la compilación. Solo fallará (con mensaje claro) si en runtime
// se intenta usar auth/db/storage sin configuración.
const tieneConfig = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

// 🔒 Proxy que da un mensaje claro si se usa Firebase client sin variables
const proxySinConfig = () =>
  new Proxy(
    {},
    {
      get() {
        throw new Error(
          "⚠️ Firebase Client no está configurado: define las variables NEXT_PUBLIC_FIREBASE_* en tu .env.local (o en Vercel → Settings → Environment Variables)."
        );
      },
    }
  );

let app;
if (tieneConfig) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} else {
  console.warn(
    "⚠️ NEXT_PUBLIC_FIREBASE_* sin definir: Firebase Client queda inactivo (el build/prerender sigue funcionando)."
  );
  app = proxySinConfig();
}

// Si no hay config, auth/db/storage son proxies que avisarán al usarlos
export const auth = tieneConfig ? getAuth(app) : proxySinConfig();
export const db = tieneConfig ? getFirestore(app) : proxySinConfig();
export const storage = tieneConfig ? getStorage(app) : proxySinConfig();
export default app;
