import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /* container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  }, */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1, 
    padding: 20, 
    justifyContent: 'flex-start',
  },
  headerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginLeft: 70,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  inputTitle: {
    width: "100%",
    height: 60,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  fileUploadButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  obsContainer: {
    fontSize: 13,
    marginBottom: 20,
    width: "100%", 
  },
  obsHighlight: {
    color: "#0097B2", 
    fontWeight: "bold", 
  },
  obsText: {
    color: "#101010", 
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0097B2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 5, 
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fileUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0097B2",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  fileDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  fileIcon: {
    marginRight: 10,
  },
  fileDetail: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
  },
  fileSize: {
    fontSize: 12,
    color: "#777777",
    marginRight: 10,
  },
  fileDate: {
    fontSize: 12,
    color: "#777777",
    marginRight: 10,
  },
  trashIcon: {
    marginLeft: 8,
  },
});

export default styles;