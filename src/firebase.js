import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Replace these values with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCeroJm-67Lq0R8IOfi6XtnzxGjQ4U3cp0",
  authDomain: "projectportfolio-e3bcf.firebaseapp.com",
  projectId: "projectportfolio-e3bcf",
  storageBucket: "projectportfolio-e3bcf.firebasestorage.app",
  messagingSenderId: "772250676644",
  appId: "1:772250676644:web:a3325c5c55f87c167c2531",
  measurementId: "G-1Y2QSB34TD"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
