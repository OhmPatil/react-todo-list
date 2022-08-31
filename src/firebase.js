import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi4fJChRyUQuoNChFJXdJWVKDnN2uHDUA",
  authDomain: "todolist-ebb16.firebaseapp.com",
  projectId: "todolist-ebb16",
  storageBucket: "todolist-ebb16.appspot.com",
  messagingSenderId: "741079575092",
  appId: "1:741079575092:web:b739e55b95328e50cbf861",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
