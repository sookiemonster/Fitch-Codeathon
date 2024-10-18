import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSO_VygrNlbu0kxHx-Dv_fHRJjkZEcsuo",
  authDomain: "ecoware-32410.firebaseapp.com",
  projectId: "ecoware-32410",
  storageBucket: "ecoware-32410.appspot.com",
  messagingSenderId: "58422120918",
  appId: "1:58422120918:web:f6ab63e0653ac766a21477",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//These are used for database and auth
const database = firebaseApp.firestore();
const auth = firebase.auth();

export { firebaseApp, database, auth };
