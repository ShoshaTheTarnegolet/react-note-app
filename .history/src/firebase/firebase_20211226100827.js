// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCXuOHRZSC9sfNQYm0m2QSrEwLVa9yn4eM',
  authDomain: 'shoshas-note-app.firebaseapp.com',
  databaseURL: 'https://shoshas-note-app-default-rtdb.firebaseio.com',
  projectId: 'shoshas-note-app',
  storageBucket: 'shoshas-note-app.appspot.com',
  messagingSenderId: '930250195477',
  appId: '1:930250195477:web:f7c3b7054921bf5151c41c',
  measurementId: 'G-4Z5EYNKSPN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
let storage = getStorage(app);

export {app, analytics, db};
