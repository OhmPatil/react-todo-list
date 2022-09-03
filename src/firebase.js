import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, createUserWithEmailAndPassword} from 'firebase/auth'

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

const logInWithEmailAndPassword = async (event, email, password) => {
  event.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password)
  }
  catch(error){
    alert(error.message);
  }
}

const registerUserWithEmailAndPassword = async (event, name, email, password) => {
  event.preventDefault()
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const user = response.user
    await addDoc(collection(database, 'users'), {
      uid: user.uid,
      displayName: name,
      authProvider: 'local',
      email: email,
    })
  }
  catch(error){
    alert(error.message)
  }
}

const logout = () => {
  signOut(auth);
}

export { database,
  auth,
  signInWithGoogle, 
  logInWithEmailAndPassword, 
  registerUserWithEmailAndPassword, 
  logout };
