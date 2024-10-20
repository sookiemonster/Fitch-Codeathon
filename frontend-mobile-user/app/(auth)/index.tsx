import { useRouter } from "expo-router";
import { View,TextInput, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // Perform login logic, and on success:
    await AsyncStorage.setItem("userToken", "dummy-token");
    router.navigate("./(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <ThemedText type="buttonText">Sign In</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    paddingVertical: 60,
    paddingHorizontal: 30,
    alignSelf: "center",
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    height: 40,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#1D804B",
  },
});
