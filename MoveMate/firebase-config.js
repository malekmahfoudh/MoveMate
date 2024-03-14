// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3c5k_cF9x24D-p0Xk6WIItFZ36c0CfQc",
  authDomain: "movemate-d1b64.firebaseapp.com",
  projectId: "movemate-d1b64",
  storageBucket: "movemate-d1b64.appspot.com",
  messagingSenderId: "85502338063",
  appId: "1:85502338063:web:b7d7436e66f0b835a2ef7a",
  measurementId: "G-DR6Q0GHH28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);