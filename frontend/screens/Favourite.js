import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { getRecipes } from "../services/api";
import Background from "../components/Background";
import HeaderIcons from "../components/HeaderIcons";
import UpdatedRecipesContext from "../contexts/UpdatedRecipesContext";

const Favourite = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const { updatedRecipes } = useContext(UpdatedRecipesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcons navigation={navigation} />,
    });
  }, [navigation]);

  const fetchFavorites = async () => {
    try {
      const data = await getRecipes();
      const filteredData = data.filter((recipe) => recipe.favorite);
      const mergedData = mergeUpdatedRecipes(filteredData, updatedRecipes);
      setFavorites(mergedData);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (favorites.length > 0 && updatedRecipes) {
      const mergedFavorites = mergeUpdatedRecipes(favorites, updatedRecipes);
      setFavorites(mergedFavorites);
    }
  }, [updatedRecipes]);

  const mergeUpdatedRecipes = (recipes, updatedRecipes) => {
    const updatedRecipesArray = Object.values(updatedRecipes);
    const mergedRecipes = recipes.map((recipe) =>
      updatedRecipes[recipe.id] ? updatedRecipes[recipe.id] : recipe
    );
    updatedRecipesArray.forEach((updatedRecipe) => {
      if (!mergedRecipes.find((recipe) => recipe.id === updatedRecipe.id)) {
        mergedRecipes.push(updatedRecipe);
      }
    });
    return mergedRecipes;
  };

  const handleNavigate = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  return (
    <Background>
      <View style={styles.container}>
        <FlatList
          data={favorites}
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
    padding: 10,
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

export default Favourite;
