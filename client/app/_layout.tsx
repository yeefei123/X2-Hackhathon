import { useColorScheme } from "@/hooks/useColorScheme";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabTwoScreen from "./(explore)/explore";
import Usertype from "./(home)/userTypeSelection";
import ScannerScreen from "./(scanner)/scanner";
import HistoryList from "./(seller)/history";
import Seller from "./(seller)/seller";
import HomeScreen from "./(tabs)";

const Stack = createStackNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="(home)/userTypeSelection">
        <Stack.Screen
          name="(tabs)"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(explore)/explore"
          component={TabTwoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(seller)/seller"
          component={Seller}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(scanner)/scanner"
          component={ScannerScreen}
          options={{
            headerShown: true,
            headerBackTitle: "back",
            headerTitle: "QR Code Scanner",
          }}
        />
        <Stack.Screen
          name="(seller)/history"
          component={HistoryList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(home)/userTypeSelection"
          component={Usertype}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
