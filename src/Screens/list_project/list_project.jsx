import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { auth } from "../../../firebase-config"

const ProjectScreen = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentUser = auth.currentUser; // Obtém o usuário logado]

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projetos"));
  
      const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).filter(projeto => {
        console.log(`Comparando project.userId (${projeto.userId}) com currentUser.uid (${currentUser.uid})`);
        return projeto.userId === currentUser.uid;
      });
  
      console.log("Projetos filtrados:", projects);
      return projects;
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };  


  useEffect(() => {
  const loadProjects = async () => {
    setLoading(true);
    try {
      if (!currentUser) {
        console.error("Usuário não está autenticado.");
        return;
      }
      const data = await fetchProjects();
      console.log("Projetos", data);
      setProjects(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os projetos.");
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) {
    loadProjects();
  }
}, [currentUser]);

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
        />
        <TouchableOpacity style={styles.searchButton}>
          <Image
            // Substitua pelo caminho do ícone
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Projeto */}
      <View style={styles.projectContainer}>
        <View style={styles.projectContent}>
          {/* Ícone de usuário */}
          <Image
            // Substitua pelo caminho do ícone de usuário
            style={styles.userIcon}
          />

          {/* Detalhes do projeto */}
          <View style={styles.projectDetails}>
            <Text style={styles.projectTitle}>Projeto 1</Text>
            <Text style={styles.projectDescription}>Projeto para criar logotipo</Text>
            <Text style={styles.projectDate}>17/10/2024</Text>
          </View>

          {/* Ícone de alerta */}
          <Image
             // Substitua pelo caminho do ícone de alerta
            style={styles.alertIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#d3d3d3',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    paddingLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#1c9dea',
  },
  projectContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  projectContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#d3d3d3',
  },
  projectDetails: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  projectDescription: {
    fontSize: 14,
    color: '#1c9dea',
  },
  projectDate: {
    fontSize: 12,
    color: '#666',
  },
  alertIcon: {
    width: 20,
    height: 20,
    tintColor: '#ff3b30',
  },
});

export default ProjectScreen;
