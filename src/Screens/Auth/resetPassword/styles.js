import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inner: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    /* backgroundColor: "#fff", */
  },
  button: {
    height: 50,
    backgroundColor: "#0097B2", 
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#0097B2",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default styles;
