import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./src/Screens/welcome/welcome";
import Login from "./src/Screens/Auth/login/login";
import Register from "./src/Screens/Auth/register/register";
import RequestProject from "./src/Screens/request_project/request_project";
import ListProject from "./src/Screens/list_project/list_project";
import DetailsProject from "./src/Screens/details_project/details_project";
import Chat from "./src/Screens/chat/chat";
import Settings from "./src/Screens/settings/settings";
import { auth } from "./firebase-config";

const Stack = createNativeStackNavigator();

// Componente para verificar se o usuário está autenticado
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Login />; // Redireciona para Login se o usuário não estiver autenticado
};

export default function App() {
  const [user, setUser] = React.useState(null); // Estado para armazenar o usuário logado
  const [isLoading, setIsLoading] = React.useState(true); // Controle de carregamento

  React.useEffect(() => {
    // Monitorando o estado de autenticação do Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null); // Define o estado do usuário logado
      setIsLoading(false); // Fim do carregamento
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
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />

        {/* Agrupando rotas protegidas */}
        {user && (
          <Stack.Group>
            <Stack.Screen
              name="ListProject"
              component={ListProject}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RequestProject"
              component={RequestProject}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailsProject"
              component={DetailsProject}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
