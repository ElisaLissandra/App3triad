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
import { auth } from "../../firebase-config";
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

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation(); // Obtendo a função de navegação

  const handleRegister = () => {
    navigation.navigate("Register"); // Navegando para a tela de Login
  };

  const [userInfo, setUserInfo] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "815192260939-5b7arvmf9m38erjvd2uv97err5ac4sl2.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@elisa_expo/App3triad",
  });

 /*  React.useEffect(() => {
    if(response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
    }
  }, [response]);  */

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário autenticado com sucesso:', user);
        navigation.navigate("RequestProject");
      })
      .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;

       console.log(errorMessage);
      });
  };

  
  useEffect(() => {
    console.log("response", response);
    console.log("request", request);
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('Usuário autenticado com sucesso:', userCredential.user);
        })
        .catch((error) => {
          console.error('Erro ao autenticar com Google:', error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3triad</Text>
      {/* Label for Email Input */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="" // Remove placeholder as label is used
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {/* Label for Password Input */}
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="" // Remove placeholder as label is used
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.link}>Esqueceu a senha?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.googleButton}>
        <TouchableOpacity onPress={() => promptAsync()}>
          <Text style={styles.googleButtonText}>Acessar com Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.linkRegister}>
        Não tem uma conta?{" "}
        <Text style={styles.registerButton} onPress={handleRegister}>
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
