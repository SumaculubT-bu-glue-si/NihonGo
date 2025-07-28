// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "nihon-go-2mh73",
  "appId": "1:325869691810:web:4e1af3147e0188ceba08fb",
  "storageBucket": "nihon-go-2mh73.firebasestorage.app",
  "apiKey": "AIzaSyDX4Gw5dFC0Ha81uQ7qrIG4u2b5619E0-U",
  "authDomain": "nihon-go-2mh73.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "325869691810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
