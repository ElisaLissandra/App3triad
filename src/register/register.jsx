import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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
        onChangeText={setEmail}
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
          onChangeText={setConfirmPassword}
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
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
      Não tem uma conta? <Text style={styles.loginLink}  onPress={handleLogin}>Login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Fundo azul conforme a imagem
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0097B2",
    marginBottom: 10,
    marginTop:50
  },
  subtitle: {
    fontSize: 16,
    color: "#878787",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#1E1E1E",
    width: "100%",
    textAlign: "left",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputPassword: {
    width: "100%",
    flex: 1,
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  toggleButton: {
    paddingHorizontal: 10,
  },
  toggleText: {
    fontSize: 18,
    color: "#555",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: "#000",
    flexWrap: "wrap",
  },
  link: {
    color: "#0097B2",
    textDecorationLine: "underline",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0097B2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    color: "#000",
  },
  loginLink: {
    color: "#0097B2",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
