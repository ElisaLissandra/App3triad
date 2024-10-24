import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { auth } from "../../../firebase-config";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";

const ProjectScreen = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const currentUser = auth.currentUser; // Obtém o usuário logado

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projetos"));

      const projects = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((projeto) => projeto.userId === currentUser.uid);
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

  // Filtra os projetos com base no texto de pesquisa
  const filteredProjects = projects.filter((project) => {
    const matchesSearchText =
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(searchText.toLowerCase()) ||
      project.deadline.toLowerCase().includes(searchText.toLowerCase());

    // Se 'showUrgentOnly' estiver ativo, filtra também por 'urgent'
    const matchesUrgentFilter = showUrgentOnly ? project.urgent : true;

    return matchesSearchText && matchesUrgentFilter;
  });

  return (
    <View style={styles.container}>
      {/* Título da página */}
      <Text style={styles.pageTitle}>Projetos</Text>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          {/* Ícone de pesquisa */}
          <FontAwesome5 name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Botão para filtrar apenas projetos urgentes */}
      <View style={styles.urgentFilterContainer}>
        <Text style={styles.urgentFilterLabel}>Mostrar apenas urgentes</Text>
        <Switch value={showUrgentOnly} onValueChange={setShowUrgentOnly} />
      </View>

      {/* Carregando projetos */}
      {loading ? (
        <Text style={styles.loadingText}>Carregando projetos...</Text>
      ) : (
        <ScrollView style={styles.projectsListContainer}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((projeto) => (
              <View key={projeto.id} style={styles.projectContainer}>
                <View style={styles.projectContent}>
                  {/* Ícone de usuário dentro de um círculo */}
                  <View style={styles.iconCircle}>
                    <FontAwesome5 name="user-alt" size={30} color="#303030" />
                  </View>

                  <View style={styles.projectDetails}>
                    <Text style={styles.projectTitle}>{projeto.title}</Text>
                    <Text style={styles.projectDescription}>
                      {projeto.description}
                    </Text>
                    <Text style={styles.projectDate}>{projeto.deadline}</Text>
                  </View>

                  {/* Exibindo o ícone de alerta apenas se 'urgent' for true */}
                  {projeto.urgent && (
                    <FontAwesome5
                      name="exclamation-triangle"
                      size={20}
                      color="#E74C3C"
                      style={styles.alertIcon}
                    />
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noResultsText}>Nenhum projeto encontrado.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ProjectScreen;
