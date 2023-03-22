// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDRThufWeMl69WKci7AoXZF0nAp96RDAxU",
  authDomain: "loginnew-9896c.firebaseapp.com",
  projectId: "loginnew-9896c",
  storageBucket: "loginnew-9896c.appspot.com",
  messagingSenderId: "402876078560",
  appId: "1:402876078560:web:a0fb67f240f42f05ba3385",
  measurementId: "G-EZGDYC9MGL"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth};