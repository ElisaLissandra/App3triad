import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0097B2",
    marginBottom: 80,
  },
  label: {
    width: "80%",
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 5,
    color: '#1E1E1E', 
    marginLeft: 10,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    height: 60,
    backgroundColor: "#0097B2", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF", 
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#0097B2", 
    textDecorationLine: "none",
    width: "80%",
    textAlign: 'right',
    marginBottom: 10,
  },
  googleButton: {
    width: "80%",
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ED1515',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",

  },
  linkLogin: {
    color: '#303030', 
    textDecorationLine: "none",
    width: "80%",
    textAlign: 'center',
    marginTop: 40,
  },
  LoginButton: {
    color: '#0097B2', 
    fontWeight: 'bold', 
  },
  /* passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: 10,
  }, */
  passwordContainer: {
    width: "80%",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "#d9534f",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
    alignSelf: "center",  
    maxWidth: "80%",   
  }
  
});


export default styles;