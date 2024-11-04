import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const StatusProjectScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <FontAwesome5 name="chevron-left" size={24} color="#0097B2" />
        </TouchableOpacity>
        <Text style={styles.title}>Status do projeto</Text>
      </View>

      {/* Status List */}
      <ScrollView style={styles.statusContainer}>
        <StatusItem text="Em análise" icon="hourglass-half" iconColor="#d97706" />
        <StatusItem text="Aguardando Aprovação" icon="clock" iconColor="#a3a3a3" />
        <StatusItem text="Projeto aceito ou recusado" icon="check-circle" iconColor="#4caf50" />
        <StatusItem text="Faltando informações" icon="exclamation-circle" iconColor="#e53935" />
        <StatusItem text="Projeto em desenvolvimento" icon="tools" iconColor="#ffa726" />
        <StatusItem text="Projeto concluído" icon="check" iconColor="#0097B2" />
      </ScrollView>
    </View>
  );
};

// Componente para cada item de status
const StatusItem = ({ text, icon, iconColor }) => (
  <View style={styles.statusItem}>
    <View style={styles.statusIcon}>
      {icon && <FontAwesome5 name={icon} size={20} color={iconColor} />}
    </View>
    <Text style={styles.statusText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerContainer: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  statusContainer: {
    flex: 1,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6E6FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold", // Define o texto como negrito
  },
});

export default StatusProjectScreen;
