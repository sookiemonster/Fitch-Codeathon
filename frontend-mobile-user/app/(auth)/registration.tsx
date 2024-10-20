import { useRouter } from "expo-router";
import { View, Button, TextInput, StyleSheet, Pressable, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Perform login logic, and on success:
    await AsyncStorage.setItem("userToken", "dummy-token");
    router.navigate("../(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={styles.container}>
      <Text style={styles.signInText}>Join EcoWare</Text>
      <Text style={styles.emailText}>Email</Text>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.emailText}>Password</Text>
        <TextInput
          style={styles.input1}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.emailText}>Confirm Password</Text>
        <TextInput
          style={styles.input2}
          placeholder="Confirm Password"
          value={confirmationPassword}
          onChangeText={setConfirmationPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Pressable style={styles.button} onPress={handleLogin}>
          <ThemedText type="buttonText">Register Now</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 100,
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    paddingVertical: 60,
    paddingHorizontal: 30,
    alignSelf: "center",
    gap:0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  input1: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 40,
    height: 40,
    borderRadius: 5,
  },
  input2: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 0,
    height: 40,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: "#1D804B",
  },
  signInText: {
    fontSize: 24, 
    fontWeight: "bold",
    textAlign: "center", 
    marginBottom: 20, 
  },
  emailText: {
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 4,
  }
});
