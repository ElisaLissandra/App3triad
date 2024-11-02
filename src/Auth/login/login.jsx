import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth, db } from "../../../firebase-config"; // Ensure db is imported
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation(); // Obtendo a função de navegação

  const handleRegister = () => {
    navigation.navigate("Register"); // Navegando para a tela de Login
  };

  const [userInfo, setUserInfo] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "815192260939-5b7arvmf9m38erjvd2uv97err5ac4sl2.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@elisa_expo/App3triad",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          checkIfUserIsAdmin(user.uid); // Check if the user is an admin
        })
        .catch((error) => {
          console.error("Erro ao autenticar com Google:", error);
        });
    } else if (response?.type === "error") {
      console.error("Erro de autenticação:", response.params);
    }
  }, [response]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Fetch additional user data from your database
        checkIfUserIsAdmin(user.uid);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const checkIfUserIsAdmin = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid); // Reference to the user document
      const userDoc = await getDoc(userDocRef); // Fetch the document
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Check if the role is 'admin'
        if (userData.role === "admin") {
          console.log("Usuário é admin");
          //navigation.navigate("AdminDashboard"); // Navigate to admin dashboard
        } else {
          console.log("Usuário não é admin");
          navigation.navigate("ListProject"); // Navigate to regular user dashboard
        }
      } else {
        console.log("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao verificar admin:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3triad</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.label}>Senha:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.eyeIcon}
        >
          <FontAwesome5
            name={showPassword ? "eye" : "eye-slash"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.link}>Esqueceu a senha?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.googleButton}>
        <TouchableOpacity onPress={() => promptAsync()}>
          <Text style={styles.googleButtonText}>Acessar com Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.linkLogin}>
        Não tem uma conta?{" "}
        <Text style={styles.LoginButton} onPress={handleRegister}>
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
