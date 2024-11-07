import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"; 
import styles from "./styles";

const FilterModal = ({
  visible,
  onClose,
  onApply,
  initialShowUrgentOnly,
  initialSelectedStatus,
  projectStatuses,
}) => {
  // Estados temporários para os filtros
  const [tempShowUrgentOnly, setTempShowUrgentOnly] = useState(initialShowUrgentOnly);
  const [tempSelectedStatus, setTempSelectedStatus] = useState(initialSelectedStatus);

  useEffect(() => {
    setTempShowUrgentOnly(initialShowUrgentOnly);
    setTempSelectedStatus(initialSelectedStatus);
  }, [initialShowUrgentOnly, initialSelectedStatus]);

  const toggleStatusSelection = (statusKey) => {
    setTempSelectedStatus((prevSelected) => {
      const selected = prevSelected || [];
      return selected.includes(statusKey)
        ? selected.filter((key) => key !== statusKey)
        : [...selected, statusKey];
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
              value={tempShowUrgentOnly}
              onValueChange={(value) => setTempShowUrgentOnly(value)}
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
                  onPress={() => toggleStatusSelection(status.key)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5
                      name={status.icon} 
                      size={18} 
                      color={status.iconColor} 
                      style={{ marginRight: 10 }} 
                    />
                    <Text
                      style={[
                        styles.statusOptionText,
                        tempSelectedStatus.includes(status.key) && styles.selectedStatus,
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
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => onApply(tempShowUrgentOnly, tempSelectedStatus)}
            >
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
