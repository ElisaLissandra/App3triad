import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { auth } from "../../../firebase-config";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const ProjectScreen = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  const fetchProjects = () => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (querySnapshot) => {
      const projectsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((project) => project.userId === currentUser.uid);
      
      setProjects(projectsData);
      setLoading(false); // Define loading como false após carregar os dados
    }, (error) => {
      console.error("Erro ao escutar projetos:", error);
      Alert.alert("Erro", "Não foi possível carregar os projetos.");
      setLoading(false); // Define loading como false mesmo em caso de erro
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = fetchProjects();
      return () => unsubscribe();
    }
  }, [currentUser]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearchText =
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(searchText.toLowerCase()) ||
      project.deadline.toLowerCase().includes(searchText.toLowerCase());

    return matchesSearchText && (!showUrgentOnly || project.urgent);
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Projetos</Text>
        <TouchableOpacity>
          <FontAwesome5 name="cog" size={24} color="#bfbfbf" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesome5 name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.urgentFilterContainer}>
        <Text style={styles.urgentFilterLabel}>Mostrar apenas urgentes</Text>
        <Switch value={showUrgentOnly} onValueChange={setShowUrgentOnly} />
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView style={styles.projectsListContainer} showsVerticalScrollIndicator={false}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando projetos...</Text>
          ) : (
            <View>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((projeto) => (
                  <View key={projeto.id} style={styles.projectContainer}>
                    <View style={styles.projectContent}>
                      <View style={styles.iconCircle}>
                        <FontAwesome5 name="user-alt" size={30} color="#303030" />
                      </View>
                      <View style={styles.projectDetails}>
                        <Text style={styles.projectTitle}>{projeto.title}</Text>
                        <Text style={styles.projectDescription}>{projeto.description}</Text>
                        <Text style={styles.projectDate}>{projeto.deadline}</Text>
                      </View>
                      {projeto.urgent && (
                        <FontAwesome5 name="exclamation-triangle" size={20} color="#E74C3C" />
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <TouchableOpacity
                  style={styles.requestProject}
                  onPress={() => navigation.navigate("RequestProject")}
                >
                  <Text style={styles.requestProjectButtonText}>Solicitar Projeto</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Botão flutuante para adicionar projetos */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("RequestProject")}>
        <FontAwesome5 name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Botão de logout */}
      {/* Uncomment to enable logout button */}
      {/* <Button title="Logout" onPress={() => auth.signOut()} /> */}
    </View>
  );
};

export default ProjectScreen;