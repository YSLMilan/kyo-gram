import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbAPPMSp_JY0L4dnL69lBXNFzFXRYfNBw",
  authDomain: "kiyo-gram.firebaseapp.com",
  projectId: "kiyo-gram",
  storageBucket: "kiyo-gram.appspot.com",
  messagingSenderId: "90922899745",
  appId: "1:90922899745:web:8cd10c0bdc3158942c4660",
  measurementId: "G-6Z7M4F2WLV",
};

const app = initializeApp(firebaseConfig);

export default app;
