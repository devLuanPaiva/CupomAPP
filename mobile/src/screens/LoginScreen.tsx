import React from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

GoogleSignin.configure({
  webClientId: "",
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (isSuccessResponse(userInfo)) {
        setUser(userInfo.data);
        navigation.navigate("Home" as never);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
