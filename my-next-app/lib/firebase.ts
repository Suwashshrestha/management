// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyOky-1gxlfwc46Dywd5einl_2fzrZELE",
  authDomain: "auth-db-4fd05.firebaseapp.com",
  projectId: "auth-db-4fd05",
  storageBucket: "auth-db-4fd05.firebasestorage.app",
  messagingSenderId: "328601164723",
  appId: "1:328601164723:web:d7a35497304bf2607d49c6",
  measurementId: "G-Z9YZGN46XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {app, auth};
