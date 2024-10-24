import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  projectDescription: {
    color: "#0097B2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectDate: {
    color: "#888",
  },
  alertIcon: {
    marginLeft: 10,
  },
  loadingText: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 200,
  },
});

export default styles;