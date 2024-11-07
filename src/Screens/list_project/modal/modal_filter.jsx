import React from 'react';
import { Modal, View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"; 
import styles from "./styles";

const FilterModal = ({
  visible,
  onClose,
  showUrgentOnly,
  setShowUrgentOnly,
  selectedStatus = [],  // Inicializa como array vazio se não for passado
  setSelectedStatus,
  projectStatuses,
}) => {
  // Alterando para adicionar/remover status ao clicar
  const toggleStatusSelection = (statusKey) => {
    setSelectedStatus((prevSelected) => {
      const selected = prevSelected || []; // Garantindo que prevSelected seja um array
      if (selected.includes(statusKey)) {
        return selected.filter((key) => key !== statusKey); // Remove status
      } else {
        return [...selected, statusKey]; // Adiciona status
      }
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filtros</Text>

          {/* Filtro de Urgente */}
          <View style={styles.filterOptionContainer}>
            <Text>Urgente</Text>
            <Switch
              value={showUrgentOnly}
              onValueChange={(value) => setShowUrgentOnly(value)}
            />
          </View>

          {/* Filtro de Status */}
          <View style={styles.filterOptionContainer}>
            <Text>Status</Text>
            <ScrollView style={styles.statusScrollContainer}>
              {projectStatuses.map((status) => (
                <TouchableOpacity
                  key={status.key}
                  style={styles.statusOption}
                  onPress={() => toggleStatusSelection(status.key)} // Chama a função de alternância
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Exibe o ícone de acordo com o status */}
                    <FontAwesome5
                      name={status.icon} 
                      size={18} 
                      color={status.iconColor} 
                      style={{ marginRight: 10 }} 
                    />
                    <Text
                      style={[
                        styles.statusOptionText,
                        selectedStatus.includes(status.key) && styles.selectedStatus, // Adiciona estilo quando selecionado
                      ]}
                    >
                      {status.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Botões de aplicar e cancelar */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
