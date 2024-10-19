// // app/(auth)/LoginScreen.tsx
// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";

// export default function LoginScreen({ navigation, setIsAuthenticated}) {
//   const handleLogin = () => {
//     // Handle login logic here
//     setIsAuthenticated(true)
//     // navigation.replace("(tabs)");
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Login Screen</Text>
//       <Button title="Log In" onPress={handleLogin} />
//       <Button
//         title="Register"
//         onPress={() => navigation.navigate("registration")}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
