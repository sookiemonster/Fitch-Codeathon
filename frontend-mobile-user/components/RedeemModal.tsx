import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}; 

export function RedeemModal({modalVisible, setModalVisible}: ModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ThemedText type="subtitle">Redeem Your Points</ThemedText>
            <ThemedView style={styles.infoContainer}>
              {/* TODO: use count-up for cool animation when option is chosen */}
              <ThemedText type="default">130</ThemedText>
            </ThemedView>
            <Pressable
              style={styles.buttonSubmit}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
            <Pressable
              style={styles.buttonExit}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Exit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonExit: {
    backgroundColor: "#ff4133",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonSubmit: {
    backgroundColor: "#1D804B",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  infoContainer: {
    margin: 8,
    backgroundColor: "lightgray",
    borderRadius: 20,
    padding: 8,
  },
});
