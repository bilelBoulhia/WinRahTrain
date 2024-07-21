
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
      apiKey:API_KEY,
      authDomain:authDomain,
      projectId: PROJECT_ID,
      storageBucket: storageBucket,
      messagingSenderId:messagingSenderId ,
      appId: APP_ID,
      databaseURL: DATABASE_URL,
};

export const fb_app = initializeApp(firebaseConfig);
export const db = getDatabase(fb_app);
export const reference = 'reports/';
