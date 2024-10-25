import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'; // Importar a biblioteca de máscara
import styles from "./styles";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const db = getFirestore();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Listen for keyboard show/hide events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    // Cleanup listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
    // Validações
    if (!email || !fullName || !birthDate || !contact || !password || !confirmPassword) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não correspondem.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Erro", "Insira um email válido.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Prepare user data for Firestore
      const userData = {
        email,
        fullName,
        birthDate,
        contact,
        createdAt: new Date(),
        role: "user", // Default role is "user"
      };

      // Save user data to Firestore
      await setDoc(doc(db, "users", userId), userData);

      console.log("Usuário cadastrado com sucesso:", userCredential.user);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      Alert.alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>3triad</Text>
        <Text style={styles.subtitle}>
          Crie uma conta e solicite seu projeto
        </Text>

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
          onChangeText={(text) => setFullName(text)}
        />

        {/* Data de nascimento Input */}
        <Text style={styles.label}>Data de nascimento</Text>
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={birthDate}
          onChangeText={(text) => setBirthDate(text)}
        />

        {/* Contato Input */}
        <Text style={styles.label}>Contato</Text>
        <TextInputMask
          type={'custom'}
          options={{
            mask: '(99) 99999-9999'
          }}
          style={styles.input}
          placeholder="(00) 00000-0000"
          value={contact}
          onChangeText={(text) => setContact(text)}
        />

        {/* Senha Input */}
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.eyeIcon}>
            <FontAwesome5 
              name={showPassword ? "eye" : "eye-slash"}
              size={24}
              color="black"
            />
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
          <TouchableOpacity onPress={() => setShowConfirmPassword(prev => !prev)} style={styles.eyeIcon}>
            <FontAwesome5 
              name={showConfirmPassword ? "eye" : "eye-slash"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <Text style={styles.loginText}>
          Não tem uma conta?{" "}
          <Text style={styles.loginLink} onPress={handleLogin}>
            Login
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
