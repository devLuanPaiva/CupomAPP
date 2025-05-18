import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signUp, signInWithGoogle, user, loading } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/home/HomeScreen');
    }
  }, [user, router]);
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

      <Pressable
        style={styles.emailButton}
        onPress={() => signIn(email, password)}
        disabled={loading}
      >
        <Text style={styles.emailButtonText}>Entrar</Text>
      </Pressable>

      <Pressable
        style={styles.emailButton}
        onPress={() => signUp(email, password)}
        disabled={loading}
      >
        <Text style={styles.emailButtonText}>Registrar</Text>
      </Pressable>

      <Pressable
        style={styles.googleButton}
        onPress={signInWithGoogle}
        disabled={loading}
      >
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
