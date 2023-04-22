// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBoz77Nu0RrBg0a2X2ZwTOB5kQaKHb7By8",
	authDomain: "netflix-clone-app-2bc65.firebaseapp.com",
	projectId: "netflix-clone-app-2bc65",
	storageBucket: "netflix-clone-app-2bc65.appspot.com",
	messagingSenderId: "1091984126737",
	appId: "1:1091984126737:web:f5615e3f7316a2c69c92b0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
