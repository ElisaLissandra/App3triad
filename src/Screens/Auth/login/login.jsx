import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, db } from "../../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          checkIfUserIsAdmin(user.uid);
        })
        .catch((error) => {
          console.error("Erro ao autenticar com Google:", error);
          Alert.alert("Erro", "Não foi possível autenticar com o Google.");
        });
    }
  }, [response]);

  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const handleLogin = () => {
    setErrorMessage(""); // Limpa a mensagem de erro antes de tentar login
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Verificar se o email foi confirmado
        if (!user.emailVerified) {
          setErrorMessage("Por favor, verifique seu email antes de fazer login.");
          return;
        }
  
        // Caso o email esteja verificado, prosseguir
        checkIfUserIsAdmin(user.uid);
      })
      .catch((error) => {
        setErrorMessage(getFriendlyErrorMessage(error.code));
      });
  };

  const checkIfUserIsAdmin = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isAdmin) {
          console.log("Usuário é admin");
          //navigation.navigate("AdminDashboard");
          navigation.navigate("ListProject");
        } else {
          navigation.navigate("ListProject");
        }
      } else {
        console.log("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao verificar admin:", error);
    }
  };

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "O e-mail ou a senha fornecidos estão incorretos. Verifique e tente novamente.";
      case "auth/user-disabled":
        return "Esta conta foi desativada. Entre em contato com o suporte.";
      case "auth/user-not-found":
        return "Não encontramos uma conta com este e-mail.";
      case "auth/wrong-password":
        return "A senha está incorreta. Tente novamente.";
      case "auth/too-many-requests":
        return "Muitas tentativas de login. Tente novamente mais tarde.";
      default:
        return "Ocorreu um erro inesperado. Tente novamente.";
    }
  };

  return (
    <KeyboardAvoidingView
     style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Ajuste o deslocamento no iOS
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
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
                  size={20}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <Text style={styles.link} onPress={() => navigation.navigate("ResetPassword")}>Esqueceu a senha?</Text>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
