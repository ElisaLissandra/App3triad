import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/welcome';
import Login from './src/login/login';
import Register from './src/register/register';
import RequestProject from './src/request_project/request_project';



const Stack = createNativeStackNavigator();

export default function App() {
  //const [user, setUser] = React.useState();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }} // Oculta o cabeçalho
        />
         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
         <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
         <Stack.Screen name="RequestProject" component={RequestProject} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
