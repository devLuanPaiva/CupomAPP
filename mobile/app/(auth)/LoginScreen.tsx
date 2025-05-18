import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data!.idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const err = error as { code: string };
        if (err.code === 'auth/wrong-password') {
          console.log('That password is invalid!');
        } else if (err.code === 'auth/user-not-found') {
          console.log('No user found with that email address!');
        } else {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  }
    const signUp = (email: string, password: string) => {
      auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } else {
          console.error(error);
        }
      })
    }
    const signIn = (email: string, password: string) => {
      auth().signInWithEmailAndPassword(email, password).then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      }).catch((error) => {
        if (error.code === 'auth/wrong-password') {
          console.log('That password is invalid!');
        } else if (error.code === 'auth/user-not-found') {
          console.log('No user found with that email address!');
        } else {
          console.error(error);
        }
      })
    }
    return (
      <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.emailButton} onPress={() => signIn(email, password)}>
        <Text style={styles.emailButtonText}>Entrar</Text>
      </Pressable>

      <Pressable style={styles.emailButton} onPress={() => signUp(email, password)}>
        <Text style={styles.emailButtonText}>Registrar</Text>
      </Pressable>

      <Text style={styles.orText}>OU</Text>

      <Pressable style={styles.googleButton} onPress={googleLogin}>
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </Pressable>
    </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    emailButton: {
      width: '100%',
      height: 50,
      backgroundColor: '#4285F4',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    emailButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    orText: {
      marginVertical: 10,
      color: '#666',
    },
    googleButton: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#4285F4',
      marginBottom: 20,
    },
    googleButtonText: {
      color: '#4285F4',
      fontSize: 16,
      fontWeight: 'bold',
    },
    switchButton: {
      marginTop: 10,
    },
    switchButtonText: {
      color: '#4285F4',
      fontSize: 14,
    },
  })
