// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEOArF8Av4XwLm-FRhbk23-AdzUjO5aMk",
  authDomain: "photofolio-735a6.firebaseapp.com",
  projectId: "photofolio-735a6",
  storageBucket: "photofolio-735a6.firebasestorage.app",
  messagingSenderId: "165351431217",
  appId: "1:165351431217:web:65a272f9175cdac7e5c910",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
