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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  id: number;
  role: string;
}

interface User {

  id: number;
  discounts : number[];
}

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const [itemId, setItemId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [user,setUser] = useState<User | null>(null);
  const [discountId, setDiscountId] = useState<number | null>(null);
  const [scanningItem, setScanningItem] = useState(true);
  const [scanningDiscount, setScanningDiscount] = useState(false);
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

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const payload = jwtDecode<MyJwtPayload>(token!);
    return payload;
  };

  const handleItemMove = async (
    itemId: number,
    vendorId: number,
    userId: number,
    discountId: number | null
  ) => {
    try {
      await fetch(
        `http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/vendors/${vendorId}/inventory/${itemId}/move/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ discountId }),
        }
      );

      var discountData;

      console.log(discountId);

      if (discountId) {
        const discount = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/discounts/${discountId}`);
        discountData = await discount.json();
        console.log(discountData);
        if (discountData.message === "Discount not found") {

          throw new Error("Discount not found");
        }

        if (!user) {

          throw new Error("User not found");
        }
        console.log(user.discounts);
        console.log(user.discounts.includes(discountId));

        if (!user.discounts.includes(discountId)) {

          throw new Error("User does not have this discount");
        }
        
        await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/users/${userId}/discounts/${discountId}/remove`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });

      }

      router.back();

      Alert.alert(
        "Nice Work!",
        `${discountId ? `✔ ${discountData.reward/100}$ was applied as a discount`  : "✔ Transfer complete!"} `,
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {

        if (error.message === "Discount not found" || error.message === "User does not have this discount") {

           return Alert.alert(
            error.message,
            `Would you like to try again?`,
            [
              {
                text: "yes",
                onPress: () => {
                  setScanningItem(false);
                  setScanningDiscount(true);
                  resetScanForDiscount();
                },
                style: "cancel",
              },
              {
                text: "No",
                onPress: () => handleItemMove(itemId, vendorId, userId, null),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }
      }

      Alert.alert(
        "Something went wrong",
        `Please try again.`,
        [
          {
            text: "Ok",
            onPress: () => {
              setScanningItem(true);
              resetScan();
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const processQRData = async (data: string) => {
    const id = parseInt(data);
    if (isNaN(id)) {
      showInvalidQRAlert();
      return;
    }
  
    if (scanningItem) {
      // Item scanning phase
      console.log(`Extracted Item ID:`, id);
      confirmData("Item", id, () => {
        setItemId(id);
        setScanningItem(false); // Move to user scanning next
        resetScan();
      });
    } else if (!scanningDiscount) {
      // User scanning phase
      console.log(`Extracted User ID:`, id);
      confirmData("User", id, async () => {
        setUserId(id);
        if (itemId !== null) {
          // Fetch item and user details
          const item = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/items/${itemId}`);
          const user = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/users/${id}`);
          const token = await getToken();
          const vendorId = token.id;
          const vendor = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/vendors/${vendorId}/raw`);
  
          const itemData = await item.json();
          const userData = await user.json();
          setUser(userData);
          const vendorData = await vendor.json();
  
          if (!vendorData.inventory.includes(itemId)) {
            if (!alertShown.current) {
              Alert.alert(
                "You're out of inventory",
                `Please scan another item.`,
                [
                  {
                    text: "Ok",
                    onPress: () => {
                      setScanningItem(true);
                      resetScan();
                    },
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
              alertShown.current = true;
            }
          }
  
          if (item.ok && user.ok) {
            if (!alertShown.current) {
              Alert.alert(
                "Confirm Item and User",
                `Is this the correct item: ${itemData.item.name} (${itemData.item.id}) and user: ${userData.email}?`,
                [
                  {
                    text: "No",
                    onPress: () => {
                      setScanningItem(true);
                      resetScan();
                    },
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      askForDiscount(itemData.item.id, vendorId, id);
                    },
                  },
                ],
                { cancelable: false }
              );
              alertShown.current = true;
            }
          }
        }
      });
    } else  {
      // Discount scanning phase
      console.log(`Extracted Discount ID:`, id);
      confirmData("Discount", id, async () => {
        setDiscountId(id);
        handleItemMove(itemId!, await getToken().then((token) => token.id), userId!, id);
      });
    }
  };

  const resetScanForDiscount = () => {
    qrLock.current = false;
    alertShown.current = false;
  };

  const askForDiscount = (itemId: number, vendorId: number, userId: number) => {
    Alert.alert(
      "Scan Discount?",
      "Do you want to scan a discount?",
      [
        {
          text: "No",
          onPress: () => handleItemMove(itemId, vendorId, userId, null),
        },
        {
          text: "Yes",
          onPress: () => {
            setScanningDiscount(true);
            resetScanForDiscount();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const confirmData = (
    type: "Item" | "User" | "Discount",
    id: number,
    onConfirm: () => void
  ) => {
    Alert.alert(
      `Confirm ${type}`,
      `Is this the correct ${type.toLowerCase()}: ${id}?`,
      [
        {
          text: "No",
          onPress: resetScan,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: onConfirm,
        },
      ],
      { cancelable: false }
    );
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
          scanningItem ? "item" : scanningDiscount ? "discount" : "user"
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
        <Text style={styles.infoText}>
          Scan for {scanningItem ? "Item" : scanningDiscount ? "Discount" : "User"}
        </Text>
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
    top: 50,
    backgroundColor: "beige",
    width: "70%",
    alignSelf: "center",
    borderRadius: 10,
  },
  infoText: {
    alignSelf: "center",
    fontSize: 28,
    lineHeight: 60,
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
    borderRadius: 10,
    backgroundColor: "#1D804B",
  },
});
