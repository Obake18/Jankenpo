import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfiGZ93sf2MwcQQetYT4JnIWJ4PC6z-r8",
  authDomain: "jankenbase.firebaseapp.com",
  databaseURL: "https://jankenbase-default-rtdb.firebaseio.com",
  projectId: "jankenbase",
  storageBucket: "jankenbase.appspot.com",
  messagingSenderId: "721042993553",
  appId: "1:721042993553:web:2906eca1b6a8a7e6a46a30",
  measurementId: "G-GCL2T2TKTY"
};

// Inicialize o app Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicialize o Firebase Auth
const auth = !getAuth(app).app ? initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
}) : getAuth(app);

// Inicialize o Firestore
const db = getFirestore(app);

// Inicialize o Firebase Storage
const storage = getStorage(app);

export { auth, db, storage };
