import React, { useState, useLayoutEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  toggleFavorite,
  toggleTried,
  deleteRecipe,
  updateRecipe, // Correct import here
} from "../services/api";
import UntriedRecipesContext from "../contexts/UntriedRecipesContext";
import UpdatedRecipesContext from "../contexts/UpdatedRecipesContext"; // Import the new context

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params;
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(recipe.favorite);
  const [isTried, setIsTried] = useState(recipe.tried);
  const [editing, setEditing] = useState(false); // Track if in editing mode
  const [editedRecipe, setEditedRecipe] = useState({
    id: recipe.id,
    title: recipe.title || "",
    cookTime: recipe.cookTime || "",
    portions: recipe.portions || "",
    ingredients: recipe.ingredients || [],
    directions: recipe.directions || "",
  }); // Copy of original recipe

  const { removeRecipe } = useContext(UntriedRecipesContext);
  const { updateRecipe: updateRecipeContext } = useContext(
    UpdatedRecipesContext
  ); // Use the new context

  useLayoutEffect(() => {
    navigation.setOptions({
      title: recipe.title,
      headerRight: () => (
        <Pressable
          style={{ marginLeft: 16 }}
          onPress={() => {
            if (editing) {
              handleCancelEdit(); // Cancel editing
            } else {
              setEditing(true); // Enter editing mode
            }
          }}
        >
          <Text style={{ color: editing ? "red" : "#4CAF50" }}>
            {editing ? "Cancel" : "Edit"}
          </Text>
        </Pressable>
      ),
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          {!editing ? (
            <Pressable
              style={{ marginRight: 16 }}
              onPress={handleToggleFavorite}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color="red"
              />
            </Pressable>
          ) : (
            <Pressable style={{ marginRight: 16 }} onPress={handleDeleteRecipe}>
              <Ionicons name="trash-outline" size={24} />
            </Pressable>
          )}
        </View>
      ),
    });
  }, [navigation, recipe.title, editing, isFavorite]);

  const handleToggleFavorite = async () => {
    try {
      const updatedRecipe = await toggleFavorite(recipe.id);
      setIsFavorite(updatedRecipe.favorite);
      updateRecipeContext(updatedRecipe); // Update the recipe in the context
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleMarkAsTried = async () => {
    try {
      const updatedRecipe = await toggleTried(recipe.id);
      setIsTried(updatedRecipe.tried);
      if (updatedRecipe.tried) {
        removeRecipe(recipe.id);
      }
    } catch (error) {
      console.error("Error marking recipe as tried:", error);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipe(recipe.id);
      removeRecipe(recipe.id); // Remove the recipe from the context
      navigation.navigate("Home"); // Navigate to the home screen after deleting
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedRecipe = await updateRecipe({
        ...editedRecipe,
        cookTime: editedRecipe.cookTime || null,
        portions: editedRecipe.portions || null,
      });
      setEditing(false); // Exit editing mode after saving changes
      setEditedRecipe(updatedRecipe); // Update the editedRecipe state with the saved changes
      updateRecipeContext(updatedRecipe); // Update the recipe in the context
      navigation.setParams({ recipe: updatedRecipe }); // Update the navigation params
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false); // Exit editing mode without saving changes
    setEditedRecipe({
      title: recipe.title || "",
      cookTime: recipe.cookTime || "",
      portions: recipe.portions || "",
      ingredients: recipe.ingredients || [],
      directions: recipe.directions || "",
    }); // Reset editedRecipe to original recipe
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!editing ? (
        <>
          <Text style={styles.details}>
            Cooking Time:{" "}
            {recipe.cookTime ? `${recipe.cookTime} minutes` : "N/A"}
          </Text>
          <Text style={styles.details}>
            Portions: {recipe.portions ? recipe.portions : "N/A"}
          </Text>
          <Text style={styles.header}>Ingredients:</Text>
          {recipe.ingredients &&
            recipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.details}>
                {ingredient}
              </Text>
            ))}
          <Text style={styles.header}>Directions:</Text>
          <Text style={styles.details}>{recipe.directions}</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          ></Pressable>
          <View style={styles.triedAndSaveButtonContainer}>
            <Pressable
              style={styles.triedAndSaveButton}
              onPress={handleMarkAsTried}
            >
              <Text style={styles.triedAndSaveButtonText}>
                {isTried ? "Mark as Untried" : "Mark as Tried"}
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={editedRecipe.title}
            onChangeText={(text) =>
              setEditedRecipe({ ...editedRecipe, title: text })
            }
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={
              editedRecipe.cookTime ? editedRecipe.cookTime.toString() : ""
            }
            onChangeText={(text) =>
              setEditedRecipe({
                ...editedRecipe,
                cookTime: parseInt(text) || "",
              })
            }
            placeholder="Cooking Time"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={
              editedRecipe.portions ? editedRecipe.portions.toString() : ""
            }
            onChangeText={(text) =>
              setEditedRecipe({
                ...editedRecipe,
                portions: parseInt(text) || "",
              })
            }
            placeholder="Portions"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { height: 120 }]}
            value={editedRecipe.ingredients.join("\n")} // Convert array to string with newline separation
            onChangeText={(text) =>
              setEditedRecipe({
                ...editedRecipe,
                ingredients: text.split("\n"),
              })
            } // Convert string back to array
            placeholder="Ingredients"
            multiline
          />
          <TextInput
            style={[styles.input, { height: 120 }]}
            value={editedRecipe.directions}
            onChangeText={(text) =>
              setEditedRecipe({ ...editedRecipe, directions: text })
            }
            placeholder="Directions"
            multiline
          />
          <View style={styles.triedAndSaveButtonContainer}>
            <Pressable
              style={styles.triedAndSaveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.triedAndSaveButtonText}>Save Changes</Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  details: {
    fontSize: 16,
    marginVertical: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 10,
  },
  triedAndSaveButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  triedAndSaveButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginVertical: 10,
    width: "50%",
    alignItems: "center",
  },
  triedAndSaveButtonText: {
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RecipeDetail;
