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
      {/* TODO: inventory counts should be fetched through API */}
      <SafeAreaView style={styles.subcontainer}>
        <ThemedText type="subtitle">Plates</ThemedText>
        <SafeAreaView style={styles.inventoryBox}>
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
        <SafeAreaView style={styles.inventoryBox}>
          <ThemedText type="paragraph">97</ThemedText>
        </SafeAreaView>
      </SafeAreaView>
      <View>
        <Pressable onPress={requestPermission}>
          <ThemedText
            type="buttonText"
            style={{ opacity: !isPermissionGranted ? 0 : 1 }}
          >
            Request Camera Permissions
          </ThemedText>
        </Pressable>
        <Link href={"/scanner"} asChild>
          <Pressable style={styles.button} disabled={!isPermissionGranted}>
            <ThemedText
              type="buttonText"
              style={{ opacity: !isPermissionGranted ? 0.5 : 1 }}
            >
              Scan Code
            </ThemedText>
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
  },
  subcontainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#C7C7C7",
    borderRadius: 20,
    paddingVertical: 20,
  },
  inventoryBox: {
    alignSelf: "center",
    paddingVertical: 20,
    backgroundColor: "beige",
    width: "90%",
    borderRadius: 15,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "gray",
    alignSelf: "center",
    marginVertical: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#1D804B",
    width: 200,
    alignSelf: "center",
  },
});
