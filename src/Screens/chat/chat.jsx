import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { doc, getDoc } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const ChatScreen = () => {
  const route = useRoute();
  const { project } = route.params;
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false); // Estado para controlar o modal da imagem
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada

  // Recuperar o ID do usuário logado
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserId(currentUser.uid); // Define o UID do usuário logado no estado
      console.log("Usuário logado:", currentUser.uid);
    } else {
      console.log("Nenhum usuário está logado.");
    }
  }, []);

  // UseEffect para configurar o recipientId com base no projeto
  useEffect(() => {
    if (project) {
      setRecipientId(project.userId); // Assuming project has a userId field
    }
  }, [project]);

  const sendMessage = async () => {
    console.log("Mensagem:", message);
    console.log("Recipient ID:", recipientId);
    console.log("Sender ID:", userId);
    if (message.trim() && recipientId.trim() && userId) {
      try {
        const db = getFirestore();
        await addDoc(collection(db, "chats", project.id, "messages"), {
          text: message,
          senderId: userId,
          recipientId: recipientId,
          timestamp: serverTimestamp(),
        });
        setMessage("");
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    } else {
      alert("Por favor, insira uma mensagem e um ID de destinatário.");
    }
  };

  useEffect(() => {
    const db = getFirestore();
    const q = query(
      collection(db, "chats", project.id, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const newMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      } else {
        console.log("Nenhuma mensagem encontrada.");
      }
    });

    return () => unsubscribe(); // Remove o listener ao desmontar o componente
  }, [project.id]);

  // Função para enviar imagem
  /* const sendImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permissão concedida:", permissionResult.granted); // Log de permissão
    if (!permissionResult.granted) {
      alert("É necessário permitir o acesso à galeria para enviar imagens.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // Ajuste a qualidade da imagem, se necessário
    });

    //console.log("Resultado do picker:", pickerResult); // Log detalhado para verificar o resultado
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const imageUri = pickerResult.assets[0].uri; // Acessando o primeiro item do array de assets
      //console.log("Imagem selecionada:", imageUri); // Log da URI da imagem
      const newImageMessage = {
        id: String(messages.length + 1),
        image: imageUri, // Atribuindo o URI da imagem
        sender: userId,
      };
      setMessages([...messages, newImageMessage]);
    } else {
      console.log("Nenhuma imagem selecionada ou erro ao selecionar imagem");
    }
    setIsPopupVisible(false);
  }; */


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
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const imageRef = ref(storage, `images/${Date.now()}-${userId}`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      const db = getFirestore();
      await addDoc(collection(db, "chats", project.id, "messages"), {
        image: imageUrl, // URL da imagem
        senderId: userId,
        recipientId: recipientId,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  }
  setIsPopupVisible(false);
};


  // Função para enviar arquivo
  const sendFile = async () => {
    const pickerResult = await DocumentPicker.getDocumentAsync({ type: "*/*" });

    console.log("Resultado da seleção do arquivo:", pickerResult); // Verifique a estrutura completa

    // Verifica se o resultado é um sucesso e se existem arquivos selecionados
    if (pickerResult?.canceled === false && pickerResult?.assets?.length > 0) {
      console.log("Arquivo selecionado:", pickerResult.assets[0]); // Log para verificar o arquivo selecionado

      const newFileMessage = {
        id: String(messages.length + 1),
        file: {
          uri: pickerResult.assets[0].uri,
          name: pickerResult.assets[0].name,
          type: pickerResult.assets[0].mimeType,
        },
        sender: userId,
      };
      setMessages([...messages, newFileMessage]); // Atualiza as mensagens
    } else {
      console.log(
        "Erro ao selecionar arquivo ou operação cancelada",
        pickerResult
      );
    }

    setIsPopupVisible(false); // Fecha o popup após a seleção
  };

  // Função para renderizar cada item da lista de mensagens
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.senderId === userId
            ? styles.userMessage
            : styles.recipientMessage,
        ]}
      >
        {item.image ? (
          <TouchableOpacity onPress={() => openImageModal(item.image)}>
            <Image
              source={{ uri: item.image }}
              style={styles.messageImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : item.file ? (
          <TouchableOpacity
            onPress={() => alert(`Abrir arquivo: ${item.file.name}`)}
          >
            <Text style={styles.messageText}>📄 {item.file.name}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.messageText}>{item.text}</Text>
        )}
      </View>
    );
  };

  // Função para abrir o modal da imagem
  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setIsImageModalVisible(true);
  };

  // Função para fechar o modal da imagem
  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.messagesList}
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
          value={message}
          onChangeText={setMessage}
          placeholder="Digite uma mensagem..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
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

export default ChatScreen;
