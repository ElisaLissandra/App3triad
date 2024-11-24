import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async (userId) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", userId); // Referência do documento
      const docSnap = await getDoc(docRef); // Obtendo o documento

      if (docSnap.exists()) {
        setUser(docSnap.data()); // Define os dados do usuário no estado
      } else {
        console.log("Nenhum documento encontrado");
      }
    } catch (error) {
      console.log("Erro ao buscar dados do usuário:", error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid); // Armazena o ID do usuário logado
        fetchUserInfo(currentUser.uid); // Busca informações do usuário
      } else {
        console.log("Nenhum usuário logado");
      }
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Desloga o usuário do Firebase
      navigation.navigate("Login"); // Navega para a tela de login
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
    }
  };

  const handleListProject = () => {
    navigation.navigate("ListProject");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleListProject}>
              <FontAwesome5 name="chevron-left" size={24} color="#0097B2" />
            </TouchableOpacity>
            <Text style={styles.title}>Configuração</Text>
          </View>

          {/* Informações do Usuário */}
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#0097B2"
              style={styles.loader}
            />
          ) : (
            <>
              {/* Informações do Usuário */}
              <Text style={styles.subHeader}>Informações do Usuário</Text>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Nome: </Text>
                <Text style={styles.userInfo}>
                  {user?.displayName || "Não disponível"}
                </Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Data nascimento: </Text>
                <Text style={styles.userInfo}>
                  {user?.birthDate || "Não disponível"}
                </Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Email: </Text>
                <Text style={styles.userInfo}>
                  {user?.email || "Não disponível"}
                </Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Contato: </Text>
                <Text style={styles.userInfo}>
                  {user?.contact || "Não disponível"}
                </Text>
              </View>

              {/* Botão de Logout */}
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Sair</Text>
                <FontAwesome5
                  name="sign-out-alt"
                  size={18}
                  color="#fff"
                  style={styles.logoutIcon}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen;
