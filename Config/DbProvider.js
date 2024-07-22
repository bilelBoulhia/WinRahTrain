
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
      apiKey:API_KEY,
      authDomain:AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId:MESSAGING_SENDER_ID ,
      appId: APP_ID,
      databaseURL: DATABASE_URL,
}

export const fb_app = initializeApp(firebaseConfig);
export const db = getDatabase(fb_app);
export const REPORTS_REF = "reports";
