import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Controla o estado de edição
  const [editableUser, setEditableUser] = useState({
    displayName: "",
    birthDate: "",
    email: "",
    contact: "",
  });

  const fetchUserInfo = async (userId) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", userId); // Referência do documento
      const docSnap = await getDoc(docRef); // Obtendo o documento

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser(userData); // Define os dados do usuário no estado
        setEditableUser(userData); // Preenche os campos de edição
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Alterna entre o modo de edição
  };

  const handleSaveChanges = async () => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, editableUser); // Atualiza os dados do usuário no Firestore
      setIsEditing(false); // Desativa o modo de edição
      fetchUserInfo(userId); // Recarrega os dados atualizados
  
      // Exibe um alerta após a atualização bem-sucedida
      Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
  
    } catch (error) {
      console.log("Erro ao salvar alterações:", error);
      // Exibe um alerta de erro caso a atualização falhe
      Alert.alert("Erro", "Ocorreu um erro ao atualizar as informações.");
    }
  };

  const handleChange = (field, value) => {
    setEditableUser({ ...editableUser, [field]: value });
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
                {isEditing ? (
                  <TextInput
                    style={styles.userInfoInput}
                    value={editableUser.displayName}
                    onChangeText={(text) => handleChange("displayName", text)}
                  />
                ) : (
                  <Text style={styles.userInfo}>
                    {user?.displayName || "Não disponível"}
                  </Text>
                )}
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Data nascimento: </Text>
                {isEditing ? (
                  <TextInput
                    style={styles.userInfoInput}
                    value={editableUser.birthDate}
                    onChangeText={(text) => handleChange("birthDate", text)}
                  />
                ) : (
                  <Text style={styles.userInfo}>
                    {user?.birthDate || "Não disponível"}
                  </Text>
                )}
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Email: </Text>
                {isEditing ? (
                  <TextInput
                    style={styles.userInfoInput}
                    value={editableUser.email}
                    onChangeText={(text) => handleChange("email", text)}
                  />
                ) : (
                  <Text style={styles.userInfo}>
                    {user?.email || "Não disponível"}
                  </Text>
                )}
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Contato: </Text>
                {isEditing ? (
                  <TextInput
                    style={styles.userInfoInput}
                    value={editableUser.contact}
                    onChangeText={(text) => handleChange("contact", text)}
                  />
                ) : (
                  <Text style={styles.userInfo}>
                    {user?.contact || "Não disponível"}
                  </Text>
                )}
              </View>

              {/* Botões */}
              <View style={styles.buttonsContainer}>
                {isEditing ? (
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                  >
                    <Text style={styles.saveText}>Salvar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleEditToggle}
                  >
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>
                )}

                {/* Botão de Logout */}
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen;
