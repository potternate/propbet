import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Check if all required environment variables are present and have values
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_DATABASE_URL'
];

const missingEnvVars = requiredEnvVars.filter(varName => {
  const value = import.meta.env[varName];
  return !value || value.trim() === '';
});

if (missingEnvVars.length > 0) {
  const errorMessage = `Missing or empty Firebase configuration values for: ${missingEnvVars.join(', ')}`;
  console.error(errorMessage);
  console.error('Please check your .env file and ensure all Firebase configuration values are set correctly.');
  throw new Error(errorMessage);
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Validate that none of the config values are undefined
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value || value.trim() === '') {
    throw new Error(`Firebase configuration value for ${key} is missing or empty`);
  }
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);