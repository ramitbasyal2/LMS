// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginlms-c907c.firebaseapp.com",
  projectId: "loginlms-c907c",
  storageBucket: "loginlms-c907c.firebasestorage.app",
  messagingSenderId: "727414270329",
  appId: "1:727414270329:web:dd7e5a7cd99b13acb1e7a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}