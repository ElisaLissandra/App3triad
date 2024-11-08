import React, { useState } from "react";
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
import styles from "./styles";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Olá, como posso te ajudar com as informações do projeto?",
      sender: "bot",
    },
    {
      id: "2",
      text: "Gostaria de saber mais sobre os detalhes do orçamento.",
      sender: "user",
    },
  ]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false); // Estado para controlar o modal da imagem
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada

  // Função para enviar mensagem de texto
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: String(messages.length + 1), text: message, sender: "user" },
      ]);
      setMessage("");
    }
  };

  // Função para enviar imagem
  const sendImage = async () => {
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
        sender: "user",
      };
      setMessages([...messages, newImageMessage]);
    } else {
      console.log("Nenhuma imagem selecionada ou erro ao selecionar imagem");
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
        sender: "user",
      };
      setMessages([...messages, newFileMessage]); // Atualiza as mensagens
    } else {
      console.log("Erro ao selecionar arquivo ou operação cancelada", pickerResult);
    }
  
    setIsPopupVisible(false); // Fecha o popup após a seleção
  };
  
  // Função para renderizar cada item da lista de mensagens
  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.botMessage,
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
        keyExtractor={(item) => item.id}
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
