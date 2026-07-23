import admin from 'firebase-admin';
import { env } from '../config/env.js';

let app = null;

export const getFirebaseAdminAuth = () => {
  if (!app) {
    const serviceAccountStr = env.firebaseServiceAccount;
    if (serviceAccountStr) {
      try {
        const serviceAccount = JSON.parse(serviceAccountStr);
        app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } catch (error) {
        console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT:', error.message);
      }
    } else {
      console.warn('[firebase-admin] FIREBASE_SERVICE_ACCOUNT is not configured. Live Firebase verify will fail.');
    }
  }
  return app ? app.auth() : null;
};
