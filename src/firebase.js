// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJC5On87wk9k0wJg2p__C1LpsYC8-F07A",
  authDomain: "mascotas-felices-fba2f.firebaseapp.com",
  projectId: "mascotas-felices-fba2f",
  storageBucket: "mascotas-felices-fba2f.firebasestorage.app",
  messagingSenderId: "61732435431",
  appId: "1:61732435431:web:48491987ad44b776e4b942",
  measurementId: "G-PWHBZF2PHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);