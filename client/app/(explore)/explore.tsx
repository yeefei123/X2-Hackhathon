import { useEffect, useState } from "react";
import { Image as RNImage, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [qrCodeUrl, setQrCodeUrl] = useState(
    "https://www.qrstuff.com/images/default_qrcode.png"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          setQrCodeUrl(
            "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          );
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <RNImage
          style={styles.logo}
          source={{
            uri: qrCodeUrl,
          }}
        />
        <Text>Time left to redeem</Text>
        <Text style={styles.countdown}>{formatTime(countdown)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  countdown: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
});
