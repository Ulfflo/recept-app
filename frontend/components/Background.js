// components/Background.js
import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/min_kokbok.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Background;
