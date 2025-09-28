// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKdKXDfbrsHcoY-ogS9j-6FIKnHNIPnqU",
  authDomain: "taskbuddy-9b8af.firebaseapp.com",
  projectId: "taskbuddy-9b8af",
  storageBucket: "taskbuddy-9b8af.appspot.com",
  messagingSenderId: "902176865756",
  appId: "1:902176865756:web:6b803e054b7ee230752319"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
