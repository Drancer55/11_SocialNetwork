// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdgQmiFyr3cfLqTxlM0JgCSsqY6_qpf1Q",
  authDomain: "bikerband-socialnetwork.firebaseapp.com",
  projectId: "bikerband-socialnetwork",
  storageBucket: "bikerband-socialnetwork.appspot.com",
  messagingSenderId: "751185796417",
  appId: "1:751185796417:web:66ac965912cd3a91f855c0",
  measurementId: "G-JVY9T2P665"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
