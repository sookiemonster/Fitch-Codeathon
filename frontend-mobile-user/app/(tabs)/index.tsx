import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode from the package
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

interface MyJwtPayload {
  id: number;
  role: string;
}

interface User {
  id: number;
  email: string;
}

export default function HomeScreen() {
  const [payload, setPayload] = useState<MyJwtPayload | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [itemDetails, setItemDetails] = useState<any[]>([]);

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
      console.log(userData);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/users/${payload?.id}/items`);
      const itemsData = await response.json();
      console.log(itemsData);
      setItems(itemsData.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

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
    const allDetails = await Promise.all(items.map(fetchItemDetails)); // Fetch details for all items
    console.log(allDetails);
    setItemDetails(allDetails); // Filter out null responses
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (payload) {
      fetchUserInfo();
      fetchItems(); // Fetch items after the token is set
    }
  }, [payload]);

  useEffect(() => {
    if (items.length > 0) {
      fetchAllItemDetails(); // Fetch item details once the items array is populated
    }
  }, [items]);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome {user ? user.email : 'Guest'}</Text>
        <View style={styles.grayBox}>
          <Text style={styles.grayBoxText}>Grab an EcoWare from any vendor</Text>
        </View>
        <View style={styles.mapContainer}>
          <Image
            source={require('../../assets/images/map.png')}
            style={styles.map}
          />
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsTitle}>Your Items</Text>
          <ScrollView>
          <View >
          {itemDetails.length > 0 ? (
            itemDetails.map((itemDetail, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemText}>ID: {itemDetail.item.id}</Text>
                <Text style={styles.itemText}>Name: {itemDetail.item.name}</Text>
                {itemDetail.item.name === "Plate" ? (
                  <Text style={styles.itemText}>Type: {itemDetail.item.type}</Text>
                ) : (
                  <Text style={styles.itemText}>Type: Regular</Text>
                )}
              </View>
            
            ))
          ) : (
            <Text>No items found</Text>
          )}
          </View>
          </ScrollView>
        </View>
        
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemButtonText} onPress={() => {router.replace('/(tabs)/profile')}}>History</Text>
        </TouchableOpacity>
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
  grayBox: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  grayBoxText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  pointsContainer: {
    marginBottom: 16,
  },
  pointsTitle: {
    fontSize: 20,
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
  redeemButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    marginTop: 40,
    marginHorizontal: 80,
    borderRadius: 8,
  },
  redeemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    
  },
  itemText: {
    fontSize: 16,
    marginTop: 6,
  },
});

