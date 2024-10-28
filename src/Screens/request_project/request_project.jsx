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
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./styles";
import NavigationBar from "../../Components/NavBar/Navbar";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RequestProject = () => {
  const [urgent, setUrgent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generalContext, setGeneralContext] = useState("");
  const [deadline, setDeadline] = useState("");
  const [files, setFiles] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const navigation = useNavigation();

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

  /* const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newFile = {
          uri: file.uri,
          name: file.name,
          size: file.size,
          date: new Date(file.modificationTime).toLocaleDateString(),
        };
        setFiles((prevFiles) => [...prevFiles, newFile]); // Adiciona o arquivo à lista
        Alert.alert("Arquivo anexado:", file.name);
      } else {
        Alert.alert("Nenhum arquivo selecionado.");
      }
    } catch (error) {
      Alert.alert("Erro ao anexar arquivo:", error.message);
      console.log("Erro ao anexar arquivo:", error.message);
    }
  }; */

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

        if (!allowedTypes.includes(file.mimeType)) {
          Alert.alert(
            "Erro",
            "Somente arquivos PDF, PNG ou JPG são permitidos."
          );
          return;
        }

        const newFile = {
          uri: file.uri,
          name: file.name,
          size: file.size,
          date: new Date(file.modificationTime).toLocaleDateString(),
        };
        setFiles((prevFiles) => [...prevFiles, newFile]); // Adiciona o arquivo à lista
        Alert.alert("Arquivo anexado:", file.name);
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
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        Alert.alert("Erro", "Nenhum usuário autenticado.");
        return;
      }

      const uploadedFileUrls = [];
      for (const file of files) {
        try {
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, blob);
          const fileUrl = await getDownloadURL(storageRef);
          uploadedFileUrls.push({ name: file.name, url: fileUrl });
        } catch (uploadError) {
          Alert.alert("Erro ao fazer upload de arquivo", uploadError.message);
          console.error("Erro ao fazer upload de arquivo:", uploadError);
        }
      }

      await addDoc(collection(db, "projects"), {
        title,
        description,
        generalContext,
        deadline,
        urgent,
        files: uploadedFileUrls, // Lista de URLs dos arquivos
        status: "pendente",
        userId: currentUser.uid,
      });

      Alert.alert("Sucesso", "Projeto enviado com sucesso!");
      setTitle("");
      setDescription("");
      setGeneralContext("");
      setDeadline("");
      setUrgent(false);
      setFiles([]);
    } catch (error) {
      Alert.alert("Erro ao enviar o projeto", error.message);
      console.error("Erro ao enviar o projeto:", error);
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
            <Text style={styles.title}>Explique sobre seu projeto</Text>
          </View>

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
          {/* <Text style={styles.label}>Anexar arquivos</Text>
          <TouchableOpacity
            style={styles.fileUploadButton}
            onPress={handleFileUpload}
          >
            <Text style={styles.buttonText}>Anexar arquivo</Text>
          </TouchableOpacity>

          {files.map((file, index) => (
            <View key={index} style={styles.fileDetailsContainer}>
              <Text style={styles.fileDetail}>Nome: {file.name}</Text>
              <Text style={styles.fileDetail}>Tamanho: {(file.size / 1024).toFixed(2)} KB</Text>
              <Text style={styles.fileDetail}>Data: {file.date}</Text>
            </View>
          ))}  */}

          <View style={styles.container}>
            {/* Botão para upload de arquivo */}
            <TouchableOpacity
              style={styles.fileUploadButton}
              onPress={handleFileUpload}
            >
              <FontAwesome5 name="paperclip" size={16} color="#ffffff" />
              <Text style={styles.buttonText}>Anexar arquivo</Text>
            </TouchableOpacity>

            {/* Exibição dos detalhes do arquivo */}
            {files.map((file, index) => (
              <View key={index} style={styles.fileDetailsContainer}>
                <FontAwesome5
                  name="file-alt"
                  size={16}
                  color="#5a5a5a"
                  style={styles.fileIcon}
                />
                <Text style={styles.fileDetail}>{file.name}</Text>
                <Text style={styles.fileSize}>
                  {(file.size / 1024).toFixed(2)} KB
                </Text>
                <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                  <FontAwesome5
                    name="trash-alt"
                    size={16}
                    color="#ED1515"
                    style={styles.trashIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

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
