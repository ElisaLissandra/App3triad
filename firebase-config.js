import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAK96eMUCmQZAFqqhk6Hcejj9ZzrIRVkWo",
  authDomain: "triad-c44fc.firebaseapp.com",
  projectId: "triad-c44fc",
  storageBucket: "triad-c44fc.appspot.com",
  messagingSenderId: "815192260939",
  appId: "1:815192260939:web:95a79ec9229864f74da8ce"
};

// Inicializa o Firebase apenas uma vez
let app, auth;

if (!app) {
  app = initializeApp(firebaseConfig);
}

// Inicialize o Firestore e Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Inicialize o Auth com AsyncStorage para persistência apenas se não estiver inicializado
if (!auth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth }; 
