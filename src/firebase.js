import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs7AD6vFZFbAqSY6j0nPGZGISRVPTKMbA",
  authDomain: "lru-cache-whatsapp-web-clone.firebaseapp.com",
  projectId: "lru-cache-whatsapp-web-clone",
  storageBucket: "lru-cache-whatsapp-web-clone.appspot.com",
  messagingSenderId: "40370111128",
  appId: "1:40370111128:web:4c6f3e9f4847a01a99c6ed",
  measurementId: "G-TPWDMJZ98C"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
