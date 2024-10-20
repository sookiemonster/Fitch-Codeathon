import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { RedeemModal } from '@/components/RedeemModal';
import { QRModal } from '@/components/QRModal';

export default function TabTwoScreen() {
  const [redeemModalVisible, setRedeemModalVisible] = useState(false)
  const [QRModalVisible, setQRModalVisible] = useState(false);
  // TODO: get user points from API
  const userPoints = 130
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
          style={{ width: 100, height: 100 }}
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
      {/* TODO: get coupons for user and display them */}
      <ThemedText>No Offers So Far</ThemedText>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">History</ThemedText>
      </ThemedView>
      {/* TODO: retreive user history and make history component */}

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
    marginBottom: 8,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    padding: 25,

    alignSelf: "center",
  },
});