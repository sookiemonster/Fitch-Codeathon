import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'lucide-react-native';
import { jwtDecode } from 'jwt-decode';

interface MyJwtPayload {
  id: number;
  role: string;
}

interface User {
  id: number;
  email: string;
  points: number;
  discounts: number[];
  qr: string; // Assume the user QR code is stored in this property
}

export default function TabTwoScreen() {
  const [payload, setPayload] = useState<MyJwtPayload | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [discountDetails, setDiscountDetails] = useState<any[]>([]);
  const [selectedReward, setSelectedReward] = useState<any | null>(null);
  const [qrModalVisible, setQRModalVisible] = useState(false);
  const [userQRModalVisible, setUserQRModalVisible] = useState(false); // State for user QR modal

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedPayload = jwtDecode<MyJwtPayload>(token);
        setPayload(decodedPayload);
      }
    } catch (error) {
      console.error("Error fetching or decoding token:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/users/${payload?.id}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchDiscountDetails = async (itemId: number) => {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/discounts/${itemId}`);
      const discountDetail = await response.json();
      return discountDetail;
    } catch (error) {
      console.error(`Error fetching details for item ${itemId}:`, error);
      return null;
    }
  };

  const fetchAllDiscountDetails = async () => {
    const allDetails = await Promise.all(user!.discounts.map(fetchDiscountDetails)); // Fetch details for all items
    setDiscountDetails(allDetails);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (payload) {
      fetchUserInfo();
      fetchAllDiscountDetails();
    }
  }, [payload]);

  useEffect(() => {
    console.log(user);
    fetchAllDiscountDetails();
  }, [user]);

  const handleRewardPress = (reward: any) => {
    setSelectedReward(reward);
    setQRModalVisible(true); // Show modal with QR code for reward
  };

  const handleAvatarPress = () => {
    setUserQRModalVisible(true); // Show modal with user's QR code
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarPress}>
            <User size={60} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>Id: {user?.id}</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>
          </View>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsTitle}>Your Points</Text>
          <View style={styles.pointsBox}>
            <Text style={styles.pointsValue}>{user?.points}</Text>
          </View>
        </View>

        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>My Rewards</Text>
          {discountDetails.length > 0 ? (
            discountDetails.map((reward, index) => (
              <TouchableOpacity
                key={index}
                style={styles.redeemButton}
                onPress={() => handleRewardPress(reward)}
              >
                <Text style={styles.redeemButtonText}>
                  Reward: {reward.reward / 100}$
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No rewards available</Text>
          )}
        </View>

        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>My History</Text>
          {discountDetails.length > 0 ? (
            discountDetails.map((reward, index) => (
              <TouchableOpacity
                key={index}
                style={styles.redeemButton}
                onPress={() => handleRewardPress(reward)}
              >
                <Text style={styles.redeemButtonText}>
                  Reward: {reward.reward / 100}$
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No rewards available</Text>
          )}
        </View>

        {/* Modal to display Reward QR code */}
        {selectedReward && (
          <Modal
            transparent={true}
            visible={qrModalVisible}
            onRequestClose={() => setQRModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Reward QR Code</Text>
                <Image
                  source={{ uri: selectedReward.qr }}
                  style={styles.qrCode}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setQRModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Modal to display User QR code */}
        {user && (
          <Modal
            transparent={true}
            visible={userQRModalVisible}
            onRequestClose={() => setUserQRModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>User QR Code</Text>
                <Image
                  source={{ uri: user.qr }} // Display user's QR code
                  style={styles.qrCode}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setUserQRModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pointsContainer: {
    marginBottom: 16,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pointsBox: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  offersContainer: {
    marginTop: 16,
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  redeemButton: {
    backgroundColor: '#1D804B',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  redeemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap : 40,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#1D804B',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});
