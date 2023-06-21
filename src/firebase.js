 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR8jrm55JaIaqD08duyHA1WAHjaZNFDd4",
  authDomain: "chatapp-firebase-7e6f5.firebaseapp.com",
  projectId: "chatapp-firebase-7e6f5",
  storageBucket: "chatapp-firebase-7e6f5.appspot.com",
  messagingSenderId: "1088351739624",
  appId: "1:1088351739624:web:733fb08b5db359b648735d",
  measurementId: "G-9PJWNJW5DV"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);