import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,  
    marginRight: -24, 
  }, 
  scrollContainer: {
    flex: 1, // Adiciona flexibilidade
    marginBottom: 20, // Espaço abaixo do ScrollView
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    width: 20,
    height: 60,
  },
  searchButton: {
    backgroundColor: "#0097B2",
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
  },
  urgentFilterContainer: {
    flexDirection: "row", 
    alignItems: "center",
    marginBottom: 10,
  },
  urgentFilterLabel: {
    flex: 1, 
    fontSize: 15, 
    color: "#101010", 
  },
  projectContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginBottom: 20,
  },
  projectContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#E5E5E5', 
    justifyContent: 'center',
    alignItems: 'center', 
    marginRight: 15, 
  },
  userIcon: {
    marginRight: 15,
  },
  projectDetails: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
 /*  projectDescription: {
    color: "#0097B2",
    fontWeight: "bold",
    marginBottom: 5,
  }, */
  projectDate: {
    color: "#888",
    paddingVertical: 3,
    fontSize:15,
  },
  alertIcon: {
    marginLeft: 10,
  },
  loadingText: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 200,
  },
  requestProject: {
    width: "100%",
    height: 50,
    backgroundColor: "#0097B2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 200,
  },
  requestProjectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20, 
    right: 20, 
    width: 60,
    height: 60,
    backgroundColor: "#0097B2", 
    borderRadius: 30, 
    padding: 10,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
  },
  detailsButton: {
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },

  detailsButtonText: {
    color: "#0097B2", // Cor branca para o texto
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsUrgentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  urgentIcon: {
    marginLeft: 'auto', // Ajuste o espaçamento conforme necessário
  },

});

export default styles;