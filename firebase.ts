// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAldKBZtuz5egCnKvrVucjfZMIzHm3KePs",
  authDomain: "dalapt-raj.firebaseapp.com",
  projectId: "dalapt-raj",
  storageBucket: "dalapt-raj.firebasestorage.app",
  messagingSenderId: "276221498207",
  appId: "1:276221498207:web:38ace6cd613b3bb630dcea"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export {auth}