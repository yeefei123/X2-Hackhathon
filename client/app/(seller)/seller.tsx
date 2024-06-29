import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Product = {
  id: number;
  code: string;
  category: string;
  productName: string;
};

export default function Seller() {
  const navigation = useNavigation();

  const handleScanner = () => {
    navigation.navigate("(scanner)/scanner");
  };

  const products = [
    { id: 1, code: "P001", category: "Food", productName: "Eggs" },
    { id: 2, code: "P002", category: "Fuel", productName: "Diesel" },
    { id: 3, code: "P003", category: "Food", productName: "Rice" },
  ];

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Text style={styles.productCode}>{item.code}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
      <Text style={styles.productCode}>{item.productName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.bar}></View>
        <Text style={styles.headerText}>Subsidied Product List</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
        />
      </View>

      {/* Scanner Button */}
      <TouchableOpacity style={styles.scannerButton} onPress={handleScanner}>
        <Text style={styles.scannerButtonText}>Scanner</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bar: {
    width: 50,
    height: 4,
    backgroundColor: "blue",
    marginBottom: 5,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  productList: {
    paddingVertical: 10,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 14,
    color: "#666",
  },
  scannerButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  scannerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
