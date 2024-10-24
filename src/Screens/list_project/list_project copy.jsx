import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { auth } from "../../../firebase-config"; // Importa a autenticação
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentUser = auth.currentUser; // Obtém o usuário logado

  console.log(currentUser)

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projetos"));
      const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).filter(project => project.userId === currentUser.uid); // Filtra pelo userId
      
      return projects; // Retorna os projetos filtrados
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projetos</Text>
        <TextInput style={styles.searchInput} placeholder="Pesquisar..." />
      </View>
      <FlatList
        data={projects}
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