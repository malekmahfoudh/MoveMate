import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3c5k_cF9x24D-p0Xk6WIItFZ36c0CfQc",
  authDomain: "movemate-d1b64.firebaseapp.com",
  projectId: "movemate-d1b64",
  storageBucket: "movemate-d1b64.appspot.com",
  messagingSenderId: "85502338063",
  appId: "1:85502338063:web:b7d7436e66f0b835a2ef7a",
  measurementId: "G-DR6Q0GHH28",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
