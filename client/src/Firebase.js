// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "assureestate-c2bfc.firebaseapp.com",
  projectId: "assureestate-c2bfc",
  storageBucket: "assureestate-c2bfc.appspot.com",
  messagingSenderId: "562642634894",
  appId: "1:562642634894:web:802fd1523e11cf3e16a1df",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
