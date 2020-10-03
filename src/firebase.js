import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCAhUUVPQqOu_OHJNKBbIs_HApr51liYV8",
  authDomain: "express-attendance-df979.firebaseapp.com",
  databaseURL: "https://express-attendance-df979.firebaseio.com",
  projectId: "express-attendance-df979",
  storageBucket: "express-attendance-df979.appspot.com",
  messagingSenderId: "755735351956",
  appId: "1:755735351956:web:9608be490c7f39cbcc9a81",
  measurementId: "G-F93NJVWXQN",
});

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export const firestore = firebase.firestore();
