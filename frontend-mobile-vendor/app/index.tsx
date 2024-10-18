import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { ThemedText } from "@/components/ThemedText";

const { width } = Dimensions.get("window");

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      {/* TODO: vendor name should be rendered through authentication */}
      <ThemedText type="title">Fauzia's EcoWare</ThemedText>
      <ThemedText type="subtitle">Plates</ThemedText>
      {/* TODO: inventory counts should be fetched through API */}
      <SafeAreaView style={styles.subcontainer}>
        <ThemedText type="paragraph">Total</ThemedText>
        <ThemedText type="paragraph">100</ThemedText>
        <View style={styles.divider} />
        <ThemedText type="paragraph">Halal</ThemedText>
        <ThemedText type="paragraph">20</ThemedText>
        <View style={styles.divider} />
        <ThemedText type="paragraph">Vegetarian</ThemedText>
        <ThemedText type="paragraph">10</ThemedText>
        <View style={styles.divider} />
        <ThemedText type="paragraph">Others</ThemedText>
        <ThemedText type="paragraph">70</ThemedText>
      </SafeAreaView>
      <ThemedText type="subtitle">Cups</ThemedText>
      <SafeAreaView style={styles.subcontainer}>
        <ThemedText type="paragraph">97</ThemedText>
      </SafeAreaView>
      <View>
        <Pressable onPress={requestPermission}>
          <Text
            style={[
              styles.buttonStyle,
              { opacity: isPermissionGranted ? 0 : 1 },
            ]}
          >
            Request Permissions
          </Text>
        </Pressable>
        <Link href={"/scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingVertical: 80,
    paddingLeft: 20,
  },
  subcontainer: {
    padding: 20,
    backgroundColor: "beige",
    maxWidth: width - 40,
    borderRadius: 15,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "gray",
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    fontFamily: "DaysOne",
    textAlign: "center",
  },
});
