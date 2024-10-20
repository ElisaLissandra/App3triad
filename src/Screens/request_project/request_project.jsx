import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";

const RequestProject = () => {
  const [urgent, setUrgent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generalContext, setGeneralContext] = useState("");
  const [deadline, setDeadline] = useState("");

  const toggleSwitch = () => setUrgent((previousState) => !previousState);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      title,
      description,
      generalContext,
      deadline,
      urgent,
    });
  };

  return (
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
      <Text style={styles.label}>Descrição do projeto com suas palavras</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Ex: Preciso desenvolver uma logotipo para incluir nas minhas peças que vão para as redes sociais, possuo paleta de cores..."
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      {/* File Upload Placeholder */}
      <Text style={styles.label}>Anexar arquivos</Text>
      <TouchableOpacity style={styles.fileUploadButton}>
        <Text>Anexar arquivo</Text>
      </TouchableOpacity>

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
  );
};



export default RequestProject;
