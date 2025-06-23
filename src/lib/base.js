import * as firebase from "firebase/app";
import "firebase/storage";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/**
 * Firebase configuration object containing keys and identifiers for the LMS Cloudend project.
 *
 * @constant
 * @type {Object}
 * @property {string} apiKey - API key for Firebase authentication.
 * @property {string} authDomain - Auth domain for Firebase authentication.
 * @property {string} projectId - Unique identifier for the Firebase project.
 * @property {string} storageBucket - Cloud Storage bucket for the project.
 * @property {string} messagingSenderId - Sender ID for Firebase Cloud Messaging.
 * @property {string} appId - Unique identifier for the Firebase app.
 * @property {string} measurementId - Identifier for Google Analytics measurement.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDVyJTB998RJsfVZbpqfez1drHja5bovdg",
  authDomain: "lms-cloudend.firebaseapp.com",
  projectId: "lms-cloudend",
  storageBucket: "lms-cloudend.firebasestorage.app",
  messagingSenderId: "1085664248312",
  appId: "1:1085664248312:web:4a4dc1a8284a6d9ddb960d",
  measurementId: "G-DHSVCJDKES",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
