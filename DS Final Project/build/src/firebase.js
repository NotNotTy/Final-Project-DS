// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwe5T1DSjrcNkn6-DFWa_v-6QVCNMscKI",
  authDomain: "ds-final-0.firebaseapp.com",
  projectId: "ds-final-0",
  storageBucket: "ds-final-0.appspot.com",
  messagingSenderId: "76575066859",
  appId: "1:76575066859:web:4fd45acd23d67633aa0cae",
  measurementId: "G-XHCXXDWB3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};