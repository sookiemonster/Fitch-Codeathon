import { Stack, useRouter } from "expo-router";
import { View,TextInput, StyleSheet, Pressable,Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/auth/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem('token', data.token);  
        router.push('/(tabs)'); 
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'SignIn', headerShown: false }} />
      <View style={styles.container}>
      <Text style={styles.signInText}>Welcome Back</Text>
      <Text style={styles.emailText}>Email</Text>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.emailText}>Password</Text>
        <TextInput
          style={styles.input2}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Pressable style={styles.button} onPress={handleLogin}>
          <ThemedText type="buttonText">Sign In</ThemedText>
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
