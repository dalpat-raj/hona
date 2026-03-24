import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX-KPpuPJFKAthjHh5dT8-S-o8wwlxL5g",
  authDomain: "thecontrive-4d0b8.firebaseapp.com",
  projectId: "thecontrive-4d0b8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



export const verifyOTP = async (confirmation: any, otp: string) => {
  const result = await confirmation.confirm(otp);
  return result.user;
};


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAX-KPpuPJFKAthjHh5dT8-S-o8wwlxL5g",
//   authDomain: "thecontrive-4d0b8.firebaseapp.com",
//   projectId: "thecontrive-4d0b8",
//   storageBucket: "thecontrive-4d0b8.firebasestorage.app",
//   messagingSenderId: "1037784313389",
//   appId: "1:1037784313389:web:d164f1bb2cc4d47658d2a4",
//   measurementId: "G-4ZLKLSPM2V"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);