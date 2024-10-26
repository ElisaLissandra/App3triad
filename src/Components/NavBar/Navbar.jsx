import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get('window'); // Obtém a largura da tela

const NavigationBar = () => {
  const navigation = useNavigation();

  const handleRequestProject = () => {
    navigation.navigate("RequestProject");
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.iconContainer}>
        <FontAwesome5 name="tasks" size={24} color="#C2C2C2" />
      </TouchableOpacity>

      {/* Botão central com ícone de "+" e círculo atrás */}
      <TouchableOpacity style={styles.addButton} onPress={handleRequestProject}>
        <FontAwesome5 name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        {/* Mudança de "sign-out-alt" para "cog" para ícone de configurações */}
        <FontAwesome5 name="cog" size={24} color="#bfbfbf" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#0097B2', // Cor de fundo do círculo
    borderRadius: 30, // Deixa o botão circular
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default NavigationBar;
