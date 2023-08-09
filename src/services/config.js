import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "bishoujo-vibes-186bc.firebaseapp.com",
    projectId: "bishoujo-vibes-186bc",
    storageBucket: "bishoujo-vibes-186bc.appspot.com",
    messagingSenderId: "398677957338",
    appId: "1:398677957338:web:e3fb1b1c4d0e90a250a3e3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)