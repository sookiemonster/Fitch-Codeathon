import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, StyleSheet, View} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { RedeemModal } from "@/components/RedeemModal";
import { QRModal } from "@/components/QRModal";

export default function TabTwoScreen() {
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
  const [QRModalVisible, setQRModalVisible] = useState(false);
  // TODO: get user points from API
  const userPoints = 130;

  // TODO: get user coupons form API
  const coupons = [
    { id: 1, reward: 1 },
    { id: 2, reward: 2 },
  ];
  // TODO: get user history from API
  const history = [
    { type: "cup", timestamp: "2024-10-05T15:59", machine_name: "South Ferry" },
    { type: "plate", timestamp: "2024-10-05T16:05", machine_name: "North Ferry" }
  ]
  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <Pressable
        style={styles.QRContainer}
        onPress={() => setQRModalVisible(true)}
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={require("./user_testQR.png")}
        />
      </Pressable>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Points</ThemedText>
      </ThemedView>
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="default">{userPoints}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Offers</ThemedText>
      </ThemedView>
      <Pressable
        style={styles.redeemButton}
        onPress={() => setRedeemModalVisible(true)}
      >
        <ThemedText type="buttonText">Redeem</ThemedText>
      </Pressable>
      {coupons.length > 0 ? (
        coupons.map((item, index) => (
          <View key={index} style={styles.infoContainer}>
            <ThemedText>
              ${item.reward} Off
            </ThemedText>
          </View>
        ))
      ) : (
        <ThemedText>No Offers Yet</ThemedText>
      )}

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">History</ThemedText>
      </ThemedView>
      {history.length > 0 ? (
        history.map((item, index) => (
          <View key={index} style={styles.infoContainer}>
            <ThemedText>
              {formatDateTime(item.timestamp)}: {item.type} returned to{" "}
              {item.machine_name}
            </ThemedText>
          </View>
        ))
      ) : (
        <ThemedText>No History Yet</ThemedText>
      )}

      {redeemModalVisible && (
        <RedeemModal
          modalVisible={redeemModalVisible}
          setModalVisible={setRedeemModalVisible}
        />
      )}
      {QRModalVisible && (
        <QRModal
          modalVisible={QRModalVisible}
          setModalVisible={setQRModalVisible}
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  redeemButton: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#1D804B",
  },
  infoContainer: {
    gap: 8,
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 20,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  QRContainer: {
    backgroundColor: "lightgray",
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 20,
    alignSelf: "center",
  },
});