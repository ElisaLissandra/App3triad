import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const WelcomeScreen = () => {
  const navigation = useNavigation(); // Obtendo a função de navegação

  const handleLogin = () => {
    navigation.navigate("Login"); // Navegando para a tela de Login
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>3triad</Text>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Seja bem-vindo!</Text>
          <Text style={styles.subText}>
            Solicite agora seu projeto de forma rápida e fácil!
          </Text>
          {/* O Link envolve o TouchableOpacity */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <View style={styles.buttonIcon}>
              <FontAwesome5 name="arrow-right" size={24} color="#0097B2" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
