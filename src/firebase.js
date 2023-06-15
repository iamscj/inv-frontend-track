import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKK1stcvt9DicOz_82HYtwxLbmBecv6ns",
  authDomain: "inventory-track-9794c.firebaseapp.com",
  projectId: "inventory-track-9794c",
  storageBucket: "inventory-track-9794c.appspot.com",
  messagingSenderId: "855380694647",
  appId: "1:855380694647:web:b18e623a0fb02504f1d872",
  measurementId: "G-RE4FV26ETL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;