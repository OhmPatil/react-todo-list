import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, signOut} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAi4fJChRyUQuoNChFJXdJWVKDnN2uHDUA",
  authDomain: "todolist-ebb16.firebaseapp.com",
  projectId: "todolist-ebb16",
  storageBucket: "todolist-ebb16.appspot.com",
  messagingSenderId: "741079575092",
  appId: "1:741079575092:web:b739e55b95328e50cbf861",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (event) => {
  event.preventDefault()
  try {
    const response = await signInWithPopup(auth, googleProvider)
    const user = response.user;
    const q = query(collection(database, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(database, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email
      })
    }
  }
  catch(error) {
    alert(error.message);
  }
}

const logout = () => {
  signOut(auth);
}

export { database, auth, signInWithGoogle, logout };
