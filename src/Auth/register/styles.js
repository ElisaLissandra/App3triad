
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0097B2",
    marginBottom: 10,
    marginTop:20,
    textAlign: 'center',
  
  },
  subtitle: {
    fontSize: 16,
    color: "#878787",
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: "#1E1E1E",
    width: "100%",
    textAlign: "left",
    marginBottom: 5,
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputPassword: {
    width: "100%",
    flex: 1,
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  toggleButton: {
    paddingHorizontal: 10,
  },
  toggleText: {
    fontSize: 18,
    color: "#555",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: "#000",
    flexWrap: "wrap",
  },
  link: {
    color: "#0097B2",
    textDecorationLine: "underline",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0097B2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    color: "#000",
    textAlign: 'center',
  },
  loginLink: {
    color: "#0097B2",
    fontWeight: "bold",
  },
});

export default styles;