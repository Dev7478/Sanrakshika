// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhUGSY1m-TseQek4RshQIHFWDp-fdtyuY",
  authDomain: "sanrakshika-signup.firebaseapp.com",
  projectId: "sanrakshika-signup",
  storageBucket: "sanrakshika-signup.firebasestorage.app",
  messagingSenderId: "340282821194",
  appId: "1:340282821194:web:be627d572996ce9afbf4b3",
  measurementId: "G-5628FL6205"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
export default app;