import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDnrZGn1D3zdhPbsnkcFCf53tMI7wvePPM",
  authDomain: "halstead-s.firebaseapp.com",
  projectId: "halstead-s",
  storageBucket: "halstead-s.appspot.com",
  messagingSenderId: "140751797520",
  appId: "1:140751797520:web:98e5c687b8a9d5f8ea7995",
  measurementId: "G-TJEL69F3CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app)
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};