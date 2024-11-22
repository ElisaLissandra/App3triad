import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./src/Screens/welcome/welcome";
import Login from "./src/Screens/Auth/login/login";
import Register from "./src/Screens/Auth/register/register";
import RequestProject from "./src/Screens/request_project/request_project";
import ListProject from "./src/Screens/list_project/list_project";
import DetailsProject from "./src/Screens/details_project/details_project";
import CommentProject from "./src/Screens/comment_project/comment_project";
import Settings from "./src/Screens/settings/settings";
import { auth } from "./firebase-config";
import { UserProvider } from "./src/Context/UserContext"; // Importe o UserProvider

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // Ou exiba um Spinner ou tela de carregamento
  }

  return (
    <UserProvider> {/* Envolvendo o app com o UserProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "ListProject" : "Welcome"}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
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
                name="CommentProject"
                component={CommentProject}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
