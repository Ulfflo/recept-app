import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Background from "../components/Background";

const Home = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("RecipeList")}
        >
          <Text style={styles.buttonText}>View Recipes</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AddRecipe")}
        >
          <Text style={styles.buttonText}>Add a Recipe</Text>
        </Pressable>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Home;
