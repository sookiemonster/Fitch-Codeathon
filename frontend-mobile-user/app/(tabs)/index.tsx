import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

//THIS IS USED FOR API CALL

// interface StationCoordinates {
//   id: number;
//   latitude: number;
//   longitude: number;
// }

export default function HomeScreen() {
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= ALL API CALL STUFF -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  // const [stationCoordinates, setStationCoordinates] = useState<StationCoordinates[]>([]); //State to hold markers
  // //Function to fetch coordinates for a specific station 
  // useEffect(() => {
  //   const fetchStationCoordinates = async () => {
  //     const stationIds = [1,2,3];
  //     const fetchPromises = stationIds.map((id) =>
  //       fetch(`http://localhost:5000/api/v1/stations/${id}/location`)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error(`Failed to fetch coordinates for ${id}`);
  //           }
  //           return response.json(); //This is to parse JSON response. Just incase.
  //         })
  //         .then(data => ({
  //           id,
  //           latitude: data.x,
  //           longitude: data.y,
  //         }))
  //     );

  //     try {
  //       const results = await Promise.all(fetchPromises);
  //       setStationCoordinates(results);
  //     } catch (error) {
  //       console.error('Error fetching station coordinates:', error);
  //     }
  //   };
  //   fetchStationCoordinates();
  //   console.log("@#@#@",stationCoordinates)
  // }, []);
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedText type="title">Welcome</ThemedText>
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="default">Grab an EcoWare from any vendor</ThemedText>
      </ThemedView>
      <ThemedText type="title">Map</ThemedText>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 40.6885,
            longitude: -74.0190,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}        //Play around with these settings. Currently map is a 'still picture' bc of these settings
          zoomEnabled={false}
          zoomTapEnabled={false}
        >
          {/* {stationCoordinates.map(station => (
            <Marker
              key={station.id}
              coordinate={{latitude: station.latitude, longitude:station.longitude}}                        // NEED TO CHECK IF API CALL IS BEING CORRECTLY ASSIGN LAT AND LONG
              title={`Station ${station.id}`}
              description={`Coordinates: ${station.latitude}, ${station.longitude}`}
            />
          ))} */}
          <Marker
            coordinate={{ latitude: 40.6885, longitude: -74.0190 }}
            title='Test Location'
            description='This is a test description of the marker'
          />
        </MapView>
      </View>
      <ThemedText type="title">Your Points</ThemedText>
      <ThemedView style={styles.infoContainer}>
        <ThemedText>0</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    gap: 8,
    marginBottom: 8,
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  mapContainer: {
    height: 300,                    //Can mess around with how big we want the map to be here
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
});
