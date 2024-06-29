import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech"; // Correct import statement for Speech
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Usertype() {
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
    // Correct navigation method for navigating to a screen in the stack
    navigation.navigate("(explore)/explore");
  };

  const _onPressGrocery = () => {
    console.log("Grocery card pressed");
  };

  const speak = () => {
    const thingToSay =
      "Under Oils and gas category, you have 200 credits for diesel."; // Adjusted speech content for clarity
    Speech.speak(thingToSay);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={_onPressOilsAndGas} // Corrected onPress handler
        onLongPress={speak} // Corrected onLongPress handler to invoke the speak function
      >
        <View>
          <Card>
            <Card.Title>Oils and gas</Card.Title>
            <Card.Divider />
            <View>
              {users.map((u, i) => (
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
              ))}
            </View>
          </Card>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={_onPressGrocery}>
        <View>
          <Card>
            <Card.Title>Grocery</Card.Title>
            <Card.Divider />
            <View>
              {grocery.map((g, i) => (
                <View key={i} style={styles.user}>
                  <View style={styles.userInfo}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ uri: g.avatar }}
                    />
                    <Text style={styles.name}>{g.name}</Text>
                  </View>
                  <Text style={styles.credits}>200 credits</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
