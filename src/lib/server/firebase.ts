import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FB_API_KEY, FB_AUTH_DOMAIN, FB_PROJECT_ID, FB_STORAGE_BUCKET, FB_MESSAGING_SENDER_ID, FB_APP_ID, FB_MEASUREMENT_ID } from "$env/static/private"
export function getDB() {
  if (getApps().length == 0) {
    const firebaseCfg = {
      apiKey: FB_API_KEY,
      authDomain: FB_AUTH_DOMAIN,
      projectId: FB_PROJECT_ID,
      storageBucket: FB_STORAGE_BUCKET,
      messagingSenderId: FB_MESSAGING_SENDER_ID,
      appId: FB_APP_ID,
      measurementId: FB_MEASUREMENT_ID,
    };

    initializeApp(firebaseCfg);
  }

  return { db: getFirestore() };
}