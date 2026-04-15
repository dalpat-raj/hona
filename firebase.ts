// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyB2ierPguNqsOYqBaksf3JgCMyJWHfMdh8",
  authDomain: "test-562b8.firebaseapp.com",
  projectId: "test-562b8",
  storageBucket: "test-562b8.firebasestorage.app",
  messagingSenderId: "473796741117",
  appId: "1:473796741117:web:f63e06eb058df49067bb94"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export {auth}