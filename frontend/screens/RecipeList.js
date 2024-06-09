import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { getRecipes, deleteRecipe } from "../services/api";
import Background from "../components/Background";

const RecipeList = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleNavigate = (item) => {
    console.log("Navigating to RecipeDetail with item:", item);
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  return (
    <Background>
      <View style={styles.container}>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeItem}>
              <Pressable
                style={styles.recipeDetail}
                onPress={() => handleNavigate(item)}
              >
                <Text style={styles.recipeTitle}>{item.title}</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("AddRecipe")}
        >
          <Text style={styles.addButtonText}>Add Recipe</Text>
        </Pressable>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  recipeDetail: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0e0e0", // Temporary background color
  },
  recipeTitle: {
    fontSize: 18,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff6666",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RecipeList;
