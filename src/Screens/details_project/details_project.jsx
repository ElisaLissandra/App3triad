import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import styles from "./styles";
import * as MediaLibrary from "expo-media-library";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = project.userId;

  const getUserById = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData;
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  };

  // Obter o usuário autenticado e verificar se é admin
  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        //const auth = getAuth();
        const authenticatedUser = auth.currentUser;

        if (authenticatedUser) {
          const userData = await getUserById(authenticatedUser.uid);
          setUser(userData);
          setIsAdmin(userData?.isAdmin || false); // Define como admin se a propriedade `isAdmin` for true
          console.log("E admin?", isAdmin);
        }
      } catch (error) {
        console.error(
          "Erro ao buscar informações do usuário autenticado:",
          error
        );
      }
    };

    fetchAuthenticatedUser();
  }, []);

  const handleListProject = () => {
    navigation.navigate("ListProject");
  };

  const handleChat = () => {
    navigation.navigate("Chat");
  };

  const downloadFile = async (fileUrl, fileName) => {
    try {
      if (!fileUrl) {
        Alert.alert("Erro", "URL do arquivo inválida.");
        return;
      }

      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão necessária",
            "A permissão de armazenamento é necessária para baixar arquivos."
          );
          return;
        }
      }

      // Defina o caminho do arquivo no diretório do aplicativo
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Baixar o arquivo
      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

      if (uri) {
        // No Android, mover o arquivo para o armazenamento público
        if (Platform.OS === "android") {
          const newUri = `${FileSystem.documentDirectory}Download/${fileName}`;

          // Certifique-se de que o diretório de download existe ou crie um novo diretório
          await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + "Download",
            { intermediates: true }
          );

          // Copiar o arquivo para o novo diretório
          await FileSystem.copyAsync({ from: uri, to: newUri });

          // Crie o ativo de mídia e adicione à galeria
          const asset = await MediaLibrary.createAssetAsync(newUri);

          // Crie ou adicione ao álbum 'Download'
          const albumName = "Download";
          let album = await MediaLibrary.getAlbumAsync(albumName);
          if (!album) {
            album = await MediaLibrary.createAlbumAsync(
              albumName,
              asset,
              false
            );
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
          }

          Alert.alert(
            "Download completo!",
            "O arquivo foi baixado e adicionado à galeria."
          );
        } else {
          // Para iOS, compartilhe o arquivo após o download
          await Sharing.shareAsync(uri);
        }
      } else {
        Alert.alert("Erro", "Falha ao baixar o arquivo.");
      }
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
      Alert.alert("Erro", "Não foi possível baixar o arquivo.");
    }
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
          {isAdmin && (
            <>
              <Text style={styles.subHeader}>Informações do Usuário</Text>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Nome: </Text>
                <Text style={styles.userInfo}>{user.fullName}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Email: </Text>
                <Text style={styles.userInfo}>{user.email}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Contato: </Text>
                <Text style={styles.userInfo}>{user.contact}</Text>
              </View>
              <Text style={styles.subHeader}>Informações do Projeto</Text>
            </>
          )}

          <Text style={styles.sectionTitle}>Título do projeto</Text>
          <Text style={styles.titleProject}>{title}</Text>

          <Text style={styles.sectionTitle}>Status do projeto</Text>
          <Text style={styles.titleProject}>{status}</Text>

          {/* Section de arquivos */}
          <Text style={styles.sectionTitle}>Baixar arquivo</Text>
          {Array.isArray(files) && files.length > 0 ? (
            files.map((file, index) => (
              <View key={index} style={styles.fileContainer}>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => downloadFile(file.url, file.name)}
                >
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
            {urgent && (
              <View style={styles.urgentContainer}>
                <Text style={styles.urgentText}>Urgente</Text>
                <FontAwesome5
                  name="exclamation-triangle"
                  size={20}
                  color="#E74C3C"
                  style={styles.urgentIcon}
                />
              </View>
            )}
          </View>

          {/* Descrição do projeto */}
          <Text style={styles.sectionTitle}>Descrição do projeto</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          {/* Contexto do projeto */}
          <Text style={styles.sectionTitle}>Contexto do projeto</Text>
          <Text style={styles.descriptionText}>{generalContext}</Text>

          {/* Botão Acompanhar status */}
          <TouchableOpacity style={styles.statusButton} onPress={handleChat}>
            <Text style={styles.statusButtonText}>
              Adicionar mais informações
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DetailsProjectScreen;
