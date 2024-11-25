import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1, 
    marginTop: 110,
    justifyContent: 'flex-start',
  },
  inner: {
    flexGrow: 1, 
    justifyContent: "flex-start", 
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0097B2",
    marginBottom: 80,
    justifyContent: "center",
  },
  label: {
    width: "80%",
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 5,
    color: '#303030', 
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
    /* backgroundColor: "#fff", */
  },
  button: {
    width: "80%",
    height: 60,
    backgroundColor: "#0097B2", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 40,
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
    borderRadius: 8,
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
  passwordContainer: {
    width: "80%",
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
  },
});


export default styles; 

