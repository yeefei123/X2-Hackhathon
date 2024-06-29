import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const handleSellerLogin = () => {
    navigation.navigate("(seller)/seller", { userType: "seller" });
  };

  const handleBuyerLogin = () => {
    navigation.navigate("(home)", { userType: "buyer" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Your logo component or image */}
        <Text>Logo Goes Here</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSellerLogin}>
          <Text style={styles.buttonText}>Login as Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBuyerLogin}>
          <Text style={styles.buttonText}>Login as Buyer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
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
