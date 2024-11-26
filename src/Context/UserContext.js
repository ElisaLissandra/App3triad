import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();
/*
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      };

      fetchUserData();
    }
  }, [auth.currentUser]);

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
 */

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData({
              uid: user.uid, // Salva o uid do usuário
              ...docSnap.data(), // Dados adicionais do usuário
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Limpa o userData se não houver usuário logado
        setUserData(null);
      }
    });

    // Cleanup function para parar de observar a mudança de autenticação
    return () => unsubscribe();
  }, [auth, db]);

  // Fallback para verificar o tipo de children
  if (!React.isValidElement(children)) {
    console.warn("Children inválido passado para UserProvider:", children);
    return null;
  }

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};