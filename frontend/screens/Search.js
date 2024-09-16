import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { getRecipes } from "../services/api";
import Background from "../components/Background";
import UpdatedRecipesContext from "../contexts/UpdatedRecipesContext";

const Search = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const { updatedRecipes } = useContext(UpdatedRecipesContext);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0 && updatedRecipes) {
      const mergedRecipes = mergeUpdatedRecipes(recipes, updatedRecipes);
      setRecipes(mergedRecipes);
      handleSearch(searchQuery, mergedRecipes); 
    }
  }, [updatedRecipes]);

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

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

  const handleSearch = (query, recipesToFilter = recipes) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredRecipes(recipesToFilter);
    } else {
      const filtered = recipesToFilter.filter((recipe) =>
        recipe.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleNavigate = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  return (
    <Background>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
        <FlatList
          data={filteredRecipes}
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
          contentContainerStyle={{ paddingBottom: 100 }}
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
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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

export default Search;
