// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdH5Rt6gXPq4ATabI0k4o5S4yGzl3EPbs",
  authDomain: "tes1-787c4.firebaseapp.com",
  projectId: "tes1-787c4",
  storageBucket: "tes1-787c4.appspot.com",
  messagingSenderId: "177608753298",
  appId: "1:177608753298:web:c4a902a2de40dcf542264b",
  measurementId: "G-TFD450ZZEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);