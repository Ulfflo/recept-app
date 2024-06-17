import React, { useContext, useEffect, useLayoutEffect } from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import Background from "../components/Background";
import HeaderIcons from "../components/HeaderIcons";
import UntriedRecipesContext from "../contexts/UntriedRecipesContext";
import UpdatedRecipesContext from "../contexts/UpdatedRecipesContext";

const UntriedRecipes = ({ navigation }) => {
  const { untriedRecipes, fetchUntriedRecipes } = useContext(
    UntriedRecipesContext
  );
  const { updatedRecipes } = useContext(UpdatedRecipesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcons navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    fetchUntriedRecipes();
  }, []);

  useEffect(() => {
    if (updatedRecipes) {
      fetchUntriedRecipes();
    }
  }, [updatedRecipes, fetchUntriedRecipes]);

  const handleNavigate = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  return (
    <Background>
      <View style={styles.container}>
        <FlatList
          data={untriedRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeItem}>
              <Pressable
                style={styles.recipeDetail}
                onPress={() => handleNavigate(item)}
              >
                <Text style={styles.recipeTitle}>{item.title}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  recipeDetail: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    color: "#fff",
  },
});

export default UntriedRecipes;
