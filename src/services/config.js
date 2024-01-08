import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "bishoujo-vibes.firebaseapp.com",
    projectId: "bishoujo-vibes",
    storageBucket: "bishoujo-vibes.appspot.com",
    messagingSenderId: "963152598472",
    appId: "1:963152598472:web:d7617b53cc44ce6d6bdcfd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)