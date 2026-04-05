import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBni2PYNS5cPRHV20E5Rg-qb_JXXgQ86sw",
  authDomain: "mlondevice-17e0a.firebaseapp.com",
  projectId: "mlondevice-17e0a",
  storageBucket: "mlondevice-17e0a.firebasestorage.app",
  messagingSenderId: "360112731879",
  appId: "1:360112731879:web:ecc19d994a61316b09d442",
  measurementId: "G-2V4WZEVM0X"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
