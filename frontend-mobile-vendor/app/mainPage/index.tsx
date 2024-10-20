import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import { Link, router, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from 'jwt-decode';

interface SummaryData {
  cups: number,
  plates: number,
  halal: number,
  veg: number,
  reg: number,
  cleanPlates: number,
  dirtyPlates: number,
  cleanCups: number,
  dirtyCups: number,
  halalDirty: number,
  halalClean: number,
  vegDirty: number,
  vegClean: number,
  regDirty: number,
  regClean: number
}

interface MyJwtPayload {
  id: number;
  role: string;
}

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const payload = jwtDecode<MyJwtPayload>(token);
          return payload;
        }
      } catch (err) {
        console.error('Error fetching token:', err);
      }
    };

    const checkTokenAndFetchData = async () => {
      try {
       
        const token = await AsyncStorage.getItem('token');
        
        if (!token) {
          
          router.push('/');
          return;
        }

        const payload = jwtDecode<MyJwtPayload>(token);
        //console.log('Payload:', payload);

        const fetchSummaryData = async () => {
          try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/vendors/${payload.id}/inventory/detailed`); // Update with correct IP
            if (!response.ok) {
              throw new Error('Failed to fetch summary data');
            }
            const data = await response.json();
            setSummaryData(data);
            setError(null);
          } catch (err) {
            setError('Error fetching summary data. Please try again later.');
            console.error('Fetch error:', err);
          } finally {
            setIsLoading(false);
          }
        };

        fetchSummaryData();
        
      } catch (err) {
        console.error('Error decoding token or fetching data:', err);
        setError('Error decoding token or fetching data');
      }
    };

    const getName = async () => {
      try {
        const payload = await getToken();

        const response = await fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/api/v1/vendors/${payload?.id}`);

        const data = await response.json();

        setName(data.name);
      } catch (err) {
        console.error('Error fetching token:', err);
      }
    }
    checkTokenAndFetchData();
    getName();

    const intervalId = setInterval(checkTokenAndFetchData, 5000)

    return () => (clearInterval(intervalId))
    
  }, [router]) 

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      {/* TODO: vendor name should be rendered through authentication */}
      <ThemedText type="title">{name+" "}EcoWare</ThemedText>
      {/* TODO: inventory counts should be fetched through API */}
      <SafeAreaView style={styles.subcontainer}>
        <ThemedText type="subtitle" style={{ paddingBottom: 15 }}>Plates</ThemedText>
        <SafeAreaView style={styles.inventoryBox}>
          <ThemedText type="paragraph" style={{ fontWeight: "bold" }}>Total</ThemedText>
          <ThemedText type="paragraph" style={{ fontSize: 40, paddingTop: 20 }}>{summaryData?.plates}</ThemedText>
          <View style={styles.divider} />
          <ThemedText type="paragraph" style={{ fontWeight: "bold" }}>Halal</ThemedText>
          <ThemedText type="paragraph" style={{ fontSize: 40, paddingTop: 20 }}>{summaryData?.halal}</ThemedText>
          <View style={styles.divider} />
          <ThemedText type="paragraph" style={{ fontWeight: "bold" }}>Vegetarian</ThemedText>
          <ThemedText type="paragraph" style={{ fontSize: 40, paddingTop: 20 }}>{summaryData?.veg}</ThemedText>
          <View style={styles.divider} />
          <ThemedText type="paragraph" style={{ fontWeight: "bold" }}>Regular</ThemedText>
          <ThemedText type="paragraph" style={{ fontSize: 40, paddingTop: 20 }}>{summaryData?.reg}</ThemedText>
        </SafeAreaView>
        <ThemedText type="subtitle" style={{ paddingBottom: 15, paddingTop: 15 }}>Cups</ThemedText>
        <SafeAreaView style={styles.inventoryBox}>
        <ThemedText type="paragraph" style={{ fontWeight: "bold" }}>Total</ThemedText>
        <ThemedText type="paragraph" style={{ fontSize: 40, paddingTop: 20 }}>{summaryData?.cups}</ThemedText>
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
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
  },
  inventoryBox: {
    alignSelf: "center",
    paddingVertical: 20,
    backgroundColor: "#D9D9D9",
    width: "90%",
    borderRadius: 15,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "gray",
    alignSelf: "center",
    marginVertical: 10,
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
