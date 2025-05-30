import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwoQFT1sKtc7FvM-JeQvrkzpCUQOLusT4",
  authDomain: "codestreak-9b976.firebaseapp.com",
  projectId: "codestreak-9b976",
  storageBucket: "codestreak-9b976.firebasestorage.app",
  messagingSenderId: "461866500756",
  appId: "1:461866500756:web:82c9985a3a26855a80aa81",
  measurementId: "G-JP2JX88EQ5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; 