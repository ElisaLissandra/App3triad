import React from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Projeto = ({ title, description, date, alert }) => {
  return (
    <View style={styles.projetoItem}>
      <Image style={styles.userIcon} />
      <View style={styles.projetoInfo}>
        <Text style={styles.projetoTitle}>{title}</Text>
        <Text style={styles.projetoDescription}>{description}</Text>
        <Text style={styles.projetoDate}>{date}</Text>
        {alert && <Ionicons name="alert" size={24} color="red" />}
      </View>
    </View>
  );
};

const ProjetosScreen = () => {
  const projetos = [
    {
      id: 1,
      title: 'Projeto 1',
      description: 'Projeto para criar logotipo',
      date: '17/10/2024',
      alert: true,
    },
    // ... outros projetos
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projetos</Text>
        <TextInput style={styles.searchInput} placeholder="Pesquisar..." />
      </View>
      <FlatList
        data={projetos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Projeto {...item} />}
      />
      <View style={styles.footer}>
        <Ionicons name="person" size={32} />
        <Ionicons name="list" size={32} />
        <Ionicons name="calendar" size={32} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  projetoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  projetoInfo: {
    flex: 1,
  },
  projetoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  projetoDescription: {
    color: '#888',
  },
  projetoDate: {
    color: '#666',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default ProjetosScreen;