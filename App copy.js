import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {

  GoogleSignin.configure({
    webClientId: '365241359470-o472ecisr7giti0n5p3bkqgvjfivtueb.apps.googleusercontent.com',
  });

  const signInWithGoogleAsync = async () => {
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const user_sing_in = auth().signInWithCredential(googleCredential);

    user_sing_in.then((user) => {
      console.log('User signed in successfully!', user);
    })
    .catch ((error ) => {
      console.log('Error signing in with Google', error);
    })
  }

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Button
       title="Entrar com o Google"
       onPress={signInWithGoogleAsync}
      />
    </View>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */