import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';


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
const app = initializeApp(firebaseConfig);

// Inicialize o Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Inicialize o Firestore
const db = getFirestore(app);
const storage = firebase.storage();

export { auth, db, storage };

