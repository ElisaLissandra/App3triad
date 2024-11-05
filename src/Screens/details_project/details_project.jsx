import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import styles from "./styles";

const DetailsProjectScreen = () => {
  const route = useRoute();
  const { project } = route.params;
  const {
    title,
    description,
    generalContext,
    deadline,
    urgent,
    status,
    files = [],
  } = project;
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const userId = project.userId;
  console.log(project.userId);

  const getUserById = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Informações do usuário:", userData);
        return userDoc.data();
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleListProject = () => {
    navigation.navigate("ListProject");
  };

  const handleStatusProject = () => {
    navigation.navigate("StatusProject", { status: status }); 
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
            <Text style={styles.title}>Detalhes do projeto</Text>
          </View>

          {/* Informações do Usuário */}
          <Text style={styles.subHeader}>Informações do Usuário</Text>
          {/* <Text style={styles.sectionTitle}>Nome: {user?.fullName}</Text>
          <Text style={styles.sectionTitle}>Email:  {user?.email}</Text>
          <Text style={styles.sectionTitle}>Contato: {user?.contact}</Text>  */}

          <View style={styles.userInfoContainer}>
            <Text style={styles.sectionTitle}>Nome: </Text>
            <Text style={styles.userInfo}>{user?.fullName}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.sectionTitle}>Email: </Text>
            <Text style={styles.userInfo}>{user?.email}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.sectionTitle}>Contato: </Text>
            <Text style={styles.userInfo}>{user?.contact}</Text>
          </View>

          <Text style={styles.subHeader}>Informações do Projeto</Text>
          <Text style={styles.sectionTitle}>Título do projeto</Text>
          <Text style={styles.titleProject}>{title}</Text>
          {/* Section de arquivos */}
          <Text style={styles.sectionTitle}>Baixa arquivo</Text>
          {Array.isArray(files) && files.length > 0 ? (
            files.map((file, index) => (
              <View key={index} style={styles.fileContainer}>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <FontAwesome5 name="download" size={20} color="#1E1E1E" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Nenhum arquivo disponível</Text>
          )}

          {/* Data e status de urgência */}
          <View style={styles.dateContainer}>
            <FontAwesome5 name="calendar-alt" size={20} color="#0097B2" />
            <Text style={styles.dateText}>{deadline}</Text>
            <View style={styles.urgentContainer}>
              <Text style={styles.urgentText}>Urgente</Text>
              <FontAwesome5
                name="exclamation-triangle"
                size={20}
                color="#E74C3C"
                style={styles.urgentIcon}
              />
            </View>
          </View>

          {/* Descrição do projeto */}
          <Text style={styles.sectionTitle}>Descrição do projeto</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          {/* Contexto do projeto */}
          <Text style={styles.sectionTitle}>Contexto do projeto</Text>
          <Text style={styles.descriptionText}>{generalContext}</Text>

          {/* Botão Acompanhar status */}
          <TouchableOpacity style={styles.statusButton} onPress={handleStatusProject}>
            <Text style={styles.statusButtonText}>Acompanhar status</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DetailsProjectScreen;
