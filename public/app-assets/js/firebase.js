// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import * as fbauth from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import * as fbstorage from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js";
import * as fbfirestore from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";
import * as fbmessaging from "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js";

var firebaseConfig = {
    apiKey: "AIzaSyCflSdGQneIyOETiSh5jtyCSZ6ttuk9-Xg",
    authDomain: "cgameapp-ac1d4.firebaseapp.com",
    projectId: "cgameapp-ac1d4",
    storageBucket: "cgameapp-ac1d4.appspot.com",
    messagingSenderId: "234317930737",
    appId: "1:234317930737:web:f9031afe9d4ebc8bc94950",
    measurementId: "G-GD20RQP04Y"
};
// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export let auth = fbauth;
export let db = fbfirestore.getFirestore(app);
export let doc = fbfirestore.doc;
export let getDoc = fbfirestore.getDoc;
export let getDocs = fbfirestore.getDocs;
export let query = fbfirestore.query;
export let where = fbfirestore.where;
export let orderBy = fbfirestore.orderBy;
export let setdoc = fbfirestore.setDoc;
export let timestamp = fbfirestore.Timestamp;
export let collection = fbfirestore.collection;
export let addDoc = fbfirestore.addDoc;
export let setDoc = fbfirestore.setDoc;
export let updateDoc = fbfirestore.updateDoc;
export let deleteDoc = fbfirestore.deleteDoc;
export let serverTimestamp = fbfirestore.serverTimestamp;
export let onSnapshot = fbfirestore.onSnapshot;
export let limit = fbfirestore.limit;
