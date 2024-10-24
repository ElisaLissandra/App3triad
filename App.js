import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Screens/welcome/welcome';
import Login from './src/Auth/login/login';
import Register from './src/Auth/register/register';
import RequestProject from './src/Screens/request_project/request_project';
import ListProject from './src/Screens/list_project/list_project';
import { auth } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

const Stack = createNativeStackNavigator();

// Componente para verificar se o usuário está autenticado
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Login />; // Redireciona para Login se o usuário não estiver autenticado
};

export default function App() {
  const [user, setUser] = React.useState(null); // Estado para armazenar o usuário logado
  const [isLoading, setIsLoading] = React.useState(true); // Controle de carregamento
  const [initialRoute, setInitialRoute] = React.useState("Welcome");


  // Função para verificar se o usuário possui projetos
  const checkUserProjects = async (userId) => {
    const querySnapshot = await getDocs(collection(db, "projetos")); // Acessando a coleção de projetos
    const userProjects = querySnapshot.docs.filter(doc => doc.data().userId === userId); // Filtra projetos do usuário
    return userProjects.length > 0; // Retorna true se houver projetos
  };

  React.useEffect(() => {
    // Monitorando o estado de autenticação do Firebase
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user ? user : null); // Define o estado do usuário logado
      setIsLoading(false); // Fim do carregamento

      if (user) {
        const hasProjects = await checkUserProjects(user.uid); // Verifica se o usuário possui projetos
        setInitialRoute(hasProjects ? "ListProject" : "RequestProject"); // Define a rota inicial com base nos projetos
      } else {
        setInitialRoute("Login"); // Redireciona para Login se não houver usuário
      }
    });

    // Cleanup function para cancelar o monitoramento quando o componente desmontar
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // Ou pode mostrar um spinner enquanto verifica a autenticação
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "ListProject" : "Welcome"}>
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
