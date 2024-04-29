import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB6yFCS0yFe7qc70U_orhuhmvWzkkMj7os',
  authDomain: 'droniada-2024.firebaseapp.com',
  projectId: 'droniada-2024',
  storageBucket: 'droniada-2024.appspot.com',
  messagingSenderId: '122511349737',
  appId: '1:122511349737:web:157215e8014e499bd91d78',
  measurementId: 'G-KDLRRZ5JDT'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
