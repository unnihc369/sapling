
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDjERZAJeeggjdK7Ut7vKRZgbjriK3tKhk",
  authDomain: "fir-prac-31382.firebaseapp.com",
  projectId: "fir-prac-31382",
  storageBucket: "fir-prac-31382.appspot.com",
  messagingSenderId: "937983793627",
  appId: "1:937983793627:web:c15b5da477d363789c2ffe",
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);

export {auth,db,storage};