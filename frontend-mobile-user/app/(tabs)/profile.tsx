import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'lucide-react-native';
import { jwtDecode } from 'jwt-decode';
import { ScrollView } from 'react-native-gesture-handler';

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
  items: number[];
  history: Item[];
}

interface Item {
  id : number;
  timestamp : string;
}

interface Discount {
  id: number;
  reward: string;
  cost: number;
}

export default function TabTwoScreen() {
  const [payload, setPayload] = useState<MyJwtPayload | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [discountDetails, setDiscountDetails] = useState<any[]>([]);
  const [selectedReward, setSelectedReward] = useState<any | null>(null);
  const [qrModalVisible, setQRModalVisible] = useState(false);
  const [userQRModalVisible, setUserQRModalVisible] = useState(false); // State for user QR modal
  const [items, setItems] = useState<any[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const [isModalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const openModal = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const confirmOffer = () => {
    if (selectedItem) {
      handleOfferSelect(selectedItem); // Call the function to handle the reward
    }
    setModalVisible(false); // Close the modal
  };

  const handleOfferSelect = async(discount: Discount) => {
    try {
      
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/users/${user!.id}/discounts/${discount.id}/add`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      })

    } catch (error) {
      console.error(error);
    }
  }   

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

  const fetchDiscounts = async () => {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/discounts`);
      const discounts = await response.json();
      const filteredDiscounts = discounts.filter((discount: { id: number }) => !user!.discounts.includes(discount.id));
      setDiscounts(filteredDiscounts);
    } catch (error) {
      console.error("Error fetching discounts:", error);
      return [];
    }
  };

  const fetchItemDetails = async (itemId: number) => {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/items/${itemId}`);
      const itemDetail = await response.json();
      return itemDetail;
    } catch (error) {
      console.error(`Error fetching details for item ${itemId}:`, error);
      return null;
    }
  };

  const fetchAllItemDetails = async () => {
    console.log(user!.history);
    const ids = user!.history.map(item  => item!.id);
    const allDetails = await Promise.all(ids.map(fetchItemDetails)); // Fetch details for all items
    console.log(allDetails);
    setItems(allDetails); // Filter out null responses
  };

  useEffect(() => {
    getToken();
    
  }, []);

  useEffect(() => {
    if (payload) {
      fetchUserInfo();
      fetchDiscounts();
    }
  }, [payload]);

  useEffect(() => {
    console.log(user);
    fetchAllDiscountDetails();
    fetchAllItemDetails();

    const intervalId = setInterval(() => {
      fetchUserInfo();
      fetchDiscounts();
      fetchAllDiscountDetails();
      fetchAllItemDetails();
    }, 1000);

    return () => (clearInterval(intervalId))
  }, [user]);

  const handleRewardPress = (reward: any) => {
    setSelectedReward(reward);
    setQRModalVisible(true); // Show modal with QR code for reward
  };

  const handleAvatarPress = () => {
    setUserQRModalVisible(true); // Show modal with user's QR code
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.redeemButton2}
      onPress={() => openModal(item)}
    >
      <Text style={styles.redeemButtonText2}>
        Cost: {JSON.stringify(item.cost)}
      </Text>
      <Text style={styles.redeemButtonText2}>
        Reward: {(JSON.stringify(item.reward) as any) / 100}$
      </Text>
    </TouchableOpacity>
  );

  function formatDate(isoString : string) {
    const date = new Date(isoString);
  
    // Extract the parts of the date
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year
  
    // Return the formatted date
    return `${month}/${day}/${year}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarPress}>
            <User size={60} color="#000" />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Id: {user?.id}</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>
          </View>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsTitle}>Your Points</Text>
          <View style={styles.pointsBox}>
          <Text style={styles.pointsValue}>{user?.points ?? 0}</Text>
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
        <ScrollView>
        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>My History</Text>
          {items.length > 0 ? (
            items.map((item, index) => (
              console.log(item.item),
              <View key={index} style={styles.historyItem}>

              <Text key={index} >
                Id: {item.item.id}
              </Text>

              <Text key={index+"a"} >
                Name: {item.item.name}
              </Text>
              

              

                {item.item.name === "Plate" ?
                <Text key={index+"b"} >Type: {item.item.type}</Text> 
                : <Text key={index+"b"} >Type: Regular</Text> }

                <Text>{formatDate(user!.history[index].timestamp)}</Text>             

              </View>
            ))
          ) : (
            <Text>No rewards available</Text>
          )}
        </View>

        
          <Text style={styles.offersTitle}>Offers</Text>

          <FlatList
            data={discounts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Display 2 items per row
            columnWrapperStyle={styles.row} // Style for the row (optional)
            ListEmptyComponent={<Text>No offers available</Text>} // Show when list is empty
          />
    
        </ScrollView>


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

        {/* Modal for confirmation */}
        <Modal
  transparent={true}
  visible={isModalVisible}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)} // Close on back button press (Android)
>
  <View style={styles.modalContainer2}>
    <View style={styles.modalContent2}>
      <Text style={styles.modalText}>
        {/* Safely handle null/undefined points and cost */}
        {(user?.points ?? 0) >= (selectedItem?.cost ?? 0)
          ? `Do you really want to get this offer for ${selectedItem?.cost ?? 0} points?`
          : "Not enough points"}
      </Text>
      <View style={styles.buttonContainer}>
        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={(user?.points ?? 0) >= (selectedItem?.cost ?? 0) ? confirmOffer : () => setModalVisible(false)}
        >
          <Text style={styles.buttonText}>
            {(user?.points ?? 0) >= (selectedItem?.cost ?? 0) ? "Confirm" : "Ok"}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        {(user?.points ?? 0) >= (selectedItem?.cost ?? 0) && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)} // Close the modal on cancel
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
</Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space between the two items
    marginBottom: 10, // Add space between rows
  },
  redeemButton2: {
    flex: 1, // Take equal width
    backgroundColor: '#3BA8F1',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 5, // Add space between buttons in a row
  },
  redeemButtonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
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
  modalContent2: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#1C804A',
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
    fontWeight: 'bold',
  },
  textContainer: {
    backgroundColor: '#f0f0f0',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal : 20,
    borderRadius: 20,
  },
  historyItem: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  historyItem2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#1D804B',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
