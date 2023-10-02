
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx3AW0vIY98DWPIJjmhs2_kcY9bc-a8Gk",
  authDomain: "auth-moha-milon-691d4.firebaseapp.com",
  projectId: "auth-moha-milon-691d4",
  storageBucket: "auth-moha-milon-691d4.appspot.com",
  messagingSenderId: "217883781589",
  appId: "1:217883781589:web:acf8a896988e425b61355c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;