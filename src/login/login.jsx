import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {

  const navigation = useNavigation(); // Obtendo a função de navegação

  const handleRegister = () => {
    navigation.navigate('Register'); // Navegando para a tela de Login
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de autenticação aqui
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3triad</Text>
      {/* Label for Email Input */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="" // Remove placeholder as label is used
        value={email}
        onChangeText={setEmail}
      />
      {/* Label for Password Input */}
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="" // Remove placeholder as label is used
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.link}>Esqueceu a senha?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>


      <View style={styles.googleButton}>
        {/* <Image
          source={require("./google-icon.png")}
          style={styles.googleIcon}
        /> */}
        <Text style={styles.googleButtonText}>Acessar com Google</Text>
      </View>

      <Text style={styles.linkRegister}>
        Não tem uma conta?{" "}
        <Text style={styles.registerButton} onPress={handleRegister}>Cadastre-se</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
