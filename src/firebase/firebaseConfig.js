import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgvZ2TuHpMIIIz-jRXWXtgpfhfsb-2uKc",
  authDomain: "ecommerce-login-93fe4.firebaseapp.com",
  projectId: "ecommerce-login-93fe4",
  storageBucket: "ecommerce-login-93fe4.firebasestorage.app",
  messagingSenderId: "19906240215",
  appId: "1:19906240215:web:21737d88c5aed96a23da92",
  measurementId: "G-69QTF8RESJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default auth