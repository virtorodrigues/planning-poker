// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "planning-poker-d0378.firebaseapp.com",
  projectId: "planning-poker-d0378",
  storageBucket: "planning-poker-d0378.appspot.com",
  messagingSenderId: "368833873200",
  appId: "1:368833873200:web:bd000ca053c3e6f3bef4f5",
  measurementId: "G-W14J6BFJKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
