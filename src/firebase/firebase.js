// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAdGpmsk4zDy2zBCWMivCo6I1FUoChKE54",
    authDomain: "pixelssoft-crm.firebaseapp.com",
    projectId: "pixelssoft-crm",
    storageBucket: "pixelssoft-crm.appspot.com",
    messagingSenderId: "766564883178",
    appId: "1:766564883178:web:50dcbff7267a37af621593",
    measurementId: "G-JP4YHD9EZ4",
    databaseURL:"https://pixelssoft-crm-default-rtdb.firebaseio.com/"
  };

// Initialize Firebase
const app = initializeApp( firebaseConfig );

// Initialize Storage
const storage = getStorage( app );
export const database = getDatabase(app);

export { storage };