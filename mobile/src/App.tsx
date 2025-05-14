import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}