import { useLayoutEffect } from "react";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Background from "../components/Background";
import HeaderIcons from "../components/HeaderIcons";

const Home = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcons navigation={navigation} />,
    });
  }, [navigation]);

 useLayoutEffect(() => {
   navigation.setOptions({
     headerBackVisible: false,
   });
 }, [navigation]);

  return (
    <Background>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("RecipeList")}
        >
          <Text style={styles.buttonText}>My Recipes</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Favourite")}
        >
          <Text style={styles.buttonText}>Favourites</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("UntriedRecipes")}
        >
          <Text style={styles.buttonText}>Untried Recipes</Text>
        </Pressable>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 15,
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
