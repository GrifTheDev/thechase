import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { PUBLIC_FB_API_KEY, PUBLIC_FB_AUTH_DOMAIN, PUBLIC_FB_PROJECT_ID, PUBLIC_FB_STORAGE_BUCKET, PUBLIC_FB_MESSAGING_SENDER_ID, PUBLIC_FB_APP_ID, PUBLIC_FB_MEASUREMENT_ID } from "$env/static/public"
export function getDB() {
  if (getApps().length == 0) {
    const firebaseCfg = {
      apiKey: PUBLIC_FB_API_KEY,
      authDomain: PUBLIC_FB_AUTH_DOMAIN,
      projectId: PUBLIC_FB_PROJECT_ID,
      storageBucket: PUBLIC_FB_STORAGE_BUCKET,
      messagingSenderId: PUBLIC_FB_MESSAGING_SENDER_ID,
      appId: PUBLIC_FB_APP_ID,
      measurementId: PUBLIC_FB_MEASUREMENT_ID,
    };

    initializeApp(firebaseCfg);
  }

  return { db: getFirestore() };
}