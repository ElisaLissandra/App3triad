import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  header: {
    marginTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesList: {
    paddingBottom: 80,
    paddingTop: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0097B2",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#8c8c8c",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  attachButton: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#0097B2",
    borderRadius: 20,
  },
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