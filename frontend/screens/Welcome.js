import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import {
  useFonts,
  GreatVibes_400Regular,
} from "@expo-google-fonts/great-vibes";

const Welcome = ({ navigation }) => {
  // Load the "Great Vibes" font
  let [fontsLoaded] = useFonts({
    GreatVibes_400Regular,
  });

  // Render the component once the font is loaded
  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  return (
    <ImageBackground
      source={require("../assets/min_kokbok.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.stickerContainer}>
          <Image
            source={require("../assets/etikett.png")}
            style={styles.sticker}
            resizeMode="contain" // Use props.resizeMode instead of style.resizeMode
          />
          <Text
            style={[
              styles.stickerText,
              { fontFamily: "GreatVibes_400Regular" },
            ]}
          >
            My cookbook
          </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Open</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stickerContainer: {
    position: "absolute",
    top: "10%", // Adjust this value as needed
    justifyContent: "center",
    alignItems: "center",
  },
  sticker: {
    width: 320,
    height: 200, // Adjust the size to fit your sticker image
  },
  stickerText: {
    position: "absolute",
    fontSize: 40,
    color: "#000", // Change to match your sticker design
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30, // Adjust this value as needed
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Welcome;
