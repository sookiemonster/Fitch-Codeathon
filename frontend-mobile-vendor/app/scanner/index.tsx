import React, { useEffect, useRef, useState } from "react";
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
import { ThemedText } from "@/components/ThemedText";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const [itemId, setItemId] = useState("");
  const [userId, setUserId] = useState("");
  const [scanningItem, setScanningItem] = useState(true);
  const alertShown = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
        alertShown.current = false;
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const processQRData = (data: string) => {
    const [type, id] = scanningItem
      ? ["/item/", setItemId]
      : ["/user/", setUserId];

    if (data.includes(type)) {
      const extractedId = data.split(type)[1];
      console.log(
        `Extracted ${scanningItem ? "Item" : "User"} ID:`,
        extractedId
      );
      Alert.alert(
        `Confirm ${scanningItem ? "Item" : "User"}`,
        `Is this the correct ${
          scanningItem ? "item" : "user"
        }: ${extractedId}?`,
        [
          {
            text: "No",
            onPress: resetScan,
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              id(extractedId);
              if (!scanningItem) {
                // { TODO: Post method with userID and itemID}
                router.back();
              } else {
                setScanningItem(false);
                resetScan();
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      showInvalidQRAlert();
    }
  };

  const resetScan = () => {
    qrLock.current = false;
    alertShown.current = false;
  };

  const showInvalidQRAlert = () => {
    if (!alertShown.current) {
      Alert.alert(
        "Invalid QR Code",
        `This QR code does not correspond to an EcoWare ${
          scanningItem ? "item" : "user"
        }`
      );
      alertShown.current = true;
    }
    qrLock.current = false;
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      {Platform.OS === "android" && <StatusBar hidden />}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(() => processQRData(data), 500);
          }
        }}
      />
      <Overlay />
      <View style={styles.infoContainer}>
        {/* <Text>
          {!itemId && "No Item Scanned Yet"}
        </Text>
        <Text>
          {itemId && !userId && "No User Scanned Yet"}
        </Text> */}
        <Text style={styles.infoText}>Currently scanning: {scanningItem ? "Item" : "User"}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <ThemedText type="buttonText">Go Back</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "yellow",
  },
  infoText: {
    fontSize: 20,
  },
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
    backgroundColor: "#007AFF",
  },
});
// import { CameraView } from "expo-camera";
// import { Stack, useRouter } from "expo-router";
// import {
//   Alert,
//   AppState,
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   View,
// } from "react-native";
// import { Overlay } from "./Overlay";
// import { useEffect, useRef, useState } from "react";
// import { ThemedText } from "@/components/ThemedText";

// export default function Home() {
//   const qrLock = useRef(false);
//   const appState = useRef(AppState.currentState);
//   const router = useRouter();
//   const [itemId, setItemId] = useState("");
//   const itemAlertShown = useRef(false);
//   const itemScanned = useRef(false);
//   const [userId, setUserId] = useState("");
//   const userAlertShown = useRef(false);

//   useEffect(() => {
//     const subscription = AppState.addEventListener("change", (nextAppState) => {
//       if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === "active"
//       ) {
//         qrLock.current = false;
//       }
//       appState.current = nextAppState;
//     });
//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const processItemData = (data: string) => {
//     if (data.includes("/item/")) {
//       const extractedItemId = data.split("/item/")[1];
//       console.log("Extracted itemID:", extractedItemId);
//       Alert.alert(
//         "Confirm Item",
//         `Is this the correct item: ${extractedItemId}?`,
//         [
//           {
//             text: "No",
//             onPress: () => {
//               qrLock.current = false;
//               itemAlertShown.current = false;
//             },
//             style: "cancel",
//           },
//           {
//             text: "Yes",
//             onPress: () => {
//               setItemId(extractedItemId);
//               itemAlertShown.current = false;
//               itemScanned.current = true
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     } else {
//       if (!itemAlertShown.current) {
//         Alert.alert("Invalid QR Code", "This QR code does not correspond to an EcoWare item");
//         itemAlertShown.current = true;
//       }
//       qrLock.current = false;
//     }
//   };
//   const processUserData = (data: string) => {
//     if (data.includes("/user/")) {
//       const extractedUserId = data.split("/user/")[1];
//       console.log("Extracted UID:", extractedUserId);
//       setUserId(extractedUserId);
//     } else {
//       if (!userAlertShown.current) {
//         Alert.alert(
//           "Invalid QR Code",
//           "This QR code does not correspond to an EcoWare user"
//         );
//         itemAlertShown.current = true;
//       }
//       qrLock.current = false;
//     }
//   };

//   return (
//     <SafeAreaView style={StyleSheet.absoluteFillObject}>
//       <Stack.Screen options={{ title: "Overview", headerShown: false }} />
//       {Platform.OS === "android" ? <StatusBar hidden /> : null}
//       <CameraView
//         style={StyleSheet.absoluteFillObject}
//         facing="back"
//         onBarcodeScanned={({ data }) => {
//           if (data && !qrLock.current) {
//             qrLock.current = true;
//             setTimeout(async () => {
//               itemScanned ? processItemData(data) : processUserData(data);
//             }, 500);
//           }
//         }}
//       />
//       <Overlay />
//       <View style={styles.buttonContainer}>
//         <Text>
//           {itemId ? `Scanned Item ID: ${itemId}` : "No Item Scanned Yet"}
//         </Text>
//         <TouchableOpacity onPress={() => router.back()}>
//           <ThemedText type="buttonText">Go Back</ThemedText>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     position: "absolute",
//     bottom: 50,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//   },
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
// });
