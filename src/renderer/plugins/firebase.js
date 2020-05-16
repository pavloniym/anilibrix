import firebase from 'firebase/app'
import 'firebase/firestore'

export default firebase
  .initializeApp({
    appId: process.env.FIREBASE_APP_ID || "",
    apiKey: process.env.FIREBASE_API_KEY || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    databaseURL: process.env.FIREBASE_DATABSE_URL || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  })
  .firestore()
