import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  titleProject: {
    fontSize: 16,
    color: "#8c8c8c",
    marginBottom: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#333",
    lineHeight: 22,
  },
  userInfo: {
    fontSize: 16,
    color: "#6c6c6c",
    marginLeft: 5,
    marginTop: 15,
  },
  userInfoInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#ffa300",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#28a745",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1, // Opcional: ajusta o botão para ocupar uma parte do espaço disponível
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3c3c3c",
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  fileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginBottom: 50,
  },
  fileInfo: {
    flexDirection: "column",
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  fileDetails: {
    fontSize: 14,
    color: "#6c6c6c",
  },
  downloadButton: {
    padding: 5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E0F7FF",
    borderRadius: 8,
    marginVertical: 15,
  },
  dateText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  urgentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  urgentText: {
    fontSize: 16,
    color: "#FF3B30",
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: "#6c6c6c",
    marginBottom: 15,
  },
  statusButton: {
    backgroundColor: "#0097B2",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  statusButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: "auto",
    paddingBottom: 20,
  },
});

export default styles;
