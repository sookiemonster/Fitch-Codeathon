import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
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
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="default">Grab an EcoWare from any vendor</ThemedText>
      </ThemedView>
      <ThemedText type="title">Map</ThemedText>
      
      <ThemedText type="title">Your Points</ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>0</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
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
});
