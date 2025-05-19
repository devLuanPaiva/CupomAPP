import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) {
    router.replace('/(auth)/LoginScreen');
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo, {user.displayName ?? user.email}!</Text>

      <Button title="Sair" onPress={signOut} />
    </View>
  );
}