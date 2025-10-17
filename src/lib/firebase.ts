import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Debug: Log environment variables
console.log('Firebase Config Check:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✓ Set' : '✗ Missing',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? '✓ Set' : '✗ Missing',
});

// Initialize Firebase only if all required env vars are present
let app = null;
let auth = null;

const hasAllFirebaseVars = import.meta.env.VITE_FIREBASE_API_KEY && 
                           import.meta.env.VITE_FIREBASE_PROJECT_ID && 
                           import.meta.env.VITE_FIREBASE_APP_ID;

if (hasAllFirebaseVars) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
} else {
  console.warn('⚠️ Firebase not configured - Auth features will be limited');
  console.warn('Set VITE_FIREBASE_* variables in .env or deployment environment');
}

export { auth };
export default app;
