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

  const projectStatuses = [
    {
      /* text: "Pendente", */
      icon: "hourglass-half",
      iconColor: "#d97706",
      key: "pendente",
    },
    {
      /* text: "Projeto aceito ou recusado", */
      icon: "check-circle",
      iconColor: "#4caf50",
      key: "aceito",
    },
    {
      /* text: "Faltando informações", */
      icon: "exclamation-circle",
      iconColor: "#e53935",
      key: "faltando_informacoes",
    },
    {
      /* text: "Projeto em desenvolvimento", */
      icon: "tools",
      iconColor: "#ffa726",
      key: "em_desenvolvimento",
    },
    {
      /*  text: "Projeto concluído", */
      icon: "check",
      iconColor: "#0097B2",
      key: "concluido",
    },
    {
      icon: "times-circle",
      iconColor: "#e53935",
      key: "recusado",
    },
  ];

  const fetchProjects = () => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (querySnapshot) => {
        const projectsData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((project) => project.userId === currentUser.uid);

        setProjects(projectsData);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao escutar projetos:", error);
        Alert.alert("Erro", "Não foi possível carregar os projetos.");
        setLoading(false); // Define loading como false mesmo em caso de erro
      }
    );

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
        <TouchableOpacity>
          <FontAwesome5 name="cog" size={24} color="#bfbfbf" />
        </TouchableOpacity>
        <Text style={styles.title}>Projetos</Text>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FontAwesome5
            name="search"
            size={20}
            color="#bfbfbf"
            style={styles.searchButton}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={24} color="#0097B2" />
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView
          style={styles.projectsListContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              // Buscar o status correspondente ao projeto
              const status = projectStatuses.find(
                (status) => status.key === project.status
              );

              return (
                <View
                  key={project.id}
                  style={[
                    styles.projectContainer,
                    project.urgent && styles.urgentBorder,
                  ]}
                >
                  <View style={styles.projectContent}>
                    <View style={styles.iconCircle}>
                      <FontAwesome5 name="user-alt" size={30} color="#303030" />
                    </View>
                    <View style={styles.projectDetails}>
                      <Text
                        style={styles.projectTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {project.title}
                      </Text>
                      <Text style={styles.projectDate}>{project.deadline}</Text>

                      <View style={styles.detailsUrgentContainer}>
                        <TouchableOpacity
                          style={styles.detailsButton}
                          onPress={() =>
                            navigation.navigate("DetailsProject", { project })
                          }
                        >
                          <Text style={styles.detailsButtonText}>
                            Ver Detalhes
                          </Text>
                        </TouchableOpacity>

                        {/* Exibir o ícone do status ao lado direito do botão */}
                        {status && (
                          <View style={styles.statusContainer}>
                            <FontAwesome5
                              name={status.icon}
                              size={22}
                              color={status.iconColor}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.noProjectsText}>Nenhum projeto encontrado</Text>
          )}
        </ScrollView>
      </View>

      {/* Botão flutuante para adicionar projetos */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RequestProject")}
      >
        <FontAwesome5 name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Botão de logout */}
      {/* Uncomment to enable logout button */}
      {/* <Button title="Logout" onPress={() => auth.signOut()} /> */}
    </View>
  );
};

export default ProjectScreen;
