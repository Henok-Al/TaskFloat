import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "react-firebase-auth-e2255.firebaseapp.com",
  projectId: "react-firebase-auth-e2255",
  storageBucket: "react-firebase-auth-e2255.appspot.com",
  messagingSenderId: "1072090996033",
  appId: "1:1072090996033:web:675f277f343166839c95c0",
};

export const app = initializeApp(firebaseConfig);
