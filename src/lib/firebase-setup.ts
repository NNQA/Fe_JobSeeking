// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXml0ozblxEoG_j48LQUG5NYQeMG4jJXk",
  authDomain: "meals-ad52b.firebaseapp.com",
  databaseURL: "https://meals-ad52b-default-rtdb.firebaseio.com",
  projectId: "meals-ad52b",
  storageBucket: "meals-ad52b.firebasestorage.app",
  messagingSenderId: "22191584799",
  appId: "1:22191584799:web:5dfd7410c85e9a2f90c72a",
  measurementId: "G-E4HJE911WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);