// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAalBKvO-jME8tLRv9OPPb-EtFyUZmtSeI",
  authDomain: "autodesk-forma.firebaseapp.com",
  projectId: "autodesk-forma",
  storageBucket: "autodesk-forma.appspot.com",
  messagingSenderId: "467932646304",
  appId: "1:467932646304:web:b5497497a23c712b9e72c5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
