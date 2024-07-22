
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
      apiKey: "AIzaSyDCJn2KtHEeHNIdQMSLrcNsheQZIBMiIck",
      authDomain: "winrahtrain.firebaseapp.com",
      databaseURL: "https://winrahtrain-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "winrahtrain",
      storageBucket: "winrahtrain.appspot.com",
      messagingSenderId: "109651923705",
      appId: "1:109651923705:web:2de5f243acaeeaa7204828"
};

export const fb_app = initializeApp(firebaseConfig);
export const db = getDatabase(fb_app);
export const REPORTS_REF = "reports";
