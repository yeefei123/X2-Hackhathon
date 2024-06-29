import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScannerScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [amtModalVisible, setAmtModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      code: "P001",
      date: "June 29, 2024, 08:15:34",
      productName: "Chicken",
      credit: "10",
    },
    {
      id: 2,
      code: "P002",
      date: "June 29, 2024, 14:47:09",
      productName: "Cooking Oils",
      credit: "20",
    },
    {
      id: 3,
      code: "P003",
      date: "June 29, 2024, 21:22:56",
      productName: "Rice",
      credit: "15",
    },
  ]);

  const navigation = useNavigation();

  type Product = {
    id: number;
    code: string;
    date: string;
    productName: string;
    credit: string;
  };

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleAddPress = () => {
    setModalVisible(false);
    setAmtModalVisible(true);
  };

  const handleCancelPress = () => {
    setModalVisible(false);
    setAmtModalVisible(false);
  };

  const handleAmountConfirm = () => {
    setAmtModalVisible(false);
    const newProduct: Product = {
      id: products.length + 1,
      code: "P004",
      date: new Date().toLocaleString(),
      productName: "Chicken",
      credit: "5",
    };

    setProducts([...products, newProduct]);

    navigation.navigate("(seller)/history", { newScannedData: scannedData });
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current: CameraType) => (current === "back" ? "front" : "back"));
  }

  function handleCodeScanned({ data }: { data: string }) {
    setScannedData(data);
    setModalVisible(true);
  }

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productDate}>{item.date}</Text>
      </View>
      <View style={styles.productMeta}>
        <Text style={styles.productCode}>{item.code}</Text>
        <Text style={styles.productCredit}>{item.credit} credits</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              List of subsidiaries claimed: {"\n"} 1. Cooking Oils (20 credits)
            </Text>
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

      <Modal
        transparent={true}
        visible={amtModalVisible}
        animationType="slide"
        onRequestClose={() => setAmtModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmation successfully!</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancelPress}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAmountConfirm}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerText}>History List</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "50%",
  },
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
  modalInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  header: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    marginBottom: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  productList: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productDetails: {
    flex: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  productDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  productMeta: {
    flex: 1,
    alignItems: "flex-end",
  },
  productCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E90FF",
  },
  productCredit: {
    fontSize: 14,
    color: "#1E90FF",
    marginTop: 4,
  },
});
