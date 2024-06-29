import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Product = {
  id: number;
  code: string;
  date: string;
  productName: string;
  credit: string;
};

export default function HistoryList() {
  const navigation = useNavigation();

  const products: Product[] = [
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
  ];

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
    backgroundColor: "#F8F9FA",
    padding: 20,
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
    backgroundColor: "#FFF",
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
    color: "#333",
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
