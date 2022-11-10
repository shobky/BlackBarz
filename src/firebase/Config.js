// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUxp0Xe-43P7QfmeyHpuW7b4YBMshazIk",
    authDomain: "black-barz.firebaseapp.com",
    projectId: "black-barz",
    storageBucket: "black-barz.appspot.com",
    messagingSenderId: "1072565459629",
    appId: "1:1072565459629:web:387e187a4da29ac78f0424",
    measurementId: "G-JCERKC600Q"
};

// Initialize Firebase

// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithRedirect(auth,provider);
export const db = getFirestore(app);
export const storage = getStorage(app);
// auth.languageCode = 'it'
// auth.useDeviceLanguage();