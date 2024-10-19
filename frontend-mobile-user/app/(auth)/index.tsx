import { useRouter } from "expo-router";
import { View, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // Perform login logic, and on success:
    await AsyncStorage.setItem("userToken", "dummy-token");
    router.navigate("./(tabs)");
  };

  return (
    <View style={{ width: "80%", padding: 10}}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
