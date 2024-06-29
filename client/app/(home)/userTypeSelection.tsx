import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Usertype() {
  const router = useRouter();
  const navigation = useNavigation();
  const users = [
    {
      name: "Diesel",
      avatar:
        "https://img.freepik.com/premium-vector/fuel-diesel-icon-logo-vector-design-template_827767-91.jpg",
    },
  ];

  const grocery = [
    {
      name: "Cooking oils",
      avatar: "https://cdn-icons-png.flaticon.com/512/3082/3082045.png",
    },
  ];

  const _onPressOilsAndGas = () => {
    router.replace("(tabs)/explore");
  };

  const _onPressGrocery = () => {
    console.log("Grocery card pressed");
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate("(explore)/explore")}
      >
        <View>
          <Card>
            <Card.Title>Oils and gas</Card.Title>
            <Card.Divider />
            <View>
              {users.map((u, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <View style={styles.userInfo}>
                      <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: u.avatar }}
                      />
                      <Text style={styles.name}>{u.name}</Text>
                    </View>
                    <Text style={styles.credits}>200 credits</Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={_onPressGrocery} underlayColor="white">
        <View>
          <Card>
            <Card.Title>Grocery</Card.Title>
            <Card.Divider />
            <View>
              {grocery.map((u, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <View style={styles.userInfo}>
                      <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: u.avatar }}
                      />
                      <Text style={styles.name}>{u.name}</Text>
                    </View>
                    <Text style={styles.credits}>200 credits</Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
  },
  credits: {
    fontSize: 16,
    color: "#000",
  },
});
