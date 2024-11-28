import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  PanResponder,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./modal/modal_filter";
import { UserContext } from "../../Context/UserContext";
import { getAuth } from "firebase/auth";

const ProjectScreen = () => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  /* const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser; */
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
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

  // Função para buscar projetos
  useEffect(() => {
    if (!userData) {
      // Exibe um estado de carregamento se o userData ainda não estiver disponível
      console.log("Usuário não encontrado no contexto.");
      return;
    }

    const fetchProjects = () => {
      const { isAdmin, uid } = userData;

      if (!uid) {
        console.error("UID do usuário não está definido.");
        return;
      }

      setLoading(true);

      const projectsQuery = isAdmin
        ? collection(db, "projects")
        : query(collection(db, "projects"), where("userId", "==", uid));

      const unsubscribe = onSnapshot(
        projectsQuery,
        (querySnapshot) => {
          const projectsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(projectsData);
          setLoading(false);
        },
        (error) => {
          console.error("Erro ao carregar projetos:", error);
          Alert.alert("Erro", "Não foi possível carregar os projetos.");
          setLoading(false);
        }
      );

      return unsubscribe;
    };

    // Se userData estiver disponível, faça a busca
    const unsubscribe = fetchProjects();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userData]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearchText =
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(searchText.toLowerCase()) ||
      project.deadline.toLowerCase().includes(searchText.toLowerCase());

    const matchesUrgent = !showUrgentOnly || project.urgent;
    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(project.status);

    return matchesSearchText && matchesUrgent && matchesStatus;
  });

  const applyFilters = (urgent, status) => {
    setShowUrgentOnly(urgent);
    setSelectedStatus(status);
    setIsModalVisible(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      setButtonPosition({
        x: gestureState.moveX - 30,
        y: gestureState.moveY - 30,
      });
    },
    onPanResponderRelease: () => {},
  });

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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color="#0097B2"
                style={styles.activityIndicator}
              />
            </View>
          ) : filteredProjects.length > 0 ? (
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
                      {project.hasNewMessages && (
                        <FontAwesome5 name="envelope" size={20} color="red" />
                      )}
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

                        {status ? (
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
                          <Text>Status desconhecido</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.textNoProjects}>Nenhum projeto encontrado</Text>
          )}
        </ScrollView>
      </View>

      {!userData?.isAdmin && !loading && (
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
          <TouchableOpacity
            onPress={() => navigation.navigate("RequestProject")}
          >
            <FontAwesome5 name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}

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
