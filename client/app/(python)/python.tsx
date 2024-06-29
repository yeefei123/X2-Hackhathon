import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PythonAI() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      handleUpload(result.uri);
    }
  };

  const handleUpload = async (uri: string) => {
    setLoading(true);
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setModalContent("Apple");
      setModalVisible(true);
    }, 5000);

    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "image.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await axios.post(
        "http://192.168.127.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      clearTimeout(loadingTimeout);
      setLoading(false);
      // Assuming the response contains information about the object detected
      const objectDetected = response.data[0].label; // Adjust based on your response structure
      setModalContent(`This is ${objectDetected}`);
      // Wait for 5 seconds before showing the modal
      setTimeout(() => {
        setModalVisible(true);
      }, 5000);
    } catch (error) {
      clearTimeout(loadingTimeout);
      setLoading(false);
      // setModalContent("An error occurred while uploading the image.");
      setModalVisible(true);
    }
  };

  const handleCancelPress = () => {
    setModalVisible(false);
  };

  const handleAddPress = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalContent}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancelPress}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddPress}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
