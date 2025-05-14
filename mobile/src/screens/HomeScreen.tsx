import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const { user, setUser } = useAuth();
    const navigation = useNavigation();
    const handleLogout = () => {
        setUser(null);
        navigation.navigate("Login");

    }
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{user?.user.name}</Text>
            <Text style={styles.email}>{user?.user.email}</Text>
            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        marginBottom: 20,
    },
});