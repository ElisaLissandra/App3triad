import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação correta

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK96eMUCmQZAFqqhk6Hcejj9ZzrIRVkWo",
  authDomain: "triad-c44fc.firebaseapp.com",
  projectId: "triad-c44fc",
  storageBucket: "triad-c44fc.appspot.com",
  messagingSenderId: "815192260939",
  appId: "1:815192260939:web:95a79ec9229864f74da8ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Auth com AsyncStorage para persistência
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Certifique-se de que AsyncStorage está sendo usado aqui
});



// Android: 815192260939-5b7arvmf9m38erjvd2uv97err5ac4sl2.apps.googleusercontent.com