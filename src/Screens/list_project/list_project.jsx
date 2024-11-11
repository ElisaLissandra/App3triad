import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  PanResponder,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { auth } from "../../../firebase-config";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./modal/modal_filter";
import { query, where } from "firebase/firestore";

const ProjectScreen = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const currentUser = auth.currentUser;
  const navigation = useNavigation();
  const [buttonPosition, setButtonPosition] = useState({ x: 30, y: 600 });


  const projectStatuses = [
    {
      icon: "hourglass-half",
      iconColor: "#d97706",
      key: "Pendente",
      label: "Pendente",
    },
    {
      icon: "check-circle",
      iconColor: "#4caf50",
      key: "Aceito",
      label: "Aceito",
    },
    {
      icon: "exclamation-circle",
      iconColor: "#e53935",
      key: "Faltando Informações",
      label: "Faltando Informações",
    },
    {
      icon: "tools",
      iconColor: "#ffa726",
      key: "Em Desenvolvimento",
      label: "Em Desenvolvimento",
    },
    {
      icon: "check",
      iconColor: "#0097B2",
      key: "Concluído",
      label: "Concluído",
    },
    {
      icon: "times-circle",
      iconColor: "#e53935",
      key: "Recusado",
      label: "Recusado",
    },
  ];

  const fetchProjects = (currentUserId) => {
    if (!currentUserId) {
      console.error("currentUserId é indefinido");
      return; 
    }

    const unsubscribe = onSnapshot(
      query(collection(db, "projects"), where("userId", "==", currentUserId)),
      (querySnapshot) => {
        let projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Projetos do usuário:", projectsData);
        setProjects(projectsData);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao escutar projetos:", error);
        Alert.alert("Erro", "Não foi possível carregar os projetos.");
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        fetchProjects(user.uid); 
      } else {
        console.error("Nenhum usuário está conectado no momento.");
      }
    });
  
    return () => unsubscribeFromAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchProjects(currentUser.uid); // Passa o ID do usuário atual
    }
  }, [currentUser]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      setButtonPosition({
        x: gestureState.moveX - 30, // ajuste para centralizar o botão
        y: gestureState.moveY - 30,
      });
    },
    onPanResponderRelease: () => {},
  });

  const filteredProjects = projects.filter((project) => {
    const matchesSearchText =
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(searchText.toLowerCase()) ||
      project.deadline.toLowerCase().includes(searchText.toLowerCase());

    const matchesUrgent = !showUrgentOnly || project.urgent;

    // Verificar se o status do projeto está na lista de status selecionados
    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(project.status);

    return matchesSearchText && matchesUrgent && matchesStatus;
  });

  const applyFilters = (urgent, status) => {
    setShowUrgentOnly(urgent);
    setSelectedStatus(status);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <FontAwesome5
            name="cog"
            size={24}
            color="#bfbfbf"
            onPress={() => navigation.navigate("Settings")}
          />
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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsModalVisible(true)}
        >
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

                        {status ? ( // Verifica se encontrou o status
                          <View
                            style={[
                              styles.statusContainer,
                              { borderColor: status.iconColor },
                            ]}
                          >
                            <FontAwesome5
                              name={status.icon}
                              size={18}
                              color={status.iconColor}
                            />
                          </View>
                        ) : (
                          <Text>Status desconhecido</Text> // Opcional: Exibe mensagem se o status não for encontrado
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>Nenhum projeto encontrado.</Text>
          )}
        </ScrollView>
      </View>

      {/* Botão flutuante para adicionar projetos com movimento */}
      <View
        {...panResponder.panHandlers}
        style={[
          styles.addButton,
          {
            position: "absolute",
            left: buttonPosition.x,
            top: buttonPosition.y,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("RequestProject")}>
          <FontAwesome5 name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FilterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onApply={applyFilters}
        initialShowUrgentOnly={showUrgentOnly}
        initialSelectedStatus={selectedStatus}
        projectStatuses={projectStatuses}
      />
    </View>
  );
};

export default ProjectScreen;
