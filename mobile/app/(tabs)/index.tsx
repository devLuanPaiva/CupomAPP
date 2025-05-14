import { View, Button, Text } from "react-native";
import {
  GoogleSignin,
  isSuccessResponse,
  User,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";

GoogleSignin.configure({ webClientId: "" });
export default function HomeScreen() {
  const [auth, setAuth] = useState<User | null>(null);
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (isSuccessResponse(userInfo)) {
        setAuth(userInfo.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Button onPress={handleGoogleSignIn} title="Sign in with Google" />
      {auth && (
        <View>
          <Text>{auth.user.name}</Text>
          <Text>{auth.user.email}</Text>
        </View>
      )}
    </View>
  );
}
