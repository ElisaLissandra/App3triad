import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import styles from "./styles";
import * as MediaLibrary from "expo-media-library";
import { Picker } from "@react-native-picker/picker";


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
  const [projectUser, setProjectUser] = useState(null);
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

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
          setIsAdmin(userData?.isAdmin || false);
        }

        // Verifica se o projeto tem um userId do solicitante
        if (project.userId) {
          // Busca o usuário solicitante do projeto
          const projectUserData = await getUserById(project.userId);
          setProjectUser(projectUserData); // Define os dados do solicitante do projeto
        }
      } catch (error) {
        console.error(
          "Erro ao buscar informações do usuário autenticado:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  const handleListProject = () => {
    navigation.navigate("ListProject");
  };

  const handleComment = () => {
    navigation.navigate("CommentProject", { project });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color="#0097B2" />
      </View>
    );
  }

  if (isStatusUpdating) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#0097B2" />
      </View>
    );
  }

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

  /* const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus); // Atualiza o estado local com o novo status

    try {
      const projectRef = doc(db, "projects", project.id); // Referência do documento do projeto
      await updateDoc(projectRef, { status: newStatus }); // Atualiza o campo "status" no Firestore

      Alert.alert("Sucesso", "Status atualizado com sucesso."); // Exibe mensagem de sucesso
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status."); // Exibe mensagem de erro
    }
  };
 */

  const handleStatusChange = async (newStatus) => {
    setIsStatusUpdating(true); // Ativa o indicador
    setSelectedStatus(newStatus); // Atualiza o estado local com o novo status

    try {
      const projectRef = doc(db, "projects", project.id); // Referência do documento do projeto
      await updateDoc(projectRef, { status: newStatus }); // Atualiza o campo "status" no Firestore

      Alert.alert("Sucesso", "Status atualizado com sucesso."); // Exibe mensagem de sucesso
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status."); // Exibe mensagem de erro
    } finally {
      setIsStatusUpdating(false); // Desativa o indicador
    }
  };

  const showAcceptRejectButtons = ![
    "Aceito",
    "Em Desenvolvimento",
    "Faltando Informações",
    "Concluído",
  ].includes(selectedStatus);

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
          {/* Informações do Usuário */}
          {isAdmin && projectUser && (
            <>
              <Text style={styles.subHeader}>Informações do Usuário</Text>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Nome: </Text>
                <Text style={styles.userInfo}>{projectUser.displayName}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Email: </Text>
                <Text style={styles.userInfo}>{projectUser.email}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.sectionTitle}>Contato: </Text>
                <Text style={styles.userInfo}>{projectUser.contact}</Text>
              </View>
              <Text style={styles.subHeader}>Informações do Projeto</Text>
            </>
          )}
          <Text style={styles.sectionTitle}>Título do projeto</Text>
          <Text style={styles.titleProject}>{title}</Text>

          <Text style={styles.sectionTitle}>Status do projeto</Text>
          {isAdmin ? (
            <Picker
              selectedValue={selectedStatus}
              onValueChange={(itemValue) => handleStatusChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Pendente" value="Pendente" />
              <Picker.Item
                label="Faltando Informações"
                value="Faltando Informações"
              />
              <Picker.Item
                label="Em Desenvolvimento"
                value="Em Desenvolvimento"
              />
              <Picker.Item label="Concluído" value="Concluído" />
              <Picker.Item label="Aceito" value="Aceito" enabled={false} />
              <Picker.Item label="Recusado" value="Recusado" enabled={false} />
              {/* Add more statuses as needed */}
            </Picker>
          ) : (
            <Text style={styles.titleProject}>{selectedStatus}</Text>
          )}

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
          {/* Botões de aceitar e recusar */}
          {showAcceptRejectButtons && isAdmin && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.rejectButton,
                  selectedStatus === "Recusado" && styles.disabledButton, // Estilo desabilitado
                ]}
                onPress={() => handleStatusChange("Recusado")}
                disabled={selectedStatus === "Recusado"} // Desabilita o botão se já estiver recusado
              >
                <Text style={styles.buttonText}>Recusar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.acceptButton,
                  selectedStatus === "Recusado" && styles.disabledButton, // Estilo desabilitado
                ]}
                onPress={() => handleStatusChange("Aceito")}
                disabled={selectedStatus === "Recusado"} // Desabilita o botão se o status for "Recusado"
              >
                <Text style={styles.buttonText}>Aceitar</Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            {selectedStatus === "Faltando Informações" && (
              <TouchableOpacity
                style={styles.statusButton}
                onPress={handleComment}
              >
                <Text style={styles.statusButtonText}>
                  Adicionar mais informações
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DetailsProjectScreen;
