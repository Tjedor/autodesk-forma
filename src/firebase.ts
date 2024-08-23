// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const initializeFirebase = (apiKey: string) => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "autodesk-forma.firebaseapp.com",
    projectId: "autodesk-forma",
    storageBucket: "autodesk-forma.appspot.com",
    messagingSenderId: "467932646304",
    appId: "1:467932646304:web:b5497497a23c712b9e72c5",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  const db = getFirestore();
  return db;
};
