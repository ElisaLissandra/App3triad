import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const StatusProjectScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { status } = route.params;

  const statusItems = [
    { text: "Pendente", icon: "ellipsis-h", iconColor: "#ff5722", key: "pendente" },
    { text: "Em análise", icon: "hourglass-half", iconColor: "#d97706", key: "analise" },
    { text: "Aguardando Aprovação", icon: "clock", iconColor: "#a3a3a3", key: "aguardando_aprovacao" },
    { text: "Projeto aceito ou recusado", icon: "check-circle", iconColor: "#4caf50", key: "aceito_recusado" },
    { text: "Faltando informações", icon: "exclamation-circle", iconColor: "#e53935", key: "faltando_informacoes" },
    { text: "Projeto em desenvolvimento", icon: "tools", iconColor: "#ffa726", key: "em_desenvolvimento" },
    { text: "Projeto concluído", icon: "check", iconColor: "#0097B2", key: "concluido" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={24} color="#0097B2" />
        </TouchableOpacity>
        <Text style={styles.title}>Status do projeto</Text>
      </View>

      {/* Status List */}
      <ScrollView style={styles.statusContainer}>
        {statusItems.map((item) => (
          <StatusItem
            key={item.key}
            text={item.text}
            icon={item.icon}
            iconColor={item.iconColor}
            isActive={item.key === status}
            isDisabled={item.key !== status} // Adicionando a propriedade isDisabled
          />
        ))}
      </ScrollView>
    </View>
  );
};

const StatusItem = ({ text, icon, iconColor, isActive, isDisabled }) => (
  <View style={[styles.statusItem, isActive && styles.activeStatus, isDisabled && styles.disabledStatus]}>
    <View style={styles.statusIcon}>
      {icon && <FontAwesome5 name={icon} size={20} color={iconColor} />}
    </View>
    <Text style={[styles.statusText, isActive ? styles.activeText : styles.disabledText]}>{text}</Text>
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
  },
  /* activeStatus: {
    backgroundColor: "#f0f8ff",
  }, */
  activeText: {
    fontWeight: "bold",
    color: "#0097B2",
  },
  disabledStatus: {
    opacity: 0.5, 
  },
  disabledText: {
    color: "#999", 
  },
});

export default StatusProjectScreen;
