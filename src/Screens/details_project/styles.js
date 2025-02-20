import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
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
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3c3c3c",
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 5,
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
    marginBottom: 8,
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
  /* statusButton: {
    backgroundColor: "#0097B2",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  }, */
  statusButtonContainer: {
   /*  position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20, */
    marginTop: "auto",
    paddingBottom: 20,
  },
  statusButton: {
    backgroundColor: "#0097B2",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  statusButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row", // Aligns buttons side by side
    justifyContent: "space-between", // Adds space between buttons
    marginTop: 20,
  },
  rejectButton: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 5,
    flex: 1, // Ensures buttons take equal space
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: "#27AE60",
    padding: 15,
    borderRadius: 5,
    flex: 1, // Ensures buttons take equal space
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
});

export default styles;
