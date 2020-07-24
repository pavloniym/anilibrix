import * as firebase from "firebase/app";
import "firebase/firestore";


// Initialize Firebase
export default firebase
  .initializeApp({
    appId: process.env.FIREBASE_APP_ID,
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
  })
  .firestore();
