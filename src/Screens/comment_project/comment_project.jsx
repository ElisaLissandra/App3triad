import React, { useState, useEffect, useContext } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  FlatList,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../Context/UserContext";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const CommentProjectScreen = () => {
  const { userData } = useContext(UserContext);
  const route = useRoute();
  const { project } = route.params;
  const projectId = project.id;
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  //const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  //const [selectedImage, setSelectedImage] = useState(null);

  // Função para enviar o comentário
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Verifica se o comentário não está vazio

    if (user) {
      // Após obter o displayName, adiciona o comentário
      try {
        await addDoc(collection(db, `projects/${projectId}/comment`), {
          message: newComment,
          user: userData?.displayName,
          timestamp: serverTimestamp(),
        });
        setNewComment(""); // Limpa o campo de input após envio
      } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
      }
    }
  };

  const sendImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("É necessário permitir o acesso à galeria para enviar imagens.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
      try {
        const storage = getStorage();
        const imageUri = pickerResult.assets[0].uri;
        let imageName =
          pickerResult.assets[0].imageName || `image-${Date.now()}`;

        console.log("Nome da imagem:", imageName);

        // Função para extrair a extensão da URL ou do nome do arquivo
        const getExtensionFromUri = (uri) => {
          const regex = /(?:\.([^.]+))?$/; // Regex para encontrar a extensão
          const result = uri.match(regex); // Tenta extrair a extensão da URL

          return result && result[1] ? result[1] : ""; // Se encontrar a extensão, retorna; caso contrário, retorna vazio
        };

        // Extrair a extensão da imagem
        const imageExtension = getExtensionFromUri(imageUri);

        // Se não tiver a extensão, adicione-a ao nome da imagem
        if (imageExtension && !imageName.includes(imageExtension)) {
          imageName = `${imageName}.${imageExtension}`;
        }

        console.log("Nome final da imagem:", imageName);

        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Criar referência única no Firebase Storage
        const imageRef = ref(storage, `images/${Date.now()}-${user.uid}`);
        await uploadBytes(imageRef, blob);

        const imageUrl = await getDownloadURL(imageRef);

        // Salvar dados no Firestore
        await addDoc(collection(db, `projects/${projectId}/comment`), {
          image: imageUrl, // URL da imagem
          imageName: imageName, // Nome da imagem com a extensão
          user: userData?.displayName,
          timestamp: serverTimestamp(),
        });

        console.log("Imagem enviada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
      }
    }

    setIsPopupVisible(false); // Fecha o popup após o envio
  };

  // Função para enviar arquivo
  const sendFile = async () => {
    const pickerResult = await DocumentPicker.getDocumentAsync({ type: "*/*" });

    console.log("Resultado da seleção do arquivo:", pickerResult); // Verifique a estrutura completa

    // Verifica se o resultado é um sucesso e se existe um arquivo selecionado
    if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
      const file = pickerResult.assets[0]; // Acessa o arquivo selecionado

      console.log("Arquivo selecionado:", file); // Log para verificar o arquivo selecionado

      try {
        const storage = getStorage();
        const fileUri = file.uri;
        const response = await fetch(fileUri);
        const blob = await response.blob();

        // Cria uma referência única para o arquivo no Firebase Storage
        const fileRef = ref(
          storage,
          `files/${Date.now()}-${user.uid}-${file.name}`
        );
        await uploadBytes(fileRef, blob);

        // Obtém a URL do arquivo enviado
        const fileUrl = await getDownloadURL(fileRef);

        await addDoc(collection(db, `projects/${projectId}/comment`), {
          file: fileUrl, // URL do arquivo
          fileName: file.name, // Nome do arquivo
          user: userData?.displayName,
          timestamp: serverTimestamp(),
        });

        console.log("Arquivo enviado com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }
    } else {
      console.log(
        "Erro ao selecionar arquivo ou operação cancelada",
        pickerResult
      );
    }

    setIsPopupVisible(false); // Fecha o popup após a seleção
  };

  useEffect(() => {
    if (!project?.id) return;

    const db = getFirestore();
    const commentRef = collection(db, `projects/${projectId}/comment`);
    const q = query(commentRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComment(commentData);
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, [projectId]);

  // Função para fazer o download e salvar a imagem na galeria
  const downloadImage = async (imageUri, imageName) => {
    try {
      const fileExtension = imageName.split(".").pop();
      const downloadUri = FileSystem.documentDirectory + imageName;

      const { uri } = await FileSystem.downloadAsync(imageUri, downloadUri);

      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);

        alert("Imagem salva na galeria com sucesso!");
      } else {
        alert("Permissão de acesso à galeria não concedida.");
      }
    } catch (error) {
      console.error("Erro ao fazer o download da imagem:", error);
      alert("Erro ao tentar baixar a imagem.");
    }
  };

  const downloadFile = async (fileUri, fileName) => {
    try {
      // Diretório temporário para baixar o arquivo
      const downloadUri = FileSystem.documentDirectory + fileName;
      const { uri } = await FileSystem.downloadAsync(fileUri, downloadUri);

      // Solicitar permissão de acesso à biblioteca de mídia
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        alert("Permissão para acessar a biblioteca de mídia foi negada.");
        return;
      }

      // Salvar na pasta de Downloads ou na biblioteca de mídia
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      }

      alert("Arquivo baixado com sucesso");
    } catch (error) {
      console.error("Erro ao fazer o download do arquivo:", error);
      alert("Erro ao tentar baixar o arquivo.");
    }
  };

  const openImageModal = (imageUri, imageName) => {
    // Exibe o alerta perguntando se o usuário deseja fazer o download
    Alert.alert("Deseja baixar a imagem?", "", [
      {
        text: "Cancelar",
        onPress: () => console.log("Download cancelado"),
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => downloadImage(imageUri, imageName),
      },
    ]);
  };

  const openFileModal = (fileUri, fileName) => {
    // Exibe o alerta perguntando se o usuário deseja fazer o download
    Alert.alert("Deseja baixar o arquivo?", "", [
      {
        text: "Cancelar",
        onPress: () => console.log("Download cancelado"),
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => downloadFile(fileUri, fileName),
      },
    ]);
  };

  // Função para renderizar os itens do comentário
  const renderItem = ({ item }) => {
    const isCurrentUser = item.user === userData?.displayName;

    return (
      <View style={{ marginBottom: 10 }}>
        {item.image ? (
          <View
            style={[
              styles.messageContainer,
              isCurrentUser
                ? styles.messageCurrentUser
                : styles.messageOtherUser,
            ]}
          >
            <Text style={styles.userName}>
              {item.user || "Usuário Desconhecido"}{" "}
            </Text>
            <TouchableOpacity
              onPress={() => openImageModal(item.image, item.imageName)}
            >
              <Image
                key={item.id}
                source={{ uri: item.image }}
                style={styles.messageImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        ) : item.file ? (
          <View
            style={[
              styles.messageContainer,
              isCurrentUser
                ? styles.messageCurrentUser
                : styles.messageOtherUser,
            ]}
          >
            <Text style={styles.userName}>
              {item.user || "Usuário Desconhecido"}{" "}
            </Text>
            <TouchableOpacity
              onPress={() => openFileModal(item.file, item.fileName)}
            >
              <Text style={styles.messageText}>
                📄 {item.fileName || "Arquivo"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.messageContainer,
              isCurrentUser
                ? styles.messageCurrentUser
                : styles.messageOtherUser,
            ]}
          >
            <Text style={styles.userName}>
              {item.user || "Usuário Desconhecido"}
            </Text>
            <Text style={styles.message}>
              {item.message || "Mensagem vazia"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Função para fechar o modal da imagem
  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setSelectedImage(null);
  };

  // Verificar acesso do usuário
  if (!userData.isAdmin && !user) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Você não tem permissão para visualizar ou comentar neste projeto.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Novas Informações</Text>
      </View>

      <FlatList
        data={comment}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        inverted
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setIsPopupVisible(true)}
          style={styles.attachButton}
        >
          <Ionicons name="attach" size={24} color="#0097B2" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Modal para popup de seleção de imagem ou arquivo */}
      <Modal
        transparent={true}
        visible={isPopupVisible}
        animationType="slide"
        onRequestClose={() => setIsPopupVisible(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <TouchableOpacity onPress={sendImage} style={styles.popupOption}>
              <Ionicons name="image" size={30} color="#0097B2" />
              <Text>Imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendFile} style={styles.popupOption}>
              <Ionicons name="document" size={30} color="#0097B2" />
              <Text>Arquivo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default CommentProjectScreen;
