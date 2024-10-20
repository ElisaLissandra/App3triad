import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0097B2",
    marginTop: 50,
    marginBottom: 100,
  },
  welcomeBox: {
    backgroundColor: "#0097B2",
    width: 330,
    height:420,
    padding: 30, 
    borderRadius: 30,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 90,
  },
  subText: {
    fontSize: 17,
    color: "#fff",
    textAlign: "center",
    marginBottom: 100,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonArrow: {
    fontSize: 30,
    color: "#0097B2", // Cor da seta
  },
});

export default styles;