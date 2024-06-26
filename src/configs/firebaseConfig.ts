// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD-Dqghydt_KeSOsG91SJJ79HsscEF5Avs",
  authDomain: "lawchat-main.firebaseapp.com",
  projectId: "lawchat-main",
  storageBucket: "lawchat-main.appspot.com",
  messagingSenderId: "356315804936",
  appId: "1:356315804936:web:36cd0d98ed8e1ca7afa8bd",
  measurementId: "G-3RQVQ2G1H5"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage
const auth = getAuth(app); // Initialize Authentication

// Firebase Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export Firebase instances and providers
export { app, firestore, storage, auth, googleProvider, facebookProvider };

// Export Firestore collections and utilities
export const database = {
  folders: collection(firestore, "folders"),
  files: collection(firestore, "files"),
  formatDoc: (doc: any) => ({
    id: doc.id,
    ...doc.data()
  }),
  getCurrentTimestamp: () => getFirestore.Timestamp.now()
};
