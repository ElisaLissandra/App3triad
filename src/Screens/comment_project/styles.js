import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginTop: 40,
    padding: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  attachButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#0097B2",
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  messageContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1, 
  },
  userName: {
    fontWeight: "bold",
    color: "#fff"
  },
  message:{ 
    color: "#fff" 
  },
  messageCurrentUser: {
    backgroundColor: "#0097B2",
    alignSelf: "flex-end",
  },
  messageOtherUser: {
    backgroundColor: "#8c8c8c",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
 /*  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  }, */
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-around",
    width: 200,
  },
  popupOption: {
    alignItems: "center",
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  fullImage: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 30,
  },
});

export default styles;
