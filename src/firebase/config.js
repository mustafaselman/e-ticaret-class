//// burada google firebase ile etkileşime buradan girilecek.
//firebase ile etkileşime geçildi
import { initializeApp } from "firebase/app";
//authentication işlemleri için(kullanıcı kaydı)
import { getAuth } from "firebase/auth";
//firestore database erişimi için
import {getFirestore} from "firebase/firestore";
// storage erişimi için (resim kayıt yeri)
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDfvkIjujk9wh4CATNwMADR09LJZf8c4zg",
  authDomain: "e-ticaret-class.firebaseapp.com",
  projectId: "e-ticaret-class",
  storageBucket: "e-ticaret-class.appspot.com",
  messagingSenderId: "7713538167",
  appId: "1:7713538167:web:84d711cc4c27ad458cc672"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;