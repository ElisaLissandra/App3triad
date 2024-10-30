import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const DetailsProjectScreen = () => {
  const files = [
    { name: "Nome_arquivo.pdf", size: "150 KB", date: "10/10/2024" },
    { name: "Nome_arquivo.pdf", size: "150 KB", date: "10/10/2024" },
    { name: "Nome_arquivo.pdf", size: "150 KB", date: "10/10/2024" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Projeto 1</Text>

      {/* Section de arquivos */}
      <Text style={styles.subHeader}>Baixa arquivo</Text>
      {files.map((file, index) => (
        <View key={index} style={styles.fileContainer}>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.fileDetails}>{file.size} {file.date}</Text>
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <FontAwesome5 name="download" size={20} color="#3c3c3c" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Data e status de urgência */}
      <View style={styles.dateContainer}>
        <MaterialIcons name="date-range" size={24} color="#1D9BF0" />
        <Text style={styles.dateText}>17/10/2024</Text>
        <View style={styles.urgentContainer}>
          <Text style={styles.urgentText}>Urgente</Text>
          <MaterialIcons name="error" size={24} color="#FF3B30" />
        </View>
      </View>

      {/* Descrição do projeto */}
      <Text style={styles.sectionTitle}>Descrição do projeto</Text>
      <Text style={styles.descriptionText}>
        Preciso desenvolver uma logotipo para incluir nas minhas peças que vão para as redes sociais, possuo paleta de cores.
      </Text>

      {/* Contexto do projeto */}
      <Text style={styles.sectionTitle}>Contexto do projeto</Text>
      <Text style={styles.descriptionText}>
        Preciso desenvolver uma logotipo para incluir nas minhas peças que vão para as redes sociais, possuo paleta de cores.
      </Text>

      {/* Botão Acompanhar status */}
      <TouchableOpacity style={styles.statusButton}>
        <Text style={styles.statusButtonText}>Acompanhar status</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3c3c3c",
    marginVertical: 10,
  },
  fileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginBottom: 8,
  },
  fileInfo: {
    flexDirection: "column",
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  fileDetails: {
    fontSize: 14,
    color: "#8c8c8c",
  },
  downloadButton: {
    padding: 5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E0F7FF",
    borderRadius: 8,
    marginVertical: 15,
  },
  dateText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  urgentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  urgentText: {
    fontSize: 16,
    color: "#FF3B30",
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: "#6c6c6c",
    marginBottom: 15,
  },
  statusButton: {
    backgroundColor: "#1D9BF0",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  statusButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
};

export default DetailsProjectScreen;
