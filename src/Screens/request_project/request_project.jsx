import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { db, storage } from "../../../firebase-config"; // Importando o Firestore e o Storage
import { collection, addDoc } from "firebase/firestore"; // Certifique-se de que essa importação está correta
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./styles";

const RequestProject = () => {
  const [urgent, setUrgent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generalContext, setGeneralContext] = useState("");
  const [deadline, setDeadline] = useState("");
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileDate, setFileDate] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Listen for keyboard show/hide events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    // Cleanup listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const toggleSwitch = () => setUrgent((previousState) => !previousState);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        setFileUri(result.uri); // Armazena o URI do arquivo
        setFileName(result.name); // Armazena o nome do arquivo
        setFileSize(result.size); // Armazena o tamanho do arquivo
        setFileDate(new Date(result.modificationTime).toLocaleDateString()); // Armazena a data de modificação do arquivo
        Alert.alert("Arquivo anexado:", result.name);
      } else {
        Alert.alert("Nenhum arquivo selecionado.");
      }
    } catch (error) {
      Alert.alert("Erro ao anexar arquivo:", error.message);
      console.log("Erro ao anexar arquivo:", error.message);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !generalContext || !deadline) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      let fileUrl = ""; // Variável para armazenar a URL do arquivo

      // Enviar arquivo para o Firebase Storage
      if (fileUri) {
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const storageRef = ref(
          storage,
          `uploads/${Date.now()}_${fileUri.split("/").pop()}`
        ); // Criando referência no Storage
        await uploadBytes(storageRef, blob); // Enviando o arquivo

        // Obtendo a URL do arquivo após o upload
        fileUrl = await getDownloadURL(storageRef);
      }

      // Adicionando dados ao Firestore
      await addDoc(collection(db, "projetos"), {
        title,
        description,
        generalContext,
        deadline,
        urgent,
        fileUrl,
      });
      Alert.alert("Sucesso", "Projeto enviado com sucesso!");

      // Limpar os campos do formulário após o envio
      setTitle("");
      setDescription("");
      setGeneralContext("");
      setDeadline("");
      setUrgent(false);
      setFileUri(null);
    } catch (error) {
      Alert.alert("Erro", "Erro ao enviar o projeto: " + error.message);
      console.log("Erro", "Erro ao enviar o projeto: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Explique sobre seu projeto</Text>

          {/* Project Title */}
          <Text style={styles.label}>Título do Projeto</Text>
          <TextInput
            style={styles.inputTitle}
            placeholder="Ex: Desenho de uma logotipo para uma empresa de tecnologia."
            value={title}
            onChangeText={setTitle}
            multiline={true}
          />

          {/* Project Description */}
          <Text style={styles.label}>
            Descrição do projeto com suas palavras
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Ex: Preciso desenvolver uma logotipo para incluir nas minhas peças que vão para as redes sociais, possuo paleta de cores..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          {/* File Upload Placeholder */}
          <Text style={styles.label}>Anexar arquivos</Text>
          <TouchableOpacity
            style={styles.fileUploadButton}
            onPress={handleFileUpload}
          >
            <Text style={styles.buttonText}>Anexar arquivo</Text>
          </TouchableOpacity>

          {/* Display File Details */}
          {fileUri && (
            <View style={styles.fileDetailsContainer}>
              <Text style={styles.fileDetail}>Nome: {fileName}</Text>
              <Text style={styles.fileDetail}>
                Tamanho: {(fileSize / 1024).toFixed(2)} KB
              </Text>
              <Text style={styles.fileDetail}>Data: {fileDate}</Text>
            </View>
          )}

          {/* General Project Context */}
          <Text style={styles.label}>Contexto geral do projeto</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Explique o contexto do projeto e objetivo e o alcance do projeto."
            value={generalContext}
            onChangeText={setGeneralContext}
            multiline={true}
          />

          {/* Deadline */}
          <Text style={styles.label}>Prazo para entrega</Text>
          <TextInput
            style={styles.input}
            placeholder="00/00/0000"
            value={deadline}
            onChangeText={setDeadline}
            keyboardType="numeric"
          />

          <Text style={styles.obsContainer}>
            <Text style={styles.obsHighlight}>OBS:</Text>
            <Text style={styles.obsText}>
              {" "}
              Ative apenas se o prazo do seu projeto for extremamente curto ou
              urgente.
            </Text>
          </Text>

          {/* Urgent Switch */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Urgente?</Text>
            <Switch onValueChange={toggleSwitch} value={urgent} />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RequestProject;
