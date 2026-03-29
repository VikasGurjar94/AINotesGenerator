// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  // apiKey: "AIzaSyAv2ly2CN1x5YPl7gEVh00_9jb9bw43u3Q",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authnotes-a9c7d.firebaseapp.com",
  projectId: "authnotes-a9c7d",
  storageBucket: "authnotes-a9c7d.firebasestorage.app",
  messagingSenderId: "314383986492",
  appId: "1:314383986492:web:75557cd068860c2fe6b839",
  measurementId: "G-4Z52J4LGV0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app) 
const provider = new GoogleAuthProvider() ;
export {auth , provider} 
