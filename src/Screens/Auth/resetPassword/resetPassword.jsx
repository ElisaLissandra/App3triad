import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../firebase-config";
import styles from "./styles";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Sucesso",
          "Um e-mail de redefinição de senha foi enviado para o endereço fornecido."
        );
        navigation.goBack(); // Retorna à tela de login após a solicitação
      })
      .catch((error) => {
        let errorMessage = "Ocorreu um erro ao enviar o e-mail.";
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "O e-mail fornecido é inválido.";
            break;
          case "auth/user-not-found":
            errorMessage = "Não encontramos uma conta com este e-mail.";
            break;
          default:
            errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
            break;
        }
        Alert.alert("Erro", errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* <Text style={styles.title}>Redefinir Senha</Text> */}
          <Text style={styles.label}>Digite seu e-mail:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Enviar e-mail de redefinição</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
