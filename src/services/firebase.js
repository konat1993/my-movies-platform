import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC4zwr7Gnhvcp8zVHoCbNhwgJEqH3nBZI4",
    authDomain: "my-movies-platform.firebaseapp.com",
    projectId: "my-movies-platform",
    storageBucket: "my-movies-platform.appspot.com",
    messagingSenderId: "670538797564",
    appId: "1:670538797564:web:efddf62b2e8a8d4b0ea279"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()

// const googleProvider = new firebase.auth.GoogleAuthProvider()

export { db, auth }