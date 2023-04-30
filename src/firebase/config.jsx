import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIKhxsNgOGltAjhyxGqHoQF3zh_Jkwhdc",
    authDomain: "mymoney-e003a.firebaseapp.com",
    projectId: "mymoney-e003a",
    storageBucket: "mymoney-e003a.appspot.com",
    messagingSenderId: "334671685064",
    appId: "1:334671685064:web:3f107618dc4ed0dfce4cfd",
    measurementId: "G-50M198NL96"
}

//init firebase
firebase.initializeApp(firebaseConfig)

//init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export {projectFirestore,projectAuth,timestamp }
