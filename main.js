import './style.css'
import 'iconify-icon'
import SpaceTravel from "space-travel";

import {initializeApp} from 'firebase/app';
import {getFirestore, doc, updateDoc, setDoc} from 'firebase/firestore/lite';

function set_loading() {
    document.getElementById("email-input").disabled = true;
    document.getElementById("email-submit-btn").disabled = true;
    document.getElementById("email-submit-btn").innerHTML = "Loading...";
}

function set_submitted() {
    document.getElementById("email-input").disabled = true;
    document.getElementById("email-submit-btn").disabled = true;
    document.getElementById("email-submit-btn").innerHTML = "Submitted!";
}

new SpaceTravel({ canvas: document.getElementById("canvas"), throttle: 0 }).start();

const firebaseConfig = {
    apiKey: "AIzaSyCXfDeNyilLzYtfuqGjnC2rIjtrsVj2yu4",
    authDomain: "adhyaaya-23-staging.firebaseapp.com",
    projectId: "adhyaaya-23-staging",
    storageBucket: "adhyaaya-23-staging.appspot.com",
    messagingSenderId: "948159077183",
    appId: "1:948159077183:web:41431f968891a348cc118a",
    measurementId: "G-JMB4VMS3T3"
  };



async function submit_email() {
    set_loading();
    const email = document.getElementById("email-input").value;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, `email/${email}`);
    const docRef2 = doc(db, `emails/${email}`);
    await setDoc(docRef, {notify:true});
    await setDoc(docRef2, {notify:true});
    set_submitted();
}





document.getElementById("email-submit-btn").addEventListener("click", submit_email);