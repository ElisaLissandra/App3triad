
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007f7f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007f7f',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
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
    height: 60,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#1E1E1E", 
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputPassword: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
  link: {
    color: '#009999',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#009999',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#000',
  },
  loginLink: {
    fontSize: 14,
    color: '#009999',
    fontWeight: 'bold',
  },
});


export default styles;