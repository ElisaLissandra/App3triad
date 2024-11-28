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
    fontWeight: "bold",
    flex: 1, 
    textAlign: "center", 
  },
  newCommentIcon: {
    marginLeft: 8, 
  },
  scrollContainer: {
    flex: 1, 
    marginBottom: 20, 
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    width: "82%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    
  },
  searchInput: {
    flex: 1,
    height: 60,
  },
  filterButton: {
    paddingHorizontal: 15,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10, 
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  projectContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
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
  noProjectsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888", 
    marginTop: 200,
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
    color: "#0097B2", 
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsUrgentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  detailsUrgentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: 'space-between', 
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentBorder: {
    borderColor: "#fecaca", 
  },
  textNoProjects:{ flex: 1,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 220, 
    color: "#888", 
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#FFFFFF",
    marginTop: 220, 
  },

});

export default styles;