import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Screens/welcome/welcome';
import Login from './src/Auth/login/login';
import Register from './src/Auth/register/register';
import RequestProject from './src/Screens/request_project/request_project';
import ListProject from './src/Screens/list_project/list_project';
import { auth } from './firebase-config';

const Stack = createNativeStackNavigator();

// Componente para verificar se o usuário está autenticado
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Login />; // Se não estiver logado, redireciona para a tela de login
};

export default function App() {
  const [user, setUser] = React.useState(null); // Estado para armazenar o usuário logado

  React.useEffect(() => {
    // Monitorando o estado de autenticação do Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null); // Define o estado do usuário logado
    });

    // Cleanup function para cancelar o monitoramento quando o componente desmontar
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }} // Oculta o cabeçalho
        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ListProject" component={ListProject} options={{ headerShown: false }} />
       {/*  <Stack.Screen
          name="RequestProject"
          component={RequestProject}
          options={{ headerShown: false }}
        /> */}
        
        {/* Protegendo a rota RequestProject */}
        <Stack.Screen
          name="RequestProject"
          options={{ headerShown: false }}
        >
          {() => (
            <ProtectedRoute user={user}>
              <RequestProject />
            </ProtectedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
