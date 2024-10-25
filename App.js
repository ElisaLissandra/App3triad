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
  return user ? children : <Login />; // Redireciona para Login se o usuário não estiver autenticado
};

export default function App() {
  const [user, setUser] = React.useState(null); // Estado para armazenar o usuário logado
  const [isLoading, setIsLoading] = React.useState(true); // Controle de carregamento
  const [initialRoute, setInitialRoute] = React.useState("Welcome");
  
  React.useEffect(() => {
    // Monitorando o estado de autenticação do Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null); // Define o estado do usuário logado
      setIsLoading(false); // Fim do carregamento
      // Define a rota inicial com base na autenticação do usuário
      setInitialRoute(user ? "ListProject" : "Login");
    });

    // Cleanup function para cancelar o monitoramento quando o componente desmontar
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // Ou pode mostrar um spinner enquanto verifica a autenticação
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }} // Oculta o cabeçalho
        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        
        {/* Protegendo as rotas */}
        <Stack.Screen
          name="ListProject"
          options={{ headerShown: false }}
        >
          {() => (
            <ProtectedRoute user={user}>
              <ListProject />
            </ProtectedRoute>
          )}
        </Stack.Screen>

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
