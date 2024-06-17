import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderIcons = ({ navigation }) => {
  return (
    <View style={styles.headerIcons}>
      <Ionicons
        name="add-outline"
        size={24}
        color="#4CAF50"
        style={styles.icon}
        onPress={() => navigation.navigate("AddRecipe")}
      />
      <Ionicons
        name="search"
        size={24}
        color="#4CAF50"
        style={styles.icon}
        onPress={() => navigation.navigate("Search")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
  },

});

export default HeaderIcons;
