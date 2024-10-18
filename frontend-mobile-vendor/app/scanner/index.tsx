import { CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import {
  Alert,
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef, useState } from "react";
import { ThemedText } from "@/components/ThemedText";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const [itemId, setItemId] = useState("");
  const alertShown = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const processItemData = (data: string) => {
    if (data.includes("/item/")) {
      setItemId(data);
      alertShown.current = false;
    } else {
      if (!alertShown.current) {
        Alert.alert("Invalid QR Code", "This QR code does not correspond to an EcoWare item");
        alertShown.current = true;
      }
      qrLock.current = false;
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              processItemData(data);
            }, 500);
          }
        }}
      />
      <Overlay />
      <View style={styles.buttonContainer}>
        <Text>
          {itemId ? `Scanned Item ID: ${itemId}` : "No Item Scanned Yet"}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText type="buttonText">Go Back</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
