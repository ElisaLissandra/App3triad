import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase-config";
import styles from "./styles";

const RegisterScreen = () => {
  const navigation = useNavigation(); // Obtendo a função de navegação

  const handleLogin = () => {
    navigation.navigate('Login'); // Navegando para a tela de Login
  };

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
        console.log("Usuário cadastrado com sucesso:", userCredential.user);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
        Alert.alert(error.message);
      });
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3triad</Text>
      <Text style={styles.subtitle}>Crie uma conta e faça seu orçamento</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@mail.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Nome Completo Input */}
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Data de nascimento Input */}
      <Text style={styles.label}>Data de nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/YYYY"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      {/* Contato Input */}
      <Text style={styles.label}>Contato</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 00000-0000"
        value={contact}
        onChangeText={setContact}
      />

      {/* Senha Input */}
      <Text style={styles.label}>Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={togglePasswordVisibility}
        >
         {/*  <Text style={styles.toggleText}>
            {showPassword ? "👁️" : "🙈"}
          </Text> */}
        </TouchableOpacity>
      </View>

      {/* Confirmar Senha Input */}
      <Text style={styles.label}>Confirmar senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Confirmar senha"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleConfirmPasswordVisibility}
        >
         {/*  <Text style={styles.toggleText}>
            {showConfirmPassword ? "👁️" : "🙈"}
          </Text> */}
        </TouchableOpacity>
      </View>

      {/* Terms and Policy Agreement */}
      {/* <View style={styles.checkboxContainer}>
        <CheckBox
          value={agreeTerms}
          onValueChange={setAgreeTerms}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>
          I Agree with{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View> */}

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
      Não tem uma conta? <Text style={styles.loginLink}  onPress={handleLogin}>Login</Text>
      </Text>
    </View>
  );
};


export default RegisterScreen;
